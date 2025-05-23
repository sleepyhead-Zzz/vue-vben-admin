import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'requestModule',
    label: '系统模块',
  },
  {
    component: 'Input',
    fieldName: 'username',
    label: '操作人员',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.SYS_OPER_TYPE),
    },
    fieldName: 'operatorType',
    label: '操作类型',
  },
  {
    component: 'Input',
    fieldName: 'operatorIp',
    label: '操作IP',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.SYS_COMMON_STATUS),
    },
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'RangePicker',
    fieldName: 'operationTime',
    label: '操作时间',
    componentProps: {
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  { field: 'requestModule', title: '系统模块' },
  {
    title: '操作类型',
    field: 'operatorType',
    slots: {
      default: ({ row }) => {
        return renderDict(row.businessType, DictEnum.SYS_OPER_TYPE);
      },
    },
  },
  { field: 'username', title: '操作人员' },
  { field: 'operatorIp', title: 'IP地址' },
  { field: 'operatorLocation', title: 'IP信息' },
  {
    field: 'status',
    title: '操作状态',
    slots: {
      default: ({ row }) => {
        return renderDict(row.status, DictEnum.SYS_COMMON_STATUS);
      },
    },
  },
  { field: 'operationTime', title: '操作日期', sortable: true },
  {
    field: 'costTime',
    title: '操作耗时',
    sortable: true,
    formatter({ cellValue }) {
      return `${cellValue} ms`;
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];
