<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NTreeSelect, useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import {
  type AddMenuCommand,
  ApiService,
  type MenuDetailDTO,
  type RouterMeta,
  type UpdateMenuCommand,
} from '#/apis';

const allMenu = ref();
async function onSubmit(values: Record<string, any>) {
  const metaData: RouterMeta = {
    icon: values.icon,
    title: values.title,
    order: values.order,
    affixTab: values.affixTab,
    iframeSrc: values.iframeSrc,
    keepAlive: values.keepAlive,
    link: values.link,
  };
  if (values.id) {
    const formData: UpdateMenuCommand = {
      menuId: values.id,
      parentId: values.parentId,
      remark: values.remark,
      menuName: values.name,
      menuType: values.menuType,
      component: values.component,
      path: values.path,
      redirect: values.redirect,
      permission: values.permission,
      status: values.status,
      meta: metaData,
    };
    await ApiService.edit3(formData.menuId, formData);
  } else {
    const formData: AddMenuCommand = {
      parentId: values.parentId,
      remark: values.remark,
      menuName: values.name,
      menuType: values.menuType,
      component: values.component,
      path: values.path,
      redirect: values.redirect,
      permission: values.permission,
      status: values.status,
      meta: metaData,
    };
    await ApiService.add3(formData);
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
      fieldName: 'id',
      label: $t('system.menu.id'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_menu_name'),
      },
      fieldName: 'remark',
      label: $t('system.menu.name'),
      rules: 'required',
    },
    {
      component: 'TreeSelectCustomize',
      fieldName: 'parentId',
      label: $t('system.menu.parent'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_router_name'),
      },
      dependencies: {
        if(values) {
          return values.menuType !== 5;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'name',
      label: $t('system.menu.router_name'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_component'),
      },
      dependencies: {
        if(values) {
          return values.menuType !== 5;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'component',
      label: $t('system.menu.component'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_path'),
      },
      dependencies: {
        if(values) {
          return values.menuType !== 5;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'path',
      label: $t('system.menu.path'),
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '页面', value: 1 },
          { label: '目录', value: 2 },
          { label: 'iFrame', value: 3 },
          { label: '外部网站', value: 4 },
          { label: '按钮', value: 5 },
        ],
        placeholder: $t('system.menu.select'),
      },
      fieldName: 'menuType',
      label: $t('system.menu.type'),
      rules: 'required',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto',
      },
      defaultValue: true,
      fieldName: 'status',
      label: $t('system.menu.active'),
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto',
      },
      dependencies: {
        if(values) {
          return values.menuType === 1 || values.menuType === 2;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'keepAlive',
      label: $t('system.menu.keepAlive'),
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto',
      },
      dependencies: {
        if(values) {
          return values.menuType === 1;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'affixTab',
      label: $t('system.menu.affixTab'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_iframe_url'),
      },
      dependencies: {
        if(values) {
          return values.menuType === 3;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'iframeSrc',
      label: $t('system.menu.iframe'),
      // rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_order'),
      },
      dependencies: {
        if(values) {
          return values.menuType === 1 || values.menuType === 2;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'order',
      label: $t('system.menu.order'),
      // rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_iframe_url'),
      },
      dependencies: {
        if(values) {
          return values.menuType === 3;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'iframeSrc',
      label: $t('system.menu.iframe'),
      // rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_link'),
      },
      dependencies: {
        if(values) {
          return values.menuType === 4;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'link',
      label: $t('system.menu.link'),
      // rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_redirect'),
      },
      dependencies: {
        if(values) {
          return values.menuType === 2;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'redirect',
      label: $t('system.menu.redirect'),
      // rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_permission'),
      },
      fieldName: 'permission',
      label: $t('system.menu.permission'),
      rules: '',
    },
    {
      component: 'Input',

      fieldName: 'icon',
      label: $t('system.menu.icon'),
      // rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_title'),
      },
      dependencies: {
        if(values) {
          return values.menuType !== 5;
        },
        triggerFields: ['menuType'],
      },
      fieldName: 'title',
      label: $t('system.menu.menu_title'),
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
      const { data } = await ApiService.dropdownList();
      allMenu.value = data;
      const menuData =
        modalApi.getData<Record<string, MenuDetailDTO>>().menuData;
      if (menuData) {
        formApi.setValues(menuData.value);
      }
      const title = menuData ? $t('system.menu.edit') : $t('system.menu.add');
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
          :options="allMenu"
          children-field="children"
          key-field="menuId"
          label-field="label"
        />
      </template>
    </Form>
  </Modal>
</template>
