<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, markRaw, onMounted, ref, useTemplateRef } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { useAppConfig } from '@vben/hooks';
import { $t } from '@vben/locales';

import { Input } from 'ant-design-vue';
import { omit } from 'lodash-es';

import { getCaptchaCode } from '#/api/common/captcha';
import { useAuthStore } from '#/store';

import InputCaptcha from './input-captcha.vue';

defineOptions({ name: 'Login' });

const { clientId } = useAppConfig(import.meta.env, import.meta.env.PROD);

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
      component: markRaw(Input),
      modelPropName: 'value',
      componentProps: {
        size: 'large',
        placeholder: $t('authentication.usernameTip'),
        allowClear: true,
      },
      defaultValue: '',
      fieldName: 'identifier',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: markRaw(Input.Password),
      modelPropName: 'value',
      componentProps: {
        size: 'large',
        placeholder: $t('authentication.passwordTip'),
      },
      defaultValue: '',
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(5, { message: $t('authentication.passwordTip') }),
    },
    {
      component: markRaw(InputCaptcha),
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
      requestParam.grantType = 'password';
      requestParam.clientId = clientId;
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
