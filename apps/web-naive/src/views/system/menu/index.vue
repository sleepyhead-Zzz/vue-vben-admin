<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import { h, ref } from 'vue';

import { toTypedSchema } from '@vee-validate/zod';
import { NButton, NDataTable, NModal, useMessage } from 'naive-ui';
import * as z from 'zod';

import { ApiService, type MenuDetailDTO } from '#/apis';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';

interface Menu {
  label: string;
  menuId: number;
  parentId: number;
  children?: Menu[];
}
const data = ref<Menu[]>([]);
const showModal = ref(false);
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

const message = useMessage();

const columns = createColumns(async (row: Menu) => {
  const response = await ApiService.menuInfo(row.menuId);
  selectedMenu.value = response.data ?? null; // 将点击的行数据存储到 selectedMenu 中
  showModal.value = true; // 显示对话框
});

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  }),
);

function onSubmit(values: any) {
  message.info(`Clicked on ${values}`); // 可以显示提示信息
}
function onCancel() {
  showModal.value = false;
}
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
    <div>
      <Form
        v-slot="{ handleSubmit }"
        :validation-schema="formSchema"
        as=""
        keep-values
      >
        <NModal
          v-model:show="showModal"
          :title="$t('system.menu.edit')"
          preset="dialog"
        >
          <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    type="text"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </form>
          <template #action>
            <NButton class="M_r_10" type="success" @click="onSubmit">
              {{ $t('common.table.submit') }}
            </NButton>

            <NButton type="default" @click="onCancel">
              {{ $t('common.table.cancel') }}
            </NButton>
          </template>
        </NModal>
      </Form>
    </div>
  </div>
</template>
