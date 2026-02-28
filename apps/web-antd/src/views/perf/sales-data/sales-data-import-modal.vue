<script setup lang="ts">
import type { UploadFile } from 'ant-design-vue/es/upload/interface';

import { h, onMounted, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { InBoxIcon } from '@vben/icons';

import { Modal, Select, Switch, Upload } from 'ant-design-vue';

import { optionProductSelect } from '#/api/perf/product';
import { importSalesDataByExcel } from '#/api/perf/salesdata';
import { getHeaders, getSheets } from '#/api/tool/excel';
import { commonUploadFile } from '#/utils/file/upload';

const emit = defineEmits<{ reload: [] }>();
const UploadDragger = Upload.Dragger;

/* -------------------- Excel字段配置 -------------------- */
const excelFields = [
  { label: '业务经理姓名', key: 'userName' },
  { label: '售达方名称', key: 'customerName' },
  { label: '交货单数量', key: 'quantity' },
  { label: '交货单创建日期', key: 'orderDate' },
] as const;

/* -------------------- 表单数据 -------------------- */
const form = ref<Record<string, any>>({
  sheetName: '',
  userName: undefined,
  customerName: undefined,
  quantity: undefined,
  orderDate: undefined,
  productId: undefined,
});

const fileList = ref<UploadFile[]>([]);
const checked = ref(false);

/* -------------------- Sheet & Header 数据 -------------------- */
const sheets = ref<string[]>([]);
const headers = ref<string[]>([]);

/* -------------------- 产品数据 -------------------- */
const productOptions = ref<{ label: string; value: string }[]>([]);
const productLoading = ref(false);

/* -------------------- Modal 控制 -------------------- */
const [BasicModal, modalApi] = useVbenModal({
  onCancel: handleCancel,
  onConfirm: handleSubmit,
});

/* -------------------- 自动匹配列 -------------------- */
function autoMatchHeaders() {
  const missingFields: string[] = [];
  excelFields.forEach((field) => {
    const match = headers.value.find((h) => h.trim() === field.label.trim());
    if (match) {
      form.value[field.key] = match;
    } else {
      form.value[field.key] = undefined;
      missingFields.push(field.label);
    }
  });

  if (missingFields.length > 0) {
    Modal.warning({
      title: '部分字段未自动匹配',
      content: `以下字段在 Excel 中未找到对应列：${missingFields.join('、')}，请手动选择。`,
    });
  }
}

/* -------------------- 加载产品列表 -------------------- */
async function loadProducts() {
  try {
    productLoading.value = true;
    const { data } = await optionProductSelect();
    productOptions.value = data.map((item: any) => ({
      label: `${item.productId} - ${item.productName}`,
      value: item.productId,
    }));
  } finally {
    productLoading.value = false;
  }
}

onMounted(loadProducts);

/* -------------------- 文件变化时加载 Sheet -------------------- */
watch(fileList, async (files) => {
  if (files.length !== 1) return;
  const file = files[0]!.originFileObj as File;
  try {
    const { data } = await commonUploadFile(getSheets, file);
    sheets.value = data;
    if (data.length > 0) form.value.sheetName = data[0];
  } catch {
    Modal.error({ title: '错误', content: '读取 Sheet 失败，请检查文件格式' });
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
      autoMatchHeaders();
    } catch {
      Modal.error({ title: '错误', content: '读取表头失败' });
    }
  },
);

/* -------------------- 提交逻辑 -------------------- */
async function handleSubmit() {
  if (fileList.value.length !== 1) {
    Modal.warning({ title: '提示', content: '请上传一个 Excel 文件' });
    return;
  }

  const file = fileList.value[0]!.originFileObj as File;

  const columnMappings = excelFields
    .filter((f) => form.value[f.key])
    .map((f) => ({ field: f.key, columnName: form.value[f.key] }));

  // 构造 FormData
  const formData = new FormData();
  formData.append('file', file); // 文件必须是 file 字段
  formData.append('sheetName', form.value.sheetName);
  formData.append('productId', form.value.productId || '');
  formData.append('updateSupport', String(checked.value));

  // columnMappings 需要逐个 append 对象字段，不能 stringify 整个数组
  columnMappings.forEach((cm, i) => {
    formData.append(`columnMappings[${i}].fieldName`, cm.field); // 改成 fieldName
    formData.append(`columnMappings[${i}].columnName`, cm.columnName);
  });

  try {
    modalApi.modalLoading(true);

    const { code, message } = await importSalesDataByExcel(
      { request: {} },
      file,
      {
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

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

/* -------------------- 重置 -------------------- */
function handleCancel() {
  modalApi.close();
  fileList.value = [];
  checked.value = false;
  form.value = {
    sheetName: '',
    userName: undefined,
    customerName: undefined,
    quantity: undefined,
    orderDate: undefined,
    productId: undefined,
  };
  headers.value = [];
  sheets.value = [];
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

    <div class="mt-4 flex flex-col gap-4 p-4">
      <!-- Sheet -->
      <Select
        v-model:value="form.sheetName"
        placeholder="选择 Sheet"
        :options="sheets.map((s) => ({ label: s, value: s }))"
        class="w-full"
      />

      <!-- Excel字段映射 -->
      <div
        v-for="field in excelFields"
        :key="field.key"
        class="grid grid-cols-[140px_1fr] items-center gap-3"
      >
        <div class="text-right text-gray-600">
          {{ field.label }}
        </div>

        <Select
          v-model:value="form[field.key]"
          :options="headers.map((h) => ({ label: h, value: h }))"
          placeholder="请选择对应列"
          allow-clear
          class="w-full"
        />
      </div>

      <!-- 产品编码 -->
      <div class="grid grid-cols-[140px_1fr] items-center gap-3">
        <div class="text-right text-gray-600">产品编码</div>

        <Select
          v-model:value="form.productId"
          :options="productOptions"
          :loading="productLoading"
          show-search
          allow-clear
          placeholder="请选择产品"
          class="w-full"
          @search="loadProducts"
        />
      </div>

      <!-- 是否覆盖 -->
      <div class="flex items-center justify-between pt-2">
        <span :class="{ 'text-red-500': checked }">
          是否更新/覆盖已存在的用户数据
        </span>
        <Switch v-model:checked="checked" />
      </div>
    </div>
  </BasicModal>
</template>
