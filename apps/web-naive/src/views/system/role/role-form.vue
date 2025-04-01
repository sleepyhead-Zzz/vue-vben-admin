<script lang="ts" setup>
import type { AddRoleCommand, RoleDTO, UpdateRoleCommand } from '#/apis';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NTreeSelect, useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import { ApiService } from '#/apis';

async function onSubmit(values: Record<string, any>) {
  if (values.roleId) {
    const formData: UpdateRoleCommand = {
      roleId: values.roleId,
      roleName: values.roleName,
      roleKey: values.roleKey,
      roleSort: values.roleSort,
      status: values.status,
      dataScope: values.dataScope,
      menuIds: values.selectedMenuList,
      remark: values.remark,
    };
    await ApiService.editRole(values.roleId, formData);
  } else {
    const formData: AddRoleCommand = {
      roleName: values.roleName,
      roleKey: values.roleKey,
      roleSort: values.roleSort,
      status: values.status,
      dataScope: values.dataScope,
      menuIds: values.selectedMenuList,
      remark: values.remark,
    };
    await ApiService.addRole(formData);
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
      fieldName: 'roleId',
      label: $t('system.role.id'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.role.input_name'),
      },
      fieldName: 'roleName',
      label: $t('system.role.name'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.role.input_roleKey'),
      },
      fieldName: 'roleKey',
      label: $t('system.role.roleKey'),
      rules: 'required',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: $t('system.role.input_sort'),
      },
      fieldName: 'roleSort',
      label: $t('system.role.sort'),
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
      fieldName: 'selectedMenuList',
      label: '菜单权限',
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
interface Menu {
  label: string;
  menuId: number;
  parentId: number;
  children?: Menu[];
}

let options: Menu[] = [];
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
      const roleData = modalApi.getData<Record<string, RoleDTO>>().roleData;

      if (roleData) {
        formApi.setValues(roleData);
      }
      // @ts-ignore
      const { data }: { data: Menu[] } = await ApiService.dropdownList();
      options = data;
      const title = roleData ? $t('system.role.edit') : $t('system.role.add');
      modalApi.setState({ title });
    }
  },
});
</script>
<template>
  <Modal>
    <Form>
      <template #selectedMenuList="slotProps">
        <NTreeSelect
          v-bind="slotProps"
          :options="options"
          cascade
          check-strategy="all"
          checkable
          children-field="children"
          key-field="menuId"
          label-field="label"
          multiple
        />
      </template>
    </Form>
  </Modal>
</template>
