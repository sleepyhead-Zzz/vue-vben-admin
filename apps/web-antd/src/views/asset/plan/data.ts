import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'planName',
    label: '计划名称',
  },

  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.ASSET_INSPECTION_PLAN_STATUS),
    },
    fieldName: 'status',
    label: '状态',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },

  {
    title: '',
    field: 'planId',
    visible: false,
  },

  {
    title: '计划名称',
    field: 'planName',
  },

  {
    title: '调度模式',
    field: 'scheduleModel',
    formatter: ({ cellValue }) => {
      if (cellValue === 1) return '间隔模式';
      if (cellValue === 2) return '日历模式';
      return '-';
    },
  },
  // ================= 时间范围 =================

  {
    title: '开始时间',
    field: 'startTime',
  },
  {
    title: '结束时间',
    field: 'endTime',
  },

  // ================= 状态 =================

  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) =>
        renderDict(row.status, DictEnum.ASSET_INSPECTION_PLAN_STATUS),
    },
  },

  {
    title: '巡检对象类型',
    field: 'inspectionObjectType',
    slots: {
      default: ({ row }) =>
        renderDict(
          row.inspectionObjectType,
          DictEnum.ASSET_INSPECTION_OBJECT_TYPE,
        ),
    },
  },

  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 260,
  },
];
