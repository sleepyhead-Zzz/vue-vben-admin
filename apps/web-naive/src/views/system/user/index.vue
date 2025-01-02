<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { reactive, ref, toRaw } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { NButton, NPopconfirm, NTag, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  ApiService,
  type SearchUserQuerySearchUserDO,
  type UserDTO,
} from '#/apis';
import { $t } from '#/locales';

import UserForm from './user-form.vue';

const searchFormParams = reactive<SearchUserQuerySearchUserDO>({
  deptId: undefined,
  phoneNumber: undefined,
  status: undefined,
  username: undefined,
  timeRangeColumn: 'createTime',
});
const formOptions: VbenFormProps = {
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.input_name'),
      },
      defaultValue: '',
      fieldName: 'name',
      label: $t('system.user.name'),
    },
  ],
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
    { field: 'avatar', title: '头像' },
    { field: 'userId', title: '用户ID', visible: false },
    { field: 'postId', title: '职位ID', visible: false },
    { field: 'postName', title: '职位名称' },
    { field: 'roleId', title: '角色ID', visible: false },
    { field: 'roleName', title: '角色名称' },
    { field: 'deptId', title: '部门ID', visible: false },
    { field: 'deptName', title: '部门名称' },
    { field: 'username', title: '用户名' },
    { field: 'nickname', title: '昵称' },
    { field: 'userType', title: '用户类型' },
    { field: 'email', title: '邮箱' },
    { field: 'photoNumber', title: '电话号码' },
    { field: 'sex', title: '性别', slots: { default: 'sex' } },

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
        searchFormParams.username = formValues.name;
        return await ApiService.userList(toRaw(searchFormParams));
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
  connectedComponent: UserForm,
});
function addUser() {
  modalApi.setData(ref(null));
  modalApi.open();
}
function deleteUsers() {}

async function editUser(user: number) {
  message.success(`编辑用户ID: ${user}`);
  const { data: selectUser } = await ApiService.getUserDetailInfo(user);
  modalApi.setData({ userData: selectUser });
  modalApi.open();
}

async function infoUser(user: number) {
  message.success(`编辑用户ID: ${user}`);
}
async function deleteUser(user: number) {
  message.success(`删除用户ID: ${user}`);
}

const gridEvents: VxeGridListeners = {
  toolbarToolClick(params) {
    if (params.code === 'add') {
      addUser();
    } else if (params.code === 'del') {
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
  <div>
    <Page auto-content-height>
      <Grid v-on="gridEvents">
        <template #sex="{ row }">
          <NTag
            :bordered="false"
            :type="
              row.sex === 0 ? 'primary' : row.sex === 1 ? 'error' : 'warning'
            "
          >
            {{ row.sex === 0 ? '男' : row.sex === 1 ? '女' : '未知' }}
          </NTag>
        </template>
        <template #action="{ row }">
          <NButton quaternary type="primary" @click="editUser(row.userId)">
            {{ $t('common.table.edit') }}
          </NButton>
          <NButton quaternary type="info" @click="infoUser(row.userId)">
            {{ $t('common.table.info') }}
          </NButton>
          <NPopconfirm @positive-click="deleteUser(row.userId)">
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
  </div>
</template>
