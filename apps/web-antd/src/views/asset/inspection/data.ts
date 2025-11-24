import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'planId',
    label: '关联的巡检方案ID',
  },
  {
    component: 'Input',
    fieldName: 'taskId',
    label: '巡检状态',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'startDate',
    label: '巡检实际开始时间',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'endDate',
    label: '巡检实际结束时间',
  },
  {
    component: 'Input',
    fieldName: 'description',
    label: '巡检结果简述',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '巡检记录ID',
    field: 'inspectionId',
  },
  {
    title: '关联的巡检方案ID',
    field: 'planId',
  },
  {
    title: '巡检状态',
    field: 'status',
  },
  {
    title: '巡检实际开始时间',
    field: 'startDate',
  },
  {
    title: '巡检实际结束时间',
    field: 'endDate',
  },
  {
    title: '巡检结果简述',
    field: 'description',
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
    label: '巡检记录ID',
    fieldName: 'inspectionId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '关联的巡检方案ID',
    fieldName: 'planId',
    component: 'Input',
  },
  {
    label: '巡检任务ID',
    fieldName: 'taskId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '巡检状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '巡检实际开始时间',
    fieldName: 'startDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '巡检实际结束时间',
    fieldName: 'endDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '巡检结果简述',
    fieldName: 'description',
    component: 'Input',
  },
];
