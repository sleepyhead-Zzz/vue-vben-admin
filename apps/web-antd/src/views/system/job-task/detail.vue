<script setup lang="ts">
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
} from 'ant-design-vue';

import {
  getJob,
  getJobProgress,
  pageImportDetails,
  pageJobLogs,
  undoImport,
} from '#/api/system/jobTask';
import { getDictOptions } from '#/utils/dict';
import { renderDict } from '#/utils/render';

type TabKey = 'base' | 'details' | 'logs' | 'progress';

const POLL_INTERVAL = 5000;

const route = useRoute();
const router = useRouter();

const activeKey = ref<TabKey>('base');
const loading = ref(false);
const undoLoading = ref(false);
const polling = ref(false);

const task = ref<SystemAPI.JobTaskDTO>({});
const progress = ref<SystemAPI.JobTaskProgressDTO>({});

const logsLoading = ref(false);
const logs = ref<SystemAPI.JobLogDTO[]>([]);
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

const taskId = computed(() => {
  const id = route.params.taskId;
  const taskIdRaw = Array.isArray(id) ? id[0] : id;

  if (!taskIdRaw) return undefined;
  return taskIdRaw;
});

const canUndoImport = computed(
  () => Boolean(taskId.value) && !loading.value && !undoLoading.value,
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

function isTerminalStatus(status?: string) {
  const normalized = (status ?? '').toLowerCase();
  const terminalStatus = new Set([
    'cancel',
    'canceled',
    'cancelled',
    'completed',
    'done',
    'error',
    'failed',
    'failure',
    'success',
  ]);
  return terminalStatus.has(normalized);
}

async function fetchTaskBase() {
  if (!taskId.value) return;
  const { data } = await getJob({ taskId: taskId.value });
  task.value = data ?? {};
}

async function fetchProgress() {
  if (!taskId.value) return;
  const { data } = await getJobProgress({ taskId: taskId.value });
  progress.value = data ?? {};
}

async function fetchLogs() {
  if (!taskId.value) return;
  logsLoading.value = true;
  try {
    const { data } = await pageJobLogs({
      taskId: taskId.value,
      pageNum: logsPageNum.value,
      pageSize: logsPageSize.value,
    });
    logs.value = data.rows ?? [];
    logsTotal.value = data.total ?? 0;
  } finally {
    logsLoading.value = false;
  }
}

async function fetchImportDetails() {
  if (!taskId.value) return;
  detailLoading.value = true;
  try {
    const { data } = await pageImportDetails({
      taskId: taskId.value,
      status: detailStatus.value,
      pageNum: importPageNum.value,
      pageSize: importPageSize.value,
    });
    importDetails.value = data.rows ?? [];
    importTotal.value = data.total ?? 0;
  } finally {
    detailLoading.value = false;
  }
}

async function refreshAll() {
  if (!taskId.value) return;

  loading.value = true;
  try {
    await Promise.all([
      fetchTaskBase(),
      fetchProgress(),
      fetchLogs(),
      fetchImportDetails(),
    ]);
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
  if (!taskId.value) return;
  stopPolling();
  timer = setInterval(async () => {
    if (polling.value) return;
    polling.value = true;
    try {
      await Promise.all([fetchProgress(), fetchLogs(), fetchImportDetails()]);
      if (isTerminalStatus(progress.value.status || task.value.status)) {
        stopPolling();
      }
    } finally {
      polling.value = false;
    }
  }, POLL_INTERVAL);
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

async function handleUndoImport() {
  if (!taskId.value || undoLoading.value) return;
  undoLoading.value = true;
  try {
    await undoImport({ taskId: taskId.value });
    message.success('撤销导入成功');
    await refreshAll();
    if (!isTerminalStatus(progress.value.status || task.value.status)) {
      startPolling();
    }
  } catch (error) {
    message.error(getErrorMessage(error, '撤销导入失败，请稍后重试'));
  } finally {
    undoLoading.value = false;
  }
}

watch(
  () => route.params.taskId,
  async () => {
    stopPolling();
    if (!taskId.value) return;
    logsPageNum.value = 1;
    detailStatus.value = undefined;
    importPageNum.value = 1;
    await refreshAll();
    if (!isTerminalStatus(progress.value.status || task.value.status)) {
      startPolling();
    }
  },
  {
    immediate: true,
  },
);

onBeforeUnmount(() => {
  stopPolling();
});
</script>

<template>
  <Page :auto-content-height="true">
    <Card :loading="loading" title="任务详情">
      <template #extra>
        <Button @click="handleBack">返回列表</Button>
      </template>

      <Descriptions :column="3" bordered size="small">
        <DescriptionsItem label="任务ID">
          {{ task.taskId }}
        </DescriptionsItem>
        <DescriptionsItem label="任务类型">
          {{ task.taskType || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="业务类型">
          {{ task.businessType || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="任务状态">
          <component
            :is="renderDict(task.status || '', DictEnum.SYS_JOB_TASK_STATUS)"
          />
        </DescriptionsItem>
        <DescriptionsItem label="任务进度" :span="2">
          <Progress
            :percent="Number(progress.progress ?? task.progress ?? 0)"
          />
        </DescriptionsItem>
        <DescriptionsItem label="行数统计" :span="2">
          {{
            `${progress.processedRows ?? task.processedRows ?? 0}/${progress.totalRows ?? task.totalRows ?? 0}`
          }}
          （成功 {{ progress.successRows ?? task.successRows ?? 0 }}，失败
          {{ progress.failRows ?? task.failRows ?? 0 }}）
        </DescriptionsItem>
        <DescriptionsItem label="创建时间">
          {{ task.createTime || '-' }}
        </DescriptionsItem>
      </Descriptions>

      <Alert
        v-if="task.errorMessage"
        class="mt-4"
        :message="task.errorMessage"
        show-icon
        type="error"
      />

      <Tabs v-model:active-key="activeKey" class="mt-4">
        <Tabs.TabPane key="base" tab="基本信息">
          <Descriptions :column="2" bordered size="small">
            <DescriptionsItem label="任务ID">
              {{ task.taskId }}
            </DescriptionsItem>
            <DescriptionsItem label="状态">
              <component
                :is="
                  renderDict(task.status || '', DictEnum.SYS_JOB_TASK_STATUS)
                "
              />
            </DescriptionsItem>
            <DescriptionsItem label="workflowId">
              {{ task.workflowId || '-' }}
            </DescriptionsItem>
            <DescriptionsItem label="runId">
              {{ task.runId || '-' }}
            </DescriptionsItem>
            <DescriptionsItem label="创建人">
              {{ task.creatorId || '-' }}
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
        </Tabs.TabPane>

        <Tabs.TabPane key="progress" tab="任务进度">
          <Descriptions :column="2" bordered size="small">
            <DescriptionsItem label="任务ID">
              {{ progress.taskId || task.taskId || '-' }}
            </DescriptionsItem>
            <DescriptionsItem label="状态">
              <component
                :is="
                  renderDict(
                    progress.status || task.status || '',
                    DictEnum.SYS_JOB_TASK_STATUS,
                  )
                "
              />
            </DescriptionsItem>
            <DescriptionsItem label="进度" :span="2">
              <Progress :percent="Number(progress.progress ?? 0)" />
            </DescriptionsItem>
            <DescriptionsItem label="总行数">
              {{ progress.totalRows ?? 0 }}
            </DescriptionsItem>
            <DescriptionsItem label="已处理行数">
              {{ progress.processedRows ?? 0 }}
            </DescriptionsItem>
            <DescriptionsItem label="成功行数">
              {{ progress.successRows ?? 0 }}
            </DescriptionsItem>
            <DescriptionsItem label="失败行数">
              {{ progress.failRows ?? 0 }}
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
            }"
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

        <Tabs.TabPane key="details" tab="导入明细">
          <Space class="mb-3">
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
            <Popconfirm
              :disabled="!canUndoImport"
              title="确认撤销本任务对应的导入数据吗？"
              @confirm="handleUndoImport"
            >
              <a-button
                :disabled="!canUndoImport"
                :loading="undoLoading"
                danger
                v-access:code="['system:job:undo']"
              >
                撤销导入
              </a-button>
            </Popconfirm>
          </Space>
          <Table
            :columns="detailsColumns"
            :data-source="importDetails"
            :loading="detailLoading"
            :pagination="{
              current: importPageNum,
              pageSize: importPageSize,
              total: importTotal,
              showSizeChanger: true,
              onChange: handleImportPageChange,
            }"
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
