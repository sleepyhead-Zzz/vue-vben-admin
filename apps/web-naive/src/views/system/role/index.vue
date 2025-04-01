<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';
import type { RoleDTO, RoleQuery } from '#/apis';

import { h, reactive, ref, toRaw } from 'vue';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { NButton, NPopconfirm, NTag, useDialog, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { ApiService } from '#/apis';
import { $t } from '#/locales';

import RoleForm from './role-form.vue';
import RoleInfo from './role-info.vue';

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
const gridOptions: VxeGridProps<RoleDTO> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },

  columns: [
    {
      type: 'checkbox',
      title: '选择',
    },
    { field: 'roleId', title: '角色ID', visible: false },
    { field: 'roleName', title: '角色名称' },
    { field: 'roleKey', title: '角色权限字符串' },
    { field: 'roleSort', title: '显示顺序' },
    {
      field: 'status',
      title: '角色状态',
      slots: {
        default: ({ row }) => {
          return h(
            NTag,
            {
              type: row.status === 1 ? 'success' : 'error',
            },
            {
              default: () => (row.status === 1 ? '正常' : '禁用'),
            },
          );
        },
      },
    },
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
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await ApiService.getPagedRole(toRaw(searchFormParams));
      },
    },
  },

  toolbarConfig: {
    tools: [
      { name: $t('common.table.add'), code: 'add', status: 'primary' },
      { name: $t('common.table.delete'), code: 'del', status: 'error' },
    ],

    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    // @ts-ignore 正式环境时有完整的类型声明
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

async function editRole(role: number) {
  const { data: selectRole } = await ApiService.getRoleInfo(role);
  modalApi.setData({ roleData: selectRole });
  modalApi.open();
}
const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: RoleInfo,
});
async function infoRole(role: number) {
  drawerApi.setData({
    roleId: role,
  });
  drawerApi.open();
}
const dialog = useDialog();
const gridEvents: VxeGridListeners = {
  toolbarToolClick(params) {
    if (params.code === 'add') {
      addRole();
    } else if (params.code === 'del') {
      dialog.warning({
        title: '警告',
        content: '你确定？',
        positiveText: '确定',
        negativeText: '不确定',
        onPositiveClick: () => {
          deleteRoles([]);
        },
        onNegativeClick: () => {},
      });
    }
  },
};
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents,
});
async function deleteRoles(role: number[]) {
  if (role.length > 0) {
    await ApiService.removeRole(role);
    gridApi.reload();
  } else {
    const selectedRoles = gridApi.grid.getCheckboxRecords();
    if (selectedRoles.length === 0) {
      message.warning('请先选择要删除的角色');
      return;
    }
    const roleIds = selectedRoles.map((role) => role.roleId); // 提取出选中的角色ID
    await ApiService.removeRole(roleIds);
    message.success('删除成功');
    gridApi.reload();
  }
}
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
          <NPopconfirm @positive-click="deleteRoles([row.roleId])">
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
