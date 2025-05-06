import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'postCode',
    label: '岗位编码',
  },
  {
    component: 'Input',
    fieldName: 'postName',
    label: '岗位名称',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
    fieldName: 'status',
    label: '状态',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '岗位编码',
    field: 'postCode',
  },
  {
    title: '类别编码',
    field: 'postCategory',
  },
  {
    title: '岗位名称',
    field: 'postName',
  },
  {
    title: '排序',
    field: 'postSort',
  },
  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        const statusMap = {
          '0': '启用',
          '1': '禁用',
        };
        return statusMap[row.status] || '';
      },
    },
  },

  {
    title: '创建时间',
    field: 'createTime',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
    fieldName: 'postId',
    label: 'postId',
  },
  {
    component: 'TreeSelect',
    componentProps: {
      getPopupContainer,
    },
    fieldName: 'deptId',
    label: '所属部门',
    rules: 'selectRequired',
  },
  {
    component: 'Input',
    fieldName: 'postName',
    label: '岗位名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'postCode',
    label: '岗位编码',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'postCategory',
    label: '类别编码',
  },
  {
    component: 'InputNumber',
    fieldName: 'postSort',
    label: '岗位排序',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
      optionType: 'button',
    },
    defaultValue: '0',
    fieldName: 'status',
    label: '岗位状态',
    rules: 'required',
  },

  {
    component: 'Textarea',
    fieldName: 'remark',
    formItemClass: 'items-start',
    label: '备注',
  },
];
