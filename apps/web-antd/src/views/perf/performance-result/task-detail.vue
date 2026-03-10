<script setup lang="ts">
import { computed, h, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import {
  Alert,
  Button,
  Card,
  Descriptions,
  DescriptionsItem,
  Empty,
  Input,
  message,
  Space,
  Table,
  Tabs,
  Tag,
} from 'ant-design-vue';

import {
  exportCalcJob,
  getCalcJob,
  getCalcJobLogs,
} from '#/api/perf/factPerformanceResult';

type CalcTaskTerminalStatus =
  | 'cancel'
  | 'canceled'
  | 'cancelled'
  | 'completed'
  | 'done'
  | 'error'
  | 'failed'
  | 'success';

const POLL_INTERVAL = 5000;
const TERMINAL_STATUS = new Set<CalcTaskTerminalStatus>([
  'cancel',
  'canceled',
  'cancelled',
  'completed',
  'done',
  'error',
  'failed',
  'success',
]);

const route = useRoute();
const router = useRouter();

const activeKey = ref<'base' | 'logs'>('base');
const loading = ref(false);
const polling = ref(false);
const exportLoading = ref(false);

const job = ref<PerfAPI.PerformanceCalcJobDTO>({});
const manualJobId = ref('');

const logsLoading = ref(false);
const logs = ref<PerfAPI.PerformanceCalcJobLogDTO[]>([]);
const logsPageNum = ref(1);
const logsPageSize = ref(10);
const logsTotal = ref(0);

let timer: null | ReturnType<typeof setInterval> = null;

const currentJobId = computed(() => {
  const raw = route.params.jobId;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return undefined;
  return String(value);
});

const progressPercent = computed(() => {
  const total = Number(job.value.progressTotal ?? 0);
  const done = Number(job.value.progressDone ?? 0);
  if (total <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
});

const canManualExport = computed(
  () => Boolean(currentJobId.value) && !exportLoading.value,
);

const logsColumns = [
  {
    title: '序号',
    dataIndex: 'seq',
    key: 'seq',
    width: 80,
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
    width: 110,
    customRender: ({ text }: { text?: string }) => renderLevelTag(text),
  },
  {
    title: '阶段',
    dataIndex: 'stage',
    key: 'stage',
    width: 120,
  },
  {
    title: '周期键',
    dataIndex: 'periodKey',
    key: 'periodKey',
    width: 140,
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
    width: 100,
  },
  {
    title: '日志内容',
    dataIndex: 'message',
    key: 'message',
    ellipsis: true,
  },
  {
    title: '日志时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180,
  },
];

function renderStatusTag(status?: string) {
  const normalized = (status ?? '').toLowerCase();
  const colorMap: Record<string, string> = {
    completed: 'success',
    done: 'success',
    success: 'success',
    error: 'error',
    failed: 'error',
    running: 'processing',
    queued: 'gold',
    cancel: 'default',
    canceled: 'default',
    cancelled: 'default',
  };
  return colorMap[normalized] ?? 'default';
}

function renderLevelTag(level?: string) {
  const normalized = (level ?? '').toLowerCase();
  const colorMap: Record<string, string> = {
    debug: 'default',
    error: 'error',
    info: 'processing',
    warn: 'warning',
    warning: 'warning',
  };
  return h(
    Tag,
    { color: colorMap[normalized] ?? 'default' },
    () => level || '-',
  );
}

function isTerminalStatus(status?: string) {
  return TERMINAL_STATUS.has(
    (status ?? '').toLowerCase() as CalcTaskTerminalStatus,
  );
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

async function fetchJob() {
  if (!currentJobId.value) {
    job.value = {};
    return;
  }
  const { data } = await getCalcJob({ jobId: currentJobId.value as never });
  job.value = data ?? {};
}

async function fetchLogs() {
  if (!currentJobId.value) {
    logs.value = [];
    logsTotal.value = 0;
    return;
  }
  logsLoading.value = true;
  try {
    const { data } = await getCalcJobLogs({
      jobId: currentJobId.value as never,
      pageNum: logsPageNum.value,
      pageSize: logsPageSize.value,
    });
    logs.value = data?.rows ?? [];
    logsTotal.value = data?.total ?? 0;
  } finally {
    logsLoading.value = false;
  }
}

async function refreshAll() {
  if (!currentJobId.value) {
    job.value = {};
    logs.value = [];
    logsTotal.value = 0;
    return;
  }

  loading.value = true;
  try {
    await Promise.all([fetchJob(), fetchLogs()]);
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

function startPolling() {
  if (!currentJobId.value) return;
  stopPolling();
  timer = setInterval(async () => {
    if (polling.value) return;
    polling.value = true;
    try {
      await Promise.all([fetchJob(), fetchLogs()]);
      if (isTerminalStatus(job.value.status)) {
        stopPolling();
      }
    } finally {
      polling.value = false;
    }
  }, POLL_INTERVAL);
}

function handleBack() {
  router.push('/perf/performance-result');
}

function handleQuery() {
  if (!manualJobId.value) {
    message.warning('请输入任务ID');
    return;
  }
  if (manualJobId.value === currentJobId.value) {
    refreshAll();
    return;
  }
  router.push(`/perf/performance-result/calc-task/${manualJobId.value}`);
}

async function handleLogsPageChange(page: number, pageSize: number) {
  logsPageNum.value = page;
  logsPageSize.value = pageSize;
  await fetchLogs();
}

async function handleManualExport() {
  if (!currentJobId.value || exportLoading.value) return;
  exportLoading.value = true;
  try {
    await exportCalcJob({ jobId: currentJobId.value as never });
    message.success('已提交重导出请求');
    await refreshAll();
    if (!isTerminalStatus(job.value.status)) {
      startPolling();
    }
  } catch (error) {
    message.error(getErrorMessage(error, '重导出失败，请稍后重试'));
  } finally {
    exportLoading.value = false;
  }
}

watch(
  () => route.params.jobId,
  async () => {
    stopPolling();
    manualJobId.value = currentJobId.value ?? '';
    logsPageNum.value = 1;
    await refreshAll();
    if (currentJobId.value && !isTerminalStatus(job.value.status)) {
      startPolling();
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  stopPolling();
});
</script>

<template>
  <Page :auto-content-height="true">
    <Card :loading="loading" title="最终绩效计算任务详情">
      <template #extra>
        <Space>
          <Button @click="handleBack">返回结果页</Button>
        </Space>
      </template>

      <div class="mb-4 flex flex-wrap items-center gap-3">
        <Input
          v-model:value="manualJobId"
          class="w-[220px]"
          placeholder="请输入任务ID"
        />
        <Button
          type="primary"
          v-access:code="['perf:FactPerformanceResultCalc:query']"
          @click="handleQuery"
        >
          查询任务
        </Button>
        <Button
          :disabled="!canManualExport"
          :loading="exportLoading"
          v-access:code="['perf:FactPerformanceResultCalc:export']"
          @click="handleManualExport"
        >
          手动重导出 OSS
        </Button>
      </div>

      <Alert
        v-if="!currentJobId"
        class="mb-4"
        message="请输入任务ID查询计算任务；也可以从结果页触发计算后自动跳转。"
        show-icon
        type="info"
      />

      <div
        v-if="currentJobId"
        v-access:code="['perf:FactPerformanceResultCalc:query']"
      >
        <Descriptions :column="3" bordered size="small">
          <DescriptionsItem label="任务ID">
            {{ job.id || currentJobId }}
          </DescriptionsItem>
          <DescriptionsItem label="任务类型">
            {{ job.jobType || '-' }}
          </DescriptionsItem>
          <DescriptionsItem label="状态">
            <Tag :color="renderStatusTag(job.status)">
              {{ job.status || '-' }}
            </Tag>
          </DescriptionsItem>
          <DescriptionsItem label="进度">
            {{ job.progressDone ?? 0 }}/{{ job.progressTotal ?? 0 }} ({{
              progressPercent
            }}%)
          </DescriptionsItem>
          <DescriptionsItem label="成功人数">
            {{ job.successCount ?? 0 }}
          </DescriptionsItem>
          <DescriptionsItem label="失败人数">
            {{ job.failedCount ?? 0 }}
          </DescriptionsItem>
          <DescriptionsItem label="跳过人数">
            {{ job.skippedCount ?? 0 }}
          </DescriptionsItem>
          <DescriptionsItem label="错误条数">
            {{ job.errorCount ?? 0 }}
          </DescriptionsItem>
          <DescriptionsItem label="触发人">
            {{ job.createdBy ?? '-' }}
          </DescriptionsItem>
          <DescriptionsItem label="创建时间">
            {{ job.createTime || '-' }}
          </DescriptionsItem>
          <DescriptionsItem label="开始时间">
            {{ job.startedAt || '-' }}
          </DescriptionsItem>
          <DescriptionsItem label="结束时间">
            {{ job.finishedAt || '-' }}
          </DescriptionsItem>
        </Descriptions>

        <Tabs v-model:active-key="activeKey" class="mt-4">
          <Tabs.TabPane key="base" tab="基本信息">
            <Descriptions :column="2" bordered size="small">
              <DescriptionsItem label="workflowId">
                {{ job.workflowId || '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="runId">
                {{ job.runId || '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="导出状态">
                <Tag :color="renderStatusTag(job.exportStatus)">
                  {{ job.exportStatus || '-' }}
                </Tag>
              </DescriptionsItem>
              <DescriptionsItem label="导出 OSS ID">
                {{ job.exportOssId ?? '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="导出文件名">
                {{ job.exportFileName || '-' }}
              </DescriptionsItem>
              <DescriptionsItem label="导出时间">
                {{ job.exportedAt || '-' }}
              </DescriptionsItem>
              <DescriptionsItem :span="2" label="任务信息">
                {{ job.message || '-' }}
              </DescriptionsItem>
              <DescriptionsItem :span="2" label="参数快照">
                <pre class="m-0 whitespace-pre-wrap break-all">{{
                  job.paramsJson || '-'
                }}</pre>
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
                pageSize: logsPageSize,
                total: logsTotal,
                showSizeChanger: true,
                onChange: handleLogsPageChange,
                onShowSizeChange: handleLogsPageChange,
              }"
              :scroll="{ x: 1100 }"
              bordered
              row-key="id"
            >
              <template #emptyText>
                <Empty description="暂无日志" />
              </template>
            </Table>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Card>
  </Page>
</template>
