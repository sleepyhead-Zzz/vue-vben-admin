<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { getVxePopupContainer } from '@vben/utils';

import { Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { logoutOnlineUser, onlineUsers } from '#/api/monitor/online';

import { columns, querySchema } from './data';

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

const onlineCount = ref(0);
const gridOptions: VxeGridProps = {
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    enabled: true,
  },
  proxyConfig: {
    ajax: {
      query: async (_, formValues = {}) => {
        const resp = await onlineUsers({
          ...formValues,
        });
        onlineCount.value = resp.data.total;
        return resp.data;
      },
    },
  },
  scrollY: {
    enabled: true,
    gt: 0,
  },
  rowConfig: {
    keyField: 'tokenId',
  },
  id: 'monitor-online-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions });

async function handleForceOffline(row: MonitorAPI.OnlineUserDTO) {
  await logoutOnlineUser({ tokenId: row.tokenId });
  await tableApi.query();
}
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable>
      <template #toolbar-actions>
        <div class="mr-1 pl-1 text-[1rem]">
          <div>
            在线用户列表 (共
            <span class="text-primary font-bold">{{ onlineCount }}</span>
            人在线)
          </div>
        </div>
      </template>
      <template #action="{ row }">
        <Popconfirm
          :get-popup-container="getVxePopupContainer"
          :title="`确认强制下线[${row.userName}]?`"
          placement="left"
          @confirm="handleForceOffline(row)"
        >
          <ghost-button danger>强制下线</ghost-button>
        </Popconfirm>
      </template>
    </BasicTable>
  </Page>
</template>
