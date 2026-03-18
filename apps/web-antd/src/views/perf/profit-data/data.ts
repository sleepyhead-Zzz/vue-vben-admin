import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

export const querySchema: FormSchemaGetter = () => [
  // 变成远程搜索
  {
    component: 'Select',
    fieldName: 'userId',
    label: '销售人员',
  },
  // 变成远程搜索
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
  // 变成远程搜索
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
    title: '数据ID',
    field: 'profitId',
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
    title: '产品编码',
    field: 'productId',
    visible: false,
  },
  {
    title: '产品名称',
    field: 'productName',
    formatter({ row }) {
      return row.productName || row.productId || '-';
    },
  },
  {
    title: '净利润金额',
    field: 'netProfit',
  },
  {
    title: '订单日期',
    field: 'orderDate',
  },
  {
    title: '归属绩效周期ID',
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
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 180,
  },
];

export const modalSchema: FormSchemaGetter = () => [
  {
    label: '数据ID',
    fieldName: 'profitId',
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
    label: '销售人员名称',
    fieldName: 'userName',
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
  },

  {
    label: '净利润金额',
    fieldName: 'netProfit',
    component: 'InputNumber',
    componentProps: {
      min: 0,
      precision: 2,
    },
    rules: 'required',
  },
  {
    label: '订单日期',
    fieldName: 'orderDate',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    rules: 'required',
  },
];
