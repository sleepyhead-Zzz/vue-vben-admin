<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import type { MenuDTO } from '#/apis';

import { computed, h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  NButton,
  NCard,
  NDataTable,
  NInput,
  NPopconfirm,
  useMessage,
} from 'naive-ui';

import { Button } from '#/components/ui/button';
import { $t } from '#/locales';

import MenuForm from './menu-form.vue';

interface MenuDTOTree extends MenuDTO {
  children?: MenuDTOTree[];
}

const allMenu = ref<MenuDTOTree[]>([]);
const selectedMenu = ref<MenuDTO | null>(null);
const searchQuery = ref('');

const buildMenuTree = (data: MenuDTO[]): MenuDTOTree[] => {
  const map = new Map<number, MenuDTOTree>();
  const tree: MenuDTOTree[] = [];
  data.forEach((menu) => {
    if (menu.id !== undefined) {
      map.set(menu.id, { ...menu, children: [] });
    }
  });
  data.forEach((menu) => {
    const node = menu.id === undefined ? undefined : map.get(menu.id);
    if (!node) return;
    const parentId = menu.parentId ?? 0;
    if (parentId !== 0 && map.get(parentId)?.children) {
      // @ts-ignore
      map.get(parentId)!.children.push(node);
    } else {
      tree.push(node);
    }
  });
  return tree;
};

const filterTree = (nodes: MenuDTOTree[], query: string): MenuDTOTree[] => {
  if (!query) return nodes;
  const lowerQuery = query.toLowerCase();
  const result: MenuDTOTree[] = [];
  nodes.forEach((node) => {
    const children = node.children ? filterTree(node.children, query) : [];
    if (node.name?.toLowerCase().includes(lowerQuery) || children.length > 0) {
      result.push({ ...node, children });
    }
  });
  return result;
};

const fetchData = async () => {
  try {
    const { data } = await ApiService.listMenu();
    allMenu.value = buildMenuTree(data ?? []);
  } catch (error) {
    console.error($t('common.table.error'), error);
  }
};

fetchData();

const [Modal, modalApi] = useVbenModal({
  connectedComponent: MenuForm,
  onClosed: fetchData,
});

const message = useMessage();

const handleEdit = async (row: MenuDTO) => {
  try {
    if (row.id === undefined) {
      return;
    }
    const { data: selectedMenu } = await ApiService.menuInfo(row.id);
    modalApi.setData({ menuData: selectedMenu });
    modalApi.open();
  } catch (error) {
    console.error($t('common.table.error'), error);
  }
};

const handleDelete = async (row: MenuDTO) => {
  try {
    if (row.id === undefined) {
      return;
    }
    await ApiService.removeMenu(row.id);
    message.info($t('common.table.delete_success'));
    await fetchData();
  } catch (error) {
    console.error($t('common.table.delete_error'), error);
  }
};

const columns: DataTableColumns<MenuDTOTree> = [
  { title: $t('system.menu.name'), key: 'name' },
  { title: $t('system.menu.id'), key: 'id' },
  { title: $t('system.menu.remark'), key: 'remark' },
  {
    title: $t('common.table.action'),
    key: 'actions',
    render(row: MenuDTOTree) {
      return h('div', { class: 'flex gap-2' }, [
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
            positiveButtonProps: {},
            negativeButtonProps: {},
            onPositiveClick: () => handleDelete(row),
            negativeText: $t('common.table.cancel'),
            positiveText: $t('common.table.delete'),
          },
          {
            trigger: () =>
              h(
                NButton,
                { type: 'error', strong: true, tertiary: true, size: 'small' },
                { default: () => $t('common.table.delete') },
              ),
            default: () => $t('common.table.confirm_delete'),
          },
        ),
      ]);
    },
  },
];

const addNewMenu = () => {
  selectedMenu.value = null;
  modalApi.setData(selectedMenu);
  modalApi.open();
};

const rowKey = (row: MenuDTO) => row.id ?? 0;
const filteredMenu = computed(() =>
  filterTree(allMenu.value, searchQuery.value),
);
</script>

<template>
  <div
    class="flex h-full w-full flex-col rounded-lg bg-gray-50 shadow-lg dark:bg-black"
  >
    <NCard class="h-full w-full">
      <div
        class="mb-4 h-auto rounded-md bg-gray-100 p-4 shadow-sm dark:bg-gray-800"
      >
        <div class="flex justify-between gap-4">
          <NInput
            v-model:value="searchQuery"
            :placeholder="$t('system.menu.search_placeholder')"
            clearable
            autosize
            style="min-width: 30%"
          />
          <Button @click="addNewMenu">{{ $t('system.menu.add') }}</Button>
        </div>
      </div>
      <NDataTable
        :columns="columns"
        :data="filteredMenu"
        :row-key="rowKey"
        default-expand-all
      />
    </NCard>
    <Modal />
  </div>
</template>
