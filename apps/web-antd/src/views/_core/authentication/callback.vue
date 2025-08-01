<script setup lang="ts">
import { onMounted } from 'vue';

import { useAppConfig } from '@vben/hooks';

import { useAuthStore } from '#/store';

const authStore = useAuthStore();

onMounted(async () => {
  // 提取 ? 和 # 之间的 query 参数部分
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

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
