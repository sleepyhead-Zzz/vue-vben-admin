<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import {
  addDictData,
  editDictData,
  getDictDataInfo,
} from '#/api/system/dictData';
import { tagTypes } from '#/components/dict';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { drawerSchema } from './data';
import TagStylePicker from './tag-style-picker.vue';

const emit = defineEmits<{ reload: [] }>();

interface DrawerProps {
  dictCode?: number | string;
  dictType: string;
}

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
  },
  schema: drawerSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

/**
 * 标签样式选择器
 * default: 预设标签样式
 * custom: 自定义标签样式
 */
const selectType = ref('default');
/**
 * 根据标签样式判断是自定义还是默认
 * @param listClass 标签样式
 */
function setupSelectType(listClass: string) {
  // 判断是自定义还是预设
  const isDefault = Reflect.has(tagTypes, listClass);
  selectType.value = isDefault ? 'default' : 'custom';
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: defaultFormValueGetter(formApi),
    currentGetter: defaultFormValueGetter(formApi),
  },
);

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);

    const { dictCode, dictType } = drawerApi.getData() as DrawerProps;
    isUpdate.value = !!dictCode;
    await formApi.setFieldValue('dictType', dictType);

    if (dictCode && isUpdate.value) {
      const record = await getDictDataInfo({ dictCode });
      setupSelectType(record.data.listClass);
      await formApi.setValues(record.data);
    }
    await markInitialized();

    drawerApi.drawerLoading(false);
  },
});

async function handleConfirm() {
  try {
    drawerApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const data = cloneDeep(await formApi.getValues());
    // 需要置空的情况 undefined不会提交给后端 需要改为空字符串
    if (!data.listClass) {
      data.listClass = '';
    }
    await (isUpdate.value
      ? editDictData({ dictCode: data.dictCode }, data)
      : addDictData(data));
    resetInitialized();
    emit('reload');
    drawerApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.lock(false);
  }
}

async function handleClosed() {
  await formApi.resetForm();
  selectType.value = 'default';
  resetInitialized();
}

/**
 * 取消标签选中 必须设置为undefined才行
 */
async function handleDeSelect() {
  await formApi.setFieldValue('listClass', undefined);
}
</script>

<template>
  <BasicDrawer :title="title" class="w-[600px]">
    <BasicForm>
      <template #listClass="slotProps">
        <TagStylePicker
          v-bind="slotProps"
          v-model:select-type="selectType"
          @deselect="handleDeSelect"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
