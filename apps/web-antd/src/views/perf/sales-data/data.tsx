import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'userId',
    label: '销售人员ID',
  },
  {
    component: 'Input',
    fieldName: 'customerId',
    label: '客户ID',
  },
  {
    component: 'Input',
    fieldName: 'productCode',
    label: '产品编码',
  },
  {
    component: 'Input',
    fieldName: 'quantity',
    label: '销售数量',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'orderDate',
    label: '交货单创建日期',
  },
  {
    component: 'Input',
    fieldName: 'periodId',
    label: '归属绩效周期ID',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '数据ID',
    field: 'saleId',
  },
  {
    title: '销售人员ID',
    field: 'userId',
  },
  {
    title: '客户ID',
    field: 'customerId',
  },
  {
    title: '产品编码',
    field: 'productCode',
  },
  {
    title: '销售数量',
    field: 'quantity',
  },
  {
    title: '交货单创建日期',
    field: 'orderDate',
  },
  {
    title: '归属绩效周期ID',
    field: 'periodId',
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
    label: '销售人员ID',
    fieldName: 'userId',
    component: 'Input',
  },
  {
    label: '客户ID',
    fieldName: 'customerId',
    component: 'Input',
  },
  {
    label: '产品编码',
    fieldName: 'productCode',
    component: 'Input',
  },
  {
    label: '销售数量',
    fieldName: 'quantity',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '交货单创建日期',
    fieldName: 'orderDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    rules: 'required',
  },
  {
    label: '归属绩效周期ID',
    fieldName: 'periodId',
    component: 'Input',
  },
];
