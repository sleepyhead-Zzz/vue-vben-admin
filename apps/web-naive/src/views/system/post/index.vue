<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getVxePopupContainer } from '@vben/utils';

import { NPopconfirm, NSpace } from 'naive-ui';

import { modal } from '#/adapter/naive';
import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import { getPagedPost, removePost } from '#/api/system/api/sysPostApi';
import { GhostButton } from '#/components/global/button';
import DeptTree from '#/views/system/user/dept-tree.vue';

import { columns, querySchema } from './data';
import postDrawer from './post-drawer.vue';

// 左边部门用
const selectDeptId = ref<string[]>([]);
const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  handleReset: async () => {
    selectDeptId.value = [];

    const { formApi, reload } = tableApi;
    await formApi.resetForm();
    const formValues = formApi.form.values;
    formApi.setLatestSubmissionValues(formValues);
    await reload(formValues);
  },
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    trigger: 'cell',
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        // 部门树选择处理
        if (selectDeptId.value.length === 1) {
          formValues.belongDeptId = selectDeptId.value[0];
        } else {
          Reflect.deleteProperty(formValues, 'belongDeptId');
        }

        const { data } = await getPagedPost({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
      },
    },
  },
  rowConfig: {
    keyField: 'postId',
  },
  id: 'system-post-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [PostDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: postDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(record: API.UpdatePostCommand) {
  drawerApi.setData({ id: record.postId });
  drawerApi.open();
}

async function handleDelete(row: API.PostDTO) {
  await removePost({ ids: [row.postId] });
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: API.PostDTO) => row.postId);
  modal.create({
    preset: 'dialog',
    title: $t('pages.common.tip'),
    content: $t('pages.common.confirmDeleteRecords', { count: ids.length }),
    negativeText: $t('common.cancel'),
    positiveText: $t('common.confirm'),
    onPositiveClick: async () => {
      await removePost({ ids });
      await tableApi.query();
      modal.destroyAll();
    },
  });
}

function handleDownloadExcel() {}
</script>

<template>
  <Page :auto-content-height="true" content-class="flex gap-[8px] w-full">
    <DeptTree
      v-model:select-dept-id="selectDeptId"
      class="w-[260px]"
      @reload="() => tableApi.reload()"
      @select="() => tableApi.reload()"
    />
    <BasicTable class="flex-1 overflow-hidden" table-title="岗位列表">
      <template #toolbar-tools>
        <NSpace>
          <GhostButton
            v-access:code="['system:post:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </GhostButton>
          <GhostButton
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['system:post:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </GhostButton>
          <GhostButton
            type="primary"
            v-access:code="['system:post:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </GhostButton>
        </NSpace>
      </template>
      <template #action="{ row }">
        <GhostButton
          v-access:code="['system:post:edit']"
          @click="handleEdit(row)"
        >
          {{ $t('pages.common.edit') }}
        </GhostButton>
        <NPopconfirm
          :get-popup-container="getVxePopupContainer"
          placement="left"
          @positive-click="handleDelete(row)"
        >
          <template #trigger>
            <GhostButton
              type="error"
              v-access:code="['system:post:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </GhostButton>
          </template>
          确认删除？
        </NPopconfirm>
      </template>
    </BasicTable>
    <PostDrawer @reload="tableApi.query()" />
  </Page>
</template>
