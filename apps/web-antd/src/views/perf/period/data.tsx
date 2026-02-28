import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';
import { getPopupContainer } from '@vben/utils';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'InputNumber',
    fieldName: 'year',
    label: '年份',
  },
  {
    component: 'Select',
    fieldName: 'periodType',
    label: '周期类型',
    componentProps: {
      getPopupContainer,
      options: getDictOptions(DictEnum.PerfPeriodType),
    },
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
    title: '周期区间',
    field: 'periodRange',
    slots: {
      default: ({ row }) => `${row.startDate} ~ ${row.endDate}`,
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
    label: 'ID',
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
    component: 'InputNumber',
    rules: 'required',
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
    dependencies: {
      triggerFields: ['periodType'],
      onChange: ({ periodType }, form) => {
        if (periodType === '1') {
          form.setFieldsValue({
            month: undefined,
            quarter: undefined,
          });
        }
        if (periodType === '2') {
          form.setFieldsValue({
            quarter: undefined,
          });
        }
        if (periodType === '3') {
          form.setFieldsValue({
            month: undefined,
          });
        }
      },
    },
  },
  {
    label: '月份',
    fieldName: 'month',
    component: 'Select',
    componentProps: {
      options: Array.from({ length: 12 }).map((_, i) => ({
        label: `${i + 1}月`,
        value: i + 1,
      })),
    },
    dependencies: {
      triggerFields: ['periodType'],
      show: ({ periodType }) => periodType === '2',
    },
  },
  {
    label: '季度',
    fieldName: 'quarter',
    component: 'Select',
    componentProps: {
      options: [
        { label: '第一季度', value: 1 },
        { label: '第二季度', value: 2 },
        { label: '第三季度', value: 3 },
        { label: '第四季度', value: 4 },
      ],
    },
    dependencies: {
      triggerFields: ['periodType'],
      show: ({ periodType }) => periodType === '3',
    },
  },
];
