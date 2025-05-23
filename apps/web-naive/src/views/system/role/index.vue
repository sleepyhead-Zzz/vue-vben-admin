<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { NButton, NSpace } from 'naive-ui';

import { dialog } from '#/adapter/naive';
import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  changeRoleStatus,
  getPagedRole,
  removeRole,
} from '#/api/system/sysRoleApi';
import { GhostButton } from '#/components/global/button';
import { TableSwitch } from '#/components/table';

import { columns, querySchema } from './data';
import roleAuthModal from './role-auth-modal.vue';
import roleDrawer from './role-drawer.vue';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  // 日期选择格式化
  fieldMappingTime: [
    [
      'createTime',
      ['params[beginTime]', 'params[endTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    // trigger: 'row',
    checkMethod: ({ row }) => row.roleId !== 1,
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await getPagedRole({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'roleId',
  },
  id: 'system-role-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
const [RoleDrawer, drawerApi] = useVbenDrawer({
  connectedComponent: roleDrawer,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

async function handleEdit(record: API.RoleDTO) {
  drawerApi.setData({ id: record.roleId });
  drawerApi.open();
}

async function handleDelete(row: API.RoleDTO) {
  await removeRole({ roleIds: [row.roleId] });
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: API.RoleDTO) => row.roleId);
  dialog.warning({
    title: '提示',
    content: `确认删除选中的 ${ids.length} 条记录吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      await removeRole({ roleIds: ids });
      await tableApi.query();
    },
  });
}

function handleDownloadExcel() {}

const { hasAccessByCodes, hasAccessByRoles } = useAccess();

const isSuperAdmin = computed(() => hasAccessByRoles(['superadmin']));

const [RoleAuthModal, authModalApi] = useVbenModal({
  connectedComponent: roleAuthModal,
});

function handleAuthEdit(record: API.RoleDTO) {
  authModalApi.setData({ id: record.roleId });
  authModalApi.open();
}

const router = useRouter();
function handleAssignRole(record: API.RoleDTO) {
  router.push(`/system/role-assign/${record.roleId}`);
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="角色列表">
      <template #toolbar-tools>
        <NSpace>
          <NButton @click="handleDownloadExcel">
            {{ $t('pages.common.export') }}
          </NButton>

          <NButton
            :disabled="!vxeCheckboxChecked(tableApi)"
            type="error"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </NButton>

          <NButton type="primary" @click="handleAdd">
            {{ $t('pages.common.add') }}
          </NButton>
        </NSpace>
      </template>

      <template #status="{ row }">
        <TableSwitch
          v-model:value="row.status"
          :api="() => changeRoleStatus({ roleId: row.roleId }, row)"
          :disabled="
            row.roleId === 1 ||
            row.roleKey === 'admin' ||
            !hasAccessByCodes(['system:role:edit'])
          "
          @reload="tableApi.query()"
        />
      </template>
      <template #action="{ row }">
        <!-- 租户管理员不可修改admin角色 防止误操作 -->
        <!-- 超级管理员可通过租户切换来操作租户管理员角色 -->
        <template
          v-if="!row.superAdmin && (row.roleKey !== 'admin' || isSuperAdmin)"
        >
          <Space>
            <GhostButton
              v-access:code="['system:role:edit']"
              @click.stop="handleEdit(row)"
            >
              {{ $t('pages.common.edit') }}
            </GhostButton>
            <n-popconfirm
              @positive-click="handleDelete(row)"
              positive-text="删除"
              negative-text="取消"
            >
              <template #trigger>
                <GhostButton type="error">
                  {{ $t('pages.common.delete') }}
                </GhostButton>
              </template>
              确认删除？
            </n-popconfirm>
          </Space>
          <Dropdown placement="bottomRight">
            <template #overlay>
              <Menu>
                <MenuItem key="1" @click="handleAuthEdit(row)">
                  数据权限
                </MenuItem>
                <MenuItem key="2" @click="handleAssignRole(row)">
                  分配用户
                </MenuItem>
              </Menu>
            </template>
            <a-button
              size="small"
              type="link"
              v-access:code="'system:role:edit'"
            >
              {{ $t('pages.common.more') }}
            </a-button>
          </Dropdown>
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @reload="tableApi.query()" />
    <RoleAuthModal @reload="tableApi.query()" />
  </Page>
</template>
