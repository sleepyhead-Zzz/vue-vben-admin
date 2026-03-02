import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userName',
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
    fieldName: 'productId',
    label: '产品',
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
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
    },
    fieldName: 'planProfit',
    label: '计划利润金额',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '计划ID',
    field: 'id',
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
    title: '产品ID',
    field: 'productId',
    visible: false,
  },
  {
    title: '产品',
    field: 'productName',
    formatter({ row }) {
      return row.productName || row.productId || '-';
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
    title: '计划利润金额',
    field: 'planProfit',
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
    label: '计划ID',
    fieldName: 'planId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
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
    fieldName: 'userId',
    label: '销售人员',
    rules: 'selectRequired',
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
    fieldName: 'productId',
    label: '产品',
    rules: 'selectRequired',
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
    rules: 'selectRequired',
  },
  {
    label: '销售人员名称',
    fieldName: 'userName',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '产品名称',
    fieldName: 'productName',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '绩效周期名称',
    fieldName: 'periodName',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '计划利润金额',
    fieldName: 'planProfit',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
    },
    rules: 'required',
  },
];
