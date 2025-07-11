<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, onMounted, ref, useTemplateRef } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { omit } from 'lodash-es';

import { getCaptchaCode } from '#/api/common/captcha';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const loginFormRef = useTemplateRef('loginFormRef');

const captchaInfo = ref<CommonAPI.CaptchaDTO>({
  captchaEnabled: false,
  img: '',
  uuid: '',
});
// 验证码loading
const captchaLoading = ref(false);

async function loadCaptcha() {
  try {
    captchaLoading.value = true;

    const { data } = await getCaptchaCode();
    if (data.captchaEnabled) {
      data.img = `data:image/png;base64,${data.img}`;
    }
    captchaInfo.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    captchaLoading.value = false;
  }
}
onMounted(async () => {
  await loadCaptcha();
});
const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        class: 'focus:border-primary',
        placeholder: $t('authentication.usernameTip'),
      },
      defaultValue: 'sleepyhead@outlook.com',
      fieldName: 'identifier',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        class: 'focus:border-primary',
        placeholder: $t('authentication.password'),
      },
      defaultValue: '!@#ASAS!@123132',
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(5, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputCaptcha',
      componentProps: {
        captcha: captchaInfo.value.img,
        class: 'focus:border-primary',
        onCaptchaClick: loadCaptcha,
        placeholder: $t('authentication.code'),
        loading: captchaLoading.value,
      },
      dependencies: {
        if: () => captchaInfo.value.captchaEnabled,
        triggerFields: [''],
      },
      fieldName: 'captchaCode',
      label: $t('authentication.code'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.verifyRequiredTip') }),
    },
  ];
});

async function handleAccountLogin(values) {
  try {
    const requestParam: any = omit(values, ['captchaCode']);
    // 验证码
    if (captchaInfo.value.captchaEnabled) {
      requestParam.captchaCode = values.captchaCode;
      requestParam.captchaCodeKey = captchaInfo.value.uuid;
      requestParam.loginType = 'password';
    }
    // 登录
    await authStore.authLogin(requestParam);
  } catch (error) {
    console.error(error);
    // 处理验证码错误
    if (error instanceof Error) {
      // 刷新验证码
      loginFormRef.value?.getFormApi().setFieldValue('captchaCode', '');
      await loadCaptcha();
    }
  }
}
</script>

<template>
  <AuthenticationLogin
    ref="loginFormRef"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="handleAccountLogin"
  />
</template>
