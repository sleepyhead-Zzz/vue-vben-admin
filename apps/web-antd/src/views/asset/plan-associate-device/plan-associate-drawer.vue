<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRoute } from 'vue-router';

import { useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { assignDevicesToPlan, unAssociatedPlanDevices } from '#/api/asset/plan';

import { columns, querySchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onConfirm: handleSubmit,
  onCancel: handleReset,
  destroyOnClose: true,
});

const route = useRoute();
const planId = route.params.planId as string;

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    trigger: 'row',
  },
  columns: columns?.filter((item) => item.field !== 'action'),
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const { data } = await unAssociatedPlanDevices({
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
    keyField: 'planId',
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

async function handleSubmit() {
  const records = tableApi.grid.getCheckboxRecords();
  const deviceIds = records.map((item) => item.deviceId);
  if (deviceIds.length > 0) {
    await assignDevicesToPlan({ planId, deviceIds });
  }
  handleReset();
  emit('reload');
}

function handleReset() {
  drawerApi.close();
}
</script>

<template>
  <BasicDrawer class="w-[800px]" title="选择设备">
    <BasicTable />
  </BasicDrawer>
</template>
