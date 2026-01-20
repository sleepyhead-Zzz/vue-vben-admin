<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';
import { cloneDeep } from '@vben/utils';

import { message as notify } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getDeviceInfo } from '#/api/asset/device';
import { addRepair, editRepair, getRepairInfo } from '#/api/asset/repair';

import { pageSchema } from './data';

const { closeCurrentTab } = useTabs();
/**
 * 路由参数设计（REST 语义）
 * 新增：/asset/device/:deviceId/repair
 * 编辑：/asset/repair/:repairId/edit
 */
const route = useRoute();

const deviceId = route.params.deviceId as string | undefined;
const repairId = route.params.repairId as string | undefined;

const isUpdate = computed(() => !!repairId);

// const title = computed(() =>
//   isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add'),
// );
// 用于 reset 的初始数据快照
const initialFormValues = ref<Recordable<any>>({});

/**
 * 表单
 */
const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    formItemClass: 'col-span-2',
    labelWidth: 80,
    componentProps: {
      class: 'w-full',
    },
  },
  handleSubmit,
  handleReset,
  schema: pageSchema(),
  showDefaultActions: true,
  wrapperClass: 'grid-cols-2',
});

/**
 * 页面初始化
 * - 编辑：根据 repairId 查询详情，完全信任接口数据
 * - 新增：直接使用路由中的 deviceId
 */
onMounted(async () => {
  if (isUpdate.value && repairId) {
    const { data } = await getRepairInfo({ repairId });
    await formApi.setValues(data);

    // 编辑态：完整快照
    initialFormValues.value = cloneDeep(data);
    return;
  }

  // 新增态
  if (deviceId) {
    const { data } = await getDeviceInfo({ deviceId });
    const deviceName = data?.deviceName;
    const deviceCode = data?.deviceCode;
    const initData = { deviceId, deviceName, deviceCode };
    await formApi.setValues(initData);

    // 新增态：只保留 deviceId
    initialFormValues.value = cloneDeep(initData);
  }
});
/**
 * 提交
 */
async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) return;

  const data = cloneDeep(await formApi.getValues());

  await (isUpdate.value
    ? editRepair({ repairId: data.repairId }, data)
    : addRepair(data));

  notify.success('提交成功');

  closeCurrentTab();
}

async function handleReset() {
  await formApi.resetForm();
  await formApi.setValues(cloneDeep(initialFormValues.value));
}
</script>

<template>
  <Page class="mx-auto max-w-3xl p-4">
    <BasicForm />
  </Page>
</template>
