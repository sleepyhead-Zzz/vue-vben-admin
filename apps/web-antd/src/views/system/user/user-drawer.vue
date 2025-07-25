<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { addFullName, cloneDeep, getPopupContainer } from '@vben/utils';

import { Tag } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getConfigKey } from '#/api/system/config';
import { dropdownDeptList } from '#/api/system/dept';
import { optionSelectPost } from '#/api/system/post';
import { addUser, editUser, getUserDetailInfo } from '#/api/system/user';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';
import { authScopeOptions } from '#/views/system/role/data';

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

/**
 * 生成角色的自定义label
 * 也可以用option插槽来做
 * renderComponentContent: () => ({
    option: ({value, label, [disabled, key, title]}) => '',
  }),
 */
function genRoleOptionlabel(role: API.RoleDTO) {
  const found = authScopeOptions.find((item) => item.value === role.dataScope);
  if (!found) {
    return role.roleName;
  }
  return h('div', { class: 'flex items-center gap-[6px]' }, [
    h('span', null, role.roleName),
    h(Tag, { color: found.color }, () => found.label),
  ]);
}

/**
 * 岗位的加载
 */
async function setupPostOptions(deptId: number | string) {
  const { data } = await optionSelectPost({ deptId });
  const postListResp = data;
  const options = postListResp.map((item) => ({
    label: item.postName,
    value: item.postId,
  }));
  const placeholder = options.length > 0 ? '请选择' : '该部门下暂无岗位';
  formApi.updateSchema([
    {
      componentProps: { options, placeholder },
      fieldName: 'postIds',
    },
  ]);
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
      componentProps: (formModel) => ({
        class: 'w-full',
        fieldNames: {
          key: 'id',
          value: 'id',
          children: 'children',
        },
        getPopupContainer,
        async onSelect(deptId: number | string) {
          /** 根据部门ID加载岗位 */
          await setupPostOptions(deptId);
          /** 变化后需要重新选择岗位 */
          formModel.postIds = [];
        },
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
      fieldName: 'deptId',
    },
  ]);
}

const defaultPassword = ref('');
onMounted(async () => {
  const { data } = await getConfigKey({ configKey: 'sys.user.initPassword' });
  if (data) {
    defaultPassword.value = data;
  }
});

/**
 * 新增时候 从参数设置获取默认密码
 */
async function loadDefaultPassword(update: boolean) {
  if (!update && defaultPassword.value) {
    formApi.setFieldValue('password', defaultPassword.value);
  }
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
      // 需要重置岗位选择
      formApi.updateSchema([
        {
          componentProps: { options: [], placeholder: '请先选择部门' },
          fieldName: 'postIds',
        },
      ]);
      return null;
    }
    drawerApi.drawerLoading(true);

    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;
    /** update时 禁用用户名修改 不显示密码框 */
    formApi.updateSchema([
      { componentProps: { disabled: isUpdate.value }, fieldName: 'userName' },
      {
        dependencies: { show: () => !isUpdate.value, triggerFields: ['id'] },
        fieldName: 'password',
      },
    ]);
    // 更新 && 赋值
    const { data } = await getUserDetailInfo({
      userId: id,
    });
    const { postIds, posts, roleIds, roles, user } = data;
    const postOptions = (posts ?? []).map((item) => ({
      label: item.postName,
      value: item.postId,
    }));
    formApi.updateSchema([
      {
        componentProps: {
          // title用于选中后回填到输入框 默认为label
          optionLabelProp: 'title',
          options: roles.map((item) => ({
            label: genRoleOptionlabel(item),
            // title用于选中后回填到输入框 默认为label
            title: item.roleName,
            value: item.roleId,
          })),
        },
        fieldName: 'roleIds',
      },
      {
        componentProps: {
          options: postOptions,
        },
        fieldName: 'postIds',
      },
    ]);

    // 部门选择、初始密码及用户相关操作并行处理
    const promises = [setupDeptSelect(), loadDefaultPassword(isUpdate.value)];
    if (user) {
      promises.push(
        // 添加基础信息
        formApi.setValues(user),
        // 添加角色和岗位
        formApi.setFieldValue('postIds', postIds),
        formApi.setFieldValue('roleIds', roleIds),
        // 更新时不会触发onSelect 需要手动调用
        setupPostOptions(user.deptId),
      );
    }
    // 并行处理 重构后会带来10-50ms的优化
    await Promise.all(promises);
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
      ? editUser({ userId: data.userId }, data)
      : addUser(data));
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
  formApi.resetForm();
  resetInitialized();
}
</script>

<template>
  <BasicDrawer :title="title" class="w-[600px]">
    <BasicForm />
  </BasicDrawer>
</template>
