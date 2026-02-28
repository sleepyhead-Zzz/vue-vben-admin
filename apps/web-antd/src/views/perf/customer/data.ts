import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'customerCode',
    label: '客户编码',
  },
  {
    component: 'Input',
    fieldName: 'customerName',
    label: '客户名称',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'firstOrderDate',
    label: '客户首次成交日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '客户主键ID',
    field: 'customerId',
  },
  {
    title: '客户编码',
    field: 'customerCode',
  },
  {
    title: '客户名称',
    field: 'customerName',
  },
  {
    title: '客户首次成交日期',
    field: 'firstOrderDate',
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
    label: '客户主键ID',
    fieldName: 'customerId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '客户编码',
    fieldName: 'customerCode',
    component: 'Input',
  },
  {
    label: '客户名称',
    fieldName: 'customerName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '客户首次成交日期',
    fieldName: 'firstOrderDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
