<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { addFullName, cloneDeep, listToTree } from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import {
  addDept,
  deptNodeList,
  editDept,
  getDeptInfo,
  listDept,
  listUserByDept,
} from '#/api/system/dept';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { drawerSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

interface DrawerProps {
  id?: number | string;
  update: boolean;
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

async function getDeptTree(deptId?: number | string, exclude = false) {
  let ret: API.DeptDTO[] = [];
  const { data } = await (!deptId || exclude
    ? listDept({})
    : deptNodeList({ deptId }));
  ret = data;
  const treeData = listToTree(ret, { id: 'deptId', pid: 'parentId' });
  // 添加部门名称 如 xx-xx-xx
  addFullName(treeData, 'deptName', ' / ');
  return treeData;
}

async function initDeptSelect(deptId?: number | string) {
  // 需要动态更新TreeSelect组件 这里允许为空
  const treeData = await getDeptTree(deptId, !isUpdate.value);
  formApi.updateSchema([
    {
      componentProps: {
        keyField: 'deptId', // 对应 value 的字段
        labelField: 'deptName', // 显示 label 的字段
        childrenField: 'children', // 子节点字段
        options: treeData,
        // 默认展开的树节点
        defaultExpandedKeys: [1], // 默认展开的节点
        showPath: true, // 展示路径信息（可选）
        filterable: true, // 启用过滤（等效于 showSearch）
        leafOnly: false, // 是否只能选叶子节点（视业务而定）
      },
      fieldName: 'parentId',
    },
  ]);
}

/**
 * 部门管理员下拉框 更新时才会enable
 * @param deptId
 */
async function initDeptUsers(deptId: number | string) {
  const { data } = await listUserByDept({ deptId });
  const ret = data;
  const options = ret.map((user) => ({
    label: `${user.userName} | ${user.nickName}`,
    value: user.userId,
  }));
  formApi.updateSchema([
    {
      componentProps: {
        disabled: ret.length === 0,
        options,
        placeholder: ret.length === 0 ? '该部门暂无用户' : '请选择部门负责人',
      },
      fieldName: 'leader',
    },
  ]);
}

async function setLeaderOptions() {
  formApi.updateSchema([
    {
      componentProps: {
        disabled: true,
        options: [],
        placeholder: '仅在更新时可选部门负责人',
      },
      fieldName: 'leader',
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

    const { id, update } = drawerApi.getData() as DrawerProps;
    isUpdate.value = update;

    if (id) {
      await formApi.setFieldValue('parentId', id);
      if (update) {
        const { data } = await getDeptInfo({ deptId: id });
        await formApi.setValues(data);
      }
    }

    await (update && id ? initDeptUsers(id) : setLeaderOptions());
    /** 部门选择 下拉框 */
    await initDeptSelect(id);
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
      ? editDept({ deptId: data.deptId }, data)
      : addDept(data));
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
