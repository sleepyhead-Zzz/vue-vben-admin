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
