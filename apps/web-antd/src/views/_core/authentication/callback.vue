<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Spin } from 'ant-design-vue';

import { wxLoginCallback } from '#/api/common/login';

const statusText = ref('微信登录中，请稍候...');
const loading = ref(true);

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');

  if (code && state) {
    try {
      statusText.value = '正在授权，请稍候...';
      const { data } = await wxLoginCallback({ code, state });
      statusText.value = data || '授权成功，请回到电脑端继续登录';
    } catch (error) {
      console.error('微信登录失败', error);
      statusText.value = '授权失败，请重新扫码';
    }
  } else {
    statusText.value = '未获取到微信 code，无法完成授权';
  }

  loading.value = false;
});
</script>

<template>
  <div style="margin-top: 20vh; text-align: center">
    <Spin :spinning="loading">
      <p style="margin-top: 16px">{{ statusText }}</p>
    </Spin>
  </div>
</template>
