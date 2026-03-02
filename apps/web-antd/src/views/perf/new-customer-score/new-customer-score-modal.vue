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
import {
  addFactNewCustomerScore,
  editFactNewCustomerScore,
  getFactNewCustomerScoreInfo,
} from '#/api/perf/factNewCustomerScore';
import { getPeriodInfo, optionPeriodSelect } from '#/api/perf/period';
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
  options: [],
  fetching: false,
});

const customerState = reactive<RemoteSelectState>({
  options: [],
  fetching: false,
});

const periodState = reactive<RemoteSelectState>({
  options: [],
  fetching: false,
});

const periodLoaded = ref(false);

function resetRemoteSelectState() {
  userState.fetching = false;
  userState.options = [];
  customerState.fetching = false;
  customerState.options = [];
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
    await loadPeriodOptions();

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await getFactNewCustomerScoreInfo({ newCustomerId: id });
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
        if (customerRes.data?.customerId) {
          customerState.options = [
            {
              label: customerRes.data.customerName,
              value: customerRes.data.customerId,
            },
          ];
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
      ? editFactNewCustomerScore({ newCustomerId: data.newCustomerId }, data)
      : addFactNewCustomerScore(data));
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
}

function handleCustomerChange(val: null | number) {
  formApi.setFieldValue('customerId', val);
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

      <template #customerId="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请输入客户名称"
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

      <template #periodId="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请选择绩效周期"
          style="width: 100%"
          :options="periodState.options"
          :not-found-content="periodState.fetching ? undefined : null"
          @change="handlePeriodChange"
          allow-clear
        >
          <template v-if="periodState.fetching" #notFoundContent>
            <Spin size="small" />
          </template>
        </Select>
      </template>
    </BasicForm>
  </BasicModal>
</template>
