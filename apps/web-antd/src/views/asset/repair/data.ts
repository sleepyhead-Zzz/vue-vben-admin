import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    componentProps: {},
    fieldName: 'faultType',
    label: '故障类型',
  },
  {
    component: 'Input',
    fieldName: 'repairLevel',
    label: '紧急程度',
  },

  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_REPAIR_LEVEL),
    },
    fieldName: 'repairLevel',
    label: '紧急程度',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_REPAIR_STATUS),
    },
    fieldName: 'repairStatus',
    label: '状态',
  },
  {
    component: 'Input',
    fieldName: 'isFixed',
    label: '是否修复',
  },
];

// 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
// export const columns: () => VxeGridProps['columns'] = () => [
export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '报修单ID',
    field: 'repairId',
    visible: false,
  },
  {
    title: '故障类型',
    field: 'faultType',
  },
  {
    title: '紧急程度',
    field: 'repairLevel',
  },
  {
    title: '状态',
    field: 'repairStatus',
  },

  {
    title: '是否修复',
    field: 'isFixed',
  },
  {
    title: '报修时间',
    field: 'reportTime',
  },
  {
    title: '受理时间',
    field: 'acceptTime',
  },
  {
    title: '完成时间',
    field: 'finishTime',
  },
  {
    title: '关闭时间',
    field: 'closeTime',
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
    label: '报修单ID',
    fieldName: 'repairId',
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
  },
  {
    label: '设备ID',
    fieldName: 'deviceId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '故障类型',
    fieldName: 'faultType',
    component: 'Select',
    componentProps: {},
  },
  {
    label: '故障描述',
    fieldName: 'faultDescription',
    component: 'Textarea',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_REPAIR_LEVEL),
    },
    fieldName: 'repairLevel',
    label: '紧急程度',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_REPAIR_STATUS),
    },
    fieldName: 'repairStatus',
    label: '状态',
  },
  {
    label: '报修人ID',
    fieldName: 'reporterId',
    component: 'Input',
    rules: 'required',
  },
  {
    label: '受理/维修人ID',
    fieldName: 'handlerId',
    component: 'Input',
  },
  {
    label: '维修结果说明',
    fieldName: 'repairResult',
    component: 'Textarea',
  },
  {
    label: '是否修复',
    fieldName: 'isFixed',
    component: 'Input',
  },
  {
    label: '报修时间',
    fieldName: 'reportTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    rules: 'required',
  },
  {
    label: '受理时间',
    fieldName: 'acceptTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '完成时间',
    fieldName: 'finishTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '关闭时间',
    fieldName: 'closeTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];
