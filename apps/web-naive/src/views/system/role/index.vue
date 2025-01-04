<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type {
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { reactive, ref, toRaw } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { NButton, NPopconfirm, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { ApiService, type RoleDTO, type RoleQuery } from '#/apis';
import { $t } from '#/locales';

import RoleForm from './role-form.vue';

const searchFormParams = reactive<RoleQuery>({
  roleName: undefined,
  roleKey: undefined,
  status: undefined,
});
const formOptions: VbenFormProps = {
  collapsed: false,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.role.input_name'),
      },
      defaultValue: '',
      fieldName: 'name',
      label: $t('system.role.name'),
    },
  ],
  showCollapseButton: true,
  submitOnChange: true,
  submitOnEnter: false,
};
const message = useMessage();
const gridOptions: VxeTableGridOptions<RoleDTO> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },

  columns: [
    { field: 'roleId', title: '角色ID', visible: false },
    { field: 'roleName', title: '角色名称' },
    { field: 'roleKey', title: '角色权限字符串' },
    { field: 'roleSort', title: '显示顺序' },
    { field: 'status', title: '角色状态' },
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
        searchFormParams.roleName = formValues.name;
        return await ApiService.list(toRaw(searchFormParams));
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
  connectedComponent: RoleForm,
});
function addRole() {
  modalApi.setData(ref(null));
  modalApi.open();
}
function deleteRoles() {}

async function editRole(role: number) {
  const { data: selectRole } = await ApiService.getInfo(role);
  modalApi.setData({ roleData: selectRole });
  modalApi.open();
}

async function infoRole(role: number) {
  message.success(`编辑角色ID: ${role}`);
}
async function deleteRole(role: number) {
  message.success(`删除角色ID: ${role}`);
}

const gridEvents: VxeGridListeners = {
  toolbarToolClick(params) {
    if (params.code === 'add') {
      addRole();
    } else if (params.code === 'del') {
      deleteRoles();
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
          <NButton quaternary type="primary" @click="editRole(row.roleId)">
            {{ $t('common.table.edit') }}
          </NButton>
          <NButton quaternary type="info" @click="infoRole(row.roleId)">
            {{ $t('common.table.info') }}
          </NButton>
          <NPopconfirm @positive-click="deleteRole(row.roleId)">
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
