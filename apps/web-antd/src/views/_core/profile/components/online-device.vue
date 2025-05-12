<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Popconfirm } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { columns } from '#/views/monitor/online/data';

const gridOptions: VxeGridProps = {
  columns,
  keepSource: true,
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    ajax: {
      query: async () => {
        // return await onlineDeviceList()
        return null;
      },
    },
  },
  rowConfig: {
    keyField: 'tokenId',
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ gridOptions });

// async function handleForceOffline(row: Recordable<any>) {
//   // todo
//   // await forceLogout2(row.tokenId);
//   await tableApi.query();
// }
async function handleForceOffline() {
  //   // todo
  //   // await forceLogout2(row.tokenId);
  await tableApi.query();
}
</script>

<template>
  <div>
    <BasicTable table-title="我的在线设备">
      <template #action="{ row }">
        <Popconfirm
          :title="`确认强制下线[${row.userName}]?`"
          placement="left"
          @confirm="handleForceOffline(row)"
        >
          <a-button danger size="small" type="link">强制下线</a-button>
        </Popconfirm>
      </template>
    </BasicTable>
  </div>
</template>
