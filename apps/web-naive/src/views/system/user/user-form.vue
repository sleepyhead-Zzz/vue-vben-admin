<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import {
  type AddUserCommand,
  ApiService,
  type UpdateUserCommand,
  type UserDetailDTO,
} from '#/apis';

async function onSubmit(values: Record<string, any>) {
  if (values.user.userId) {
    const formData: UpdateUserCommand = {
      deptId: values.deptId,
      username: values.user.username,
      nickname: values.user.nickname,
      email: values.user.email,
      phoneNumber: values.user.phoneNumber,
      sex: values.user.sex,
      avatar: values.user.avatar,
      password: values.user.password,
      status: values.user.status,
      roleId: values.roleId,
      postId: values.postId,
      remark: values.user.remark,
    };
    await ApiService.edit(values.user.userId, formData);
  } else {
    const formData: AddUserCommand = {
      deptId: values.deptId,
      username: values.user.username,
      nickname: values.user.nickname,
      email: values.user.email,
      phoneNumber: values.user.phoneNumber,
      sex: values.user.sex,
      avatar: values.user.avatar,
      password: values.user.password,
      status: values.user.status,
      roleId: values.roleId,
      postId: values.postId,
      remark: values.user.remark,
    };
    await ApiService.add(formData);
  }
}

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'InputNumber',
      dependencies: {
        disabled: true,
        triggerFields: ['keepAlive'],
      },
      fieldName: 'user.userId',
      label: $t('system.user.id'),
    },
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
      fieldName: 'user.nickname',
      label: $t('system.user.nickname'),
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: $t('system.user.man'),
            value: 0,
          },
          {
            label: $t('system.user.woman'),
            value: 1,
          },
          {
            label: $t('common.form.unknown'),
            value: 2,
          },
        ],
        placeholder: $t('common.form.please_select'),
        showSearch: true,
      },
      fieldName: 'user.sex',
      label: $t('system.user.sex'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.input_email'),
      },
      fieldName: 'user.email',
      label: $t('system.user.email'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.input_phone_number'),
      },
      fieldName: 'user.phoneNumber',
      label: $t('system.user.phone_number'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('common.form.input_remark'),
      },
      fieldName: 'user.remark',
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
