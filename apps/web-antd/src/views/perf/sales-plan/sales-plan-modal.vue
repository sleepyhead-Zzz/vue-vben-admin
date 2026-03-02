<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue';

import { computed, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Select, Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getPeriodInfo, optionPeriodSelect } from '#/api/perf/period';
import { getProductInfo, optionProductSelect } from '#/api/perf/product';
import {
  addSalesPlan,
  editSalesPlan,
  getSalesPlanInfo,
} from '#/api/perf/salesPlan';
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

type RemoteSelectState = {
  fetching: boolean;
  options: SelectProps['options'];
};

const userState = reactive<RemoteSelectState>({
  fetching: false,
  options: [],
});

const productState = reactive<RemoteSelectState>({
  fetching: false,
  options: [],
});

const periodState = reactive<RemoteSelectState>({
  fetching: false,
  options: [],
});

const productLoaded = ref(false);
const periodLoaded = ref(false);

function resetRemoteSelectState() {
  userState.fetching = false;
  userState.options = [];
  productState.fetching = false;
  periodState.fetching = false;
}

function getPeriodLabel(
  period: PerfAPI.PerfDimPeriodDTO | PerfAPI.PerfDimPeriodVO,
) {
  if (period.month) {
    return `${period.year}年${period.month}月`;
  }
  if (period.quarter) {
    return `${period.year}年第${period.quarter}季度`;
  }
  return `${period.year}年`;
}

async function loadProductOptions() {
  if (productLoaded.value) {
    return;
  }
  productState.fetching = true;
  try {
    const res = await optionProductSelect();
    productState.options = (res.data ?? []).map((product) => ({
      label: `${product.productName || '-'}(${product.productId})`,
      value: product.productId,
    }));
    productLoaded.value = true;
  } finally {
    productState.fetching = false;
  }
}

async function loadPeriodOptions() {
  if (periodLoaded.value) {
    return;
  }
  periodState.fetching = true;
  try {
    const res = await optionPeriodSelect();
    periodState.options = (res.data ?? []).map((period) => ({
      label: getPeriodLabel(period),
      value: period.periodId,
    }));
    periodLoaded.value = true;
  } finally {
    periodState.fetching = false;
  }
}

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

    resetRemoteSelectState();
    modalApi.modalLoading(true);

    await Promise.all([loadProductOptions(), loadPeriodOptions()]);

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await getSalesPlanInfo({ salesPlanId: id });
      await formApi.setValues(record.data);

      if (record.data?.userId) {
        const userRes = await getPagedUser({ userId: record.data.userId });
        if (userRes.data?.rows?.length) {
          const user = userRes.data.rows[0];
          userState.options = [
            {
              label: user.nickName || user.userName,
              value: user.userId,
            },
          ];
        } else {
          userState.options = [
            {
              label: String(record.data.userId),
              value: record.data.userId,
            },
          ];
        }
      }

      if (record.data?.productId) {
        const exists = productState.options?.some(
          (item) => item?.value === record.data?.productId,
        );
        if (!exists) {
          const productRes = await getProductInfo({
            productId: record.data.productId,
          });
          if (productRes.data?.productId) {
            productState.options = [
              {
                label: `${productRes.data.productName || '-'}(${productRes.data.productId})`,
                value: productRes.data.productId,
              },
              ...(productState.options ?? []),
            ];
          }
        }
      }

      if (record.data?.periodId) {
        const exists = periodState.options?.some(
          (item) => item?.value === record.data?.periodId,
        );
        if (!exists) {
          const periodRes = await getPeriodInfo({
            periodId: record.data.periodId,
          });
          if (periodRes.data?.periodId) {
            periodState.options = [
              {
                label: getPeriodLabel(periodRes.data),
                value: periodRes.data.periodId,
              },
              ...(periodState.options ?? []),
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
    if (!valid) {
      return;
    }
    // getValues获取为一个readonly的对象 需要修改必须先深拷贝一次
    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value
      ? editSalesPlan({ planId: data.planId }, data)
      : addSalesPlan(data));
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
        label: user.nickName || user.userName,
        value: user.userId,
      })) ?? [];
  } finally {
    userState.fetching = false;
  }
}

function handleUserChange(val: null | number) {
  formApi.setFieldValue('userId', val);
}

function handleProductChange(val: null | number) {
  formApi.setFieldValue('productId', val);
}

function handlePeriodChange(val: null | number) {
  formApi.setFieldValue('periodId', val);
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm>
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

      <template #productId="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请选择产品"
          style="width: 100%"
          option-filter-prop="label"
          option-label-prop="label"
          :loading="productState.fetching"
          :options="productState.options"
          @change="handleProductChange"
          allow-clear
        />
      </template>

      <template #periodId="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请选择绩效周期"
          style="width: 100%"
          option-filter-prop="label"
          option-label-prop="label"
          :loading="periodState.fetching"
          :options="periodState.options"
          @change="handlePeriodChange"
          allow-clear
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
