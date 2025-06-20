<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { addFullName, cloneDeep, getPopupContainer } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import { dropdownlistLocation } from '#/api/asset/weizhi';
import {
  addFurniture,
  editFurniture,
  getFurnitureInfo,
} from '#/api/regulatory/jiaju';
import { dropdownDeptList } from '#/api/system/sysDeptApi';
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
    modalApi.modalLoading(true);

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await getFurnitureInfo({ furnitureId: id });
      await formApi.setValues(record.data);
    }

    const promises = [setupDeptSelect(), setupLocationSelect()];
    await Promise.all(promises);
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
      ? editFurniture({ furnitureId: data.furnitureId }, data)
      : addFurniture(data));
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

/**
 * 初始化部门选择
 */
async function setupDeptSelect() {
  // updateSchema
  const deptTree = await dropdownDeptList({
    query: {
      orderColumn: undefined,
      orderDirection: undefined,
      timeRangeColumn: undefined,
      beginTime: undefined,
      endTime: undefined,
      deptId: undefined,
      parentId: undefined,
      status: undefined,
      deptName: undefined,
    },
  });
  // 选中后显示在输入框的值 即父节点 / 子节点
  addFullName(deptTree.data, 'label', ' / ');
  formApi.updateSchema([
    {
      componentProps: () => ({
        class: 'w-full',
        fieldNames: {
          key: 'id',
          value: 'id',
          children: 'children',
        },
        getPopupContainer,

        placeholder: '请选择',
        showSearch: true,
        treeData: deptTree.data,
        treeDefaultExpandAll: true,
        treeLine: { showLeafIcon: false },
        // 筛选的字段
        treeNodeFilterProp: 'label',
        // 选中后显示在输入框的值
        treeNodeLabelProp: 'fullName',
      }),
      fieldName: 'department',
    },
  ]);
}

/**
 * 初始化位置选择
 */
async function setupLocationSelect() {
  // updateSchema
  const locationTree = await dropdownlistLocation({
    query: {},
  });
  // 选中后显示在输入框的值 即父节点 / 子节点
  addFullName(locationTree.data, 'label', ' / ');
  formApi.updateSchema([
    {
      componentProps: () => ({
        class: 'w-full',
        fieldNames: {
          key: 'id',
          value: 'id',
          children: 'children',
        },
        getPopupContainer,

        placeholder: '请选择',
        showSearch: true,
        treeData: locationTree.data,
        treeDefaultExpandAll: true,
        treeLine: { showLeafIcon: false },
        // 筛选的字段
        treeNodeFilterProp: 'label',
        // 选中后显示在输入框的值
        treeNodeLabelProp: 'label',
      }),
      fieldName: 'locationId',
    },
  ]);
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm />
  </BasicModal>
</template>
