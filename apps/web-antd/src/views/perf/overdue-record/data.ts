import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

const overdueLevelOptions = [
  { label: '0-10天', value: '0_10' },
  { label: '11-30天', value: '11_30' },
  { label: '31-59天', value: '31_59' },
  { label: '60-90天', value: '60_90' },
  { label: '90天以上', value: '90_plus' },
];

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userName',
    label: '销售人员',
  },
  {
    component: 'Input',
    fieldName: 'customerName',
    label: '客户',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    fieldName: 'periodId',
    label: '绩效周期',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: overdueLevelOptions,
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    fieldName: 'overdueLevel',
    label: '逾期区间',
  },
  {
    component: 'InputNumber',
    componentProps: {
      precision: 2,
    },
    fieldName: 'scoreValue',
    label: '最终扣分值',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '记录ID',
    field: 'overdueId',
    visible: false,
  },
  {
    title: '销售人员ID',
    field: 'userId',
    visible: false,
  },
  {
    title: '销售人员',
    field: 'userName',
    formatter({ row }) {
      return row.userName || row.userId || '-';
    },
  },
  {
    title: '客户ID',
    field: 'customerId',
    visible: false,
  },
  {
    title: '客户',
    field: 'customerName',
    formatter({ row }) {
      return row.customerName || row.customerId || '-';
    },
  },
  {
    title: '绩效周期ID',
    field: 'periodId',
    visible: false,
  },
  {
    title: '绩效周期',
    field: 'periodName',
    formatter({ row }) {
      return row.periodName || row.periodId || '-';
    },
  },
  {
    title: '逾期区间',
    field: 'overdueLevel',
    formatter({ row }) {
      return (
        overdueLevelOptions.find((item) => item.value === row.overdueLevel)
          ?.label ||
        row.overdueLevel ||
        '-'
      );
    },
  },
  {
    title: '最终扣分值',
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
    fieldName: 'overdueId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '销售人员',
    fieldName: 'userId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    rules: 'selectRequired',
  },
  {
    label: '客户',
    fieldName: 'customerId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    rules: 'selectRequired',
  },
  {
    label: '绩效周期',
    fieldName: 'periodId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    rules: 'selectRequired',
  },
  {
    label: '逾期区间',
    fieldName: 'overdueLevel',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: overdueLevelOptions,
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
    rules: 'selectRequired',
  },
  {
    label: '最终扣分值',
    fieldName: 'scoreValue',
    component: 'InputNumber',
    componentProps: {
      precision: 2,
    },
    rules: 'required',
  },
];
