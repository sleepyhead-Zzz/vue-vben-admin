import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'customerId',
    label: '客户ID',
  },
  {
    component: 'Input',
    fieldName: 'userId',
    label: '销售人员ID',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'startDate',
    label: '归属开始日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'endDate',
    label: '归属结束日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: 'todo',
    field: 'id',
  },
  {
    title: '客户ID',
    field: 'customerId',
  },
  {
    title: '销售人员ID',
    field: 'userId',
  },
  {
    title: '归属开始日期',
    field: 'startDate',
  },
  {
    title: '归属结束日期',
    field: 'endDate',
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
    label: 'todo',
    fieldName: 'id',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '客户ID',
    fieldName: 'customerId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '销售人员ID',
    fieldName: 'userId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '归属开始日期',
    fieldName: 'startDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    rules: 'required',
  },
  {
    label: '归属结束日期',
    fieldName: 'endDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
