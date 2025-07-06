import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'documentDate',
    label: '单据日期',
  },
  {
    component: 'Input',
    fieldName: 'assetCode',
    label: '资产编号',
  },
  {
    component: 'Input',
    fieldName: 'assetCategory',
    label: '资产国标大类名称',
  },
  {
    component: 'Input',
    fieldName: 'assetName',
    label: '资产名称',
  },
  {
    component: 'Input',
    fieldName: 'brandModel',
    label: '厂牌型号',
  },
  {
    component: 'Input',
    fieldName: 'unit',
    label: '计量单位',
  },
  {
    component: 'Input',
    fieldName: 'quantity',
    label: '数量',
  },
  {
    component: 'Input',
    fieldName: 'acquisitionMethod',
    label: '取得方式',
  },
  {
    component: 'Input',
    fieldName: 'manageDept',
    label: '管理部门',
  },
  {
    component: 'Input',
    fieldName: 'userName',
    label: '使用人',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'acquisitionDate',
    label: '取得日期',
  },
  {
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    fieldName: 'usageDate',
    label: '使用日期',
  },
  {
    component: 'Input',
    fieldName: 'locationName',
    label: '存放地点',
  },
  {
    component: 'Input',
    fieldName: 'usageCategory',
    label: '用途分类',
  },
  {
    component: 'Input',
    fieldName: 'valueType',
    label: '价值类型',
  },
  {
    component: 'Input',
    fieldName: 'originalValue',
    label: '资产原值',
  },
  {
    component: 'Input',
    fieldName: 'accumulatedDepreciation',
    label: '累计折旧',
  },
  {
    component: 'Input',
    fieldName: 'netBookValue',
    label: '账面净值',
  },
  {
    component: 'Input',
    fieldName: 'depreciationYears',
    label: '折旧年限',
  },
  {
    component: 'Input',
    fieldName: 'monthlyDepreciation',
    label: '每月累计折旧',
  },
  {
    component: 'Input',
    fieldName: 'depreciatedMonths',
    label: '已提折旧月数',
  },
  {
    component: 'Input',
    fieldName: 'accountingVoucher',
    label: '会计凭证号',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'depreciationStatus',
    label: '折旧状态',
  },
  {
    component: 'Input',
    fieldName: 'depreciationMethod',
    label: '折旧方法',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
    fieldName: 'usageStatus',
    label: '使用状况',
  },
  {
    component: 'Input',
    fieldName: 'usageDirection',
    label: '使用方向',
  },
  {
    component: 'Input',
    fieldName: 'createdBy',
    label: '制单人',
  },
  {
    component: 'Input',
    fieldName: 'approvedBy',
    label: '审核人',
  },
  {
    component: 'Input',
    fieldName: 'isAccounted',
    label: '是否已入账',
  },
  {
    component: 'Input',
    fieldName: 'isDisposed',
    label: '是否未处置',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '主键ID',
    field: 'officeId',
    visible: false,
  },
  {
    title: '单据日期',
    field: 'documentDate',
  },
  {
    title: '资产编号',
    field: 'assetCode',
  },
  {
    title: '资产国标大类名称',
    field: 'assetCategory',
  },
  {
    title: '资产名称',
    field: 'assetName',
  },
  {
    title: '厂牌型号',
    field: 'brandModel',
  },
  {
    title: '计量单位',
    field: 'unit',
  },
  {
    title: '数量',
    field: 'quantity',
  },
  {
    title: '取得方式',
    field: 'acquisitionMethod',
  },
  {
    title: '管理部门',
    field: 'manageDeptId',
    visible: false,
  },
  {
    title: '管理部门',
    field: 'manageDeptName',
  },
  {
    title: '使用人',
    field: 'userId',
    visible: false,
  },
  {
    title: '使用人',
    field: 'userName',
  },
  {
    title: '取得日期',
    field: 'acquisitionDate',
  },
  {
    title: '使用日期',
    field: 'usageDate',
  },
  {
    title: '存放地点',
    field: 'locationId',
  },
  {
    title: '存放地点',
    field: 'locationName',
  },
  {
    title: '用途分类',
    field: 'usageCategory',
  },
  {
    title: '价值类型',
    field: 'valueType',
  },
  {
    title: '资产原值',
    field: 'originalValue',
  },
  {
    title: '累计折旧',
    field: 'accumulatedDepreciation',
  },
  {
    title: '账面净值',
    field: 'netBookValue',
  },
  {
    title: '折旧年限',
    field: 'depreciationYears',
  },
  {
    title: '每月累计折旧',
    field: 'monthlyDepreciation',
  },
  {
    title: '已提折旧月数',
    field: 'depreciatedMonths',
  },
  {
    title: '会计凭证号',
    field: 'accountingVoucher',
  },
  {
    title: '折旧状态',
    field: 'depreciationStatus',
    slots: {
      default: ({ row }) => {
        return renderDict(
          row.depreciationStatus,
          DictEnum.RegulatoryCardBusinessStatus,
        );
      },
    },
  },
  {
    title: '折旧方法',
    field: 'depreciationMethod',
  },
  {
    title: '使用状况',
    field: 'usageStatus',
  },
  {
    title: '使用方向',
    field: 'usageDirection',
  },
  {
    title: '制单人',
    field: 'createdBy',
  },
  {
    title: '审核人',
    field: 'approvedBy',
  },
  {
    title: '是否已入账',
    field: 'isAccounted',
  },
  {
    title: '是否未处置',
    field: 'isDisposed',
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
    label: '主键ID',
    fieldName: 'officeId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '单据日期',
    fieldName: 'documentDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '资产编号',
    fieldName: 'assetCode',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '资产国标大类名称',
    fieldName: 'assetCategory',
    component: 'Input',
  },
  {
    label: '资产名称',
    fieldName: 'assetName',
    component: 'Input',
  },
  {
    label: '厂牌型号',
    fieldName: 'brandModel',
    component: 'Input',
  },
  {
    label: '计量单位',
    fieldName: 'unit',
    component: 'Input',
  },
  {
    label: '数量',
    fieldName: 'quantity',
    component: 'Input',
  },
  {
    label: '取得方式',
    fieldName: 'acquisitionMethod',
    component: 'Input',
  },
  {
    component: 'TreeSelect',
    // 在drawer里更新 这里不需要默认的componentProps
    defaultValue: undefined,
    fieldName: 'manageDeptId',
    label: '所属部门',
    rules: 'selectRequired',
  },
  {
    label: '使用人',
    fieldName: 'userId',
    component: 'Select',
    rules: 'selectRequired',
  },
  {
    label: '取得日期',
    fieldName: 'acquisitionDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '使用日期',
    fieldName: 'usageDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '存放地点',
    fieldName: 'locationName',
    component: 'Input',
  },
  {
    label: '用途分类',
    fieldName: 'usageCategory',
    component: 'Input',
  },
  {
    label: '价值类型',
    fieldName: 'valueType',
    component: 'Input',
  },
  {
    label: '资产原值',
    fieldName: 'originalValue',
    component: 'Input',
  },
  {
    label: '累计折旧',
    fieldName: 'accumulatedDepreciation',
    component: 'Input',
  },
  {
    label: '账面净值',
    fieldName: 'netBookValue',
    component: 'Input',
  },
  {
    label: '折旧年限',
    fieldName: 'depreciationYears',
    component: 'Input',
  },
  {
    label: '每月累计折旧',
    fieldName: 'monthlyDepreciation',
    component: 'Input',
  },
  {
    label: '已提折旧月数',
    fieldName: 'depreciatedMonths',
    component: 'Input',
  },
  {
    label: '会计凭证号',
    fieldName: 'accountingVoucher',
    component: 'Input',
  },
  {
    label: '折旧状态',
    fieldName: 'depreciationStatus',
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      optionType: 'button',
    },
  },
  {
    label: '折旧方法',
    fieldName: 'depreciationMethod',
    component: 'Input',
  },
  {
    label: '使用状况',
    fieldName: 'usageStatus',
    component: 'Input',
  },
  {
    label: '使用方向',
    fieldName: 'usageDirection',
    component: 'Input',
  },
  {
    label: '制单人',
    fieldName: 'createdBy',
    component: 'Input',
  },
  {
    label: '审核人',
    fieldName: 'approvedBy',
    component: 'Input',
  },
  {
    label: '是否已入账',
    fieldName: 'isAccounted',
    component: 'Input',
  },
  {
    label: '是否未处置',
    fieldName: 'isDisposed',
    component: 'Input',
  },
];
