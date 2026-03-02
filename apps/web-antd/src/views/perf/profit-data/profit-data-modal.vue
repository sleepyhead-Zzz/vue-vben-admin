<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue';

import { computed, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Modal, Select, Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getProductInfo, optionProductSelect } from '#/api/perf/product';
import {
  addProfitData,
  editProfitData,
  getProfitDataInfo,
} from '#/api/perf/profitdata';
import { getPagedUser } from '#/api/system/user';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { modalSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() =>
  isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add'),
);

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    formItemClass: 'col-span-2',
    labelWidth: 80,
    componentProps: { class: 'w-full' },
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

type RemoteSelectState = {
  fetching: boolean;
  options: SelectProps['options'];
};

const userState = reactive<RemoteSelectState>({
  options: [],
  fetching: false,
});

const productState = reactive<RemoteSelectState>({
  options: [],
  fetching: false,
});

const periodState = reactive<RemoteSelectState>({
  options: [],
  fetching: false,
});

/** product/period 全量只加载一次（如需每次打开都刷新，把 loaded 去掉即可） */
const productLoaded = ref(false);

function resetRemoteSelectState() {
  userState.fetching = false;
  userState.options = [];

  // product/period 作为普通下拉，默认复用缓存提升体验
  productState.fetching = false;
  periodState.fetching = false;

  // 如果你希望关闭弹窗就清缓存，取消注释：
  // productLoaded.value = false;
  // periodLoaded.value = false;
  // productState.options = [];
  // periodState.options = [];
}

async function loadProductOptions() {
  if (productLoaded.value) return;

  productState.fetching = true;
  try {
    const res = await optionProductSelect({});
    const list = res.data ?? [];
    productState.options = list.map((p: any) => ({
      label: p.productName,
      value: p.productId,
    }));
    productLoaded.value = true;
  } finally {
    productState.fetching = false;
  }
}

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[550px]',
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return null;

    resetRemoteSelectState();
    modalApi.modalLoading(true);

    // ✅ 普通下拉：打开弹窗时先加载全量 options
    await loadProductOptions();

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = id !== undefined && id !== null && String(id) !== '';

    if (isUpdate.value && id) {
      const record = await getProfitDataInfo({ profitId: id });
      if (record.data) {
        await formApi.setValues(record.data);
      }

      // ✅ user 编辑回显：把选中用户补到 options 里
      if (record.data?.userId) {
        const userRes = await getPagedUser({ userId: record.data.userId });
        if (userRes.data?.rows?.length) {
          const user = userRes.data.rows[0];
          userState.options = [{ label: user.nickName, value: user.userId }];
        }
      }

      // ✅ product：极端情况不在 options 列表里，补一条
      if (record.data?.productId) {
        const exists = productState.options?.some(
          (o) => o?.value === record.data.productId,
        );
        if (!exists) {
          const productRes = await getProductInfo({
            productId: record.data.productId,
          });
          const product = productRes.data;
          if (product?.productId) {
            productState.options = [
              { label: product.productName, value: product.productId },
              ...(productState.options ?? []),
            ];
          }
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
    if (!valid) return;

    const data = cloneDeep(await formApi.getValues());

    if (isUpdate.value) {
      if (typeof data.profitId !== 'number') {
        Modal.warning({ title: '提示', content: '缺少有效的利润数据ID' });
        return;
      }
      await editProfitData({ profitId: data.profitId }, data);
    } else {
      await addProfitData(data);
    }

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
  resetRemoteSelectState();
}

// -------------------- user：远程搜索 --------------------
async function fetchUser(value: string) {
  if (!value) {
    userState.options = [];
    return;
  }
  userState.fetching = true;
  try {
    const res = await getPagedUser({ userName: value });
    userState.options =
      res.data?.rows?.map((user: any) => ({
        label: user.nickName,
        value: user.userId,
      })) ?? [];
  } finally {
    userState.fetching = false;
  }
}

function handleUserChange(val: null | number) {
  formApi.setFieldValue('userId', val);
  const selected = userState.options?.find((item) => item?.value === val);
  formApi.setFieldValue('userName', (selected?.label as string) || undefined);
}

// -------------------- product：普通下拉 + 前端过滤 --------------------
function handleProductChange(val: null | number) {
  formApi.setFieldValue('productId', val);
  const selected = productState.options?.find((item) => item?.value === val);
  formApi.setFieldValue(
    'productName',
    (selected?.label as string) || undefined,
  );
}

function productFilterOption(input: string, option: any) {
  const label = String(option?.label ?? '');
  return label.toLowerCase().includes(input.trim().toLowerCase());
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm>
      <!-- userId：远程搜索 -->
      <template #userId="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请输入销售人员"
          style="width: 100%"
          :filter-option="false"
          :not-found-content="userState.fetching ? undefined : null"
          :options="userState.options"
          @search="fetchUser"
          @change="handleUserChange"
          allow-clear
        >
          <template v-if="userState.fetching" #notFoundContent>
            <Spin size="small" />
          </template>
        </Select>
      </template>

      <!-- productId：普通下拉 + 前端过滤 -->
      <template #productId="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请选择产品"
          style="width: 100%"
          :options="productState.options"
          :filter-option="productFilterOption"
          :not-found-content="productState.fetching ? undefined : null"
          @change="handleProductChange"
          allow-clear
        >
          <template v-if="productState.fetching" #notFoundContent>
            <Spin size="small" />
          </template>
        </Select>
      </template>
    </BasicForm>
  </BasicModal>
</template>
