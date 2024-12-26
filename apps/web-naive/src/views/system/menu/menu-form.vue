<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import {
  type AddMenuCommand,
  ApiService,
  type MenuDetailDTO,
  type RouterMeta,
} from '#/apis';

async function onSubmit(values: Record<string, any>) {
  const metaData: RouterMeta = {
    icon: values.icon,
    title: values.title,
  };
  const formData: AddMenuCommand = {
    parentId: values.parentId,
    remark: values.remark,
    menuName: values.menuName,
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

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
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
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_router_name'),
      },
      fieldName: 'menuName',
      label: $t('system.menu.router_name'),
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_component'),
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
      fieldName: 'switch',
      label: $t('system.menu.active'),
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'w-auto',
      },
      fieldName: 'keepAlive',
      label: $t('system.menu.keepAlive'),
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
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.menu.input_title'),
      },
      fieldName: 'title',
      label: $t('system.menu.menu_title'),
      rules: 'required',
    },
    // {
    //   component: 'ApiTreeSelect',
    //   // 对应组件的参数
    //   componentProps: {
    //     // 菜单接口
    //     api: getAllMenusApi,
    //     childrenField: 'children',
    //     // 菜单接口转options格式
    //     labelField: 'name',
    //     valueField: 'path',
    //   },
    //   // 字段名
    //   fieldName: 'apiTree',
    //   // 界面显示的label
    //   label: 'ApiTreeSelect',
    // },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const menuData = modalApi.getData<Record<string, MenuDetailDTO>>();
      if (menuData) {
        formApi.setValues(menuData.value);
      }
    }
  },
  title: $t('system.menu.add'),
});
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
