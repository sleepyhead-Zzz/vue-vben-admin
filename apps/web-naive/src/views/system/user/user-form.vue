<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import { type UserDetailDTO } from '#/apis';

async function onSubmit() {}

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.input_name'),
      },
      fieldName: 'user.username',
      label: $t('system.user.name'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.input_nickname'),
      },
      fieldName: 'nickname',
      label: $t('system.user.nickname'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.input_email'),
      },
      fieldName: 'email',
      label: $t('system.user.email'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.input_phone_number'),
      },
      fieldName: 'phoneNumber',
      label: $t('system.user.phone_number'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('common.form.input_remark'),
      },
      fieldName: 'remark',
      label: $t('common.form.remark'),
    },
  ],
  showDefaultActions: false,
});
const message = useMessage();
const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) {
      message.error('数据格式有误');
      return;
    }
    await formApi.submitForm();
    message.info('提交成功');
    modalApi.close();
  },

  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const userData =
        modalApi.getData<Record<string, UserDetailDTO>>().userData;
      if (userData) {
        formApi.setValues(userData);
      }
      const title = userData ? $t('system.user.edit') : $t('system.user.add');
      modalApi.setState({ title });
    }
  },
});
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
