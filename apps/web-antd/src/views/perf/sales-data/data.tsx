import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getPopupContainer } from '@vben/utils';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    fieldName: 'productId',
    label: '产品编码',
  },
  {
    component: 'Select',
    fieldName: 'userId',
    label: '销售业务经理',
  },
  {
    label: '归属绩效周期',
    fieldName: 'periodId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '数据ID',
    field: 'saleId',
    visible: false,
  },
  {
    title: '销售人员ID',
    field: 'userId',
    visible: false,
  },
  {
    title: '业务经理姓名',
    field: 'userName',
  },
  {
    title: '客户ID',
    field: 'customerId',
    visible: false,
  },
  {
    title: '客户名称',
    field: 'customerName',
  },
  {
    title: '产品编码',
    field: 'productId',
    visible: false,
  },
  {
    title: '产品编码',
    field: 'productName',
  },
  {
    title: '销售数量',
    field: 'quantity',
  },
  {
    title: '交货单号码',
    field: 'deliveryNo',
  },
  {
    title: '批次',
    field: 'batchNo',
  },
  {
    title: '交货单创建日期',
    field: 'orderDate',
  },
  {
    title: '归属绩效周期ID',
    field: 'periodId',
    visible: false,
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
    fieldName: 'saleId',
    component: 'Input',
    disabled: true,
  },
  {
    label: '销售人员',
    fieldName: 'userId',
    component: 'Input',
  },
  {
    label: '客户',
    fieldName: 'customerId',
    component: 'Input',
  },
  {
    label: '产品',
    fieldName: 'productId',
    component: 'Input',
  },
  {
    label: '销售数量',
    fieldName: 'quantity',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '交货单号码',
    fieldName: 'deliveryNo',
    component: 'Input',
  },
  {
    label: '批次',
    fieldName: 'batchNo',
    component: 'Input',
  },
  {
    label: '交货单创建日期',
    fieldName: 'orderDate',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    rules: 'required',
  },
  {
    label: '归属绩效周期',
    fieldName: 'periodId',
    component: 'Select',
    componentProps: {
      getPopupContainer,
      options: [],
      optionFilterProp: 'label',
      optionLabelProp: 'label',
      showSearch: true,
    },
  },
];
