<script setup lang="ts">
import { ref } from 'vue';

import { Button, Input, Modal, Table } from 'ant-design-vue';

import { getPagedUser } from '#/api/system/user';

const props = defineProps<{
  modelValue: number[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: number[]): void;
}>();

// 控制 Modal 显示
const visible = ref(false);

// 表格加载状态
const loading = ref(false);

// 查询参数
const query = ref({
  keyword: '',
  pageNum: 1,
  pageSize: 10,
});

// 表格数据和总条数
const dataSource = ref<any[]>([]);
const total = ref(0);

// 选中用户ID
const selectedRowKeys = ref<number[]>([]);

// 加载用户数据
async function load() {
  loading.value = true;
  const { data } = await getPagedUser(query.value);
  dataSource.value = data.rows;
  total.value = data.total;
  loading.value = false;
}

// 打开 Modal
function open() {
  query.value.pageNum = 1;
  selectedRowKeys.value = [...(props.modelValue || [])]; // 初始化选中
  load();
  visible.value = true;
}

// 点击确定
function handleOk() {
  emit('update:modelValue', selectedRowKeys.value); // 回传选中
  visible.value = false; // 关闭 Modal
}

// 取消按钮
function handleCancel() {
  visible.value = false;
}

// 表格行选择配置
const rowSelection = {
  selectedRowKeys,
  onChange: (keys: number[]) => {
    selectedRowKeys.value = keys;
  },
};

defineExpose({ open });
</script>

<template>
  <Modal
    v-model:open="visible"
    title="选择用户"
    width="900px"
    :ok-button-props="{ type: 'primary' }"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <!-- 搜索栏 -->
    <div class="mb-4 flex gap-2">
      <Input
        v-model:value="query.keyword"
        placeholder="账号 / 姓名"
        style="width: 240px"
      />
      <Button type="primary" @click="load">查询</Button>
    </div>

    <!-- 用户表格 -->
    <Table
      row-key="userId"
      :loading="loading"
      :data-source="dataSource"
      :pagination="{
        total,
        current: query.pageNum,
        pageSize: query.pageSize,
        onChange: (p) => {
          query.pageNum = p;
          load();
        },
      }"
      :row-selection="rowSelection"
    >
      <Table.Column title="账号" data-index="userName" />
      <Table.Column title="姓名" data-index="nickName" />
      <Table.Column title="部门" data-index="deptName" />
    </Table>
  </Modal>
</template>
