import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    fieldName: 'userId',
    label: '销售人员',
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
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: 'ID',
    field: 'taskId',
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
    title: '重点工作平均得分',
    field: 'scoreValue',
  },
  {
    title: 'Q1得分',
    field: 'q1Score',
  },
  {
    title: 'Q2得分',
    field: 'q2Score',
  },
  {
    title: 'Q3得分',
    field: 'q3Score',
  },
  {
    title: 'Q4得分',
    field: 'q4Score',
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
    fieldName: 'taskId',
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
    label: '重点工作平均得分',
    fieldName: 'scoreValue',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
    },
  },
  {
    label: 'Q1得分',
    fieldName: 'q1Score',
    component: 'InputNumber',
  },
  {
    label: 'Q2得分',
    fieldName: 'q2Score',
    component: 'InputNumber',
  },
  {
    label: 'Q3得分',
    fieldName: 'q3Score',
    component: 'InputNumber',
  },
  {
    label: 'Q4得分',
    fieldName: 'q4Score',
    component: 'InputNumber',
  },
];
