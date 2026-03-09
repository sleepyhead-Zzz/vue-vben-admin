import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';

import { getDictOptions } from '#/utils/dict';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'taskType',
    label: '任务类型',
  },
  {
    component: 'Input',
    fieldName: 'businessType',
    label: '业务类型',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.SYS_JOB_TASK_STATUS),
    },
    fieldName: 'status',
    label: '任务状态',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '任务ID',
    field: 'taskId',
    width: 130,
  },
  {
    title: '任务类型',
    field: 'taskType',
    minWidth: 160,
  },
  {
    title: '业务类型',
    field: 'businessType',
    minWidth: 160,
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
    title: '进度',
    field: 'progress',
    minWidth: 180,
    slots: {
      default: 'progress',
    },
  },
  {
    title: '处理/总数',
    field: 'processedRows',
    minWidth: 120,
    formatter({ row }) {
      const processedRows = row.processedRows ?? 0;
      const totalRows = row.totalRows ?? 0;
      return `${processedRows}/${totalRows}`;
    },
  },
  {
    title: '成功行数',
    field: 'successRows',
    width: 100,
  },
  {
    title: '失败行数',
    field: 'failRows',
    width: 100,
  },
  {
    title: '创建时间',
    field: 'createTime',
    minWidth: 170,
  },
  {
    title: '开始时间',
    field: 'startTime',
    minWidth: 170,
  },
  {
    title: '结束时间',
    field: 'endTime',
    minWidth: 170,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 120,
    resizable: false,
  },
];
