<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@vben/common-ui';
import { useAppConfig } from '@vben/hooks';

import { getAuthorizeUrl, getWxLoginStatus } from '#/api/common/login';
import { useAuthStore } from '#/store';

const authStore = useAuthStore();
const { clientId } = useAppConfig(import.meta.env, import.meta.env.PROD);
async function handleLoginSuccess(code: string, uuid: string) {
  await authStore.authLogin({
    identifier: uuid,
    password: code,
    grantType: 'wechatmp',
    clientId,
  });
}

async function getQrCode() {
  const res = await getAuthorizeUrl({ pc: true });
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
        status: 'expired',
        code: undefined,
      };
}
</script>

<template>
  <AuthenticationQrCodeLogin
    :qr-code-api="getQrCode"
    :polling-api="getStatus"
    :on-login-success="handleLoginSuccess"
    login-path="/"
  />
</template>
