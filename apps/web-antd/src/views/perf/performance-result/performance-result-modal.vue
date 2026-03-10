<script setup lang="ts">
import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { getFactPerformanceResultInfo } from '#/api/perf/factPerformanceResult';

import { modalSchema } from './data';

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    formItemClass: 'col-span-2',
    labelWidth: 160,
    componentProps: {
      class: 'w-full',
      disabled: true,
    },
  },
  schema: modalSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[720px]',
  footer: false,
  fullscreenButton: false,
  onClosed: async () => {
    await formApi.resetForm();
  },
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }

    modalApi.modalLoading(true);
    try {
      const { id } = modalApi.getData() as { id?: number | string };
      if (id) {
        const record = await getFactPerformanceResultInfo({
          performanceId: id as never,
        });
        await formApi.setValues(record.data ?? {});
      }
    } finally {
      modalApi.modalLoading(false);
    }

    return null;
  },
});
</script>

<template>
  <BasicModal title="最终绩效结果详情">
    <BasicForm />
  </BasicModal>
</template>
