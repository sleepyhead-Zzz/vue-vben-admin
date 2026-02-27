import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'productName',
    label: '产品名称',
  },
  {
    component: 'Input',
    fieldName: 'category',
    label: '产品分类',
  },
  {
    component: 'Select',
    fieldName: 'isActive',
    label: '是否启用',
    componentProps: {
      getPopupContainer,
      options: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '停用',
          value: false,
        },
      ],
    },
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '产品编码',
    field: 'productCode',
  },
  {
    title: '产品名称',
    field: 'productName',
  },
  {
    title: '产品分类',
    field: 'category',
  },
  {
    title: '是否启用',
    field: 'isActive',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '产品编码',
    fieldName: 'productCode',
    component: 'Input',
  },
  {
    label: '产品名称',
    fieldName: 'productName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '产品分类',
    fieldName: 'category',
    component: 'Input',
  },
  {
    component: 'Select',
    fieldName: 'isActive',
    label: '是否启用',
    componentProps: {
      getPopupContainer,
      options: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '停用',
          value: false,
        },
      ],
    },
  },
];
