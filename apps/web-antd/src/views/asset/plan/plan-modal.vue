<!-- eslint-disable no-unused-vars -->
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
   枚举
========================= */
enum ScheduleMode {
  CALENDAR = 2,
  INTERVAL = 1,
}
type CalendarType = 'month' | 'week';

/* =========================
   默认表单
========================= */
const defaultForm = (): AssetAPI.AssetInspectionPlanDTO => ({
  planId: null,
  planName: '',
  deptId: undefined,
  scheduleModel: ScheduleMode.INTERVAL,
  inspectionObjectType: undefined,
  status: '1',
  interval: { unit: 2, value: 10, offset: 0 },
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
  jitterSeconds: 0,
});

const form = ref(defaultForm());
const deptTree = ref<any[]>([]);
const isUpdate = ref(false);
const currentPlanId = ref<null | number>(null);
const calendarType = ref<CalendarType>('week');

/* =========================
   计算属性
========================= */
const isIntervalMode = computed(
  () => form.value.scheduleModel === ScheduleMode.INTERVAL,
);
const isCalendarMode = computed(
  () => form.value.scheduleModel === ScheduleMode.CALENDAR,
);
const modalTitle = computed(() =>
  isUpdate.value ? '编辑巡检计划' : '新建巡检计划',
);

/* =========================
   Modal 生命周期
========================= */
const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[820px]',
  fullscreenButton: false,
  onConfirm: handleSubmit,
  onClosed: resetForm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;
    modalApi.modalLoading(true);

    const planId = modalApi.getData().id || undefined;
    isUpdate.value = !!planId;
    currentPlanId.value = planId ?? null;
    await loadDeptTree();

    if (planId) {
      const { data } = await getPlanInfo({ planId });
      form.value = structuredClone(data);

      // 修复 startTime/endTime 为 Dayjs 对象
      if (form.value.startTime)
        form.value.startTime = dayjs(form.value.startTime);
      if (form.value.endTime) form.value.endTime = dayjs(form.value.endTime);

      // 初始化 calendarType
      if (form.value.scheduleModel === ScheduleMode.CALENDAR) {
        calendarType.value = form.value.calendar.dayOfWeek?.length
          ? 'week'
          : 'month';
      } else {
        calendarType.value = 'week';
      }
    } else {
      form.value = defaultForm();
      calendarType.value = 'week';
    }

    modalApi.modalLoading(false);
  },
});

/* =========================
   加载部门
========================= */
async function loadDeptTree() {
  const { data } = await optionDeptList({ query: '' });
  deptTree.value = data || [];
}

/* =========================
   切换模式
========================= */
function switchScheduleMode(mode: ScheduleMode) {
  form.value.scheduleModel = mode;
  if (mode === ScheduleMode.INTERVAL) {
    form.value.calendar.dayOfWeek = [];
    form.value.calendar.dayOfMonth = [];
    form.value.calendar.month = [];
    form.value.calendar.year = [];
  }
}

function switchCalendarType(type: CalendarType) {
  calendarType.value = type;
  if (type === 'week') form.value.calendar.dayOfMonth = [];
  else form.value.calendar.dayOfWeek = [];
}

/* =========================
   时间 & 数字操作
========================= */
function updateCalendarTime(time: Dayjs | null) {
  if (!time) return;
  form.value.calendar.hour = time.hour();
  form.value.calendar.minute = time.minute();
  form.value.calendar.second = time.second();
}

function toggleNumber(list: number[], value: number) {
  const index = list.indexOf(value);
  index === -1 ? list.push(value) : list.splice(index, 1);
}

/* =========================
   校验
========================= */
function validateForm(): boolean {
  const data = form.value;
  if (!data.planName) {
    message.error('请输入计划名称');
    return false;
  }
  if (!data.deptId) {
    message.error('请选择负责部门');
    return false;
  }
  if (!data.inspectionObjectType) {
    message.error('请选择巡检对象');
    return false;
  }
  if (
    data.scheduleModel === ScheduleMode.INTERVAL &&
    data.interval.value <= 0
  ) {
    message.error('执行间隔必须大于0');
    return false;
  }
  return true;
}

/* =========================
   提交
========================= */
function normalizeCalendar() {
  if (form.value.scheduleModel === ScheduleMode.CALENDAR) {
    if (calendarType.value === 'week') form.value.calendar.dayOfMonth = [];
    else form.value.calendar.dayOfWeek = [];
    form.value.calendar.month = [];
    form.value.calendar.year = [];
  } else {
    form.value.calendar.dayOfWeek = [];
    form.value.calendar.dayOfMonth = [];
    form.value.calendar.month = [];
    form.value.calendar.year = [];
  }
}

async function handleSubmit() {
  if (!validateForm()) return;
  normalizeCalendar();

  // 提交前转换 startTime/endTime 为原生 Date
  const payload = {
    ...form.value,
    startTime: form.value.startTime ? form.value.startTime.toDate() : null,
    endTime: form.value.endTime ? form.value.endTime.toDate() : null,
  };

  try {
    modalApi.lock(true);
    await (isUpdate.value && currentPlanId.value
      ? editPlan({ planId: currentPlanId.value }, payload)
      : addPlan(payload));
    message.success(isUpdate.value ? '修改成功' : '创建成功');
    modalApi.close();
  } finally {
    modalApi.lock(false);
  }
}

/* =========================
   重置
========================= */
function resetForm() {
  form.value = defaultForm();
  isUpdate.value = false;
  currentPlanId.value = null;
  calendarType.value = 'week';
}
</script>

<template>
  <BasicModal :title="modalTitle">
    <!-- 计划名称 -->
    <div class="section">
      <div class="label">计划名称</div>
      <Input
        v-model:value="form.planName"
        placeholder="例如：每周设备安全巡检"
      />
    </div>

    <!-- 巡检对象 -->
    <div class="section">
      <div class="label">巡检对象</div>
      <Select
        v-model:value="form.inspectionObjectType"
        placeholder="请选择要巡检的对象类型"
        style="width: 100%"
        :options="getDictOptions(DictEnum.ASSET_INSPECTION_OBJECT_TYPE)"
      />
    </div>

    <!-- 是否启用 -->
    <div class="section">
      <div class="label">是否启用</div>
      <Select
        v-model:value="form.status"
        placeholder="请选择是否启用该计划"
        style="width: 100%"
        :options="getDictOptions(DictEnum.ASSET_INSPECTION_PLAN_STATUS)"
      />
    </div>

    <!-- 负责部门 -->
    <div class="section">
      <div class="label">负责部门</div>
      <TreeSelect
        v-model:value="form.deptId"
        :tree-data="deptTree"
        :field-names="{ label: 'label', value: 'id', children: 'children' }"
        tree-default-expand-all
        placeholder="请选择负责执行该计划的部门"
        style="width: 100%"
      />
    </div>

    <!-- 开始时间 -->
    <div class="section">
      <div class="label">开始时间</div>
      <DatePicker
        v-model:value="form.startTime"
        style="width: 100%"
        placeholder="请选择开始时间"
      />
    </div>

    <!-- 结束时间 -->
    <div class="section">
      <div class="label">结束时间</div>
      <DatePicker
        v-model:value="form.endTime"
        style="width: 100%"
        placeholder="请选择结束时间"
      />
    </div>

    <!-- 执行方式 -->
    <div class="section">
      <div class="label">执行方式</div>
      <Tag
        :color="isIntervalMode ? 'blue' : ''"
        @click="switchScheduleMode(ScheduleMode.INTERVAL)"
      >
        按固定间隔执行
      </Tag>
      <Tag
        :color="isCalendarMode ? 'blue' : ''"
        @click="switchScheduleMode(ScheduleMode.CALENDAR)"
      >
        按指定日期执行
      </Tag>
    </div>

    <!-- 间隔模式 -->
    <div v-if="isIntervalMode" class="section">
      <div class="label">执行频率</div>
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
        执行一次
      </Space>
      <div class="mt">
        首次延迟（秒）：
        <InputNumber
          v-model:value="form.interval.offset"
          :min="0"
          style="width: 120px"
        />
      </div>
    </div>

    <!-- 日历模式 -->
    <div v-if="isCalendarMode" class="section">
      <div class="label">每天执行时间</div>
      <TimePicker
        format="HH:mm:ss"
        :value="
          dayjs()
            .hour(form.calendar.hour)
            .minute(form.calendar.minute)
            .second(form.calendar.second)
        "
        @change="updateCalendarTime"
      />

      <div class="mt">
        <div class="label">执行日期规则</div>
        <Tag
          :color="calendarType === 'week' ? 'blue' : ''"
          @click="switchCalendarType('week')"
        >
          每周固定几天
        </Tag>
        <Tag
          :color="calendarType === 'month' ? 'blue' : ''"
          @click="switchCalendarType('month')"
        >
          每月固定几号
        </Tag>
      </div>

      <div v-if="calendarType === 'week'" class="mt">
        <Tag
          v-for="d in 7"
          :key="d"
          :color="form.calendar.dayOfWeek.includes(d) ? 'blue' : ''"
          @click="toggleNumber(form.calendar.dayOfWeek, d)"
        >
          周{{ d }}
        </Tag>
      </div>

      <div v-if="calendarType === 'month'" class="mt">
        <DatePicker
          :fullscreen="false"
          @select="(d) => toggleNumber(form.calendar.dayOfMonth, d.date())"
        >
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

.mt {
  margin-top: 12px;
}
</style>
