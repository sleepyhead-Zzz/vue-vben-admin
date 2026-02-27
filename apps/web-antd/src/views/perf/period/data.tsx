import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';
import { getPopupContainer } from '@vben/utils';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'year',
    label: '年份',
  },
  {
    component: 'Input',
    fieldName: 'month',
    label: '月份',
  },
  {
    component: 'Input',
    fieldName: 'quarter',
    label: '季度',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: getDictOptions(DictEnum.PerfPeriodType),
    },
    fieldName: 'periodType',
    label: '周期类型',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'startDate',
    label: '周期开始日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    fieldName: 'endDate',
    label: '周期结束日期',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '周期主键ID',
    field: 'periodId',
  },
  {
    title: '年份',
    field: 'year',
  },
  {
    title: '月份',
    field: 'month',
  },
  {
    title: '季度',
    field: 'quarter',
  },
  {
    title: '周期类型',
    field: 'periodType',
    slots: {
      default: ({ row }) => {
        return renderDict(row.periodType, DictEnum.PerfPeriodType);
      },
    },
  },
  {
    title: '周期开始日期',
    field: 'startDate',
  },
  {
    title: '周期结束日期',
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
    label: '周期主键ID',
    fieldName: 'periodId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '年份',
    fieldName: 'year',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '月份',
    fieldName: 'month',
    component: 'Input',
  },
  {
    label: '季度',
    fieldName: 'quarter',
    component: 'Input',
  },
  {
    label: '周期类型',
    fieldName: 'periodType',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: getDictOptions(DictEnum.PerfPeriodType),
    },
    rules: 'selectRequired',
  },
  {
    label: '周期开始日期',
    fieldName: 'startDate',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    rules: 'required',
  },
  {
    label: '周期结束日期',
    fieldName: 'endDate',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    rules: 'required',
  },
];
