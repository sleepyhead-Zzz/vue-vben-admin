<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import type { DeptDTO } from '#/apis';

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

import { ApiService } from '#/apis';
import { Button } from '#/components/ui/button';
import { $t } from '#/locales';

import DeptForm from './dept-form.vue';

interface DeptDTOTree extends DeptDTO {
  children?: DeptDTOTree[];
}

const allDept = ref<DeptDTOTree[]>([]);
const selectedDept = ref<DeptDTO | null>(null);
const searchQuery = ref('');

const buildDeptTree = (data: DeptDTO[]): DeptDTOTree[] => {
  const map = new Map<number, DeptDTOTree>();
  const tree: DeptDTOTree[] = [];
  data.forEach((dept) => {
    if (dept.deptId !== undefined) {
      map.set(dept.deptId, { ...dept, children: [] });
    }
  });
  data.forEach((dept) => {
    const node = dept.deptId === undefined ? undefined : map.get(dept.deptId);
    if (!node) return;
    const parentId = dept.parentId ?? 0;
    if (parentId !== 0 && map.get(parentId)?.children) {
      // @ts-ignore
      map.get(parentId)!.children.push(node);
    } else {
      tree.push(node);
    }
  });
  return tree;
};

const filterTree = (nodes: DeptDTOTree[], query: string): DeptDTOTree[] => {
  if (!query) return nodes;
  const lowerQuery = query.toLowerCase();
  const result: DeptDTOTree[] = [];
  nodes.forEach((node) => {
    const children = node.children ? filterTree(node.children, query) : [];
    if (
      node.deptName?.toLowerCase().includes(lowerQuery) ||
      children.length > 0
    ) {
      result.push({ ...node, children });
    }
  });
  return result;
};

const fetchData = async () => {
  try {
    const { data } = await ApiService.listDept();
    allDept.value = buildDeptTree(data ?? []);
  } catch (error) {
    console.error($t('common.table.error'), error);
  }
};

fetchData();

const [Modal, modalApi] = useVbenModal({
  connectedComponent: DeptForm,
  onClosed: fetchData,
});

const message = useMessage();

const handleEdit = async (row: DeptDTO) => {
  try {
    if (row.deptId === undefined) {
      return;
    }
    const { data: selectedDept } = await ApiService.getDeptInfo(row.deptId);
    modalApi.setData({ deptData: selectedDept });
    modalApi.open();
  } catch (error) {
    console.error($t('common.table.error'), error);
  }
};

const handleDelete = async (row: DeptDTO) => {
  try {
    if (row.deptId === undefined) {
      return;
    }
    await ApiService.removeDept(row.deptId);
    message.info($t('common.table.delete_success'));
    await fetchData();
  } catch (error) {
    console.error($t('common.table.delete_error'), error);
  }
};

const columns: DataTableColumns<DeptDTOTree> = [
  { title: $t('system.dept.name'), key: 'deptName' },
  { title: $t('system.dept.id'), key: 'deptId' },
  { title: $t('system.dept.leader_name'), key: 'leaderName' },
  {
    title: $t('common.table.action'),
    key: 'actions',
    render(row: DeptDTOTree) {
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

const addNewDept = () => {
  selectedDept.value = null;
  modalApi.setData(selectedDept);
  modalApi.open();
};

const rowKey = (row: DeptDTO) => row.deptId ?? 0;
const filteredDept = computed(() =>
  filterTree(allDept.value, searchQuery.value),
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
            :placeholder="$t('system.dept.search_placeholder')"
            clearable
            autosize
            style="min-width: 30%"
          />
          <Button @click="addNewDept">{{ $t('system.dept.add') }}</Button>
        </div>
      </div>
      <NDataTable
        :columns="columns"
        :data="filteredDept"
        :row-key="rowKey"
        default-expand-all
      />
    </NCard>
    <Modal />
  </div>
</template>
