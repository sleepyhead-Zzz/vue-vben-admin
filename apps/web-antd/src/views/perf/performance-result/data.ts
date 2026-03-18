import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    fieldName: 'userId',
    label: '人员',
  },
  {
    component: 'Select',
    fieldName: 'periodId',
    label: '周期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  {
    title: '结果ID',
    field: 'performanceId',
    minWidth: 180,
    visible: false,
  },
  {
    title: '人员ID',
    field: 'userId',
    minWidth: 160,
    visible: false,
  },
  {
    title: '人员姓名',
    field: 'userName',
    minWidth: 160,
  },
  {
    title: '周期ID',
    field: 'periodId',
    minWidth: 160,
    visible: false,
  },
  {
    title: '周期名称',
    field: 'periodName',
    minWidth: 160,
  },
  {
    title: '销量得分',
    field: 'salesScore',
    minWidth: 120,
  },
  {
    title: '利润得分',
    field: 'profitScore',
    minWidth: 120,
  },
  {
    title: '重点工作得分',
    field: 'keyTaskScore',
    minWidth: 140,
  },
  {
    title: '内部管理得分',
    field: 'managementScore',
    minWidth: 140,
  },
  {
    title: '新客户得分',
    field: 'newCustomerScore',
    minWidth: 130,
  },
  {
    title: '最终绩效总分',
    field: 'finalScore',
    minWidth: 140,
  },
  {
    title: '绩效计算时间',
    field: 'calculatedAt',
    minWidth: 180,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 120,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '结果ID',
    fieldName: 'performanceId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '人员ID',
    fieldName: 'userId',
    component: 'Input',
  },
  {
    label: '周期ID',
    fieldName: 'periodId',
    component: 'Input',
  },
  {
    label: '销量得分（销量完成情况）',
    fieldName: 'salesScore',
    component: 'Input',
  },
  {
    label: '利润得分（利润完成情况）',
    fieldName: 'profitScore',
    component: 'Input',
  },
  {
    label: '重点工作得分（季度重点工作）',
    fieldName: 'keyTaskScore',
    component: 'Input',
  },
  {
    label: '内部管理得分（周报/执行力/逾期等）',
    fieldName: 'managementScore',
    component: 'Input',
  },
  {
    label: '新客户得分（新客开发）',
    fieldName: 'newCustomerScore',
    component: 'Input',
  },
  {
    label: '最终绩效总分（综合）',
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
