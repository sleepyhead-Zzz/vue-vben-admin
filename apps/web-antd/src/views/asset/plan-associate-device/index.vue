<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRoute } from 'vue-router';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import { associatedPlanDevices, revokeDevicesFromPlan } from '#/api/asset/plan';

import { columns, querySchema } from './data';
import roleAssignDrawer from './plan-associate-drawer.vue';

const route = useRoute();
const planId = route.params.planId as string;

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
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    // trigger: 'row',
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const { data } = await associatedPlanDevices({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          planId,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'deviceId',
  },
  id: 'asset-plan-associate-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [RoleAssignDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: roleAssignDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

/**
 * 取消授权 一条记录
 */
async function handleAuthCancel(record: AssetAPI.AssetDeviceDTO) {
  await revokeDevicesFromPlan({ deviceIds: [record.deviceId], planId });
  await tableApi.query();
}

/**
 * 批量取消授权
 */
function handleMultipleAuthCancel() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: AssetAPI.AssetDeviceDTO) => row.deviceId);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认取消选中的${ids.length}条授权记录吗？`,
    onOk: async () => {
      await revokeDevicesFromPlan({ planId, deviceIds: ids });
      await tableApi.query();
      tableApi.grid.clearCheckboxRow();
    },
  });
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="已关联的巡检设备列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['asset:plan:remove']"
            @click="handleMultipleAuthCancel"
          >
            取消授权
          </a-button>
          <a-button
            type="primary"
            v-access:code="['asset:plan:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Popconfirm
          :get-popup-container="getVxePopupContainer"
          :title="`是否取消关联巡检设备[${row.deviceName} - ${row.deviceCode}]?`"
          placement="left"
          @confirm="handleAuthCancel(row)"
        >
          <ghost-button
            danger
            v-access:code="['asset:plan:remove']"
            @click.stop=""
          >
            取消授权
          </ghost-button>
        </Popconfirm>
      </template>
    </BasicTable>
    <RoleAssignDrawer @reload="tableApi.query()" />
  </Page>
</template>
