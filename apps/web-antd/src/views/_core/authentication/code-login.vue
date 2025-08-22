<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import { computed, ref, useTemplateRef } from 'vue';

import { AuthenticationCodeLogin, z } from '@vben/common-ui';
import { useAppConfig } from '@vben/hooks';
import { $t } from '@vben/locales';

import { smsCode } from '#/api/common/captcha';
import { useAuthStore } from '#/store';

defineOptions({ name: 'SmsCodeLogin' });

const { clientId } = useAppConfig(import.meta.env, import.meta.env.PROD);
const authStore = useAuthStore();

const loading = ref(false);
const CODE_LENGTH = 6;
const loginRef =
  useTemplateRef<InstanceType<typeof AuthenticationCodeLogin>>('loginRef');

/**
 * 表单 Schema
 */
const formSchema = computed((): VbenFormSchema[] => [
  {
    component: 'VbenInput',
    componentProps: {
      placeholder: $t('authentication.mobile'),
      maxlength: 11,
    },
    fieldName: 'phoneNumber',
    label: $t('authentication.mobile'),
    rules: z
      .string()
      .min(1, { message: $t('authentication.mobileTip') })
      .refine((v) => /^1\d{10}$/.test(v), {
        message: $t('authentication.mobileErrortip'),
      }),
  },
  {
    component: 'VbenPinInput',
    componentProps: {
      codeLength: CODE_LENGTH,
      placeholder: $t('authentication.code'),
      createText: (countdown: number) =>
        countdown > 0
          ? $t('authentication.sendText', [countdown])
          : $t('authentication.sendCode'),

      handleSendCode: async () => {
        try {
          loading.value = true;
          const formApi = loginRef.value?.getFormApi();
          if (!formApi) throw new Error('Form API is not ready');

          // 校验手机号
          await formApi.validateField('phoneNumber');
          const isValid = await formApi.isFieldValid('phoneNumber');
          if (!isValid) throw new Error('Phone number is invalid');

          const { phoneNumber } = await formApi.getValues();

          // 调用后端发送短信
          await smsCode({ phoneNumber });
        } catch (error) {
          console.error('发送验证码失败:', error);
        } finally {
          loading.value = false;
        }
      },
    },
    fieldName: 'code',
    label: $t('authentication.code'),
    rules: z.string().length(CODE_LENGTH, {
      message: $t('authentication.codeTip', [CODE_LENGTH]),
    }),
  },
]);

/**
 * 登录提交
 */
async function handleLogin(values: Recordable<any>) {
  const requestParam = {
    identifier: values.phoneNumber,
    password: values.code,
    grantType: 'sms',
    clientId,
  };

  try {
    loading.value = true;
    await authStore.authLogin(requestParam);
  } catch (error) {
    console.error('SMS 登录失败:', error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthenticationCodeLogin
    ref="loginRef"
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleLogin"
  />
</template>
