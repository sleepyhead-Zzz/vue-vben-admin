<script setup lang="ts">
import type { FormInstance, Rule } from 'ant-design-vue/es/form';

import { computed, nextTick, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Alert,
  Form,
  FormItem,
  InputNumber,
  message,
  Switch,
} from 'ant-design-vue';

import {
  triggerMonthlyCalculation,
  triggerRangeCalculation,
} from '#/api/perf/factPerformanceResult';

type CalcTriggerMode = 'monthly' | 'range';

type TriggerBusinessResponse =
  PerfAPI.ResponseDTOPerformanceCalcTriggerResponseDTO;

const emit = defineEmits<{
  submitted: [{ mode: CalcTriggerMode; response: TriggerBusinessResponse }];
}>();

const currentMode = ref<CalcTriggerMode>('monthly');
const formRef = ref<FormInstance>();

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const formState = reactive({
  year: currentYear,
  month: currentMonth,
  fromMonth: currentMonth,
  toMonth: currentMonth,
  overwrite: false,
  autoExport: true,
});

const title = computed(() =>
  currentMode.value === 'monthly' ? '触发月度计算' : '触发区间计算',
);

const monthRules: Rule[] = [
  { required: true, message: '请选择月份' },
  {
    type: 'number',
    min: 1,
    max: 12,
    message: '月份范围为1-12',
  },
];

const toMonthRules: Rule[] = [
  ...monthRules,
  {
    validator: async (_rule, value) => {
      if (currentMode.value !== 'range') {
        return;
      }
      if (
        typeof value !== 'number' ||
        typeof formState.fromMonth !== 'number'
      ) {
        return;
      }
      if (formState.fromMonth > value) {
        throw new Error('结束月份不能小于起始月份');
      }
    },
  },
];

function resetForm() {
  formState.year = currentYear;
  formState.month = currentMonth;
  formState.fromMonth = currentMonth;
  formState.toMonth = currentMonth;
  formState.overwrite = false;
  formState.autoExport = true;
}

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[520px]',
  fullscreenButton: false,
  onClosed: async () => {
    resetForm();
    await nextTick();
    formRef.value?.clearValidate();
  },
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    const { mode } = modalApi.getData() as { mode?: CalcTriggerMode };
    currentMode.value = mode === 'range' ? 'range' : 'monthly';
    resetForm();
    await nextTick();
    formRef.value?.clearValidate();
    return null;
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await formRef.value?.validate();

    const response =
      currentMode.value === 'monthly'
        ? await triggerMonthlyCalculation({
            autoExport: formState.autoExport,
            month: formState.month,
            overwrite: formState.overwrite,
            year: formState.year,
          })
        : await triggerRangeCalculation({
            autoExport: formState.autoExport,
            fromMonth: formState.fromMonth,
            overwrite: formState.overwrite,
            toMonth: formState.toMonth,
            year: formState.year,
          });

    emit('submitted', { mode: currentMode.value, response });

    if (response.code === 200 || response.code === 105) {
      modalApi.close();
    }
  } catch (error) {
    const e = error as {
      message?: string;
      response?: { data?: { message?: string; msg?: string } };
    };
    message.error(
      e?.response?.data?.msg ||
        e?.response?.data?.message ||
        e?.message ||
        '提交计算任务失败，请稍后重试',
    );
  } finally {
    modalApi.lock(false);
  }
}
</script>

<template>
  <BasicModal :title="title">
    <div class="flex flex-col gap-4">
      <Alert
        :message="
          currentMode === 'monthly'
            ? '按当年1月1日至目标月末累计口径执行计算'
            : '按区间内每个月的当年累计口径逐月执行计算'
        "
        show-icon
        type="info"
      />
      <Form
        ref="formRef"
        :label-col="{ span: 6 }"
        :model="formState"
        :wrapper-col="{ span: 16 }"
      >
        <FormItem
          label="年份"
          name="year"
          :rules="[
            { required: true, message: '请输入年份' },
            { type: 'number', min: 2000, max: 2100, message: '请输入合法年份' },
          ]"
        >
          <InputNumber
            v-model:value="formState.year"
            :max="2100"
            :min="2000"
            class="w-full"
            placeholder="请输入年份"
          />
        </FormItem>

        <FormItem
          v-if="currentMode === 'monthly'"
          label="月份"
          name="month"
          :rules="monthRules"
        >
          <InputNumber
            v-model:value="formState.month"
            :max="12"
            :min="1"
            class="w-full"
            placeholder="请输入月份"
          />
        </FormItem>

        <FormItem
          v-if="currentMode === 'range'"
          label="起始月份"
          name="fromMonth"
          :rules="monthRules"
        >
          <InputNumber
            v-model:value="formState.fromMonth"
            :max="12"
            :min="1"
            class="w-full"
            placeholder="请输入起始月份"
          />
        </FormItem>

        <FormItem
          v-if="currentMode === 'range'"
          label="结束月份"
          name="toMonth"
          :rules="toMonthRules"
        >
          <InputNumber
            v-model:value="formState.toMonth"
            :max="12"
            :min="1"
            class="w-full"
            placeholder="请输入结束月份"
          />
        </FormItem>

        <FormItem label="覆盖已有结果" name="overwrite">
          <Switch v-model:checked="formState.overwrite" />
        </FormItem>

        <FormItem label="自动导出 OSS" name="autoExport">
          <Switch v-model:checked="formState.autoExport" />
        </FormItem>
      </Form>
    </div>
  </BasicModal>
</template>
