<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { VbenButton } from '@vben-core/shadcn-ui';

import { useQRCode } from '@vueuse/integrations/useQRCode';

import Title from './auth-title.vue';

interface Props {
  title?: string;
  subTitle?: string;
  description?: string;
  loginPath?: string;
  pollingInterval?: number;
  qrCodeApi: () => Promise<{ qrUrl: string; sessionId: string }>;
  pollingApi: (sessionId: string) => Promise<{ code?: string; status: string }>;
  onLoginSuccess?: (code: string, uuid: string) => void;
}

defineOptions({ name: 'AuthenticationQrCodeLogin' });

const props = withDefaults(defineProps<Props>(), {
  title: '欢迎回来',
  subTitle: '请使用微信扫描二维码登录',
  description: '扫描后请在手机端确认登录',
  loginPath: '/auth/login',
  pollingInterval: 2000,
});

const router = useRouter();

const text = ref(''); // 二维码 URL
const sessionId = ref(''); // 会话ID
const qrcode = useQRCode(text, { errorCorrectionLevel: 'H', margin: 4 });

const intervalId = ref<null | number>(null);

const statusText = ref('请使用微信扫码登录'); // 状态提示
const isExpired = ref(false); // 是否过期

async function loadQrCode() {
  const res = await props.qrCodeApi();
  text.value = res.qrUrl;
  sessionId.value = res.sessionId;
  statusText.value = '请使用微信扫码登录';
  isExpired.value = false;
}

async function startPolling() {
  if (!sessionId.value) return;

  intervalId.value = window.setInterval(async () => {
    const res = await props.pollingApi(sessionId.value);
    if (res.status === 'pending') {
      statusText.value = '请使用微信扫码登录';
    } else if (res.status === 'confirmed' && res.code) {
      clearPolling();
      statusText.value = '登录成功';
      props.onLoginSuccess?.(res.code, sessionId.value);
    } else if (res.status === 'expired') {
      clearPolling();
      statusText.value = '二维码已过期，请刷新';
      isExpired.value = true;
    }
  }, props.pollingInterval);
}

function clearPolling() {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
}

function goToLogin() {
  clearPolling();
  router.push(props.loginPath);
}

async function refreshQrCode() {
  clearPolling();
  await loadQrCode();
  await startPolling();
}

onMounted(async () => {
  await loadQrCode();
  await startPolling();
});

onUnmounted(() => {
  clearPolling();
});
</script>

<template>
  <div>
    <Title>
      <slot name="title"> {{ title }} 📱 </slot>
      <template #desc>
        <span class="text-muted-foreground">
          <slot name="subTitle">
            {{ subTitle }}
          </slot>
        </span>
      </template>
    </Title>

    <div class="flex-col-center mt-6">
      <img :src="qrcode" alt="qrcode" class="w-1/2" />
      <p class="text-muted-foreground mt-4 text-sm">{{ statusText }}</p>

      <VbenButton
        v-if="isExpired"
        class="mt-4 w-full"
        variant="outline"
        @click="refreshQrCode"
      >
        刷新二维码
      </VbenButton>
    </div>

    <VbenButton class="mt-4 w-full" variant="outline" @click="goToLogin">
      返回
    </VbenButton>
  </div>
</template>
