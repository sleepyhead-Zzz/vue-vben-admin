import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';
import { getPopupContainer } from '@vben/utils';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'deviceName',
    label: '设备名称',
  },
  {
    component: 'Input',
    fieldName: 'deviceCode',
    label: '设备编码',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_DEVICE_STATUS),
    },
    fieldName: 'status',
    label: '设备状态',
  },

  {
    component: 'Input',
    fieldName: 'specificationId',
    label: '设备规格型号',
  },
  {
    component: 'Input',
    fieldName: 'manageDeptId',
    label: '管理部门',
  },
  {
    component: 'Input',
    fieldName: 'usageDeptId',
    label: '使用部门',
  },
  {
    component: 'Input',
    fieldName: 'manufacturerId',
    label: '生产厂商',
  },
  {
    component: 'Input',
    fieldName: 'locationId',
    label: '设备存放位置',
  },
  {
    component: 'Input',
    fieldName: 'inspectionPlanId',
    label: '巡检方案',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '设备ID',
    field: 'deviceId',
    visible: false,
  },
  {
    title: '设备名称',
    field: 'deviceName',
  },
  {
    title: '设备编码',
    field: 'deviceCode',
  },
  {
    title: '设备状态',
    field: 'status',
    resizable: false,
    width: 'auto',
    slots: {
      default: ({ row }) => {
        return renderDict(row.status, DictEnum.ASSET_DEVICE_STATUS);
      },
    },
  },

  {
    title: '设备图片',
    field: 'imageUrl',
    slots: { default: 'imageFile' },
  },

  {
    title: '设备规格型号',
    field: 'specificationId',
  },
  {
    title: '管理部门',
    field: 'manageDeptId',
  },
  {
    title: '使用部门',
    field: 'usageDeptId',
  },
  {
    title: '生产厂商',
    field: 'manufacturerId',
  },
  {
    title: '设备存放位置',
    field: 'locationId',
  },
  {
    title: '巡检方案',
    field: 'inspectionPlanId',
  },
  {
    title: '购买日期',
    field: 'purchaseDate',
  },
  {
    title: '启用日期',
    field: 'activationDate',
  },
  {
    title: '最近维修时间',
    field: 'lastRepaired',
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
    label: '设备ID',
    fieldName: 'deviceId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '设备名称',
    fieldName: 'deviceName',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '设备编码',
    fieldName: 'deviceCode',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '设备状态',
    fieldName: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_DEVICE_STATUS),
    },
    rules: 'required',
  },

  {
    component: 'ImageUpload',
    fieldName: 'imageFileId',
    label: '设备封面图片',
    componentProps: {
      maxCount: 1,
    },
    rules: 'required',
  },

  {
    component: 'FileUpload',
    fieldName: 'manualFileId',
    label: '技术手册文件',
    componentProps: {
      maxCount: 1,
    },
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      optionFilterProp: 'label',
      optionLabelProp: 'label',
    },
    fieldName: 'specificationId',
    label: '设备规格型号',
  },
  {
    component: 'TreeSelect',
    defaultValue: undefined,
    fieldName: 'manageDeptId',
    label: '管理部门',
    rules: 'selectRequired',
  },
  {
    component: 'TreeSelect',
    defaultValue: undefined,
    fieldName: 'usageDeptId',
    label: '使用部门',
    rules: 'selectRequired',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      optionFilterProp: 'label',
      optionLabelProp: 'label',
    },
    fieldName: 'manufacturerId',
    label: '生产厂商',
  },
  {
    label: '设备存放位置',
    defaultValue: undefined,
    fieldName: 'locationId',
    component: 'TreeSelect',
  },
  {
    label: '巡检项目',
    fieldName: 'inspectionPlanId',
    componentProps: {
      getPopupContainer,
      optionFilterProp: 'label',
      optionLabelProp: 'label',
    },
    component: 'Select',
  },
  {
    label: '购买日期',
    fieldName: 'purchaseDate',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '启用日期',
    fieldName: 'activationDate',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
