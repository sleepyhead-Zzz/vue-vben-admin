<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  batchRemoveCard,
  exportCardByExcel,
  getPagedCards,
} from '#/api/regulatory/card';
import { commonDownloadExcel } from '#/utils/file/download';

import cardImportModal from './card-import-modal.vue';
import cardModal from './card-modal.vue';
import { columns, querySchema } from './data';

const formOptions: VbenFormProps = {
  collapsed: true,
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
        const { data } = await getPagedCards({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'cardId',
  },
  // 表格全局唯一表示 保存列配置需要用到
  id: 'regulatory-card-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [CardModal, modalApi] = useVbenModal({
  connectedComponent: cardModal,
});

function handleAdd() {
  modalApi.setData({});
  modalApi.open();
}

async function handleEdit(row: RegulatoryAPI.RegCardDTO) {
  modalApi.setData({ id: row.cardId });
  modalApi.open();
}

async function handleDelete(row: RegulatoryAPI.RegCardDTO) {
  await batchRemoveCard({ cardIds: [row.cardId] });
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: RegulatoryAPI.RegCardDTO) => row.cardId);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await batchRemoveCard({ cardIds: ids });
      await tableApi.query();
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(
    exportCardByExcel,
    '资产信息数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
}
const [CardImportModal, cardImportModalApi] = useVbenModal({
  connectedComponent: cardImportModal,
});
function handleImportExcel() {
  cardImportModalApi.open();
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="资产信息列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['regulatory:card:import']"
            @click="handleImportExcel"
          >
            {{ $t('pages.common.import') }}
          </a-button>
          <a-button
            v-access:code="['regulatory:card:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['regulatory:card:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['regulatory:card:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['regulatory:card:edit']"
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
              v-access:code="['regulatory:card:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <CardModal @reload="tableApi.query()" />
    <CardImportModal @reload="tableApi.query()" />
  </Page>
</template>
