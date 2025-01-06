<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NTreeSelect, useMessage } from 'naive-ui';
import * as zod from 'zod';

import { useVbenForm } from '#/adapter/form';
import {
  type AddDeptCommand,
  ApiService,
  type DeptDTO,
  type UpdateDeptCommand,
} from '#/apis';

const allDept = ref();
async function onSubmit(values: Record<string, any>) {
  if (values.deptId) {
    const formData: UpdateDeptCommand = {
      deptId: values.deptId,
      parentId: values.parentId,
      deptName: values.deptName,
      orderNum: values.orderNum,
      leaderName: values.leaderName,
      phone: values.phone,
      email: values.email,
      status: values.status,
    };
    await ApiService.edit4(formData.deptId, formData);
  } else {
    const formData: AddDeptCommand = {
      parentId: values.parentId,
      deptName: values.name,
      orderNum: values.orderNum,
      leaderName: values.leaderName,
      phone: values.phone,
      email: values.email,
      status: values.status,
    };
    await ApiService.add4(formData);
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
      fieldName: 'deptId',
      label: $t('system.dept.id'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dept.input_name'),
      },
      fieldName: 'deptName',
      label: $t('system.dept.name'),
      rules: 'required',
    },
    {
      component: 'TreeSelectCustomize',
      fieldName: 'parentId',
      label: $t('system.dept.parent'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('common.form.input_sort'),
      },
      fieldName: 'orderNum',
      label: $t('common.form.sort'),
      // rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dept.input_leader_name'),
      },
      fieldName: 'leaderName',
      label: $t('system.dept.leader_name'),
      rules: 'required',
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
        placeholder: $t('system.dept.input_phone'),
      },
      fieldName: 'phone',
      label: $t('system.dept.phone'),
      rules: zod
        .string()
        .min(1, { message: $t('common.form.required') })
        .max(20, { message: $t('common.form.phone_max_length') }),
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dept.input_email'),
      },
      fieldName: 'email',
      label: $t('system.dept.email'),
      rules: zod
        .string()
        .min(1, { message: $t('common.form.required') })
        .email({ message: $t('common.form.email_valid_error') }),
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
      message.error($t('common.form.valid_error'));
      return;
    }
    await formApi.submitForm();
    message.info($t('common.form.success'));
    modalApi.close();
  },

  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { data } = await ApiService.dropdownList1();
      allDept.value = data;
      const deptData = modalApi.getData<Record<string, DeptDTO>>().deptData;
      if (deptData) {
        formApi.setValues(deptData);
      }
      const title = deptData ? $t('system.dept.edit') : $t('system.dept.add');
      modalApi.setState({ title });
    }
  },
});
</script>
<template>
  <Modal>
    <Form>
      <template #parentId="parentId">
        <NTreeSelect
          v-bind="parentId"
          :options="allDept"
          children-field="children"
          key-field="deptId"
          label-field="label"
        />
      </template>
    </Form>
  </Modal>
</template>
