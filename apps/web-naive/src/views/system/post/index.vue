<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { reactive, ref, toRaw } from 'vue';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { NButton, NPopconfirm, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { ApiService, type PostDTO, type PostQuery } from '#/apis';
import { $t } from '#/locales';

import PostForm from './post-form.vue';
import PostInfo from './post-info.vue';

const searchFormParams = reactive<PostQuery>({
  postName: undefined,
  status: undefined,
});
const formOptions: VbenFormProps = {
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.post.input_name'),
      },
      defaultValue: '',
      fieldName: 'name',
      label: $t('system.post.name'),
    },
  ],
  showCollapseButton: true,
  submitOnChange: true,
  submitOnEnter: false,
};
const message = useMessage();
const gridOptions: VxeTableGridOptions<PostDTO> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },

  columns: [
    { field: 'postId', title: $t('system.post.id'), visible: false },
    { field: 'postCode', title: $t('system.post.code') },
    { field: 'postName', title: $t('system.post.name') },
    { field: 'statusStr', title: $t('common.table.status') },
    { field: 'postSort', title: $t('common.table.sort'), visible: false },
    { field: 'createTime', title: $t('common.table.create_time') },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 230,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        searchFormParams.pageNum = page.currentPage;
        searchFormParams.pageSize = page.pageSize;
        searchFormParams.postName = formValues.name;
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await ApiService.list1(toRaw(searchFormParams));
      },
    },
  },

  toolbarConfig: {
    tools: [
      { name: '新增', code: 'add', status: 'primary' },
      { name: '删除', code: 'del', status: 'error' },
    ],

    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
};
const [Modal, modalApi] = useVbenModal({
  connectedComponent: PostForm,
});
function addPost() {
  modalApi.setData(ref(null));
  modalApi.open();
}
function deletePosts() {}

async function editPost(post: number) {
  const { data: selectPost } = await ApiService.getInfo1(post);
  modalApi.setData({ postData: selectPost });
  modalApi.open();
}

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: PostInfo,
});
async function infoPost(post: number) {
  drawerApi.setData({
    postId: post,
  });
  drawerApi.open();
}
async function deletePost(post: number) {
  message.success(`删除角色ID: ${post}`);
}

const gridEvents: VxeGridListeners = {
  toolbarToolClick(params) {
    if (params.code === 'add') {
      addPost();
    } else if (params.code === 'del') {
      deletePosts();
    }
  },
};
const [Grid] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents,
});
</script>

<template>
  <div>
    <Page auto-content-height>
      <Grid v-on="gridEvents">
        <template #action="{ row }">
          <NButton quaternary type="primary" @click="editPost(row.postId)">
            {{ $t('common.table.edit') }}
          </NButton>
          <NButton quaternary type="info" @click="infoPost(row.postId)">
            {{ $t('common.table.info') }}
          </NButton>
          <NPopconfirm @positive-click="deletePost(row.postId)">
            <template #trigger>
              <NButton quaternary type="error">
                {{ $t('common.table.delete') }}
              </NButton>
            </template>
            {{ $t('common.table.contrim_delete') }}
          </NPopconfirm>
        </template>
      </Grid>
    </Page>
    <Modal />
    <Drawer />
  </div>
</template>

<style></style>
