<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@vben/common-ui';

import { getAuthorizeUrl, getWxLoginStatus } from '#/api/common/login';
import { useAuthStore } from '#/store';

const authStore = useAuthStore();

async function handleLoginSuccess(code: string) {
  await authStore.authLogin({ code });
}

async function getQrCode() {
  const res = await getAuthorizeUrl();
  if (res.code !== 200 || !res.data) throw new Error('获取二维码失败');
  return {
    qrUrl: res.data.img,
    sessionId: res.data.uuid,
  };
}

async function getStatus(sessionId: string) {
  const res = await getWxLoginStatus({ uuid: sessionId });
  return res.data
    ? {
        status: res.data.status,
        code: res.data.code,
      }
    : {
        status: undefined,
        code: undefined,
      };
}
</script>

<template>
  <AuthenticationQrCodeLogin
    :qr-code-api="getQrCode"
    :polling-api="getStatus"
    :on-login-success="handleLoginSuccess"
    login-path="/home"
  />
</template>
