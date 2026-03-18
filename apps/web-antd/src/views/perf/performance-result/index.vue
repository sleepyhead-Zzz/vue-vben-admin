<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { PerfQuerySelectOption } from '../_shared/query-form-options';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  exportFactPerformanceResultByExcel,
  getPagedFactPerformanceResult,
} from '#/api/perf/factPerformanceResult';
import { commonDownloadExcel } from '#/utils/file/download';
import { getJobTaskDetailPageKey } from '#/views/system/job-task/shared';

import {
  createPerfRemoteUserQuerySelectProps,
  createPerfStaticQuerySelectProps,
  fetchPerfPeriodQueryOptions,
  fetchPerfUserQueryOptions,
  replacePerfQuerySelectOptions,
} from '../_shared/query-form-options';
import calcTriggerModal from './calc-trigger-modal.vue';
import { columns, querySchema } from './data';
import performanceResultModal from './performance-result-modal.vue';

type CalcTriggerMode = 'monthly' | 'range';

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
        const { data } = await getPagedFactPerformanceResult({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'performanceId',
  },
  id: 'perf-FactPerformanceResult-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [FactPerformanceResultModal, modalApi] = useVbenModal({
  connectedComponent: performanceResultModal,
});
const [CalcTriggerModal, calcTriggerModalApi] = useVbenModal({
  connectedComponent: calcTriggerModal,
});

const userOptions = reactive<PerfQuerySelectOption[]>([]);
const periodOptions = reactive<PerfQuerySelectOption[]>([]);

async function handleUserSearch(keyword: string) {
  replacePerfQuerySelectOptions(
    userOptions,
    await fetchPerfUserQueryOptions(keyword),
  );
}

async function setupQueryOptions() {
  replacePerfQuerySelectOptions(
    periodOptions,
    await fetchPerfPeriodQueryOptions(),
  );

  tableApi.formApi.updateSchema([
    {
      fieldName: 'userId',
      componentProps: createPerfRemoteUserQuerySelectProps(
        userOptions,
        handleUserSearch,
      ),
    },
    {
      fieldName: 'periodId',
      componentProps: createPerfStaticQuerySelectProps(periodOptions),
    },
  ]);
}

async function handleDetail(row: PerfAPI.PerfFactPerformanceResultDTO) {
  if (!row.performanceId) {
    message.warning('记录ID缺失，无法查看详情');
    return;
  }
  modalApi.setData({ id: row.performanceId });
  modalApi.open();
}

function handleDownloadExcel() {
  commonDownloadExcel(
    exportFactPerformanceResultByExcel,
    '最终绩效结果锁定：避免历史规则变动导致分数变化数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
}

function openCalcTriggerModal(mode: CalcTriggerMode) {
  calcTriggerModalApi.setData({ mode });
  calcTriggerModalApi.open();
}

function openPerfTaskCenter(
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  query: Record<string, string> = { taskType: 'perf_calc' },
) {
  router.push({
    path: '/system/job-task',
    query,
  });
}

function navigateToTaskDetail(taskId?: number | string) {
  if (taskId === undefined || taskId === null || `${taskId}` === '') {
    return false;
  }

  router.push({
    path: `/system/job-task/${String(taskId)}`,
    query: {
      pageKey: getJobTaskDetailPageKey(taskId),
    },
  });
  return true;
}

async function handleCalcSubmitted({
  mode,
  response,
}: {
  mode: CalcTriggerMode;
  response: PerfAPI.ResponseDTOPerformanceCalcTriggerResponseDTO;
}) {
  const actionLabel = mode === 'monthly' ? '月度计算' : '区间计算';
  const taskId = response.data?.taskId;

  if (response.code === 200) {
    message.success(`${actionLabel}任务已提交`);
    if (!navigateToTaskDetail(taskId)) {
      openPerfTaskCenter();
    }
    return;
  }

  if (response.code === 105) {
    message.warning(response.message || '已有计算任务正在执行');
    if (!navigateToTaskDetail(taskId)) {
      openPerfTaskCenter({ status: 'running', taskType: 'perf_calc' });
    }
    return;
  }

  message.error(response.message || `${actionLabel}提交失败，请稍后重试`);
}

onMounted(async () => {
  try {
    await setupQueryOptions();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable
      table-title="最终绩效结果锁定：避免历史规则变动导致分数变化列表"
    >
      <template #toolbar-tools>
        <Space>
          <a-button
            type="primary"
            v-access:code="['perf:FactPerformanceResultCalc:triggerMonthly']"
            @click="openCalcTriggerModal('monthly')"
          >
            触发月度计算
          </a-button>
          <a-button
            v-access:code="['perf:FactPerformanceResultCalc:triggerRange']"
            @click="openCalcTriggerModal('range')"
          >
            触发区间计算
          </a-button>
          <a-button
            v-access:code="['perf:FactPerformanceResultCalc:detail']"
            @click="openPerfTaskCenter()"
          >
            查看绩效任务
          </a-button>
          <a-button
            v-access:code="['perf:FactPerformanceResult:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['perf:FactPerformanceResult:query']"
            @click.stop="handleDetail(row)"
          >
            详情
          </ghost-button>
        </Space>
      </template>
    </BasicTable>
    <FactPerformanceResultModal />
    <CalcTriggerModal @submitted="handleCalcSubmitted" />
  </Page>
</template>
