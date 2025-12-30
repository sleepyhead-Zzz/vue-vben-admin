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
    component: 'Select',
    fieldName: 'frequency',
    label: '巡检频率',
    defaultValue: undefined,
    componentProps: {
      placeholder: '请选择巡检周期',
      options: [
        { label: '天', value: 1 },
        { label: '周', value: 2 },
        { label: '月', value: 3 },
      ],
    },
    dependencies: {
      show: () => true,
      triggerFields: [''],
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
    visible: false,
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
    formatter: ({ cellValue }) => {
      if (cellValue === 1) return '天';
      if (cellValue === 2) return '周';
      if (cellValue === 3) return '月';
      return cellValue ?? '-';
    },
  },
  {
    title: '周期间隔',
    field: 'intervalValue',
  },
  {
    title: '周几执行',
    field: 'weekdayList',

    formatter: ({ cellValue }) => {
      if (!cellValue || cellValue.length === 0) return '-';
      const map: Record<string, string> = {
        '1': '周一',
        '2': '周二',
        '3': '周三',
        '4': '周四',
        '5': '周五',
        '6': '周六',
        '7': '周日',
      };
      return cellValue.map((v: string) => map[v] || v).join('、');
    },
  },
  {
    title: '月日执行',
    field: 'monthDayList',
    formatter: ({ cellValue }) => {
      if (!cellValue || cellValue.length === 0) return '-';
      return cellValue.map((d: string) => `${d}日`).join('、');
    },
  },

  {
    title: '状态',
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
    width: 240,
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
    label: '',
    fieldName: 'jobId',
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
    component: 'TreeSelect',
    defaultValue: undefined,
    fieldName: 'deptId',
    label: '执行部门',
    rules: 'selectRequired',
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
    component: 'Select',
    fieldName: 'frequency',
    label: '巡检频率',
    componentProps: {
      placeholder: '请选择巡检周期',
      options: [
        { label: '天', value: 1 },
        { label: '周', value: 2 },
        { label: '月', value: 3 },
      ],
    },
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },

  {
    component: 'Input',
    fieldName: 'intervalValue',
    label: '周期间隔',
    componentProps: { placeholder: '如每2天、每3周、每1月' },
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    component: 'Input',
    label: '巡检周期',
    fieldName: 'frequencyIntervalValue',
  },
  {
    component: 'Select',
    fieldName: 'weekdayList',
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
    dependencies: {
      show(values) {
        return values.frequency === 2;
      },
      triggerFields: ['frequency'],
    },
  },
  {
    component: 'Select',
    fieldName: 'monthDayList',
    label: '月日执行',
    componentProps: {
      mode: 'multiple',
      allowClear: true,
      style: { width: '100%' },
      placeholder: '请选择每月执行的日期',
      options: Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}日`,
        value: String(i + 1),
      })),
    },
    dependencies: {
      show(values) {
        return values.frequency === 3;
      },
      triggerFields: ['frequency'],
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
