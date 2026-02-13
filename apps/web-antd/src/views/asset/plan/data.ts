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

  // ================= Interval 模式展示 =================

  {
    title: '执行周期',
    field: 'intervalValue',
    formatter: ({ row }) => {
      if (row.scheduleModel !== 1) return '-';

      const unitMap: Record<number, string> = {
        1: '秒',
        2: '分钟',
        3: '小时',
        4: '天',
      };

      return `每 ${row.intervalValue} ${unitMap[row.intervalUnit] ?? ''}`;
    },
  },

  {
    title: '偏移(秒)',
    field: 'intervalOffset',
    formatter: ({ row }) =>
      row.scheduleModel === 1 ? (row.intervalOffset ?? 0) : '-',
  },

  // ================= Calendar 模式展示 =================

  {
    title: '执行时间',
    field: 'triggerHour',
    formatter: ({ row }) => {
      if (row.scheduleModel !== 2) return '-';

      return `${String(row.triggerHour).padStart(2, '0')}:${String(
        row.triggerMinute,
      ).padStart(2, '0')}:${String(row.triggerSecond ?? 0).padStart(2, '0')}`;
    },
  },

  {
    title: '执行规则',
    field: 'dayOfWeek',
    formatter: ({ row }) => {
      if (row.scheduleModel !== 2) return '-';

      const weekMap: Record<string, string> = {
        '1': '周一',
        '2': '周二',
        '3': '周三',
        '4': '周四',
        '5': '周五',
        '6': '周六',
        '7': '周日',
      };

      if (row.dayOfWeek) {
        return row.dayOfWeek
          .split(',')
          .map((v: string) => weekMap[v] ?? v)
          .join('、');
      }

      if (row.dayOfMonth) {
        return row.dayOfMonth
          .split(',')
          .map((d: string) => `${d}日`)
          .join('、');
      }

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
