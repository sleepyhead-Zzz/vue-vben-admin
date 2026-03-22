<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  exportFactNewCustomerScoreByExcel,
  getPagedFactNewCustomerScore,
} from '#/api/perf/factNewCustomerScore';
import { commonDownloadExcel } from '#/utils/file/download';

import { columns, querySchema } from './data';

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
        const { data } = await getPagedFactNewCustomerScore({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'newCustomerId',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'perf-FactNewCustomerScore-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

function handleDownloadExcel() {
  commonDownloadExcel(
    exportFactNewCustomerScoreByExcel,
    '新客户得分记录数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="新客户得分记录列表">
      <template #toolbar-tools>
        <a-button
          v-access:code="['perf:FactNewCustomerScore:export']"
          @click="handleDownloadExcel"
        >
          {{ $t('pages.common.export') }}
        </a-button>
      </template>
    </BasicTable>
  </Page>
</template>
