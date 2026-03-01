<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue';

import { computed, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Select, Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  getDimCustomerInfo,
  getPagedDimCustomer,
} from '#/api/perf/dimCustomer';
import { getProductInfo, optionProductSelect } from '#/api/perf/product';
import {
  addSalesData,
  editSalesData,
  getSalesDataInfo,
} from '#/api/perf/salesdata';
import { getPagedUser } from '#/api/system/user';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { modalSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    formItemClass: 'col-span-2',
    labelWidth: 80,
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

type RemoteSelectState = {
  fetching: boolean;
  options: SelectProps['options'];
};

const userState = reactive<RemoteSelectState>({
  options: [],
  fetching: false,
});

const customerState = reactive<RemoteSelectState>({
  options: [],
  fetching: false,
});

const productState = reactive<RemoteSelectState>({
  options: [],
  fetching: false,
});

/** product 全量只加载一次（你如果希望每次打开都刷新，把它改成每次都拉） */
const productLoaded = ref(false);

function resetRemoteSelectState() {
  userState.fetching = false;
  userState.options = [];
  customerState.fetching = false;
  customerState.options = [];
  // product 不清空 loaded：做成普通下拉一般希望复用缓存，提升体验
  // 如果你希望关闭弹窗就清掉，取消注释下面两行：
  // productLoaded.value = false;
  // productState.options = [];
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

    // ✅ product 做成普通下拉：打开时先加载全量 options
    await loadProductOptions();

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await getSalesDataInfo({ salesId: id });
      await formApi.setValues(record.data);

      if (record.data?.userId) {
        const userRes = await getPagedUser({ userId: record.data.userId });
        if (userRes.data?.rows?.length) {
          const user = userRes.data.rows[0];
          userState.options = [{ label: user.nickName, value: user.userId }];
        }
      }

      if (record.data?.customerId) {
        const customerRes = await getDimCustomerInfo({
          customerId: record.data.customerId,
        });
        const customer = customerRes.data;
        if (customer?.customerId) {
          customerState.options = [
            { label: customer.customerName, value: customer.customerId },
          ];
        }
      }

      // 这里保留：编辑时如果产品不在 option 列表里（极端情况），补一条
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
    await (isUpdate.value
      ? editSalesData({ saleId: data.saleId }, data)
      : addSalesData(data));

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

async function fetchUser(value: string) {
  if (!value) {
    userState.options = [];
    return;
  }
  userState.fetching = true;
  try {
    const res = await getPagedUser({ userName: value });
    userState.options =
      res.data?.rows?.map((user) => ({
        label: user.nickName,
        value: user.userId,
      })) ?? [];
  } finally {
    userState.fetching = false;
  }
}

async function fetchCustomer(value: string) {
  if (!value) {
    customerState.options = [];
    return;
  }
  customerState.fetching = true;
  try {
    const res = await getPagedDimCustomer({
      pageNum: 1,
      pageSize: 20,
      customerName: value,
    } as PerfAPI.getPagedDimCustomerParams & { customerName?: string });

    customerState.options =
      res.data?.rows?.map((customer) => ({
        label: customer.customerName,
        value: customer.customerId,
      })) ?? [];
  } finally {
    customerState.fetching = false;
  }
}

function handleUserChange(val: null | number) {
  formApi.setFieldValue('userId', val);
  const selected = userState.options?.find((item) => item?.value === val);
  formApi.setFieldValue('userName', (selected?.label as string) || undefined);
}

function handleCustomerChange(val: null | number) {
  formApi.setFieldValue('customerId', val);
  const selected = customerState.options?.find((item) => item?.value === val);
  formApi.setFieldValue(
    'customerName',
    (selected?.label as string) || undefined,
  );
}

function handleProductChange(val: null | number) {
  formApi.setFieldValue('productId', val);
  const selected = productState.options?.find((item) => item?.value === val);
  formApi.setFieldValue(
    'productName',
    (selected?.label as string) || undefined,
  );
}

/**
 * ✅ 前端过滤：用户输入时按 label 匹配
 * ant-design-vue Select 的 filterOption 支持 (input, option) => boolean
 */
function productFilterOption(input: string, option: any) {
  const label = String(option?.label ?? '');
  return label.toLowerCase().includes(input.trim().toLowerCase());
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm>
      <template #userId="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请输入用户"
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

      <template #customerId="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请输入顾客名称"
          style="width: 100%"
          :filter-option="false"
          :not-found-content="customerState.fetching ? undefined : null"
          :options="customerState.options"
          @search="fetchCustomer"
          @change="handleCustomerChange"
          allow-clear
        >
          <template v-if="customerState.fetching" #notFoundContent>
            <Spin size="small" />
          </template>
        </Select>
      </template>

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
