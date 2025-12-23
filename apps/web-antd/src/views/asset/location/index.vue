<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { batchRemoveLocation, listLocation } from '#/api/asset/location';

import { columns, querySchema } from './data';
import locationModal from './location-modal.vue';

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
  // 需要使用i18n注意这里要改成getter形式 否则切换语言不会刷新
  // columns: columns(),
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    ajax: {
      query: async (_, formValues = {}) => {
        // 默认只加载根节点
        const resp = await listLocation({
          ...formValues,
          parentLocationId: '0',
        });

        return { rows: resp.data || [] };
      },
    },
  },

  rowConfig: {
    keyField: 'locationId',
  },
  /**
   * 虚拟滚动开关 默认关闭
   * 数据量小可以选择关闭
   * 如果遇到样式问题(空白、错位 滚动等)可以选择关闭虚拟滚动
   */
  scrollY: {
    enabled: true,
    gt: 0,
  },
  treeConfig: {
    parentField: 'parentLocationId',
    rowField: 'locationId',
    hasChildField: 'hasChild',
    transform: true,
    lazy: true,
    loadMethod: async ({ row }): Promise<AssetAPI.AssetLocationDTO[]> => {
      try {
        // 根节点懒加载
        if (row) {
          // 子节点懒加载
          const resp = await listLocation({ parentLocationId: row.locationId });
          return resp.data || [];
        } else {
          // 传 0 表示根节点
          const resp = await listLocation({ parentLocationId: '0' });
          return resp.data || [];
        }
      } catch (error) {
        console.error('loadMethod error:', error);
        return []; // 避免返回 undefined，保证 TS 类型
      }
    },
  },

  // 表格全局唯一表示 保存列配置需要用到
  id: 'asset-location-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });
const [LocationModal, modalApi] = useVbenModal({
  connectedComponent: locationModal,
});

function handleAdd() {
  modalApi.setData({});
  modalApi.open();
}

async function handleEdit(row: AssetAPI.AssetLocationDTO) {
  modalApi.setData({ id: row.locationId });
  modalApi.open();
}

async function handleDelete(row: AssetAPI.AssetLocationDTO) {
  await batchRemoveLocation({ locationIds: [row.locationId] });
  await tableApi.query();
}

function expandAll() {
  tableApi.grid?.setAllTreeExpand(true);
}

function collapseAll() {
  tableApi.grid?.setAllTreeExpand(false);
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="位置列表">
      <template #toolbar-tools>
        <Space>
          <a-button @click="collapseAll">
            {{ $t('pages.common.collapse') }}
          </a-button>
          <a-button @click="expandAll">
            {{ $t('pages.common.expand') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['asset:location:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button
            v-access:code="['asset:location:edit']"
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
              v-access:code="['asset:location:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <LocationModal @reload="tableApi.query()" />
  </Page>
</template>
