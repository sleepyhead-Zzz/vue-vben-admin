import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userId',
    label: '销售人员ID',
  },
  {
    component: 'Input',
    fieldName: 'customerId',
    label: '客户ID',
  },
  {
    component: 'Input',
    fieldName: 'periodId',
    label: '绩效周期ID',
  },
  {
    component: 'InputNumber',
    componentProps: {
      precision: 2,
    },
    fieldName: 'scoreValue',
    label: '新客户得分',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '记录ID',
    field: 'newCustomerId',
    visible: false,
  },
  {
    title: '销售人员ID',
    field: 'userId',
  },
  {
    title: '客户ID',
    field: 'customerId',
  },
  {
    title: '绩效周期ID',
    field: 'periodId',
  },
  {
    title: '新客户得分',
    field: 'scoreValue',
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
    label: '记录ID',
    fieldName: 'newCustomerId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '销售人员',
    fieldName: 'userId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '客户',
    fieldName: 'customerId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '绩效周期',
    fieldName: 'periodId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '新客户得分',
    fieldName: 'scoreValue',
    component: 'InputNumber',
    componentProps: {
      precision: 2,
    },
    rules: 'required',
  },
];
