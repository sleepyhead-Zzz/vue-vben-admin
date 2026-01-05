<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import { DictEnum } from '@vben/constants';

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
  Spin,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import { getDeviceInfo, getInspectionItemByDeviceId } from '#/api/asset/device';
import { addInspection } from '#/api/asset/inspection';
import { getTaskInfo } from '#/api/asset/task';
import { ImageUpload } from '#/components/upload';
import { getDictOptions } from '#/utils/dict';

// ---------------------------------------------------------------------
// Route parameters
// ---------------------------------------------------------------------
const route = useRoute();
const taskId = String(route.params.taskId);

const taskInfo = ref<AssetAPI.AssetInspectionTaskDTO | null>(null);
const deviceInfo = ref<AssetAPI.AssetDeviceDTO | null>(null);
const inspectionItems = ref<AssetAPI.AssetInspectionProjectDTO[]>([]);

const isReady = ref(false);

const inspectionForm = reactive<AssetAPI.UpdateAssetInspectionCommand>({
  inspectionId: undefined,
  planId: undefined,
  taskId,
  status: undefined,
  startDate: '',
  endDate: '',
  description: '',
  results: [],
  ossIds: [],
});

const inspectionStatusOptions = getDictOptions(
  DictEnum.ASSET_INSPECTION_STATUS,
);

const inspectionItemStatusOptions = getDictOptions(
  DictEnum.ASSET_INSPECTION_ITEM_STATUS,
);

onMounted(async () => {
  await loadTaskInfo(taskId);

  if (taskInfo.value?.deviceId) {
    await loadInspectionItem(String(taskInfo.value.deviceId));
  }
  inspectionForm.startDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
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
      status: '3',
      value: '',
    }));
  } catch (error) {
    console.error('加载巡检项失败：', error);
  }
}

// ---------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------
const onFinish = async () => {
  // 若用户未填写结束时间，则自动写入当前时间
  if (!inspectionForm.endDate) {
    inspectionForm.endDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }
  // 最好在提交前再把 inspectionId 回写到每条 result（如需要）
  inspectionForm.results = inspectionForm.results.map((r) => ({
    ...r,
    inspectionId: inspectionForm.inspectionId,
  }));
  await addInspection(inspectionForm);
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
            <ASelect.Option
              v-for="item in inspectionStatusOptions"
              :key="item.dictValue"
              :value="item.dictValue"
            >
              {{ item.dictLabel }}
            </ASelect.Option>
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
              class="w-full md:w-28"
              v-model:value="inspectionForm.results[index].status"
            >
              <ASelect.Option
                v-for="item2 in inspectionItemStatusOptions"
                :key="item2.dictValue"
                :value="item2.dictValue"
              >
                {{ item2.dictLabel }}
              </ASelect.Option>
            </ASelect>

            <span class="whitespace-nowrap text-xs text-gray-500">
              范围：{{ item.minValue ?? '-' }} ~ {{ item.maxValue ?? '-' }}
              <template v-if="item.unit">
                {{ item.unit }}
              </template>
            </span>
          </div>
        </AFormItem>
        <AFormItem label="巡检图片" name="ossIds">
          <ImageUpload v-model:value="inspectionForm.ossIds" :max-count="5" />
        </AFormItem>
      </div>

      <div v-else class="mt-4 text-gray-500"><Spin /></div>

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
