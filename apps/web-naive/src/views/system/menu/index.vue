<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import type { MenuDetailDTO } from '#/apis';

import { h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NButton, NCard, NDataTable, NPopconfirm, useMessage } from 'naive-ui';

import { ApiService } from '#/apis';
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
const message = useMessage();

const fetchData = async () => {
  // @ts-ignore
  const { data }: { data: Menu[] } = await ApiService.dropdownList();
  allMenu.value = data;
};
fetchData(); // 初始化数据

const [Modal, modalApi] = useVbenModal({
  connectedComponent: MenuForm,
  onClosed: () => fetchData(),
});

// 处理编辑
const handleEdit = async (row: Menu) => {
  const { data: selectedMenu } = await ApiService.menuInfo(row.menuId);
  modalApi.setData({ menuData: selectedMenu });
  modalApi.open();
};

// 处理删除
const handleDelete = async (row: Menu) => {
  await ApiService.remove3(row.menuId);
  message.success($t('common.table.delete_success'));
  await fetchData();
};

const createColumns = (): DataTableColumns<Menu> => [
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
      return h('div', { class: 'action-buttons' }, [
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => handleEdit(row),
          },
          { default: () => $t('common.table.edit') },
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleDelete(row),
            negativeText: $t('common.table.cancel'),
            positiveText: $t('common.table.delete'),
          },
          {
            trigger: () =>
              h(
                NButton,
                {
                  type: 'error',
                  strong: true,
                  tertiary: true,
                  size: 'small',
                },
                { default: () => $t('common.table.delete') },
              ),
            default: () => $t('common.table.contrim_delete'),
          },
        ),
      ]);
    },
  },
];

const columns = createColumns();
const rowKey = (row: Menu) => row.menuId;

// 新增菜单
const addNewMenu = () => {
  selectedMenu.value = null;
  modalApi.setData(selectedMenu);
  modalApi.open();
};
</script>

<template>
  <div class="container">
    <NCard class="full-card">
      <div class="p-4">
        <div class="mb-4">
          <Button @click="addNewMenu">{{ $t('system.menu.add') }}</Button>
        </div>
        <NDataTable
          :columns="columns"
          :data="allMenu"
          :row-key="rowKey"
          default-expand-all
        />
      </div>
    </NCard>
    <Modal />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.full-card {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
