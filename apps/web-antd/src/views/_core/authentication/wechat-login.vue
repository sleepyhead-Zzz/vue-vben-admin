<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { getAuthorizeUrl } from '#/api/common/login';

const router = useRouter();

onMounted(async () => {
  try {
    const { data } = await getAuthorizeUrl();
    if (data) {
      window.location.replace(data.img);
    } else {
      console.warn('未获取到微信授权 URL');
      // 如果需要，跳回登录页
      router.replace('/auth/login');
    }
  } catch (error) {
    console.error('获取微信授权 URL 失败', error);
    router.replace('/auth/login');
  }
});
</script>

<template>
  <div>微信登录中，请稍候...</div>
</template>
