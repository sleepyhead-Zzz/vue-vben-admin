<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Modal, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  changeRoleStatus,
  exportRoleByExcel,
  getPagedRole,
  removeRole,
} from '#/api/system/role';
import { TableSwitch } from '#/components/table';
import { commonDownloadExcel } from '#/utils/file/download';

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
        const { data } = await getPagedRole({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
        return data;
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

async function handleEdit(record: SystemAPI.RoleDTO) {
  drawerApi.setData({ id: record.roleId });
  drawerApi.open();
}

async function handleDelete(row: SystemAPI.RoleDTO) {
  await removeRole({ roleIds: [row.roleId] });
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: SystemAPI.RoleDTO) => row.roleId);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await removeRole({ roleIds: ids });
      await tableApi.query();
    },
  });
}

function handleDownloadExcel() {
  commonDownloadExcel(
    exportRoleByExcel,
    '角色数据',
    tableApi.formApi.form.values,
    {
      fieldMappingTime: formOptions.fieldMappingTime,
    },
  );
}

const { hasAccessByCodes, hasAccessByRoles } = useAccess();

const isSuperAdmin = computed(() => hasAccessByRoles(['superadmin']));

const [RoleAuthModal, authModalApi] = useVbenModal({
  connectedComponent: roleAuthModal,
});

function handleAuthEdit(record: SystemAPI.RoleDTO) {
  authModalApi.setData({ id: record.roleId });
  authModalApi.open();
}

const router = useRouter();
function handleAssignRole(record: SystemAPI.RoleDTO) {
  router.push(`/system/role-auth/user/${record.roleId}`);
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable table-title="角色列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['system:role:export']"
            @click="handleDownloadExcel"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['system:role:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            type="primary"
            v-access:code="['system:role:add']"
            @click="handleAdd"
          >
            {{ $t('pages.common.add') }}
          </a-button>
        </Space>
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
            <ghost-button
              v-access:code="['system:role:edit']"
              @click.stop="handleEdit(row)"
            >
              {{ $t('pages.common.edit') }}
            </ghost-button>
            <ghost-button
              v-access:code="['system:role:edit']"
              @click.stop="handleAuthEdit(row)"
            >
              权限
            </ghost-button>
            <ghost-button
              v-access:code="['system:role:edit']"
              @click.stop="handleAssignRole(row)"
            >
              分配
            </ghost-button>
            <Popconfirm
              :get-popup-container="getVxePopupContainer"
              placement="left"
              title="确认删除？"
              @confirm="handleDelete(row)"
            >
              <ghost-button
                danger
                v-access:code="['system:role:remove']"
                @click.stop=""
              >
                {{ $t('pages.common.delete') }}
              </ghost-button>
            </Popconfirm>
          </Space>
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @reload="tableApi.query()" />
    <RoleAuthModal @reload="tableApi.query()" />
  </Page>
</template>
