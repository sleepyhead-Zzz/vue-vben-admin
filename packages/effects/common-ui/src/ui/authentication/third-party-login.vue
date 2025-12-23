<script setup lang="ts">
import { useRouter } from 'vue-router';

import { MdiGithub, MdiGoogle, MdiQqchat, MdiWechat } from '@vben/icons';
import { $t } from '@vben/locales';

import { VbenIconButton } from '@vben-core/shadcn-ui';

import DingdingLogin from './dingding-login.vue';

defineOptions({
  name: 'ThirdPartyLogin',
});
const router = useRouter();
function handleGo(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="w-full sm:mx-auto md:max-w-md">
    <div class="mt-4 flex items-center justify-between">
      <span class="border-input w-[35%] border-b dark:border-gray-600"></span>
      <span class="text-muted-foreground text-center text-xs uppercase">
        {{ $t('authentication.thirdPartyLogin') }}
      </span>
      <span class="border-input w-[35%] border-b dark:border-gray-600"></span>
    </div>

    <div class="mt-4 flex flex-wrap justify-center">
      <VbenIconButton class="mb-3" @click="handleGo('/auth/wechat-qrcode')">
        <MdiWechat />
      </VbenIconButton>
      <VbenIconButton
        :tooltip="$t('authentication.qqLogin')"
        tooltip-side="top"
        class="mb-3"
      >
        <MdiQqchat />
      </VbenIconButton>
      <VbenIconButton
        :tooltip="$t('authentication.githubLogin')"
        tooltip-side="top"
        class="mb-3"
      >
        <MdiGithub />
      </VbenIconButton>
      <VbenIconButton
        :tooltip="$t('authentication.googleLogin')"
        tooltip-side="top"
        class="mb-3"
      >
        <MdiGoogle />
      </VbenIconButton>
      <DingdingLogin
        v-if="dingdingAuthConfig"
        :corp-id="dingdingAuthConfig.corpId"
        :client-id="dingdingAuthConfig.clientId"
        class="mb-3"
      />
    </div>
  </div>
</template>
