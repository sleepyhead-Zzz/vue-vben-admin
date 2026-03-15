import { DictEnum } from '@vben/constants';

import { tagTypes } from '#/components/dict';
import { getDictOptions } from '#/utils/dict';

export type JobTaskTabKey = 'base' | 'details' | 'logs' | 'progress';

const JOB_TASK_DETAIL_PAGE_KEY_PREFIX = 'system-job-task-detail';

export const TASK_TYPE_LABELS = {
  excel_import: 'Excel 导入',
  perf_calc: '绩效计算',
} as const;

export const BUSINESS_TYPE_LABELS = {
  perf_sales_data_import: '销售数据导入',
  perf_sales_plan_import: '销售计划导入',
  perf_profit_plan_import: '利润计划导入',
  perf_profit_data_import: '利润数据导入',
  perf_key_task_score_import: '重点工作得分导入',
  perf_management_score_import: '管理维度得分导入',
  perf_monthly_calc: '月度绩效计算',
  perf_range_calc: '区间绩效计算',
} as const;

export const TERMINAL_TASK_STATUSES = new Set([
  'canceled',
  'failed',
  'partial_failed',
  'succeeded',
]);

export const POLLING_TASK_STATUSES = new Set(['queued', 'running']);

export const TERMINAL_EXPORT_STATUSES = new Set([
  'failed',
  'skipped',
  'succeeded',
]);

export const POLLING_EXPORT_STATUSES = new Set(['pending', 'running']);

const TASK_STATUS_FALLBACK_OPTIONS = [
  {
    dictLabel: '排队中',
    dictValue: 'queued',
    label: '排队中',
    listClass: 'default',
    value: 'queued',
  },
  {
    dictLabel: '执行中',
    dictValue: 'running',
    label: '执行中',
    listClass: 'primary',
    value: 'running',
  },
  {
    dictLabel: '已成功',
    dictValue: 'succeeded',
    label: '已成功',
    listClass: 'success',
    value: 'succeeded',
  },
  {
    dictLabel: '部分失败',
    dictValue: 'partial_failed',
    label: '部分失败',
    listClass: 'warning',
    value: 'partial_failed',
  },
  {
    dictLabel: '已失败',
    dictValue: 'failed',
    label: '已失败',
    listClass: 'danger',
    value: 'failed',
  },
  {
    dictLabel: '已取消',
    dictValue: 'canceled',
    label: '已取消',
    listClass: 'default',
    value: 'canceled',
  },
] satisfies Array<SystemAPI.SysDictDataDTO & { label: string; value: string }>;

export const taskTypeOptions = Object.entries(TASK_TYPE_LABELS).map(
  ([value, label]) => ({
    label,
    value,
  }),
);

export const businessTypeOptions = Object.entries(BUSINESS_TYPE_LABELS).map(
  ([value, label]) => ({
    label,
    value,
  }),
);

export function getTaskTypeLabel(taskType?: null | string) {
  if (!taskType) return '-';
  return (
    TASK_TYPE_LABELS[taskType as keyof typeof TASK_TYPE_LABELS] ?? taskType
  );
}

export function getBusinessTypeLabel(businessType?: null | string) {
  if (!businessType) return '-';
  return (
    BUSINESS_TYPE_LABELS[businessType as keyof typeof BUSINESS_TYPE_LABELS] ??
    businessType
  );
}

export function getTaskStatusOptions() {
  const dictOptions = getDictOptions(DictEnum.SYS_JOB_TASK_STATUS);
  const appended = TASK_STATUS_FALLBACK_OPTIONS.filter(
    (fallback) =>
      !dictOptions.some(
        (item) =>
          String(item.value ?? item.dictValue ?? '').toLowerCase() ===
          fallback.value,
      ),
  );

  return [...dictOptions, ...appended];
}

export function getTaskStatusLabel(status?: null | string) {
  if (!status) return '-';

  const normalized = status.toLowerCase();
  const matched = getTaskStatusOptions().find(
    (item) =>
      String(item.value ?? item.dictValue ?? '').toLowerCase() === normalized,
  );

  return matched?.label ?? matched?.dictLabel ?? status;
}

export function getTaskStatusColor(status?: null | string) {
  if (!status) return 'default';

  const normalized = status.toLowerCase();
  const matched = getTaskStatusOptions().find(
    (item) =>
      String(item.value ?? item.dictValue ?? '').toLowerCase() === normalized,
  );
  const listClass = matched?.listClass ?? '';

  if (listClass && Reflect.has(tagTypes, listClass)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return tagTypes[listClass]!.color;
  }

  return (
    {
      canceled: 'default',
      failed: 'error',
      partial_failed: 'warning',
      queued: 'default',
      running: 'processing',
      succeeded: 'success',
    }[normalized] ?? 'default'
  );
}

export function getTaskCount(value?: null | number) {
  return value ?? 0;
}

export function getTaskText(value?: null | number | string) {
  if (value === undefined || value === null || value === '') {
    return '-';
  }
  return String(value);
}

export function getImportWriteStats(
  importInfo?: null | SystemAPI.ImportSummary,
) {
  return {
    dataErrorCount: getTaskCount(importInfo?.dataErrorCount),
    dataFailedCount: getTaskCount(importInfo?.dataFailedCount),
    dataSkippedCount: getTaskCount(importInfo?.dataSkippedCount),
    dataSuccessCount: getTaskCount(importInfo?.dataSuccessCount),
    dataTotalCount: getTaskCount(importInfo?.dataTotalCount),
  };
}

export function isTaskTerminalStatus(status?: null | string) {
  if (!status) return false;
  return TERMINAL_TASK_STATUSES.has(status.toLowerCase());
}

export function isTaskPollingStatus(status?: null | string) {
  if (!status) return false;
  return POLLING_TASK_STATUSES.has(status.toLowerCase());
}

export function isPerfExportTerminalStatus(status?: null | string) {
  if (!status) return false;
  return TERMINAL_EXPORT_STATUSES.has(status.toLowerCase());
}

export function isPerfExportPollingStatus(status?: null | string) {
  if (!status) return false;
  return POLLING_EXPORT_STATUSES.has(status.toLowerCase());
}

export function normalizeJobTaskTabKey(value: unknown): JobTaskTabKey {
  return value === 'details' ||
    value === 'logs' ||
    value === 'progress' ||
    value === 'base'
    ? value
    : 'base';
}

export function getJobTaskDetailPageKey(
  taskId: null | number | string | undefined,
) {
  return `${JOB_TASK_DETAIL_PAGE_KEY_PREFIX}:${String(taskId ?? '')}`;
}
