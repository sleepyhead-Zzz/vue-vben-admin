<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { addFullName, cloneDeep } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { dropdownDeptList } from '#/api/system/dept';
import { addPost, editPost, getPostInfo } from '#/api/system/post';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { drawerSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    formItemClass: 'col-span-2',
    componentProps: {
      class: 'w-full',
    },
    labelWidth: 80,
  },
  schema: drawerSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

async function setupDeptSelect() {
  const { data } = await dropdownDeptList({});
  // 选中后显示在输入框的值 即父节点 / 子节点
  addFullName(data, 'label', ' / ');
  formApi.updateSchema([
    {
      componentProps: {
        keyField: 'id', // 对应 value 的字段
        labelField: 'label', // 显示 label 的字段
        childrenField: 'children', // 子节点字段
        options: data,
        // 默认展开的树节点
        defaultExpandedKeys: [1], // 默认展开的节点
        showPath: true, // 展示路径信息（可选）
        filterable: true, // 启用过滤（等效于 showSearch）
        leafOnly: false, // 是否只能选叶子节点（视业务而定）
      },
      fieldName: 'deptId',
    },
  ]);
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
    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;
    // 初始化
    await setupDeptSelect();
    // 更新 && 赋值
    if (isUpdate.value && id) {
      const { data } = await getPostInfo({ postId: id });
      await formApi.setValues(data);
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
    await (isUpdate.value
      ? editPost({ postId: data.postId }, data)
      : addPost(data));
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
  resetInitialized();
}
</script>

<template>
  <BasicDrawer :title="title" class="w-[600px]">
    <BasicForm />
  </BasicDrawer>
</template>
