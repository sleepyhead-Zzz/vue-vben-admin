<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { nextTick, onMounted } from 'vue';

import { Page } from '@vben/common-ui';

import { message, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getLocationList } from '#/api/asset/location';
import { getPlanLocations, savePlanLocations } from '#/api/asset/plan';

import { columns, querySchema } from './data';

/**
 * 父页面传入
 * 有 planId = 编辑
 * 无 planId = 新增
 */
const props = defineProps<{
  planId?: string;
}>();

/* 查询表单 */
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

/* 表格配置 */
const gridOptions: VxeGridProps = {
  columns,
  height: 'auto',

  rowConfig: {
    keyField: 'locationId',
  },

  checkboxConfig: {
    checkStrictly: false, // 父子节点联动
  },

  pagerConfig: {
    enabled: false,
  },

  proxyConfig: {
    ajax: {
      query: async (_, formValues = {}) => {
        const resp = await getLocationList({
          ...formValues,
          parentLocationId: '0',
        });
        return { rows: resp.data || [] };
      },
    },
  },

  treeConfig: {
    parentField: 'parentLocationId',
    rowField: 'locationId',
    hasChildField: 'hasChild',
    transform: true,
    lazy: true,
    loadMethod: async ({ row }) => {
      const resp = await getLocationList({
        parentLocationId: row ? row.locationId : '0',
      });
      return resp.data || [];
    },
  },

  id: 'inspection-plan-location-select',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

/* 展开 / 折叠 */
function expandAll() {
  tableApi.grid?.setAllTreeExpand(true);
}

function collapseAll() {
  tableApi.grid?.setAllTreeExpand(false);
}

/* 编辑模式：回显已选 location */
async function initCheckedLocations() {
  if (!props.planId) return;

  const locationIds = await getPlanLocations(props.planId);

  nextTick(() => {
    const { fullData } = tableApi.grid!.getTableData();

    const rows = fullData.filter((row: any) =>
      locationIds.includes(row.locationId),
    );

    tableApi.grid?.setCheckboxRow(rows, true);
  });
}

/* 保存（新增 / 更新一体） */
async function handleSubmit() {
  const records = tableApi.grid?.getCheckboxRecords() || [];
  const locationIds = records.map((item: any) => item.locationId);

  if (locationIds.length === 0) {
    message.warning('请至少选择一个巡检地点');
    return;
  }

  await savePlanLocations({
    planId: props.planId,
    planLocationIds: locationIds,
  });

  message.success('保存成功');
}

onMounted(async () => {
  // 等表格数据加载完成再回显
  await tableApi.query();
  await initCheckedLocations();
});
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="选择巡检地点">
      <template #toolbar-tools>
        <Space>
          <a-button @click="collapseAll">折叠</a-button>
          <a-button @click="expandAll">展开</a-button>
          <a-button type="primary" @click="handleSubmit"> 保存 </a-button>
        </Space>
      </template>
    </BasicTable>
  </Page>
</template>
