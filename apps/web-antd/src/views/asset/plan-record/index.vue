<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  exportInspectionByExcel,
  getPagedInspection,
  removeInspection,
} from '#/api/asset/inspection';
import { commonDownloadExcel } from '#/utils/file/download';

import { columns, querySchema } from './data';
import planRecordDrawer from './plan-record-drawer.vue';

/* ---------------- Form ---------------- */
const formOptions: VbenFormProps = {
  collapsed: false,
  submitOnChange: true, // ⭐ Form 变化即查询（官方示例同款）
  schema: querySchema(),
};

/* ---------------- Grid ---------------- */
const gridOptions: VxeGridProps = {
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        const { data } = await getPagedInspection({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'inspectionId',
  },
  id: 'asset-inspection-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

/* ---------------- Drawer ---------------- */
const [PlanRecordDrawer, modalApi] = useVbenModal({
  connectedComponent: planRecordDrawer,
});

async function handleEdit(row: AssetAPI.AssetInspectionDTO) {
  modalApi.setData({ id: row.inspectionId });
  modalApi.open();
}

async function handleDelete(row: AssetAPI.AssetInspectionDTO) {
  await removeInspection({ inspectionIds: [row.inspectionId] });
  tableApi.reload(); // ⭐ reload 而不是 query
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: AssetAPI.AssetInspectionDTO) => row.inspectionId);

  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的 ${ids.length} 条记录吗？`,
    onOk: async () => {
      await removeInspection({ inspectionIds: ids });
      tableApi.reload();
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(
    exportInspectionByExcel,
    '巡检记录数据',
    tableApi.formApi.form.values,
  );
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="巡检记录列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['asset:inspection:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['asset:inspection:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <!-- <a-button
            type="primary"
            v-access:code="['asset:inspection:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button> -->
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['asset:inspection:edit']"
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
              v-access:code="['asset:inspection:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <PlanRecordDrawer @reload="tableApi.query()" />
  </Page>
</template>
