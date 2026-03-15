<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { message, Popconfirm, Progress, Space, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { exportPerfCalc, pageJobs, undoImport } from '#/api/system/jobTask';

import { columns, querySchema } from './data';
import {
  getBusinessTypeLabel,
  getImportWriteStats,
  getJobTaskDetailPageKey,
  getTaskCount,
  getTaskStatusColor,
  getTaskStatusLabel,
  getTaskTypeLabel,
  isTaskTerminalStatus,
} from './shared';

type TaskListQueryForm = {
  businessType?: string;
  createTimeRange?: string[];
  creator?: string;
  status?: string;
  taskType?: string;
};

const route = useRoute();
const router = useRouter();

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gridOptions: VxeGridProps = {
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const { businessType, createTimeRange, creator, status, taskType } =
          formValues as TaskListQueryForm;
        const [beginTime, endTime] = Array.isArray(createTimeRange)
          ? createTimeRange
          : [];
        const beginTimeValue = beginTime ? new Date(beginTime) : undefined;
        const endTimeValue = endTime ? new Date(endTime) : undefined;
        const creatorValue =
          creator === '' || creator === undefined || creator === null
            ? undefined
            : creator;

        const { data } = await pageJobs({
          beginTime: beginTimeValue,
          businessType,
          creator: creatorValue as never,
          endTime: endTimeValue,
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          status,
          taskType,
          timeRangeColumn:
            beginTimeValue && endTimeValue ? 'createTime' : undefined,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'taskId',
  },
  id: 'system-job-task-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

function getInitialFiltersFromRoute(): Partial<TaskListQueryForm> {
  const filters: Partial<TaskListQueryForm> = {};
  const { businessType, creator, status, taskType } = route.query;

  if (typeof taskType === 'string' && taskType) {
    filters.taskType = taskType;
  }

  if (typeof businessType === 'string' && businessType) {
    filters.businessType = businessType;
  }

  if (typeof status === 'string' && status) {
    filters.status = status;
  }

  if (typeof creator === 'string' && creator) {
    filters.creator = creator;
  }

  return filters;
}

function navigateToTask(
  row: SystemAPI.SysJobTaskDTO,
  tab?: 'details' | 'logs',
) {
  if (!row.taskId) return;
  router.push({
    path: `/system/job-task/${row.taskId}`,
    query: {
      pageKey: getJobTaskDetailPageKey(row.taskId),
      ...(tab ? { tab } : {}),
    },
  });
}

function isImportTask(row: SystemAPI.SysJobTaskDTO) {
  return row.taskType === 'excel_import';
}

function getRowImportWriteStats(row: SystemAPI.SysJobTaskDTO) {
  return getImportWriteStats(row.importInfo);
}

function isPerfTask(row: SystemAPI.SysJobTaskDTO) {
  return row.taskType === 'perf_calc';
}

function canManualExport(row: SystemAPI.SysJobTaskDTO) {
  return isPerfTask(row) && isTaskTerminalStatus(row.status);
}

async function handleUndoImport(row: SystemAPI.SysJobTaskDTO) {
  if (!row.taskId) return;
  await undoImport({ taskId: row.taskId });
  message.success('撤销导入成功');
  await tableApi.query();
}

async function handleManualExport(row: SystemAPI.SysJobTaskDTO) {
  if (!row.taskId) return;
  await exportPerfCalc({ taskId: row.taskId });
  message.success('已提交手动导出请求');
  await tableApi.query();
}

onMounted(async () => {
  const initialFilters = getInitialFiltersFromRoute();

  if (Object.keys(initialFilters).length === 0) {
    return;
  }

  await nextTick();
  await tableApi.formApi.setValues(initialFilters);
  await tableApi.query();
});
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="任务列表">
      <template #taskType="{ row }">
        {{ getTaskTypeLabel(row.taskType) }}
      </template>

      <template #businessType="{ row }">
        {{ getBusinessTypeLabel(row.businessType) }}
      </template>

      <template #status="{ row }">
        <Tag :color="getTaskStatusColor(row.status)">
          {{ getTaskStatusLabel(row.status) }}
        </Tag>
      </template>

      <template #progress="{ row }">
        <div class="min-w-[160px]">
          <Progress
            :percent="Math.max(0, Math.min(100, Number(row.progress ?? 0)))"
            size="small"
          />
          <div class="text-text-secondary text-xs">
            任务进度：{{ getTaskCount(row.progressDone) }}/{{
              getTaskCount(row.progressTotal)
            }}
          </div>
        </div>
      </template>

      <template #importWriteStats="{ row }">
        <div v-if="isImportTask(row)" class="min-w-[200px] text-xs leading-6">
          <div>
            实际写入总数：{{ getRowImportWriteStats(row).dataTotalCount }}
          </div>
          <div>
            成功 {{ getRowImportWriteStats(row).dataSuccessCount }}，失败
            {{ getRowImportWriteStats(row).dataFailedCount }}，跳过
            {{ getRowImportWriteStats(row).dataSkippedCount }}，错误
            {{ getRowImportWriteStats(row).dataErrorCount }}
          </div>
        </div>
        <span v-else>-</span>
      </template>

      <template #action="{ row }">
        <Space wrap>
          <a-button
            type="link"
            v-access:code="['system:job:query']"
            @click.stop="navigateToTask(row)"
          >
            详情
          </a-button>
          <a-button
            type="link"
            v-access:code="['system:job:query']"
            @click.stop="navigateToTask(row, 'logs')"
          >
            日志
          </a-button>
          <a-button
            v-if="isImportTask(row)"
            type="link"
            v-access:code="['system:job:query']"
            @click.stop="navigateToTask(row, 'details')"
          >
            导入明细
          </a-button>
          <Popconfirm
            v-if="isImportTask(row)"
            title="确认撤销本任务对应的导入数据吗？"
            @confirm="handleUndoImport(row)"
          >
            <a-button type="link" v-access:code="['system:job:undo']">
              撤销导入
            </a-button>
          </Popconfirm>
          <a-button
            v-if="isPerfTask(row)"
            :disabled="!canManualExport(row)"
            type="link"
            v-access:code="['perf:FactPerformanceResultCalc:export']"
            @click.stop="handleManualExport(row)"
          >
            手动导出
          </a-button>
        </Space>
      </template>
    </BasicTable>
  </Page>
</template>
