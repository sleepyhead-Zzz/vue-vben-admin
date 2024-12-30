<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import { h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NButton, NDataTable } from 'naive-ui';

import { ApiService, type MenuDetailDTO } from '#/apis';
import { Button } from '#/components/ui/button';

import MenuForm from './menu-form.vue';

interface Menu {
  label: string;
  menuId: number;
  parentId: number;
  children?: Menu[];
}
const data = ref<Menu[]>([]);
const selectedMenu = ref<MenuDetailDTO | null>(null);
const fetchData = async () => {
  const response = await ApiService.dropdownList();
  data.value = response.data;
};

fetchData(); // 调用异步函数

function createColumns(edit: (row: Menu) => void): DataTableColumns<Menu> {
  return [
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
            onClick: () => {
              edit(row);
            },
          },
          { default: () => '编辑' },
        );
      },
    },
  ];
}
const [Modal, modalApi] = useVbenModal({
  connectedComponent: MenuForm,
});
const columns = createColumns(async (row: Menu) => {
  const response = await ApiService.menuInfo(row.menuId);
  selectedMenu.value = response.data ?? null;
  // 打开修改菜单窗口
  modalApi.setData(selectedMenu);
  modalApi.open();
});

function addNewMenu() {
  selectedMenu.value = null;
  modalApi.setData(selectedMenu);
  modalApi.open();
}

const rowKey = (row: Menu) => row.menuId;
</script>

<template>
  <div>
    <div>
      <Button @click="addNewMenu">{{ $t('system.menu.add') }}</Button>
    </div>
    <NDataTable
      :columns="columns"
      :data="data"
      :row-key="rowKey"
      default-expand-all
    />
    <Modal />
  </div>
</template>
