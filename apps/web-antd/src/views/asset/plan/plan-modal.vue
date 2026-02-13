<script setup lang="ts">
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import {
  DatePicker,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Tag,
  TimePicker,
  TreeSelect,
} from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

import { addPlan, editPlan, getPlanInfo } from '#/api/asset/plan';
import { optionDeptList } from '#/api/system/dept';
import { getDictOptions } from '#/utils/dict';

/* =========================
   状态
========================= */

const deptTree = ref<any[]>([]);
const isUpdate = ref(false);
const currentPlanId = ref<null | number>(null);

const defaultForm = (): AssetAPI.AssetInspectionPlanDTO => ({
  planId: null,
  planName: '',
  deptId: undefined,
  scheduleModel: 1,
  inspectionObjectType: undefined,
  status: 1,
  interval: {
    unit: 2,
    value: 10,
    offset: 0,
  },
  calendar: {
    hour: 8,
    minute: 0,
    second: 0,
    dayOfWeek: [],
    dayOfMonth: [],
    month: [],
    year: [],
  },
  startTime: null,
  endTime: null,
  timeZone: 'GMT+8',
  jitterSeconds: 0,
});

const form = ref(defaultForm());

/* =========================
   计算属性
========================= */

const isInterval = computed(() => form.value.scheduleModel === 1);
const isCalendar = computed(() => form.value.scheduleModel === 2);

const modalTitle = computed(() =>
  isUpdate.value ? '编辑巡检计划' : '新增巡检计划',
);

/* =========================
   modal
========================= */

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[820px]',
  fullscreenButton: false,
  onConfirm: handleConfirm,
  onClosed: handleClosed,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;

    modalApi.modalLoading(true);

    const planId = modalApi.getData().id || {};

    isUpdate.value = !!planId;
    currentPlanId.value = planId ?? null;

    await loadDeptTree();

    if (planId) {
      const { data } = await getPlanInfo({ planId });
      form.value = structuredClone(data);
    } else {
      form.value = defaultForm();
    }

    modalApi.modalLoading(false);
  },
});

/* =========================
   初始化部门
========================= */

async function loadDeptTree() {
  const { data } = await optionDeptList({ query: '' });
  deptTree.value = data || [];
}

/* =========================
   调度相关逻辑
========================= */

function toggleScheduleModel(type: number) {
  form.value.scheduleModel = type;
}

const calendarMode = ref<'month' | 'week'>('week');

function toggleCalendarMode(type: 'month' | 'week') {
  calendarMode.value = type;

  if (type === 'week') {
    form.value.calendar.dayOfMonth = [];
  } else {
    form.value.calendar.dayOfWeek = [];
  }
}

function toggleTag(list: number[], val: number) {
  const index = list.indexOf(val);
  if (index === -1) list.push(val);
  else list.splice(index, 1);
}

function onTimeChange(time: Dayjs | null) {
  if (!time) return;
  form.value.calendar.hour = time.hour();
  form.value.calendar.minute = time.minute();
  form.value.calendar.second = time.second();
}

function onDateSelect(date: Dayjs) {
  toggleTag(form.value.calendar.dayOfMonth, date.date());
}

/* =========================
   提交
========================= */

async function handleConfirm() {
  try {
    modalApi.lock(true);

    if (!form.value.planName) {
      message.error('请输入计划名称');
      return;
    }

    if (!form.value.deptId) {
      message.error('请选择执行部门');
      return;
    }

    if (!form.value.inspectionObjectType) {
      message.error('请选择巡检对象类型');
      return;
    }

    if (isInterval.value && form.value.interval.value <= 0) {
      message.error('间隔值必须大于0');
      return;
    }

    await (isUpdate.value && currentPlanId.value
      ? editPlan({ planId: currentPlanId.value }, form.value)
      : addPlan(form.value));

    message.success(isUpdate.value ? '修改成功' : '新增成功');
    modalApi.close();
  } finally {
    modalApi.lock(false);
  }
}

/* =========================
   关闭后重置
========================= */

function handleClosed() {
  form.value = defaultForm();
  isUpdate.value = false;
  currentPlanId.value = null;
}
</script>

<template>
  <BasicModal :title="modalTitle">
    <!-- 计划名称 -->
    <div class="section">
      <div class="label">计划名称</div>
      <Input v-model:value="form.planName" placeholder="请输入计划名称" />
    </div>

    <!-- 巡检对象类型 -->
    <div class="section">
      <div class="label">巡检对象类型</div>
      <Select
        v-model:value="form.inspectionObjectType"
        placeholder="请选择巡检对象类型"
        style="width: 100%"
        :options="getDictOptions(DictEnum.ASSET_INSPECTION_OBJECT_TYPE)"
      />
    </div>
    <div class="section">
      <div class="label">状态</div>
      <Select
        v-model:value="form.status"
        placeholder="请选择状态"
        style="width: 100%"
        :options="getDictOptions(DictEnum.ASSET_INSPECTION_PLAN_STATUS)"
      />
    </div>
    <!-- 执行部门 -->
    <div class="section">
      <div class="label">执行部门</div>
      <TreeSelect
        v-model:value="form.deptId"
        :tree-data="deptTree"
        :field-names="{
          label: 'label',
          value: 'id',
          children: 'children',
        }"
        tree-default-expand-all
        placeholder="请选择执行部门"
        style="width: 100%"
      />
    </div>

    <!-- 调度模式 -->
    <div class="section">
      <Tag :color="isInterval ? 'blue' : ''" @click="toggleScheduleModel(1)">
        间隔模式
      </Tag>
      <Tag :color="isCalendar ? 'blue' : ''" @click="toggleScheduleModel(2)">
        日历模式
      </Tag>
    </div>

    <!-- 间隔模式 -->
    <div v-if="isInterval" class="section">
      <Space>
        每
        <InputNumber
          v-model:value="form.interval.value"
          :min="1"
          style="width: 100px"
        />
        <Select
          v-model:value="form.interval.unit"
          style="width: 120px"
          :options="[
            { label: '秒', value: 1 },
            { label: '分钟', value: 2 },
            { label: '小时', value: 3 },
            { label: '天', value: 4 },
          ]"
        />
      </Space>

      <div class="mt">
        偏移秒数：
        <InputNumber
          v-model:value="form.interval.offset"
          :min="0"
          style="width: 120px"
        />
      </div>
    </div>

    <!-- 日历模式 -->
    <div v-if="isCalendar" class="section">
      <div class="mb">
        执行时间：
        <TimePicker
          format="HH:mm:ss"
          :value="
            dayjs()
              .hour(form.calendar.hour)
              .minute(form.calendar.minute)
              .second(form.calendar.second)
          "
          @change="onTimeChange"
        />
      </div>

      <div class="mb">
        <Tag
          :color="calendarMode === 'week' ? 'blue' : ''"
          @click="toggleCalendarMode('week')"
        >
          Days of week
        </Tag>
        <Tag
          :color="calendarMode === 'month' ? 'blue' : ''"
          @click="toggleCalendarMode('month')"
        >
          Days of month
        </Tag>
      </div>

      <div v-if="calendarMode === 'week'" class="mb">
        <Tag
          v-for="d in 7"
          :key="d"
          :color="form.calendar.dayOfWeek.includes(d) ? 'blue' : ''"
          @click="toggleTag(form.calendar.dayOfWeek, d)"
        >
          周{{ d }}
        </Tag>
      </div>

      <div v-if="calendarMode === 'month'" class="mb">
        <DatePicker :fullscreen="false" @select="onDateSelect">
          <template #dateRender="{ current }">
            <div
              :style="{
                background: form.calendar.dayOfMonth.includes(current.date())
                  ? '#1677ff'
                  : '',
                color: form.calendar.dayOfMonth.includes(current.date())
                  ? '#fff'
                  : '',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                lineHeight: '28px',
                textAlign: 'center',
                margin: 'auto',
                cursor: 'pointer',
              }"
            >
              {{ current.date() }}
            </div>
          </template>
        </DatePicker>
      </div>
    </div>
  </BasicModal>
</template>

<style scoped>
.section {
  margin-bottom: 16px;
}

.label {
  margin-bottom: 8px;
}

.mb {
  margin-bottom: 12px;
}

.mt {
  margin-top: 12px;
}
</style>
