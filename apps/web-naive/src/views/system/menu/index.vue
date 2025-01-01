<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import { h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NButton, NDataTable, NPopconfirm } from 'naive-ui';

import { ApiService, type MenuDetailDTO } from '#/apis';
import { Button } from '#/components/ui/button';
import { $t } from '#/locales';

import MenuForm from './menu-form.vue';

interface Menu {
  label: string;
  menuId: number;
  parentId: number;
  children?: Menu[];
}
const allMenu = ref<Menu[]>([]);
const selectedMenu = ref<MenuDetailDTO | null>(null);
const fetchData = async () => {
  // @ts-ignore
  const { data }: { data: Menu[] } = await ApiService.dropdownList();
  allMenu.value = data;
};

fetchData(); // 调用异步函数

function createColumns(
  edit: (row: Menu) => void,
  remove: (row: Menu) => void,
): DataTableColumns<Menu> {
  return [
    {
      title: $t('system.menu.name'),
      key: 'label',
    },
    {
      title: 'menuId',
      key: 'menuId',
    },
    {
      title: $t('common.table.action'),
      key: 'actions',
      render(row: Menu) {
        return h('div', [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => {
                edit(row);
              },
            },
            { default: () => $t('common.table.edit') },
          ),
          h(
            NPopconfirm,
            {
              positiveButtonProps: {},
              negativeButtonProps: {},
              onPositiveClick: () => {
                remove(row);
              },
              negativeText: $t('common.table.cancel'),
              positiveText: $t('common.table.delete'),
            },
            {
              trigger: () => {
                return h(
                  NButton,
                  {
                    type: 'error',
                    strong: true,
                    tertiary: true,
                    size: 'small',
                  },
                  { default: () => $t('common.table.delete') },
                );
              },
              default: () => {
                return $t('common.table.contrim_delete');
              },
            },
          ),
        ]);
      },
    },
  ];
}
const [Modal, modalApi] = useVbenModal({
  connectedComponent: MenuForm,
  onClosed: () => {
    fetchData();
  },
});
const columns = createColumns(
  async (row: Menu) => {
    const { data: selectedMenu } = await ApiService.menuInfo(row.menuId);
    modalApi.setData({ menuData: selectedMenu });
    modalApi.open();
  },
  async (row: Menu) => {
    await ApiService.remove3(row.menuId);
    await fetchData();
  },
);

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
      :data="allMenu"
      :row-key="rowKey"
      default-expand-all
    />
    <Modal />
  </div>
</template>
