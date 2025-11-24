import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'planId',
    label: '来源巡检计划ID',
  },
  {
    component: 'Input',
    fieldName: 'taskName',
    label: '任务名称',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'status',
    label: '任务状态',
  },
  {
    component: 'Input',
    fieldName: 'assignDeptId',
    label: '指派给的部门ID',
  },
  {
    component: 'Input',
    fieldName: 'assignUserId',
    label: '指派给的负责人ID',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'executeDeadline',
    label: '任务截止时间',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '巡检任务ID',
    field: 'taskId',
  },
  {
    title: '来源巡检计划ID',
    field: 'planId',
  },
  {
    title: '任务名称',
    field: 'taskName',
  },
  {
    title: '任务状态',
    field: 'status',
  },
  {
    title: '指派给的部门ID',
    field: 'assignDeptId',
  },
  {
    title: '指派给的负责人ID',
    field: 'assignUserId',
  },
  {
    title: '任务截止时间',
    field: 'executeDeadline',
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
    label: '巡检任务ID',
    fieldName: 'taskId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '来源巡检计划ID',
    fieldName: 'planId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '任务名称',
    fieldName: 'taskName',
    component: 'Input',
  },
  {
    label: '任务状态',
    fieldName: 'status',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '指派给的部门ID',
    fieldName: 'assignDeptId',
    component: 'Input',
  },
  {
    label: '指派给的负责人ID',
    fieldName: 'assignUserId',
    component: 'Input',
  },
  {
    label: '任务截止时间',
    fieldName: 'executeDeadline',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
