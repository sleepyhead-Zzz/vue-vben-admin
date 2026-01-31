import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

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
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
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
    title: '设备规格型号',
    field: 'specificationId',
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
