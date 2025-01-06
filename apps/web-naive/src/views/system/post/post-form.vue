<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import { type PostDTO } from '#/apis';

async function onSubmit() {}

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'InputNumber',
      dependencies: {
        disabled: true,
        triggerFields: ['keepAlive'],
      },
      fieldName: 'postId',
      label: $t('system.post.id'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.post.input_code'),
      },
      fieldName: 'postCode',
      label: $t('system.post.code'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.post.input_name'),
      },
      fieldName: 'postName',
      label: $t('system.post.name'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('common.form.input_sort'),
      },
      fieldName: 'postSort',
      label: $t('common.form.sort'),
      // rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: $t('common.form.disabled'),
            value: 0,
          },
          {
            label: $t('common.form.activate'),
            value: 1,
          },
        ],

        placeholder: $t('common.form.please_select'),
        showSearch: true,
      },
      fieldName: 'status',
      label: $t('common.form.status'),
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
      const postData = modalApi.getData<Record<string, PostDTO>>().postData;
      if (postData) {
        formApi.setValues(postData);
      }
      const title = postData ? $t('system.post.edit') : $t('system.post.add');
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
