<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';
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
  // 处理区间选择器RangePicker时间格式 将一个字段映射为两个字段 搜索/导出会用到
  // 不需要直接删除
  // fieldMappingTime: [
  //  [
  //    'createTime',
  //    ['params[beginTime]', 'params[endTime]'],
  //    ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
  //  ],
  // ],
};

const gridOptions: VxeGridProps = {
  // 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
  // columns: columns(),
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
  // 表格全局唯一表示 保存列配置需要用到
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

const latestCalcJobId = ref<string>();

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

function navigateToCalcTask(jobId?: number | string) {
  if (jobId !== undefined && jobId !== null && `${jobId}` !== '') {
    const normalizedJobId = String(jobId);
    latestCalcJobId.value = normalizedJobId;
    router.push(`/perf/performance-result/calc-task/${normalizedJobId}`);
    return;
  }

  message.warning('暂无最近任务，请先触发计算或手动输入任务ID');
  router.push('/perf/performance-result/calc-task');
}

async function handleCalcSubmitted({
  mode,
  response,
}: {
  mode: CalcTriggerMode;
  response: PerfAPI.ResponseDTOPerformanceCalcTriggerResponseDTO;
}) {
  const actionLabel = mode === 'monthly' ? '月度计算' : '区间计算';
  const jobId =
    response.data?.jobId === undefined || response.data?.jobId === null
      ? undefined
      : String(response.data.jobId);

  if (response.code === 200) {
    message.success(`${actionLabel}任务已提交`);
    navigateToCalcTask(jobId);
    return;
  }

  if (response.code === 105) {
    message.warning(response.message || '已有计算任务正在执行');
    navigateToCalcTask(jobId);
    return;
  }

  message.error(response.message || `${actionLabel}提交失败，请稍后重试`);
}
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
            @click="navigateToCalcTask(latestCalcJobId)"
          >
            查看计算任务
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
