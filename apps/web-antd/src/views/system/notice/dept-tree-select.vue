<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { TreeSelect } from 'ant-design-vue';
import { SHOW_PARENT } from 'ant-design-vue/es/vc-tree-select/utils/strategyUtil';

import { optionDeptList } from '#/api/system/dept';

interface DeptNode {
  id: number;
  value: number;
  title: string;
  children?: DeptNode[];
}

defineProps<{
  modelValue: number[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: number[]): void;
}>();

const treeData = ref<DeptNode[]>([]);

// 将后端树节点映射为 TreeSelect 节点
function mapNode(item: any): DeptNode {
  return {
    id: item.id,
    value: item.id,
    title: item.label,
    children: item.children?.map((child) => mapNode(child)),
  };
}

// 一次性加载整棵树
async function loadTree() {
  const { data } = await optionDeptList({ query: {} });
  treeData.value = data.map((item) => mapNode(item));
}

onMounted(loadTree);
</script>

<template>
  <TreeSelect
    :value="modelValue"
    multiple
    tree-checkable
    show-search
    allow-clear
    placeholder="请选择部门"
    :tree-data="treeData"
    :show-checked-strategy="SHOW_PARENT"
    tree-node-filter-prop="title"
    @update:value="emit('update:modelValue', $event)"
  />
</template>
