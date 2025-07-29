<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue';

import { computed, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Select } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getPagedUser } from '#/api/system/user';
import { addBook, editBook, getBookInfo } from '#/api/traveler/book';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { modalSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    // 默认占满两列
    formItemClass: 'col-span-2',
    // 默认label宽度 px
    labelWidth: 80,
    // 通用配置项 会影响到所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  schema: modalSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: defaultFormValueGetter(formApi),
    currentGetter: defaultFormValueGetter(formApi),
  },
);

const [BasicModal, modalApi] = useVbenModal({
  // 在这里更改宽度
  class: 'w-[550px]',
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await getBookInfo({ bookId: id });
      await formApi.setValues(record.data);

      if (record.data.staffId) {
        const userRes = await getPagedUser({ userId: record.data.staffId });
        if (userRes.data?.rows?.length) {
          const user = userRes.data.rows[0];
          states.staffId.data = [
            {
              label: user.nickName,
              value: user.userId,
            },
          ];
          states.staffId.value = user.userId;
        }
      }
    }

    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    // getValues获取为一个readonly的对象 需要修改必须先深拷贝一次
    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value
      ? editBook({ bookId: data.bookId }, data)
      : addBook(data));
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  await formApi.resetForm();
  resetInitialized();
}

// 用户搜索 state
const states = reactive<{
  staffId: {
    data: SelectProps['options'];
    fetching: boolean;
    value: null | SelectProps['value'];
  };
}>({
  staffId: {
    data: [],
    fetching: false,
    value: null,
  },
});

/**
 * 远程搜索用户
 */
async function fetchUser(value: string, field: 'staffId') {
  if (!value) {
    states[field].data = [];
    return;
  }
  states[field].fetching = true;
  try {
    const res = await getPagedUser({
      userName: value,
    });
    states[field].data = res.data?.rows.map((user) => ({
      label: user.nickName,
      value: user.userId,
    }));
  } finally {
    states[field].fetching = false;
  }
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm>
      <template #staffId="staffId">
        <Select
          show-search
          :value="staffId.value"
          placeholder="请输入用户"
          style="width: 100%"
          :filter-option="false"
          :not-found-content="states.staffId.fetching ? undefined : null"
          :options="states.staffId.data"
          @search="(val) => fetchUser(val, 'staffId')"
          @change="(val) => formApi.setFieldValue('staffId', val)"
          allow-clear
        >
          <template v-if="states.staffId.fetching" #notFoundContent>
            <Spin size="small" />
          </template>
        </Select>
      </template>
    </BasicForm>
  </BasicModal>
</template>
