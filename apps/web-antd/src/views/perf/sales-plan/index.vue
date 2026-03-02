<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import { optionPeriodSelect } from '#/api/perf/period';
import { optionProductSelect } from '#/api/perf/product';
import {
  exportSalesPlanByExcel,
  getPagedSalesPlan,
  removeSalesPlan,
} from '#/api/perf/salesPlan';
import { commonDownloadExcel } from '#/utils/file/download';

import { columns, querySchema } from './data';
import salesPlanImportModal from './sales-plan-import-modal.vue';
import salesPlanModal from './sales-plan-modal.vue';

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
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    // trigger: 'row',
  },
  // 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
  // columns: columns(),
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const { data } = await getPagedSalesPlan({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'planId',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'perf-salesPlan-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [SalesPlanModal, modalApi] = useVbenModal({
  connectedComponent: salesPlanModal,
});
const [SalesPlanImportModal, importModalApi] = useVbenModal({
  connectedComponent: salesPlanImportModal,
});

function getPeriodLabel(
  period: PerfAPI.PerfDimPeriodDTO | PerfAPI.PerfDimPeriodVO,
) {
  if (period.month) {
    return `${period.year}年${period.month}月`;
  }
  if (period.quarter) {
    return `${period.year}年第${period.quarter}季度`;
  }
  return `${period.year}年`;
}

async function setupQueryOptions() {
  const [productRes, periodRes] = await Promise.all([
    optionProductSelect(),
    optionPeriodSelect(),
  ]);

  const productOptions = (productRes.data ?? []).map((product) => ({
    label: `${product.productName || '-'}(${product.productId})`,
    value: product.productId,
  }));
  const periodOptions = (periodRes.data ?? []).map((period) => ({
    label: getPeriodLabel(period),
    value: period.periodId,
  }));

  tableApi.formApi.updateSchema([
    {
      componentProps: {
        options: productOptions,
      },
      fieldName: 'productId',
    },
    {
      componentProps: {
        options: periodOptions,
      },
      fieldName: 'periodId',
    },
  ]);
}

onMounted(async () => {
  try {
    await setupQueryOptions();
  } catch (error) {
    console.error(error);
  }
});

function handleAdd() {
  modalApi.setData({});
  modalApi.open();
}

function handleImport() {
  importModalApi.open();
}

async function handleEdit(row: API.PerfFactSalesPlanDTO) {
  modalApi.setData({ id: row.planId });
  modalApi.open();
}

async function handleDelete(row: API.PerfFactSalesPlanDTO) {
  if (typeof row.planId !== 'number') {
    return;
  }
  await removeSalesPlan({ salesPlanIds: [row.planId] });
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows
    .map((row: API.PerfFactSalesPlanDTO) => row.planId)
    .filter((id): id is number => typeof id === 'number');
  if (ids.length === 0) {
    return;
  }
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await removeSalesPlan({ salesPlanIds: ids });
      await tableApi.query();
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(
    exportSalesPlanByExcel,
    '销量计划数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="销量计划列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['perf:salesPlan:import']"
            @click="handleImport"
          >
            {{ $t('pages.common.import') }}
          </a-button>
          <a-button
            v-access:code="['perf:salesPlan:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['perf:salesPlan:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['perf:salesPlan:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['perf:salesPlan:edit']"
            @click.stop="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </ghost-button>
          <Popconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            title="确认删除？"
            @confirm="handleDelete(row)"
          >
            <ghost-button
              danger
              v-access:code="['perf:salesPlan:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <SalesPlanModal @reload="tableApi.query()" />
    <SalesPlanImportModal @reload="tableApi.query()" />
  </Page>
</template>
