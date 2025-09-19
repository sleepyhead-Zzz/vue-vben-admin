<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { InputNumber, Select, Space } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { addPlan, editPlan, getPlanInfo } from '#/api/asset/plan';
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

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[550px]',
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;

    modalApi.modalLoading(true);

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await getPlanInfo({ planId: id });
      await formApi.setValues({ ...record.data });
    }

    await markInitialized();
    modalApi.modalLoading(false);
  },
});

const options = [
  { label: '天', value: 1 },
  { label: '周', value: 2 },
  { label: '月', value: 3 },
];

async function handleConfirm() {
  try {
    modalApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) return;

    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value
      ? editPlan({ planId: data.planId }, data)
      : addPlan(data));

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
</script>
<template>
  <BasicModal :title="title">
    <BasicForm>
      <template #frequencyIntervalValue="">
        <Space>
          <span>每</span>
          <InputNumber
            :value="formApi.form.values.intervalValue"
            @input="(val: any) => formApi.setValues({ intervalValue: val })"
            min="1"
            style="width: 100px"
          />
          <Select
            :value="formApi.form.values.frequency"
            @change="(val) => formApi.setValues({ frequency: val })"
            :options="options"
            placeholder="请选择周期"
            style="width: 120px"
          />
        </Space>
      </template>
    </BasicForm>
  </BasicModal>
</template>
