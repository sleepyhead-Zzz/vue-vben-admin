<script setup lang="ts">
import type { JobTaskTabKey } from './shared';

import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import {
  Alert,
  Button,
  Card,
  Descriptions,
  DescriptionsItem,
  message,
  Popconfirm,
  Progress,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
} from 'ant-design-vue';

import { downloadFile } from '#/api/core/download';
import {
  exportPerfCalc,
  getJob,
  getJobProgress,
  pageImportDetails,
  pageJobLogs,
  undoImport,
} from '#/api/system/jobTask';
import { getDictOptions } from '#/utils/dict';
import { downloadByData } from '#/utils/file/download';
import { renderDict } from '#/utils/render';

import {
  getBusinessTypeLabel,
  getImportWriteStats,
  getTaskCount,
  getTaskStatusColor,
  getTaskStatusLabel,
  getTaskText,
  getTaskTypeLabel,
  isPerfExportPollingStatus,
  isTaskPollingStatus,
  isTaskTerminalStatus,
  normalizeJobTaskTabKey,
} from './shared';

const POLL_INTERVAL = 5000;

const route = useRoute();
const router = useRouter();

const activeKey = ref<JobTaskTabKey>('base');
const loading = ref(false);
const undoLoading = ref(false);
const exportLoading = ref(false);
const polling = ref(false);
const downloadLoading = ref(false);

const task = ref<SystemAPI.SysJobTaskDTO>({});
const progress = ref<SystemAPI.SysJobTaskProgressDTO>({});

const logsLoading = ref(false);
const logs = ref<SystemAPI.SysJobLogDTO[]>([]);
const logsPageNum = ref(1);
const logsPageSize = ref(10);
const logsTotal = ref(0);

const detailLoading = ref(false);
const detailStatus = ref<string>();
const importDetails = ref<SystemAPI.JobImportDetailDTO[]>([]);
const importPageNum = ref(1);
const importPageSize = ref(10);
const importTotal = ref(0);

let timer: null | ReturnType<typeof setInterval> = null;

const taskId = computed<string | undefined>(() => {
  const raw = Array.isArray(route.params.taskId)
    ? route.params.taskId[0]
    : route.params.taskId;

  if (!raw) return undefined;
  return String(raw);
});

const isImportTask = computed(() => task.value.taskType === 'excel_import');
const isPerfTask = computed(() => task.value.taskType === 'perf_calc');
const taskImportInfo = computed(() => task.value.importInfo ?? {});
const taskImportWriteStats = computed(() =>
  getImportWriteStats({
    ...task.value.importInfo,
    ...progress.value.importInfo,
  }),
);

const taskProgress = computed(() => ({
  errorCount: getTaskCount(progress.value.errorCount ?? task.value.errorCount),
  failedCount: getTaskCount(
    progress.value.failedCount ?? task.value.failedCount,
  ),
  progress: getTaskCount(progress.value.progress ?? task.value.progress),
  progressDone: getTaskCount(
    progress.value.progressDone ?? task.value.progressDone,
  ),
  progressTotal: getTaskCount(
    progress.value.progressTotal ?? task.value.progressTotal,
  ),
  skippedCount: getTaskCount(
    progress.value.skippedCount ?? task.value.skippedCount,
  ),
  status: progress.value.status ?? task.value.status,
  successCount: getTaskCount(
    progress.value.successCount ?? task.value.successCount,
  ),
  taskId: progress.value.taskId ?? task.value.taskId,
}));

const canUndoImport = computed(
  () =>
    isImportTask.value &&
    Boolean(taskId.value) &&
    task.value.importInfo?.reverted !== true &&
    !undoLoading.value,
);

const canManualExport = computed(
  () =>
    isPerfTask.value &&
    Boolean(taskId.value) &&
    isTaskTerminalStatus(task.value.status) &&
    !exportLoading.value,
);

const shouldPollExportStatus = computed(
  () =>
    isPerfTask.value &&
    isTaskTerminalStatus(task.value.status) &&
    isPerfExportPollingStatus(task.value.perfCalc?.exportStatus),
);

const logsColumns = [
  {
    title: '序号',
    dataIndex: 'seq',
    key: 'seq',
    width: 80,
  },
  {
    title: '日志级别',
    dataIndex: 'level',
    key: 'level',
    width: 120,
  },
  {
    title: '阶段',
    dataIndex: 'stage',
    key: 'stage',
    width: 120,
  },
  {
    title: '上下文键',
    dataIndex: 'contextKey',
    key: 'contextKey',
    width: 180,
  },
  {
    title: '业务主体ID',
    dataIndex: 'subjectId',
    key: 'subjectId',
    width: 120,
  },
  {
    title: '日志内容',
    dataIndex: 'message',
    key: 'message',
    ellipsis: true,
  },
  {
    title: '日志时间',
    dataIndex: 'logTime',
    key: 'logTime',
    width: 180,
  },
];

const detailsColumns = [
  {
    title: '行号',
    dataIndex: 'rowNum',
    key: 'rowNum',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 120,
  },
  {
    title: '目标表',
    dataIndex: 'targetTable',
    key: 'targetTable',
    width: 180,
  },
  {
    title: '目标业务ID',
    dataIndex: 'targetBizId',
    key: 'targetBizId',
    width: 140,
  },
  {
    title: '操作类型',
    dataIndex: 'opType',
    key: 'opType',
    width: 120,
  },
  {
    title: '失败原因',
    dataIndex: 'failReason',
    key: 'failReason',
    ellipsis: true,
  },
  {
    title: '处理时间',
    dataIndex: 'processTime',
    key: 'processTime',
    width: 180,
  },
  {
    title: '行数据',
    dataIndex: 'rowData',
    key: 'rowData',
    ellipsis: true,
  },
];

function resetTaskState() {
  task.value = {};
  progress.value = {};
  logs.value = [];
  logsTotal.value = 0;
  importDetails.value = [];
  importTotal.value = 0;
}

function getErrorMessage(error: unknown, fallback: string) {
  const e = error as {
    message?: string;
    response?: { data?: { message?: string; msg?: string } };
  };
  return (
    e?.response?.data?.msg ||
    e?.response?.data?.message ||
    e?.message ||
    fallback
  );
}

function formatBoolean(value?: boolean) {
  if (value === undefined) return '-';
  return value ? '是' : '否';
}

function renderExportStatusColor(status?: string) {
  const normalized = (status ?? '').toLowerCase();
  const colorMap: Record<string, string> = {
    failed: 'error',
    pending: 'gold',
    running: 'processing',
    skipped: 'default',
    succeeded: 'success',
  };
  return colorMap[normalized] ?? 'default';
}

async function handleDownloadByOss(ossId?: number, fileName?: string) {
  if (!ossId || downloadLoading.value) return;

  downloadLoading.value = true;
  const hideLoading = message.loading('下载中，请稍后...', 0);

  try {
    const data = (await downloadFile({
      ossId: String(ossId),
    })) as unknown as BlobPart;
    downloadByData(data, fileName || `oss_${ossId}`);
    message.success('下载完成');
  } catch (error) {
    message.error(getErrorMessage(error, '下载失败，请稍后再试'));
  } finally {
    hideLoading();
    downloadLoading.value = false;
  }
}

async function fetchTaskBase() {
  if (!taskId.value) return;

  const { data } = await getJob({ taskId: taskId.value as never });
  task.value = data ?? {};

  if (!isImportTask.value && activeKey.value === 'details') {
    activeKey.value = 'base';
  }
}

async function fetchProgress() {
  if (!taskId.value) return;
  const { data } = await getJobProgress({ taskId: taskId.value as never });
  progress.value = data ?? {};
}

async function fetchLogs() {
  if (!taskId.value) return;

  logsLoading.value = true;
  try {
    const { data } = await pageJobLogs({
      pageNum: logsPageNum.value,
      pageSize: logsPageSize.value,
      taskId: taskId.value as never,
    });
    logs.value = data?.rows ?? [];
    logsTotal.value = data?.total ?? 0;
  } finally {
    logsLoading.value = false;
  }
}

async function fetchImportDetails() {
  if (!taskId.value || !isImportTask.value) {
    importDetails.value = [];
    importTotal.value = 0;
    return;
  }

  detailLoading.value = true;
  try {
    const { data } = await pageImportDetails({
      pageNum: importPageNum.value,
      pageSize: importPageSize.value,
      status: detailStatus.value,
      taskId: taskId.value as never,
    });
    importDetails.value = data?.rows ?? [];
    importTotal.value = data?.total ?? 0;
  } finally {
    detailLoading.value = false;
  }
}

async function refreshAll() {
  if (!taskId.value) {
    resetTaskState();
    return;
  }

  loading.value = true;
  try {
    await Promise.all([fetchTaskBase(), fetchProgress(), fetchLogs()]);
    await fetchImportDetails();
  } finally {
    loading.value = false;
  }
}

function stopPolling() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

async function pollTaskState() {
  if (isTaskPollingStatus(taskProgress.value.status)) {
    await fetchProgress();

    if (!isTaskPollingStatus(progress.value.status ?? task.value.status)) {
      await fetchTaskBase();
    }
  }

  if (shouldPollExportStatus.value) {
    await fetchTaskBase();
  }

  if (activeKey.value === 'logs') {
    await fetchLogs();
  }

  if (activeKey.value === 'details') {
    await fetchImportDetails();
  }

  if (
    !isTaskPollingStatus(taskProgress.value.status) &&
    !shouldPollExportStatus.value
  ) {
    stopPolling();
  }
}

function startPolling() {
  stopPolling();

  if (
    !isTaskPollingStatus(taskProgress.value.status) &&
    !shouldPollExportStatus.value
  ) {
    return;
  }

  timer = setInterval(async () => {
    if (polling.value) return;
    polling.value = true;
    try {
      await pollTaskState();
    } finally {
      polling.value = false;
    }
  }, POLL_INTERVAL);
}

function syncTabToRoute(tab: JobTaskTabKey) {
  const currentTab = normalizeJobTaskTabKey(
    Array.isArray(route.query.tab) ? route.query.tab[0] : route.query.tab,
  );

  if (currentTab === tab) {
    return;
  }

  const query = { ...route.query };
  if (tab === 'base') {
    delete query.tab;
  } else {
    query.tab = tab;
  }

  router.replace({ query });
}

function handleBack() {
  router.push('/system/job-task');
}

async function handleLogsPageChange(page: number, pageSize: number) {
  logsPageNum.value = page;
  logsPageSize.value = pageSize;
  await fetchLogs();
}

async function handleImportPageChange(page: number, pageSize: number) {
  importPageNum.value = page;
  importPageSize.value = pageSize;
  await fetchImportDetails();
}

async function handleImportStatusChange(value?: string) {
  detailStatus.value = value;
  importPageNum.value = 1;
  await fetchImportDetails();
}

async function handleUndoImport() {
  if (!taskId.value || undoLoading.value) return;

  undoLoading.value = true;
  try {
    await undoImport({ taskId: taskId.value as never });
    message.success('撤销导入成功');
    await refreshAll();
    startPolling();
  } catch (error) {
    message.error(getErrorMessage(error, '撤销导入失败，请稍后重试'));
  } finally {
    undoLoading.value = false;
  }
}

async function handleManualExport() {
  if (!taskId.value || exportLoading.value) return;

  exportLoading.value = true;
  try {
    const { data } = await exportPerfCalc({ taskId: taskId.value as never });
    if (data) {
      task.value = data;
    }
    message.success('已提交手动导出请求');
    await fetchTaskBase();
    startPolling();
  } catch (error) {
    message.error(getErrorMessage(error, '手动导出失败，请稍后重试'));
  } finally {
    exportLoading.value = false;
  }
}

watch(
  () => route.query.tab,
  (value) => {
    activeKey.value = normalizeJobTaskTabKey(
      Array.isArray(value) ? value[0] : value,
    );
  },
  { immediate: true },
);

watch(activeKey, async (value) => {
  syncTabToRoute(value);

  if (value === 'logs') {
    await fetchLogs();
  }

  if (value === 'details') {
    await fetchImportDetails();
  }
});

watch(
  () => route.params.taskId,
  async () => {
    stopPolling();
    logsPageNum.value = 1;
    detailStatus.value = undefined;
    importPageNum.value = 1;

    if (!taskId.value) {
      resetTaskState();
      return;
    }

    await refreshAll();
    startPolling();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  stopPolling();
});
</script>

<template>
  <Page :auto-content-height="true">
    <Card :loading="loading" title="任务详情">
      <template #extra>
        <Space wrap>
          <Popconfirm
            v-if="isImportTask"
            :disabled="!canUndoImport"
            title="确认撤销本任务对应的导入数据吗？"
            @confirm="handleUndoImport"
          >
            <Button
              :disabled="!canUndoImport"
              :loading="undoLoading"
              danger
              v-access:code="['system:job:undo']"
            >
              撤销导入
            </Button>
          </Popconfirm>
          <Button
            v-if="isPerfTask"
            :disabled="!canManualExport"
            :loading="exportLoading"
            v-access:code="['perf:FactPerformanceResultCalc:export']"
            @click="handleManualExport"
          >
            手动导出
          </Button>
          <Button @click="handleBack">返回列表</Button>
        </Space>
      </template>

      <Descriptions :column="3" bordered size="small">
        <DescriptionsItem label="任务ID">
          {{ task.taskId ?? '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="任务类型">
          {{ getTaskTypeLabel(task.taskType) }}
        </DescriptionsItem>
        <DescriptionsItem label="业务类型">
          {{ getBusinessTypeLabel(task.businessType) }}
        </DescriptionsItem>
        <DescriptionsItem label="任务状态">
          <Tag :color="getTaskStatusColor(task.status)">
            {{ getTaskStatusLabel(task.status) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="任务进度" :span="2">
          <Progress :percent="Number(taskProgress.progress ?? 0)" />
          <div class="text-text-secondary mt-2 text-xs">
            任务进度：{{ taskProgress.progressDone }}/{{
              taskProgress.progressTotal
            }}
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="源数据成功">
          {{ taskProgress.successCount }}
        </DescriptionsItem>
        <DescriptionsItem label="源数据失败">
          {{ taskProgress.failedCount }}
        </DescriptionsItem>
        <DescriptionsItem label="源数据跳过">
          {{ taskProgress.skippedCount }}
        </DescriptionsItem>
        <DescriptionsItem label="源数据错误">
          {{ taskProgress.errorCount }}
        </DescriptionsItem>
        <DescriptionsItem label="创建人">
          {{ task.creatorName ?? '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="创建时间">
          {{ task.createTime || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="开始时间">
          {{ task.startTime || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="结束时间">
          {{ task.endTime || '-' }}
        </DescriptionsItem>
      </Descriptions>

      <Alert
        v-if="task.message"
        class="mt-4"
        :message="task.message"
        show-icon
        type="info"
      />

      <Tabs v-model:active-key="activeKey" class="mt-4">
        <Tabs.TabPane key="base" tab="基本信息">
          <Descriptions :column="2" bordered size="small">
            <DescriptionsItem label="workflowId">
              {{ task.workflowId || '-' }}
            </DescriptionsItem>
            <DescriptionsItem label="runId">
              {{ task.runId || '-' }}
            </DescriptionsItem>
            <DescriptionsItem :span="2" label="参数快照">
              <pre class="m-0 whitespace-pre-wrap break-all">{{
                task.paramsJson || '-'
              }}</pre>
            </DescriptionsItem>
          </Descriptions>

          <template v-if="isImportTask">
            <div class="mt-4 text-base font-medium">导入扩展</div>
            <Descriptions :column="2" bordered class="mt-2" size="small">
              <DescriptionsItem label="记录ID">
                {{ getTaskText(taskImportInfo.recordId) }}
              </DescriptionsItem>
              <DescriptionsItem label="文件名">
                <Button
                  v-if="taskImportInfo.ossId"
                  :loading="downloadLoading"
                  style="padding: 0"
                  type="link"
                  @click="
                    handleDownloadByOss(
                      taskImportInfo.ossId,
                      taskImportInfo.fileName,
                    )
                  "
                >
                  {{ taskImportInfo.fileName || taskImportInfo.ossId }}
                </Button>
                <span v-else>{{ getTaskText(taskImportInfo.fileName) }}</span>
              </DescriptionsItem>
              <DescriptionsItem label="OSS ID">
                {{ getTaskText(taskImportInfo.ossId) }}
              </DescriptionsItem>
              <DescriptionsItem label="Sheet">
                {{ getTaskText(taskImportInfo.sheetName) }}
              </DescriptionsItem>
              <DescriptionsItem label="允许覆盖">
                {{ formatBoolean(taskImportInfo.updateSupport) }}
              </DescriptionsItem>
              <DescriptionsItem label="已撤销">
                {{ formatBoolean(taskImportInfo.reverted) }}
              </DescriptionsItem>
              <DescriptionsItem label="开始时间">
                {{ getTaskText(taskImportInfo.startedAt) }}
              </DescriptionsItem>
              <DescriptionsItem label="完成时间">
                {{ getTaskText(taskImportInfo.finishedAt) }}
              </DescriptionsItem>
              <DescriptionsItem label="撤销时间">
                {{ getTaskText(taskImportInfo.revertedAt) }}
              </DescriptionsItem>
              <DescriptionsItem label="撤销人">
                {{ getTaskText(taskImportInfo.revertedBy) }}
              </DescriptionsItem>
            </Descriptions>

            <div class="mt-4 text-base font-medium">实际写入统计</div>
            <Descriptions :column="2" bordered class="mt-2" size="small">
              <DescriptionsItem label="实际写入总数">
                {{ taskImportWriteStats.dataTotalCount }}
              </DescriptionsItem>
              <DescriptionsItem label="实际写入成功">
                {{ taskImportWriteStats.dataSuccessCount }}
              </DescriptionsItem>
              <DescriptionsItem label="实际写入失败">
                {{ taskImportWriteStats.dataFailedCount }}
              </DescriptionsItem>
              <DescriptionsItem label="实际写入跳过">
                {{ taskImportWriteStats.dataSkippedCount }}
              </DescriptionsItem>
              <DescriptionsItem label="实际写入错误">
                {{ taskImportWriteStats.dataErrorCount }}
              </DescriptionsItem>
            </Descriptions>
          </template>

          <template v-if="isPerfTask && task.perfCalc">
            <div class="mt-4 text-base font-medium">绩效计算扩展</div>
            <Descriptions :column="2" bordered class="mt-2" size="small">
              <DescriptionsItem label="任务类型">
                {{ task.perfCalc.jobType || '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="年份">
                {{ task.perfCalc.year ?? '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="月份">
                {{ task.perfCalc.month ?? '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="区间月份">
                {{ task.perfCalc.fromMonth ?? '-' }} -
                {{ task.perfCalc.toMonth ?? '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="覆盖已有结果">
                {{ formatBoolean(task.perfCalc.overwrite) }}
              </DescriptionsItem>
              <DescriptionsItem label="自动导出">
                {{ formatBoolean(task.perfCalc.autoExport) }}
              </DescriptionsItem>
              <DescriptionsItem label="导出状态">
                <Tag
                  :color="renderExportStatusColor(task.perfCalc.exportStatus)"
                >
                  {{ task.perfCalc.exportStatus || '-' }}
                </Tag>
              </DescriptionsItem>
              <DescriptionsItem label="导出文件">
                <Button
                  v-if="task.perfCalc.exportOssId"
                  :loading="downloadLoading"
                  style="padding: 0"
                  type="link"
                  @click="
                    handleDownloadByOss(
                      task.perfCalc.exportOssId,
                      task.perfCalc.exportFileName,
                    )
                  "
                >
                  {{
                    task.perfCalc.exportFileName || task.perfCalc.exportOssId
                  }}
                </Button>
                <span v-else>{{ task.perfCalc.exportFileName || '-' }}</span>
              </DescriptionsItem>
              <DescriptionsItem label="导出OSS ID">
                {{ task.perfCalc.exportOssId ?? '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="导出时间">
                {{ task.perfCalc.exportedAt || '-' }}
              </DescriptionsItem>
            </Descriptions>
          </template>
        </Tabs.TabPane>

        <Tabs.TabPane key="progress" tab="任务进度">
          <div class="border-border mb-4 rounded-md border px-4 py-3 text-sm">
            <div>
              源数据处理：{{ taskProgress.progressDone }}/{{
                taskProgress.progressTotal
              }}
            </div>
            <div v-if="isImportTask" class="text-text-secondary mt-2">
              实际写入：成功 {{ taskImportWriteStats.dataSuccessCount }}，失败
              {{ taskImportWriteStats.dataFailedCount }}，跳过
              {{ taskImportWriteStats.dataSkippedCount }}，错误
              {{ taskImportWriteStats.dataErrorCount }}
            </div>
          </div>

          <Descriptions :column="2" bordered size="small">
            <DescriptionsItem label="任务ID">
              {{ getTaskText(taskProgress.taskId) }}
            </DescriptionsItem>
            <DescriptionsItem label="状态">
              <Tag :color="getTaskStatusColor(taskProgress.status)">
                {{ getTaskStatusLabel(taskProgress.status) }}
              </Tag>
            </DescriptionsItem>
            <DescriptionsItem label="进度" :span="2">
              <Progress :percent="Number(taskProgress.progress ?? 0)" />
            </DescriptionsItem>
            <DescriptionsItem label="源数据总数">
              {{ taskProgress.progressTotal }}
            </DescriptionsItem>
            <DescriptionsItem label="源数据已处理">
              {{ taskProgress.progressDone }}
            </DescriptionsItem>
            <DescriptionsItem label="源数据成功">
              {{ taskProgress.successCount }}
            </DescriptionsItem>
            <DescriptionsItem label="源数据失败">
              {{ taskProgress.failedCount }}
            </DescriptionsItem>
            <DescriptionsItem label="源数据跳过">
              {{ taskProgress.skippedCount }}
            </DescriptionsItem>
            <DescriptionsItem label="源数据错误">
              {{ taskProgress.errorCount }}
            </DescriptionsItem>
          </Descriptions>

          <Descriptions
            v-if="isImportTask"
            :column="2"
            bordered
            class="mt-4"
            size="small"
          >
            <DescriptionsItem label="实际写入总数">
              {{ taskImportWriteStats.dataTotalCount }}
            </DescriptionsItem>
            <DescriptionsItem label="实际写入成功">
              {{ taskImportWriteStats.dataSuccessCount }}
            </DescriptionsItem>
            <DescriptionsItem label="实际写入失败">
              {{ taskImportWriteStats.dataFailedCount }}
            </DescriptionsItem>
            <DescriptionsItem label="实际写入跳过">
              {{ taskImportWriteStats.dataSkippedCount }}
            </DescriptionsItem>
            <DescriptionsItem label="实际写入错误">
              {{ taskImportWriteStats.dataErrorCount }}
            </DescriptionsItem>
          </Descriptions>
        </Tabs.TabPane>

        <Tabs.TabPane key="logs" tab="任务日志">
          <Table
            :columns="logsColumns"
            :data-source="logs"
            :loading="logsLoading"
            :pagination="{
              current: logsPageNum,
              onChange: handleLogsPageChange,
              onShowSizeChange: handleLogsPageChange,
              pageSize: logsPageSize,
              showSizeChanger: true,
              total: logsTotal,
            }"
            :scroll="{ x: 1200 }"
            bordered
            row-key="logId"
            size="small"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'level'">
                <component
                  :is="renderDict(record.level, DictEnum.SYS_JOB_LOG_LEVEL)"
                />
              </template>
            </template>
          </Table>
        </Tabs.TabPane>

        <Tabs.TabPane v-if="isImportTask" key="details" tab="导入明细">
          <Space class="mb-3" wrap>
            <span>状态筛选</span>
            <Select
              :options="getDictOptions(DictEnum.SYS_JOB_IMPORT_STATUS)"
              :value="detailStatus"
              allow-clear
              style="width: 180px"
              @change="
                (value) => handleImportStatusChange(value as string | undefined)
              "
            />
          </Space>
          <Table
            :columns="detailsColumns"
            :data-source="importDetails"
            :loading="detailLoading"
            :pagination="{
              current: importPageNum,
              onChange: handleImportPageChange,
              onShowSizeChange: handleImportPageChange,
              pageSize: importPageSize,
              showSizeChanger: true,
              total: importTotal,
            }"
            :scroll="{ x: 1400 }"
            bordered
            row-key="detailId"
            size="small"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <component
                  :is="
                    renderDict(record.status, DictEnum.SYS_JOB_IMPORT_STATUS)
                  "
                />
              </template>
            </template>
          </Table>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  </Page>
</template>
