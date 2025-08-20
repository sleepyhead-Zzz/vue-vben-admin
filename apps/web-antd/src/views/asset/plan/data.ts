import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'planName',
    label: '计划名称',
  },
  {
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'startDate',
    label: '开始日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
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
    label: '周期间隔',
    componentProps: { placeholder: '如每2天、每3周、每1月' },
  },
  {
    component: 'Select',
    fieldName: 'weekdays',
    label: '周几执行',
    componentProps: {
      mode: 'multiple',
      placeholder: '请选择执行的星期',
      allowClear: true,
      options: [
        { label: '周一', value: '1' },
        { label: '周二', value: '2' },
        { label: '周三', value: '3' },
        { label: '周四', value: '4' },
        { label: '周五', value: '5' },
        { label: '周六', value: '6' },
        { label: '周日', value: '7' },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'monthDays',
    label: '月日执行',
    componentProps: {
      mode: 'multiple', // 支持多选
      allowClear: true,
      style: { width: '100%' },
      placeholder: '请选择每月执行的日期',
      options: Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}日`,
        value: String(i + 1),
      })),
    },
  },

  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_INSPECTION_PLAN_STATUS),
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
  { title: '巡检频率', field: 'frequency', width: 100 },
  { title: '周期间隔', field: 'intervalValue', width: 120 },
  { title: '周几执行', field: 'weekdays', minWidth: 120 },
  { title: '月日执行', field: 'monthDays', minWidth: 120 },
  {
    title: '位置类型',
    field: 'status',
    slots: {
      default: ({ row }) => {
        // 可选从DictEnum中获取 DictEnum.ASSET_LOCATION_TYPE 便于维护
        return renderDict(row.status, DictEnum.ASSET_INSPECTION_PLAN_STATUS);
      },
    },
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
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'startDate',
    label: '开始日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
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
    label: '周期间隔',
    componentProps: { placeholder: '如每2天、每3周、每1月' },
  },
  {
    component: 'Input',
    label: '巡检周期',
    fieldName: 'frequencyIntervalValue',
  },

  {
    component: 'Select',
    fieldName: 'weekdays',
    label: '周几执行',
    componentProps: {
      mode: 'multiple',
      placeholder: '请选择执行的星期',
      allowClear: true,
      options: [
        { label: '周一', value: '1' },
        { label: '周二', value: '2' },
        { label: '周三', value: '3' },
        { label: '周四', value: '4' },
        { label: '周五', value: '5' },
        { label: '周六', value: '6' },
        { label: '周日', value: '7' },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'monthDays',
    label: '月日执行',
    componentProps: {
      mode: 'multiple', // 支持多选
      allowClear: true,
      style: { width: '100%' },
      placeholder: '请选择每月执行的日期',
      options: Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}日`,
        value: String(i + 1),
      })),
    },
  },

  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_INSPECTION_PLAN_STATUS),
    },
    fieldName: 'status',
    label: '状态',
  },
];
