<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import { h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NButton, NDataTable, NPopconfirm } from 'naive-ui';

import { ApiService, type DeptDTO } from '#/apis';
import { Button } from '#/components/ui/button';
import { $t } from '#/locales';

import DeptForm from './dept-form.vue';

interface Dept {
  label: string;
  deptId: number;
  parentId: number;
  children?: Dept[];
}
const allDept = ref<Dept[]>([]);
const selectedDept = ref<DeptDTO | null>(null);
const fetchData = async () => {
  // @ts-ignore
  const { data }: { data: Dept[] } = await ApiService.dropdownList1();
  allDept.value = data;
};

fetchData(); // 调用异步函数

function createColumns(
  edit: (row: Dept) => void,
  remove: (row: Dept) => void,
): DataTableColumns<Dept> {
  return [
    {
      title: $t('system.dept.name'),
      key: 'label',
    },
    {
      title: 'deptId',
      key: 'deptId',
    },
    {
      title: $t('common.table.action'),
      key: 'actions',
      render(row: Dept) {
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
  connectedComponent: DeptForm,
  onClosed: () => {
    fetchData();
  },
});
const columns = createColumns(
  async (row: Dept) => {
    const { data: selectedDept } = await ApiService.getInfo2(row.deptId);
    modalApi.setData({ deptData: selectedDept });
    modalApi.open();
  },
  async (row: Dept) => {
    await ApiService.remove3(row.deptId);
    await fetchData();
  },
);

function addNewDept() {
  selectedDept.value = null;
  modalApi.setData(selectedDept);
  modalApi.open();
}

const rowKey = (row: Dept) => row.deptId;
</script>

<template>
  <div>
    <div>
      <Button @click="addNewDept">{{ $t('system.dept.add') }}</Button>
    </div>
    <NDataTable
      :columns="columns"
      :data="allDept"
      :row-key="rowKey"
      default-expand-all
    />
    <Modal />
  </div>
</template>
