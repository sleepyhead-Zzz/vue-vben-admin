<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import {
  addFullName,
  cloneDeep,
  getPopupContainer,
  listToTree,
} from '@vben/utils';

import { useVbenForm } from '#/adapter/form';
import {
  addMenu,
  editMenu,
  getMenuInfo,
  listMenu,
} from '#/api/system/sysMenuApi';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils/popup';

import { drawerSchema } from './data';

interface ModalProps {
  id?: number | string;
  update: boolean;
}
const emit = defineEmits<{ reload: [] }>();

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
    labelWidth: 90,
  },
  schema: drawerSchema(),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2',
});

async function setupMenuSelect() {
  // menu
  const { data } = await listMenu({
    menuName: '',
  });
  const menuArray = data || [];
  // support i18n
  menuArray.forEach((item) => {
    item.menuName = $t(item.menuName);
  });
  // const folderArray = menuArray.filter((item) => item.menuType === 'M');
  /**
   * 这里需要过滤掉按钮类型
   * 不允许在按钮下添加数据
   */
  const filteredList = menuArray.filter((item) => item.menuType !== 'F');
  const menuTree = listToTree(filteredList, { id: 'menuId', pid: 'parentId' });
  const fullMenuTree = [
    {
      menuId: 0,
      menuName: $t('system.menu.root'),
      children: menuTree,
    },
  ];
  addFullName(fullMenuTree, 'menuName', ' / ');
  formApi.updateSchema([
    {
      fieldName: 'parentId',
      componentProps: {
        keyField: 'menuId', // 对应 value 的字段
        labelField: 'menuName', // 显示 label 的字段
        childrenField: 'children', // 子节点字段
        getPopupContainer,
        // 设置弹窗滚动高度 默认256
        listHeight: 300,
        showSearch: true,
        options: fullMenuTree,
        // 默认展开的树节点
        defaultExpandedKeys: [0], // 默认展开的节点
        showPath: true, // 展示路径信息（可选）
        filterable: true, // 启用过滤（等效于 showSearch）
        leafOnly: false, // 是否只能选叶子节点（视业务而定）
      },
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

    const { id, update } = drawerApi.getData() as ModalProps;
    isUpdate.value = update;

    // 加载菜单树选择
    await setupMenuSelect();
    if (id) {
      await formApi.setFieldValue('parentId', id);
      if (update) {
        const { data } = await getMenuInfo({ menuId: id });
        await formApi.setValues(data);
      }
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
      ? editMenu(
          {
            menuId: data.menuId,
          },
          data,
        )
      : addMenu(data));
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
