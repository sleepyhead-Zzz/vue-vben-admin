<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import type { DeptDTO } from '#/apis';

import { h, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NButton, NCard, NDataTable, NPopconfirm, useMessage } from 'naive-ui';

import { ApiService } from '#/apis';
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

const [Modal, modalApi] = useVbenModal({
  connectedComponent: DeptForm,
  onClosed: () => {
    fetchData();
  },
});

const message = useMessage();

const handleEdit = async (row: Dept) => {
  const { data: selectedDept } = await ApiService.getInfo2(row.deptId);
  modalApi.setData({ deptData: selectedDept });
  modalApi.open();
};

const handleDelete = async (row: Dept) => {
  await ApiService.remove4(row.deptId);
  message.info($t('common.table.delete_success'));
  await fetchData();
};

const createColumns = (): DataTableColumns<Dept> => {
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
};

const columns = createColumns();

const addNewDept = () => {
  selectedDept.value = null;
  modalApi.setData(selectedDept);
  modalApi.open();
};

const rowKey = (row: Dept) => row.deptId;
</script>
<template>
  <div class="container">
    <NCard class="full-card">
      <div class="p-4">
        <div class="mb-4">
          <Button @click="addNewDept">{{ $t('system.dept.add') }}</Button>
        </div>
        <NDataTable
          :columns="columns"
          :data="allDept"
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
