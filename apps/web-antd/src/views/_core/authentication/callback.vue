<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useAppConfig } from '@vben/hooks';

import { useAuthStore } from '#/store';

const route = useRoute();
const authStore = useAuthStore();

onMounted(async () => {
  const code = route.query.code as string;
  const { clientId } = useAppConfig(import.meta.env, import.meta.env.PROD);
  if (code) {
    const requestParam = {
      grantType: 'wechatmp',
      password: code,
      clientId,
    };

    try {
      await authStore.authLogin(requestParam);
    } catch (error) {
      console.error('微信登录失败', error);
    }
  } else {
    console.warn('未获取到微信code');
  }
});
</script>

<template>
  <div>微信登录中，请稍候...</div>
</template>
