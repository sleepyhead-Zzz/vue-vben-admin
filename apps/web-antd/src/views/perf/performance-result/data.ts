import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userId',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'periodId',
    label: '',
  },
  {
    component: 'Input',
    fieldName: 'salesScore',
    label: '销量得分',
  },
  {
    component: 'Input',
    fieldName: 'profitScore',
    label: '利润得分',
  },
  {
    component: 'Input',
    fieldName: 'keyTaskScore',
    label: '重点工作得分',
  },
  {
    component: 'Input',
    fieldName: 'managementScore',
    label: '内部管理得分',
  },
  {
    component: 'Input',
    fieldName: 'newCustomerScore',
    label: '新客户得分',
  },
  {
    component: 'Input',
    fieldName: 'finalScore',
    label: '最终绩效总分',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'calculatedAt',
    label: '绩效计算时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'performanceId',
  },
  {
    title: '',
    field: 'userId',
  },
  {
    title: '',
    field: 'periodId',
  },
  {
    title: '销量得分',
    field: 'salesScore',
  },
  {
    title: '利润得分',
    field: 'profitScore',
  },
  {
    title: '重点工作得分',
    field: 'keyTaskScore',
  },
  {
    title: '内部管理得分',
    field: 'managementScore',
  },
  {
    title: '新客户得分',
    field: 'newCustomerScore',
  },
  {
    title: '最终绩效总分',
    field: 'finalScore',
  },
  {
    title: '绩效计算时间',
    field: 'calculatedAt',
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
    label: '',
    fieldName: 'performanceId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '',
    fieldName: 'userId',
    component: 'Input',
  },
  {
    label: '',
    fieldName: 'periodId',
    component: 'Input',
  },
  {
    label: '销量得分',
    fieldName: 'salesScore',
    component: 'Input',
  },
  {
    label: '利润得分',
    fieldName: 'profitScore',
    component: 'Input',
  },
  {
    label: '重点工作得分',
    fieldName: 'keyTaskScore',
    component: 'Input',
  },
  {
    label: '内部管理得分',
    fieldName: 'managementScore',
    component: 'Input',
  },
  {
    label: '新客户得分',
    fieldName: 'newCustomerScore',
    component: 'Input',
  },
  {
    label: '最终绩效总分',
    fieldName: 'finalScore',
    component: 'Input',
  },
  {
    label: '绩效计算时间',
    fieldName: 'calculatedAt',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
