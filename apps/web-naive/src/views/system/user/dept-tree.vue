<script setup lang="ts">
import type { PropType } from 'vue';

import { onMounted, ref } from 'vue';

import { NButton, NEmpty, NInput, NSwitch, NTree } from 'naive-ui';

import { dropdownDeptList } from '#/api/system/sysDeptApi';

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ showSearch?: boolean }>(), { showSearch: true });

const emit = defineEmits<{
  /**
   * 点击刷新按钮的事件
   */
  reload: [];
  /**
   * 点击节点的事件
   */
  select: [string[]];
}>();

const selectDeptId = defineModel('selectDeptId', {
  required: true,
  type: Array as PropType<string[]>,
});

const searchValue = defineModel('searchValue', {
  type: String,
  default: '',
});

/** 部门数据源 */
type DeptTreeArray = API.DeptDTO[];
const deptTreeArray = ref<DeptTreeArray>([]);
/** 是否显示无关节点 */
const showIrrelevantNodes = ref(false);

const expandedKeys = ref<string[]>([]);
function collectAllKeys(nodes: any[]): string[] {
  const keys: string[] = [];

  function traverse(data: any[]) {
    for (const node of data) {
      keys.push(node.id);
      if (node.children?.length) {
        traverse(node.children);
      }
    }
  }
  traverse(nodes);
  return keys;
}
async function loadTree() {
  searchValue.value = '';
  selectDeptId.value = [];

  const { data } = await dropdownDeptList({
    query: {
      orderColumn: undefined,
      orderDirection: undefined,
      timeRangeColumn: undefined,
      beginTime: undefined,
      endTime: undefined,
      deptId: undefined,
      parentId: undefined,
    },
  });
  deptTreeArray.value = data;
  expandedKeys.value = collectAllKeys(data); // 展开所有节点
}

async function handleReload() {
  await loadTree();
  emit('reload');
}

onMounted(loadTree);
</script>

<template>
  <div :class="$attrs.class">
    <div class="bg-background flex h-full flex-col overflow-y-auto rounded-lg">
      <!-- 固定在顶部 必须加上bg-background背景色 否则会产生'穿透'效果 -->
      <div
        v-if="showSearch"
        class="bg-background z-100 sticky left-0 top-0 p-[8px]"
      >
        <NInput
          v-model:value="searchValue"
          :placeholder="$t('pages.common.search')"
          size="small"
          @keyup.enter="handleReload"
          clearable
        >
          <template #suffix>
            <NButton
              size="small"
              type="primary"
              @click="handleReload"
              text
              style="margin-left: 4px"
            />
          </template>
        </NInput>
      </div>

      <div v-if="showIrrelevantNodes" class="mt-4 flex items-center">
        <NSwitch v-model:value="showIrrelevantNodes">
          <template #checked>展示搜索无关的节点</template>
          <template #unchecked>隐藏搜索无关的节点</template>
        </NSwitch>
      </div>

      <div class="h-full overflow-x-hidden px-[8px]">
        <NTree
          v-if="deptTreeArray.length > 0"
          v-model:selected-keys="selectDeptId"
          :data="deptTreeArray"
          key-field="id"
          label-field="label"
          children-field="children"
          :default-expanded-keys="expandedKeys"
          :pattern="searchValue"
          :show-irrelevant-nodes="showIrrelevantNodes"
          @update:selected-keys="$emit('select', $event)"
        />

        <!-- 仅本人数据权限 可以考虑直接不显示 -->
        <div v-else class="mt-5">
          <NEmpty description="无部门数据" />
        </div>
      </div>
    </div>
  </div>
</template>
