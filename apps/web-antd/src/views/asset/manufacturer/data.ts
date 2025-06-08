import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'manufacturerName',
    label: '厂商名称',
  },
  {
    component: 'Input',
    fieldName: 'manufacturerPeople',
    label: '厂商联系人',
  },
  {
    component: 'Input',
    fieldName: 'manufacturerContact',
    label: '联系方式',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '生产厂商ID',
    field: 'manufacturerId',
  },
  {
    title: '厂商名称',
    field: 'manufacturerName',
  },
  {
    title: '厂商联系人',
    field: 'manufacturerPeople',
  },
  {
    title: '联系方式',
    field: 'manufacturerContact',
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
    label: '生产厂商ID',
    fieldName: 'manufacturerId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '厂商名称',
    fieldName: 'manufacturerName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '厂商联系人',
    fieldName: 'manufacturerPeople',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '联系方式',
    fieldName: 'manufacturerContact',
    component: 'Input',
  },
];
