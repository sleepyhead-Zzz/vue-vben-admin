<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue';

import { computed, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { addFullName, cloneDeep, getPopupContainer } from '@vben/utils';

import { Select, Spin } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { addCard, editCard, getCardInfo } from '#/api/regulatory/card';
import { dropdownDeptList } from '#/api/system/dept';
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
      const record = await getCardInfo({ cardId: id });
      await formApi.setValues(record.data);

      if (record.data.managerUserId) {
        const userRes = await getPagedUser({
          userId: record.data.managerUserId,
        });
        if (userRes.data?.rows?.length) {
          const user = userRes.data.rows[0];
          states.managerUserId.data = [
            {
              label: user.nickName,
              value: user.userId,
            },
          ];
          states.managerUserId.value = user.userId;
        }
      }

      if (record.data.userId) {
        const userRes = await getPagedUser({ userId: record.data.userId });
        if (userRes.data?.rows?.length) {
          const user = userRes.data.rows[0];
          states.userId.data = [
            {
              label: user.nickName,
              value: user.userId,
            },
          ];
          states.userId.value = user.userId;
        }
      }
    }

    const promises = [setupDeptSelect()];
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
      ? editCard({ cardId: data.cardId }, data)
      : addCard(data));
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
  states.manager.data = [];
  states.manager.value = null;
  states.userId.data = [];
  states.userId.value = null;

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
      fieldName: 'managingDepartmentId',
    },
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
      fieldName: 'usingDepartmentId',
    },
  ]);
}
// 用户搜索 state
const states = reactive<{
  managerUserId: {
    data: SelectProps['options'];
    fetching: boolean;
    value: null | SelectProps['value'];
  };
  userId: {
    data: SelectProps['options'];
    fetching: boolean;
    value: null | SelectProps['value'];
  };
}>({
  managerUserId: {
    data: [],
    fetching: false,
    value: null,
  },
  userId: {
    data: [],
    fetching: false,
    value: null,
  },
});

/**
 * 远程搜索用户
 */
async function fetchUser(value: string, field: 'managerUserId' | 'userId') {
  if (!value) {
    states[field].data = [];
    return;
  }
  states[field].fetching = true;
  try {
    const res = await getPagedUser({
      userName: value,
    });
    states[field].data = res.data?.rows.map((user) => ({
      label: user.nickName,
      value: user.userId,
    }));
  } finally {
    states[field].fetching = false;
  }
}
</script>

<template>
  <BasicModal :title="title">
    <BasicForm>
      <template #managerUserId="managerUserId">
        <Select
          show-search
          :value="managerUserId.value"
          placeholder="请输入用户"
          style="width: 100%"
          :filter-option="false"
          :not-found-content="states.managerUserId.fetching ? undefined : null"
          :options="states.managerUserId.data"
          @search="(val) => fetchUser(val, 'managerUserId')"
          @change="(val) => formApi.setFieldValue('managerUserId', val)"
          allow-clear
        >
          <template v-if="states.managerUserId.fetching" #notFoundContent>
            <Spin size="small" />
          </template>
        </Select>
      </template>
      <template #userId="userId">
        <Select
          show-search
          :value="userId.value"
          placeholder="请输入用户"
          style="width: 100%"
          :filter-option="false"
          :not-found-content="states.userId.fetching ? undefined : null"
          :options="states.userId.data"
          @search="(val) => fetchUser(val, 'userId')"
          @change="(val) => formApi.setFieldValue('userId', val)"
          allow-clear
        >
          <template v-if="states.userId.fetching" #notFoundContent>
            <Spin size="small" />
          </template>
        </Select>
      </template>
    </BasicForm>
  </BasicModal>
</template>
