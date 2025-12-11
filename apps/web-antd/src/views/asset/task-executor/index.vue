<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import {
  Button as AButton,
  DatePicker as ADatePicker,
  Descriptions as ADescriptions,
  DescriptionsItem as ADescriptionsItem,
  Divider as ADivider,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Select as ASelect,
} from 'ant-design-vue';

import { getDeviceInfo, getInspectionItemByDeviceId } from '#/api/asset/device';
import { getTaskInfo } from '#/api/asset/task';

// ---------------------------------------------------------------------
// Route parameters
// ---------------------------------------------------------------------
const route = useRoute();
const taskId = String(route.params.taskId);

// ---------------------------------------------------------------------
// Reactive data
// ---------------------------------------------------------------------
const taskInfo = ref<AssetAPI.AssetInspectionTaskDTO | null>(null);
const deviceInfo = ref<AssetAPI.AssetDeviceDTO | null>(null);

// 巡检项目定义
const inspectionItems = ref<AssetAPI.AssetInspectionProjectDTO[]>([]);

// 准备标志：当数据与 results 初始化完毕后设为 true，才渲染项目输入区
const isReady = ref(false);

// 使用 reactive 保证 AForm 能正确读取深层字段
const inspectionForm = reactive<AssetAPI.UpdateAssetInspectionCommand>({
  inspectionId: undefined,
  planId: undefined,
  taskId,
  status: undefined,
  startDate: '',
  endDate: '',
  description: '',
  results: [], // 保证存在，避免模板访问 undefined
});

// ---------------------------------------------------------------------
// Lifecycle & data loading
// ---------------------------------------------------------------------
onMounted(async () => {
  await loadTaskInfo(taskId);

  if (taskInfo.value?.deviceId) {
    await loadInspectionItem(String(taskInfo.value.deviceId));
  }

  // 数据加载完毕后标记 ready（如果需要额外条件，可调整这里）
  isReady.value = true;
});

// 获取任务信息
async function loadTaskInfo(taskId: string) {
  try {
    const { data } = await getTaskInfo({ taskId });
    taskInfo.value = data;

    // 初始化 planId
    inspectionForm.planId = data.planId;
    // 如果后端给了 inspectionId 可同步过来
    if ((data as any)?.inspectionId) {
      inspectionForm.inspectionId = (data as any).inspectionId;
    }
  } catch (error) {
    console.error('加载任务信息失败：', error);
  }
}

// 获取设备信息 & 巡检项并初始化 results
async function loadInspectionItem(deviceId: string) {
  try {
    const deviceRes = await getDeviceInfo({ deviceId });
    deviceInfo.value = deviceRes.data;

    const inspectionRes = await getInspectionItemByDeviceId({ deviceId });
    inspectionItems.value = inspectionRes.data || [];

    // 初始化 results：确保长度与 inspectionItems 一致并包含必要字段
    inspectionForm.results = inspectionItems.value.map((project) => ({
      resultId: undefined,
      inspectionId: inspectionForm.inspectionId, // 可以先填，后端以实际值为准
      projectId: project.projectId!,
      status: 3, // 3 = 未检查（默认）
      value: '', // 字符串形式保存，兼容后端 varchar(255)
    }));
  } catch (error) {
    console.error('加载巡检项失败：', error);
  }
}

// ---------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------
const onFinish = async () => {
  // 最好在提交前再把 inspectionId 回写到每条 result（如需要）
  inspectionForm.results = inspectionForm.results.map((r) => ({
    ...r,
    inspectionId: inspectionForm.inspectionId,
  }));

  // TODO: 在这里调用保存 API：例如 await saveInspection(inspectionForm)
};
</script>

<template>
  <div class="mx-auto max-w-3xl p-4">
    <AForm :model="inspectionForm" @finish="onFinish" layout="vertical">
      <!-- 基本巡检信息 -->
      <ADivider orientation="left">
        <span class="text-base font-semibold">基本巡检信息</span>
      </ADivider>

      <ADescriptions :column="1" size="small">
        <ADescriptionsItem label="任务 ID">
          {{ taskId }}
        </ADescriptionsItem>
        <ADescriptionsItem label="巡检名称">
          {{ taskInfo?.taskName }}
        </ADescriptionsItem>
        <ADescriptionsItem label="设备名称">
          {{ deviceInfo?.deviceName }}
        </ADescriptionsItem>
      </ADescriptions>

      <!-- 巡检记录填写 -->
      <ADivider orientation="left" class="mt-6">
        <span class="text-base font-semibold">巡检记录填写</span>
      </ADivider>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AFormItem label="巡检状态" name="status">
          <ASelect
            v-model:value="inspectionForm.status"
            placeholder="请选择状态"
          >
            <ASelect.Option :value="1">进行中</ASelect.Option>
            <ASelect.Option :value="2">完成</ASelect.Option>
            <ASelect.Option :value="3">异常</ASelect.Option>
            <ASelect.Option :value="4">中断</ASelect.Option>
          </ASelect>
        </AFormItem>

        <AFormItem label="实际开始时间" name="startDate">
          <ADatePicker
            v-model:value="inspectionForm.startDate"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择开始时间"
            class="w-full"
          />
        </AFormItem>

        <AFormItem label="实际结束时间" name="endDate">
          <ADatePicker
            v-model:value="inspectionForm.endDate"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择结束时间"
            class="w-full"
          />
        </AFormItem>
      </div>

      <AFormItem label="巡检结果简述" name="description">
        <AInput.TextArea
          v-model:value="inspectionForm.description"
          :rows="4"
          placeholder="请输入巡检描述"
        />
      </AFormItem>

      <!-- 巡检项目填写 -->
      <ADivider orientation="left" class="mt-6">
        <span class="text-base font-semibold">巡检项目填写</span>
      </ADivider>

      <div v-if="isReady" class="space-y-4">
        <AFormItem
          v-for="(item, index) in inspectionItems"
          :key="item.projectId"
          :label="item.projectName"
        >
          <div class="flex flex-col gap-3 md:flex-row md:items-center">
            <AInput
              class="w-full md:w-60"
              v-model:value="inspectionForm.results[index].value"
              placeholder="请输入巡检值"
            />

            <ASelect
              class="w-full md:w-40"
              v-model:value="inspectionForm.results[index].status"
            >
              <ASelect.Option :value="1">正常</ASelect.Option>
              <ASelect.Option :value="2">异常</ASelect.Option>
              <ASelect.Option :value="3">未检查</ASelect.Option>
            </ASelect>

            <span class="text-xs text-gray-500">
              范围：{{ item.minValue ?? '-' }} ~ {{ item.maxValue ?? '-' }}
            </span>
          </div>
        </AFormItem>
      </div>

      <div v-else class="mt-4 text-gray-500">正在加载巡检项…</div>

      <!-- 提交按钮 -->
      <AFormItem class="mt-6">
        <div class="flex justify-end">
          <AButton type="primary" html-type="submit" class="px-6">
            提交巡检记录
          </AButton>
        </div>
      </AFormItem>
    </AForm>
  </div>
</template>
