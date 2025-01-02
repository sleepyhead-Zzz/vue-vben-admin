<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NTreeSelect, useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import {
  type AddDeptCommand,
  ApiService,
  type DeptDTO,
  type UpdateDeptCommand,
} from '#/apis';

const allDept = ref();
async function onSubmit(values: Record<string, any>) {
  if (values.id) {
    const formData: UpdateDeptCommand = {
      deptId: values.id,
      parentId: values.parentId,
      deptName: values.name,
      orderNum: 0,
    };
    await ApiService.edit4(formData.deptId, formData);
  } else {
    const formData: AddDeptCommand = {
      parentId: values.parentId,

      deptName: values.name,
      orderNum: 0,
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
        placeholder: $t('system.dept.order_num'),
      },
      fieldName: 'name',
      label: $t('system.dept.order_num'),
      rules: 'required',
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
      component: 'Input',
      componentProps: {
        placeholder: $t('system.dept.input_phone'),
      },
      fieldName: 'phone',
      label: $t('system.dept.phone'),
      rules: 'required',
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
