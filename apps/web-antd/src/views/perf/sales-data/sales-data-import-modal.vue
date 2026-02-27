<script setup lang="ts">
import type { UploadFile } from 'ant-design-vue/es/upload/interface';

import { ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { InBoxIcon } from '@vben/icons';

import {
  DatePicker,
  Input,
  Modal,
  Select,
  Switch,
  Upload,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import { importSalesDataByExcel } from '#/api/perf/salesdata';
import { getHeaders, getSheets } from '#/api/tool/excel';
import { commonUploadFile } from '#/utils/file/upload';

const emit = defineEmits<{ reload: [] }>();
const UploadDragger = Upload.Dragger;

/* -------------------- 表单数据 -------------------- */
const form = ref({
  sheetName: '',
  userId: undefined as string | undefined,
  userName: undefined as string | undefined,
  customerId: undefined as string | undefined,
  customerName: undefined as string | undefined,
  productCode: undefined as string | undefined,
  quantity: undefined as string | undefined,
  orderDate: undefined as any,
  periodId: undefined as number | undefined,
});

const fileList = ref<UploadFile[]>([]);
const checked = ref(false);

/* -------------------- Sheet & Header 数据 -------------------- */
const sheets = ref<string[]>([]);
const headers = ref<string[]>([]);

/* -------------------- Modal 控制 -------------------- */
const [BasicModal, modalApi] = useVbenModal({
  onCancel: handleCancel,
  onConfirm: handleSubmit,
});

/* -------------------- 文件变化时加载 Sheet -------------------- */
watch(fileList, async (files) => {
  if (files.length === 1) {
    const file = files[0]!.originFileObj as File;
    try {
      const { data } = await commonUploadFile(getSheets, file);
      sheets.value = data;
      if (sheets.value.length > 0) form.value.sheetName = sheets.value[0];
    } catch {
      Modal.error({
        title: '错误',
        content: '读取 Sheet 失败，请检查文件格式',
      });
    }
  }
});

/* -------------------- Sheet 变化时加载表头 -------------------- */
watch(
  () => form.value.sheetName,
  async (sheetName) => {
    if (!sheetName || fileList.value.length !== 1) return;
    const file = fileList.value[0]!.originFileObj as File;
    try {
      const { data } = await commonUploadFile(getHeaders, file, { sheetName });
      headers.value = data;
    } catch {
      Modal.error({
        title: '错误',
        content: '读取表头失败，请检查文件或 Sheet 名称',
      });
    }
  },
);

/* -------------------- 提交逻辑 -------------------- */
async function handleSubmit() {
  if (fileList.value.length !== 1) {
    Modal.warning({ title: '提示', content: '请上传一个Excel文件' });
    return;
  }

  const file = fileList.value[0]!.originFileObj as File;
  const formData = new FormData();

  formData.append('file', file);
  formData.append('sheetName', form.value.sheetName);

  // 业务字段映射
  if (form.value.userId) formData.append('userId', form.value.userId);
  if (form.value.userName) formData.append('userName', form.value.userName);
  if (form.value.customerId)
    formData.append('customerId', form.value.customerId);
  if (form.value.customerName)
    formData.append('customerName', form.value.customerName);
  if (form.value.productCode)
    formData.append('productCode', form.value.productCode);
  if (form.value.quantity) formData.append('quantity', form.value.quantity);
  if (form.value.periodId)
    formData.append('periodId', String(form.value.periodId));
  if (form.value.orderDate)
    formData.append(
      'orderDate',
      dayjs(form.value.orderDate).format('YYYY-MM-DD'),
    );

  // 覆盖标记
  formData.append('updateSupport', String(checked.value));

  try {
    modalApi.modalLoading(true);
    const { code, message } = await importSalesDataByExcel(formData);

    if (code === 200) emit('reload');

    Modal[code === 200 ? 'success' : 'error']({
      title: '提示',
      content: h('div', {
        class: 'max-h-[260px] overflow-y-auto',
        innerHTML: message,
      }),
    });

    handleCancel();
  } finally {
    modalApi.modalLoading(false);
  }
}

/* -------------------- 关闭处理 -------------------- */
function handleCancel() {
  modalApi.close();
  fileList.value = [];
  checked.value = false;
  form.value = {
    sheetName: '',
    userId: undefined,
    userName: undefined,
    customerId: undefined,
    customerName: undefined,
    productCode: undefined,
    quantity: undefined,
    orderDate: undefined,
    periodId: undefined,
  };
}
</script>

<template>
  <BasicModal
    :close-on-click-modal="false"
    :fullscreen-button="false"
    title="销量数据导入"
  >
    <!-- 上传 -->
    <UploadDragger
      v-model:file-list="fileList"
      :before-upload="() => false"
      :max-count="1"
      :show-upload-list="true"
      accept=".xlsx,.xls"
    >
      <p class="ant-upload-drag-icon flex items-center justify-center">
        <InBoxIcon class="text-primary size-[48px]" />
      </p>
      <p class="ant-upload-text">点击或者拖拽到此处上传文件</p>
    </UploadDragger>

    <div class="mt-4 flex flex-col gap-3">
      <!-- Sheet 选择 -->
      <Select
        v-model:value="form.sheetName"
        placeholder="选择 Sheet"
        :options="sheets.map((s) => ({ label: s, value: s }))"
        style="width: 100%"
      />

      <!-- 业务字段选择表单：左列变量名，右列下拉选择 -->
      <div
        v-for="field in [
          { label: '销售人员ID', key: 'userId' },
          { label: '业务经理姓名', key: 'userName' },
          { label: '客户ID', key: 'customerId' },
          { label: '售达方名称', key: 'customerName' },
          { label: '产品编码', key: 'productCode' },
          { label: '交货单数量', key: 'quantity' },
        ]"
        :key="field.key"
        class="flex items-center gap-2"
      >
        <span class="w-[120px] text-gray-600">{{ field.label }}</span>
        <Select
          v-model:value="form[field.key]"
          :options="headers.map((h) => ({ label: h, value: h }))"
          placeholder="请选择对应列"
        />
      </div>

      <!-- 日期和周期 -->
      <DatePicker
        v-model:value="form.orderDate"
        style="width: 100%"
        placeholder="交货单创建日期"
      />
      <Input v-model:value="form.periodId" placeholder="归属绩效周期ID" />

      <!-- 是否覆盖 -->
      <div class="flex items-center gap-2">
        <span :class="{ 'text-red-500': checked }">
          是否更新/覆盖已存在的用户数据
        </span>
        <Switch v-model:checked="checked" />
      </div>
    </div>
  </BasicModal>
</template>
