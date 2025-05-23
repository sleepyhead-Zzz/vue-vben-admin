<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { nextTick } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { eachTree, getVxePopupContainer } from '@vben/utils';

import { NButton, NPopconfirm, NSpace } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { listDept, removeDept } from '#/api/system/sysDeptApi';
import { GhostButton } from '#/components/global/button';

import { columns, querySchema } from './data';
import deptDrawer from './dept-drawer.vue';

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
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    ajax: {
      query: async (_, formValues = {}) => {
        const { data } = await listDept({
          ...formValues,
        });
        return { rows: data };
      },
      // 默认请求接口后展开全部 不需要可以删除这段
      querySuccess: () => {
        // 默认展开 需要加上标记

        eachTree(tableApi.grid.getData(), (item) => (item.expand = true));
        nextTick(() => {
          setExpandOrCollapse(true);
        });
      },
    },
  },
  /**
   * 虚拟滚动  默认关闭
   */
  scrollY: {
    enabled: false,
    gt: 0,
  },
  rowConfig: {
    keyField: 'deptId',
  },
  treeConfig: {
    parentField: 'parentId',
    rowField: 'deptId',
    transform: true,
  },
  id: 'system-dept-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    cellDblclick: (e) => {
      const { row = {} } = e;
      if (!row?.children) {
        return;
      }
      const isExpanded = row?.expand;
      tableApi.grid.setTreeExpand(row, !isExpanded);
      row.expand = !isExpanded;
    },
    // 需要监听使用箭头展开的情况 否则展开/折叠的数据不一致
    toggleTreeExpand: (e) => {
      const { row = {}, expanded } = e;
      row.expand = expanded;
    },
  },
});
const [DeptDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: deptDrawer,
});

function handleAdd() {
  drawerApi.setData({ update: false });
  drawerApi.open();
}

function handleSubAdd(row: API.DeptDTO) {
  const { deptId } = row;
  drawerApi.setData({ id: deptId, update: false });
  drawerApi.open();
}

async function handleEdit(record: API.DeptDTO) {
  drawerApi.setData({ id: record.deptId, update: true });
  drawerApi.open();
}

async function handleDelete(row: API.DeptDTO) {
  await removeDept({ deptId: row.deptId });
  await tableApi.query();
}

/**
 * 全部展开/折叠
 * @param expand 是否展开
 */
function setExpandOrCollapse(expand: boolean) {
  eachTree(tableApi.grid.getData(), (item) => (item.expand = expand));
  tableApi.grid?.setAllTreeExpand(expand);
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="部门列表" table-title-help="双击展开/收起子菜单">
      <template #toolbar-tools>
        <NSpace>
          <NButton @click="setExpandOrCollapse(false)">
            {{ $t('pages.common.collapse') }}
          </NButton>
          <NButton @click="setExpandOrCollapse(true)">
            {{ $t('pages.common.expand') }}
          </NButton>
          <NButton
            type="primary"
            v-access:code="['system:dept:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </NButton>
        </NSpace>
      </template>
      <template #action="{ row }">
        <NSpace>
          <GhostButton
            v-access:code="['system:dept:edit']"
            @click="handleEdit(row)"
          >
            {{ $t('pages.common.edit') }}
          </GhostButton>
          <GhostButton
            class="btn-success"
            v-access:code="['system:dept:add']"
            @click="handleSubAdd(row)"
          >
            {{ $t('pages.common.add') }}
          </GhostButton>
          <NPopconfirm
            :get-popup-container="getVxePopupContainer"
            placement="left"
            @positive-click="handleDelete(row)"
          >
            <template #trigger>
              <GhostButton
                type="error"
                v-access:code="['system:dept:remove']"
                @click.stop=""
              >
                {{ $t('pages.common.delete') }}
              </GhostButton>
            </template>
            确认删除？
          </NPopconfirm>
        </NSpace>
      </template>
    </BasicTable>
    <DeptDrawer @reload="tableApi.query()" />
  </Page>
</template>
