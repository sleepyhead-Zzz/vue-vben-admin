import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import {
  businessTypeOptions,
  getTaskStatusOptions,
  taskTypeOptions,
} from './shared';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    componentProps: {
      options: taskTypeOptions,
    },
    fieldName: 'taskType',
    label: '任务类型',
  },
  {
    component: 'Select',
    componentProps: {
      optionFilterProp: 'label',
      options: businessTypeOptions,
      showSearch: true,
    },
    fieldName: 'businessType',
    label: '业务类型',
  },
  {
    component: 'Select',
    componentProps: {
      options: getTaskStatusOptions(),
    },
    fieldName: 'status',
    label: '任务状态',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '任务ID',
    field: 'taskId',
    width: 120,
    visible: false,
  },
  {
    title: '任务类型',
    field: 'taskType',
    minWidth: 140,
    slots: {
      default: 'taskType',
    },
  },
  {
    title: '业务类型',
    field: 'businessType',
    minWidth: 180,
    slots: {
      default: 'businessType',
    },
  },
  {
    title: '状态',
    field: 'status',
    width: 120,
    slots: {
      default: 'status',
    },
  },
  {
    title: '任务进度',
    field: 'progress',
    minWidth: 180,
    slots: {
      default: 'progress',
    },
  },
  {
    title: '源数据成功',
    field: 'successCount',
    width: 110,
  },
  {
    title: '源数据失败',
    field: 'failedCount',
    width: 110,
  },
  {
    title: '源数据跳过',
    field: 'skippedCount',
    width: 110,
  },
  {
    title: '源数据错误',
    field: 'errorCount',
    width: 110,
  },
  {
    title: '数据写入统计',
    field: 'importInfo',
    minWidth: 220,
    slots: {
      default: 'importWriteStats',
    },
  },
  {
    title: '创建时间',
    field: 'createTime',
    minWidth: 170,
  },
  {
    title: '创建人',
    field: 'creatorName',
    width: 100,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 400,
  },
];
