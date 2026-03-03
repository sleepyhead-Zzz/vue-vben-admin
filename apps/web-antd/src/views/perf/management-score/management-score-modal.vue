<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue';

import { computed, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Select, Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  addFactManagementScore,
  editFactManagementScore,
  getFactManagementScoreInfo,
} from '#/api/perf/factManagementScore';
import { getPeriodInfo, optionPeriodSelect } from '#/api/perf/period';
import { getPagedUser } from '#/api/system/user';
import { getDictOptions } from '#/utils/dict';
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

const periodState = reactive<RemoteSelectState>({
  fetching: false,
  options: [],
});

const periodLoaded = ref(false);
const scoreTypeOptions = getDictOptions(DictEnum.PerfManagementScoreType);

function resetRemoteSelectState() {
  userState.fetching = false;
  userState.options = [];
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

async function loadPeriodOptions() {
  if (periodLoaded.value) return;

  periodState.fetching = true;
  try {
    const { scoreType } = await formApi.getValues<{
      scoreType?: number | string;
    }>();

    if (!scoreType) {
      periodState.options = [];
      return;
    }

    const isYearType = String(scoreType) === '1';
    const periodType = isYearType ? '1' : '2';

    const res = await optionPeriodSelect({ periodType });
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
    periodLoaded.value = false;

    if (isUpdate.value && id) {
      const record = await getFactManagementScoreInfo({ managementId: id });
      await formApi.setValues(record.data);
      periodLoaded.value = false;
      await loadPeriodOptions();

      if (record.data?.userId) {
        const userRes = await getPagedUser({ userId: record.data.userId });
        if (userRes.data?.rows?.length) {
          const user = userRes.data.rows[0];
          userState.options = [{ label: user.nickName, value: user.userId }];
        } else {
          userState.options = [
            {
              label: String(record.data.userId),
              value: record.data.userId,
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
      ? editFactManagementScore({ managementId: data.managementId }, data)
      : addFactManagementScore(data));
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
  periodLoaded.value = false;
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

function handleUserChange(val: null | number) {
  formApi.setFieldValue('userId', val);
}

function handlePeriodChange(val: null | number) {
  formApi.setFieldValue('periodId', val);
}

async function handleScoreTypeChange(val: null | string) {
  formApi.setFieldValue('scoreType', val);
  formApi.setFieldValue('periodId', undefined);
  periodState.options = [];
  periodLoaded.value = false;
  if (val) {
    await loadPeriodOptions();
  }
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

      <template #scoreType="slotProps">
        <Select
          show-search
          :value="slotProps.value"
          placeholder="请选择评分类型"
          style="width: 100%"
          option-filter-prop="label"
          option-label-prop="label"
          :options="scoreTypeOptions"
          @change="handleScoreTypeChange"
          allow-clear
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
