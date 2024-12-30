<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { NButton, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { ApiService, type UserDTO } from '#/apis';

const formOptions: VbenFormProps = {
  collapsed: false,
  schema: [],
  showCollapseButton: true,
  submitOnChange: true,
  submitOnEnter: false,
};
const message = useMessage();
const gridOptions: VxeTableGridOptions<UserDTO> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },

  columns: [
    { field: 'userId', title: '用户ID' },
    { field: 'postId', title: '职位ID' },
    { field: 'postName', title: '职位名称' },
    { field: 'roleId', title: '角色ID' },
    { field: 'roleName', title: '角色名称' },
    { field: 'deptId', title: '部门ID' },
    { field: 'deptName', title: '部门名称' },
    { field: 'username', title: '用户名' },
    { field: 'nickname', title: '昵称' },
    { field: 'userType', title: '用户类型' },
    { field: 'email', title: '邮箱' },
    { field: 'photoNumber', title: '电话号码' },
    { field: 'sex', title: '性别' },
    { field: 'avatar', title: '头像' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async (formValues) => {
        message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await ApiService.userList({});
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
function addUser() {}
function deleteUsers() {}
const gridEvents: VxeGridListeners = {
  toolbarToolClick(params) {
    if (params === del) {
      addUser();
    } else if (params === add) {
      deleteUsers();
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
  <Page auto-content-height>
    <Grid v-on="gridEvents">
      <template #action>
        <NButton type="primary">编辑</NButton>
      </template>
    </Grid>
  </Page>
</template>
