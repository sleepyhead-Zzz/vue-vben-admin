<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import { h, ref } from 'vue';

import { NButton, NDataTable, useMessage } from 'naive-ui';

import { ApiService } from '#/apis';

interface Menu {
  label: string;
  menuId: number;
  parentId: number;
  children?: Menu[];
}

// 使用 ref 来存储数据
const data = ref<Menu[]>([]);

// 将数据的获取放在 async setup 中
const fetchData = async () => {
  const response = await ApiService.dropdownList();
  data.value = response.data;
};

fetchData(); // 调用异步函数

function createColumns(play: (row: Menu) => void): DataTableColumns<Menu> {
  return [
    {
      type: 'selection',
    },
    {
      title: 'label',
      key: 'label',
    },
    {
      title: 'menuId',
      key: 'menuId',
    },
    {
      title: 'Action',
      key: 'actions',
      render(row: Menu) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => play(row),
          },
          { default: () => 'Play' },
        );
      },
    },
  ];
}

const message = useMessage();

const columns = createColumns((row: Menu) => {
  message.info(`Play ${row.label}`);
});

const rowKey = (row: Menu) => row.menuId;
</script>

<template>
  <div>
    <NDataTable
      :columns="columns"
      :data="data"
      :row-key="rowKey"
      default-expand-all
    />
  </div>
</template>
