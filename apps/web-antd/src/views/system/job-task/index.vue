<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { message, Popconfirm, Progress, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { exportPerfCalc, pageJobs, undoImport } from '#/api/system/jobTask';
import { renderDict } from '#/utils/render';

import { columns, querySchema } from './data';
import {
  getBusinessTypeLabel,
  getJobTaskDetailPageKey,
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
        <component
          :is="renderDict(row.status || '', DictEnum.SYS_JOB_TASK_STATUS)"
        />
      </template>

      <template #progress="{ row }">
        <div class="min-w-[160px]">
          <Progress
            :percent="Math.max(0, Math.min(100, Number(row.progress ?? 0)))"
            size="small"
          />
          <div class="text-text-secondary text-xs">
            {{ row.progressDone ?? 0 }}/{{ row.progressTotal ?? 0 }}
          </div>
        </div>
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
