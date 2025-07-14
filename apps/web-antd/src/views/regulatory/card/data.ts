import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'assetCode',
    label: '资产编号',
  },
  {
    component: 'Input',
    fieldName: 'assetName',
    label: '资产名称',
  },

  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.RegulatoryCardAssetStatus),
    },
    fieldName: 'businessStatus',
    label: '业务状态',
  },

  {
    component: 'Select',
    componentProps: {},
    fieldName: 'cardType',
    label: '卡片类型',
  },
  {
    component: 'Input',
    fieldName: 'accountingSubject',
    label: '单位会计科目',
  },
  {
    component: 'Input',
    fieldName: 'assetCategory',
    label: '资产分类',
  },
  {
    component: 'Input',
    fieldName: 'assetCategoryCode',
    label: '资产分类代码',
  },
  {
    component: 'Input',
    fieldName: 'assetMajorCategory',
    label: '资产门类',
  },

  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.RegulatoryCardAccountStatus),
    },
    fieldName: 'financialAccountStatus',
    label: '财务入账状态',
  },

  {
    component: 'Input',
    fieldName: 'accountingVoucherNo',
    label: '记账凭证号',
  },
  {
    component: 'Input',
    fieldName: 'brand',
    label: '品牌',
  },
  {
    component: 'Input',
    fieldName: 'specificationModel',
    label: '规格型号',
  },
  {
    component: 'Input',
    fieldName: 'storageLocation',
    label: '存放地点',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '资产编号',
    field: 'assetCode',
  },
  {
    title: '资产名称',
    field: 'assetName',
  },
  {
    title: '业务状态',
    field: 'businessStatus',
    slots: {
      default: ({ row }) => {
        return renderDict(
          row.businessStatus,
          DictEnum.RegulatoryCardBusinessStatus,
        );
      },
    },
  },
  {
    title: '卡片类型',
    field: 'cardType',
  },
  {
    title: '单位会计科目',
    field: 'accountingSubject',
  },
  {
    title: '资产分类',
    field: 'assetCategory',
  },
  {
    title: '资产分类代码',
    field: 'assetCategoryCode',
  },
  {
    title: '资产门类',
    field: 'assetMajorCategory',
  },
  {
    title: '资产原值(元)',
    field: 'originalValue',
    visible: false,
  },
  {
    title: '累计折旧/摊销(元)',
    field: 'accumulatedDepreciation',
    visible: false,
  },
  {
    title: '数量/面积',
    field: 'quantityArea',
    visible: false,
  },
  {
    title: '数量计量单位',
    field: 'quantityUnit',
    visible: false,
  },
  {
    title: '财务入账状态',
    field: 'financialAccountStatus',
    slots: {
      default: ({ row }) => {
        return renderDict(
          row.financialAccountStatus,
          DictEnum.RegulatoryCardAccountStatus,
        );
      },
    },
  },
  {
    title: '记账日期',
    field: 'accountingDate',
    visible: false,
  },
  {
    title: '记账凭证号',
    field: 'accountingVoucherNo',
    visible: false,
  },
  {
    title: '品牌',
    field: 'brand',
  },
  {
    title: '规格型号',
    field: 'specificationModel',
  },
  {
    title: '存放地点',
    field: 'storageLocation',
  },
  {
    title: '车牌号',
    field: 'licensePlate',
    visible: false,
  },
  {
    title: '管理部门',
    field: 'managingDepartmentId',
    visible: false,
  },
  {
    title: '管理部门',
    field: 'managingDepartmentName',
  },
  {
    title: '管理人',
    field: 'managerUserName',
  },
  {
    title: '管理人',
    field: 'managerUserId',
    visible: false,
  },
  {
    title: '使用部门',
    field: 'usingDepartmentId',
    visible: false,
  },
  {
    title: '使用部门',
    field: 'usingDepartmentName',
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
    title: '创建人',
    field: 'creatorName',
    visible: false,
  },
  {
    title: '取得方式',
    field: 'acquisitionMethod',
    visible: false,
  },
  {
    title: '折旧/摊销年限(月)',
    field: 'depreciationLifeMonths',
    visible: false,
  },
  {
    title: '已提折旧/摊销月数',
    field: 'depreciationMonths',
    visible: false,
  },
  {
    title: '清查编号',
    field: 'inventoryNo',
    visible: false,
  },
  {
    title: '坐落位置',
    field: 'location',
  },
  {
    title: '项目代码',
    field: 'projectCode',
    visible: false,
  },
  {
    title: '采购组织形式',
    field: 'procurementForm',
    visible: false,
  },
  {
    title: '取得日期',
    field: 'acquisitionDate',
    visible: false,
  },
  {
    title: '资产状态',
    field: 'assetStatus',
    slots: {
      default: ({ row }) => {
        return renderDict(row.assetStatus, DictEnum.RegulatoryCardAssetStatus);
      },
    },
  },
  {
    title: '资产用途',
    field: 'assetUse',
    visible: false,
  },
  {
    title: '接口状态',
    field: 'interfaceStatus',
    visible: false,
  },
  {
    title: '备注',
    field: 'remarks',
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
    label: '主键ID',
    fieldName: 'cardId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '资产编号',
    fieldName: 'assetCode',
    component: 'Input',
  },
  {
    label: '资产名称',
    fieldName: 'assetName',
    component: 'Input',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.RegulatoryCardAssetStatus),
    },
    fieldName: 'businessStatus',
    label: '业务状态',
  },
  {
    label: '卡片类型',
    componentProps: {
      options: getDictOptions(DictEnum.RegulatoryCardType),
    },
    fieldName: 'cardType',
    component: 'Select',
  },
  {
    label: '单位会计科目',
    fieldName: 'accountingSubject',
    component: 'Input',
  },
  {
    label: '资产分类',
    fieldName: 'assetCategory',
    component: 'Input',
  },
  {
    label: '资产分类代码',
    fieldName: 'assetCategoryCode',
    component: 'Input',
  },
  {
    label: '资产门类',
    fieldName: 'assetMajorCategory',
    component: 'Input',
  },
  {
    label: '资产原值(元)',
    fieldName: 'originalValue',
    component: 'Input',
  },
  {
    label: '累计折旧/摊销(元)',
    fieldName: 'accumulatedDepreciation',
    component: 'Input',
  },
  {
    label: '数量/面积',
    fieldName: 'quantityArea',
    component: 'Input',
  },
  {
    label: '数量计量单位',
    fieldName: 'quantityUnit',
    component: 'Input',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.RegulatoryCardAccountStatus),
    },
    fieldName: 'financialAccountStatus',
    label: '财务入账状态',
  },
  {
    label: '记账日期',
    fieldName: 'accountingDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '记账凭证号',
    fieldName: 'accountingVoucherNo',
    component: 'Input',
  },
  {
    label: '品牌',
    fieldName: 'brand',
    component: 'Input',
  },
  {
    label: '规格型号',
    fieldName: 'specificationModel',
    component: 'Input',
  },
  {
    label: '存放地点',
    fieldName: 'storageLocation',
    component: 'Input',
  },
  {
    label: '车牌号',
    fieldName: 'licensePlate',
    component: 'Input',
  },
  {
    component: 'TreeSelect',
    defaultValue: undefined,
    fieldName: 'managingDepartmentId',
    label: '管理部门',
    rules: 'selectRequired',
  },
  {
    label: '管理人',
    fieldName: 'managerUserId',
    component: 'Select',
  },
  {
    component: 'TreeSelect',
    defaultValue: undefined,
    fieldName: 'usingDepartmentId',
    label: '使用部门',
    rules: 'selectRequired',
  },
  {
    label: '使用人',
    fieldName: 'userId',
    component: 'Select',
  },
  {
    label: '创建人',
    fieldName: 'creator',
    component: 'Input',
  },
  {
    label: '取得方式',
    fieldName: 'acquisitionMethod',
    component: 'Input',
  },
  {
    label: '折旧/摊销年限(月)',
    fieldName: 'depreciationLifeMonths',
    component: 'Input',
  },
  {
    label: '已提折旧/摊销月数',
    fieldName: 'depreciationMonths',
    component: 'Input',
  },
  {
    label: '清查编号',
    fieldName: 'inventoryNo',
    component: 'Input',
  },
  {
    label: '坐落位置',
    fieldName: 'location',
    component: 'Input',
  },
  {
    label: '项目代码',
    fieldName: 'projectCode',
    component: 'Input',
  },
  {
    label: '采购组织形式',
    fieldName: 'procurementForm',
    component: 'Input',
  },
  {
    label: '取得日期',
    fieldName: 'acquisitionDate',
    component: 'DatePicker',
    componentProps: {
      showTime: false,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.RegulatoryCardAccountStatus),
    },
    fieldName: 'assetStatus',
    label: '资产状态',
  },
  {
    label: '资产用途',
    fieldName: 'assetUse',
    component: 'Input',
  },
  {
    label: '接口状态',
    fieldName: 'interfaceStatus',
    component: 'Input',
  },
  {
    label: '备注',
    fieldName: 'remarks',
    component: 'Textarea',
  },
];
