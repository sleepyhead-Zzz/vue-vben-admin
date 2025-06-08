import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'planName',
    label: '计划名称',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'startDate',
    label: '开始日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'endDate',
    label: '结束日期',
  },
  {
    component: 'Input',
    fieldName: 'frequency',
    label: '巡检频率',
  },
  {
    component: 'Input',
    fieldName: 'intervalValue',
    label: '每隔多少单位周期执行一次，如每2天、每3周、每1月',
  },
  {
    component: 'Input',
    fieldName: 'weekdays',
    label: '适用于weekly，1~7，逗号分隔，如1,3,5表示周一三五',
  },
  {
    component: 'Input',
    fieldName: 'monthDays',
    label: '适用于monthly，1~31，逗号分隔，如1,15',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '状态',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '',
    field: 'planId',
  },
  {
    title: '计划名称',
    field: 'planName',
  },
  {
    title: '开始日期',
    field: 'startDate',
  },
  {
    title: '结束日期',
    field: 'endDate',
  },
  {
    title: '巡检频率',
    field: 'frequency',
  },
  {
    title: '每隔多少单位周期执行一次，如每2天、每3周、每1月',
    field: 'intervalValue',
  },
  {
    title: '适用于weekly，1~7，逗号分隔，如1,3,5表示周一三五',
    field: 'weekdays',
  },
  {
    title: '适用于monthly，1~31，逗号分隔，如1,15',
    field: 'monthDays',
  },
  {
    title: '状态',
    field: 'status',
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
    fieldName: 'planId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '计划名称',
    fieldName: 'planName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '开始日期',
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
    label: '结束日期',
    fieldName: 'endDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '巡检频率',
    fieldName: 'frequency',
    component: 'Input',
  },
  {
    label: '每隔多少单位周期执行一次，如每2天、每3周、每1月',
    fieldName: 'intervalValue',
    component: 'Input',
  },
  {
    label: '适用于weekly，1~7，逗号分隔，如1,3,5表示周一三五',
    fieldName: 'weekdays',
    component: 'Input',
  },
  {
    label: '适用于monthly，1~31，逗号分隔，如1,15',
    fieldName: 'monthDays',
    component: 'Input',
  },
  {
    label: '状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
];
