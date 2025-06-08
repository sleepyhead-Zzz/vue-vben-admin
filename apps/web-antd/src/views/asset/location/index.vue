<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { nextTick } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { batchRemoveLocation, listLocation } from '#/api/asset/weizhi';

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
        const resp = await listLocation({
          ...formValues,
        });
        return { rows: resp.data };
      },
      // 默认请求接口后展开全部 不需要可以删除这段
      querySuccess: () => {
        nextTick(() => {
          expandAll();
        });
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
    enabled: false,
    gt: 0,
  },
  treeConfig: {
    parentField: 'parentLocationId',
    rowField: 'locationId',
    // 自动转换为tree 由vxe处理 无需手动转换
    transform: true,
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
