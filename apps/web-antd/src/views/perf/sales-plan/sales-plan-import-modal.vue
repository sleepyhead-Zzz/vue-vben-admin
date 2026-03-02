<script setup lang="ts">
import type { UploadFile } from 'ant-design-vue/es/upload/interface';

import { h, onMounted, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { ExcelIcon, InBoxIcon } from '@vben/icons';

import { Modal, Select, Switch, Upload } from 'ant-design-vue';

import { optionProductSelect } from '#/api/perf/product';
import {
  downloadSalesPlanExcelTemplate,
  importSalesPlanByExcel,
} from '#/api/perf/salesPlan';
import { getHeaders, getSheets } from '#/api/tool/excel';
import { commonDownloadExcel } from '#/utils/file/download';
import { commonUploadFile } from '#/utils/file/upload';

const emit = defineEmits<{ reload: [] }>();

const UploadDragger = Upload.Dragger;

const excelFields = [
  { key: 'userName', label: 'username' },
  ...Array.from({ length: 12 }).map((_, index) => ({
    key: `month${index + 1}`,
    label: `${index + 1}月`,
  })),
] as const;

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 7 }).map((_, index) => {
  const year = currentYear - 3 + index;
  return {
    label: `${year}`,
    value: year,
  };
});

const form = ref<Record<string, any>>({
  sheetName: '',
  userName: undefined,
  month1: undefined,
  month2: undefined,
  month3: undefined,
  month4: undefined,
  month5: undefined,
  month6: undefined,
  month7: undefined,
  month8: undefined,
  month9: undefined,
  month10: undefined,
  month11: undefined,
  month12: undefined,
  productId: undefined,
  year: currentYear,
});

const fileList = ref<UploadFile[]>([]);
const checked = ref(false);
const sheets = ref<string[]>([]);
const headers = ref<string[]>([]);

const productOptions = ref<{ label: string; value: number }[]>([]);
const productLoading = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  onCancel: handleCancel,
  onConfirm: handleSubmit,
});

function normalizeHeader(value: string) {
  return value.replaceAll(/\s+/g, '').toLowerCase();
}

function autoMatchHeaders() {
  const missingFields: string[] = [];

  const normalizedHeaders = headers.value.map((header) => ({
    raw: header,
    normalized: normalizeHeader(header),
  }));

  const userHeader = normalizedHeaders.find(
    (item) => item.normalized === 'username',
  );
  if (userHeader) {
    form.value.userName = userHeader.raw;
  } else {
    form.value.userName = undefined;
    missingFields.push('username');
  }

  for (let month = 1; month <= 12; month++) {
    const monthLabel = `${month}月`;
    const matched = normalizedHeaders.find(
      (item) => item.normalized === normalizeHeader(monthLabel),
    );
    const fieldName = `month${month}`;

    if (matched) {
      form.value[fieldName] = matched.raw;
    } else {
      form.value[fieldName] = undefined;
      missingFields.push(monthLabel);
    }
  }

  if (missingFields.length > 0) {
    Modal.warning({
      title: '部分字段未自动匹配',
      content: `以下字段在 Excel 中未找到对应列：${missingFields.join('、')}，请手动选择。`,
    });
  }
}

async function loadProducts() {
  try {
    productLoading.value = true;
    const { data } = await optionProductSelect();
    const list = data ?? [];
    productOptions.value = list.map((item) => ({
      label: `${item.productId} - ${item.productName}`,
      value: item.productId,
    }));
  } finally {
    productLoading.value = false;
  }
}

onMounted(loadProducts);

watch(fileList, async (files) => {
  if (files.length !== 1) {
    sheets.value = [];
    headers.value = [];
    form.value.sheetName = '';
    return;
  }

  const file = files[0]!.originFileObj as File;
  try {
    const { data } = await commonUploadFile(getSheets, file);
    sheets.value = data ?? [];
    form.value.sheetName = sheets.value[0] || '';
  } catch {
    Modal.error({
      title: '错误',
      content: '读取 Sheet 失败，请检查文件格式',
    });
  }
});

watch(
  () => form.value.sheetName,
  async (sheetName) => {
    if (!sheetName || fileList.value.length !== 1) {
      headers.value = [];
      return;
    }

    const file = fileList.value[0]!.originFileObj as File;
    try {
      const { data } = await commonUploadFile(getHeaders, file, { sheetName });
      headers.value = data ?? [];
      autoMatchHeaders();
    } catch {
      Modal.error({
        title: '错误',
        content: '读取表头失败，请检查文件格式',
      });
    }
  },
);

function validateBeforeSubmit() {
  if (fileList.value.length !== 1) {
    Modal.warning({ title: '提示', content: '请上传一个 Excel 文件' });
    return false;
  }

  if (!form.value.sheetName) {
    Modal.warning({ title: '提示', content: '请选择 Sheet' });
    return false;
  }

  if (!form.value.productId) {
    Modal.warning({ title: '提示', content: '请选择产品' });
    return false;
  }

  if (!form.value.year) {
    Modal.warning({ title: '提示', content: '请选择年份' });
    return false;
  }

  const hasMappedMonth = Array.from({ length: 12 }).some(
    (_, index) => !!form.value[`month${index + 1}`],
  );

  if (!form.value.userName || !hasMappedMonth) {
    Modal.warning({
      title: '提示',
      content: '请至少映射 username 和一个月份列',
    });
    return false;
  }

  return true;
}

async function handleSubmit() {
  if (!validateBeforeSubmit()) {
    return;
  }

  const file = fileList.value[0]!.originFileObj as File;

  const columnMappings = excelFields
    .filter((field) => !!form.value[field.key])
    .map((field) => ({
      fieldName: field.key,
      columnName: form.value[field.key],
    }));

  const formData = new FormData();
  formData.append('file', file);
  formData.append('sheetName', form.value.sheetName);
  formData.append('productId', String(form.value.productId));
  formData.append('year', String(form.value.year));
  formData.append('updateSupport', String(checked.value));

  columnMappings.forEach((mapping, index) => {
    formData.append(`columnMappings[${index}].fieldName`, mapping.fieldName);
    formData.append(`columnMappings[${index}].columnName`, mapping.columnName);
  });

  try {
    modalApi.modalLoading(true);

    const { code, message } = await importSalesPlanByExcel(
      { request: {} },
      file,
      {
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    if (code === 200) {
      emit('reload');
    }

    Modal[code === 200 ? 'success' : 'error']({
      title: '提示',
      content: h('div', {
        class: 'max-h-[260px] overflow-y-auto',
        innerHTML: message || (code === 200 ? '导入成功' : '导入失败'),
      }),
    });

    handleCancel();
  } catch (error) {
    Modal.error({
      title: '错误',
      content: h('div', {
        class: 'max-h-[260px] overflow-y-auto',
        innerHTML: error?.message || '导入失败',
      }),
    });
  } finally {
    modalApi.modalLoading(false);
  }
}

function handleCancel() {
  modalApi.close();
  fileList.value = [];
  checked.value = false;
  form.value = {
    sheetName: '',
    userName: undefined,
    month1: undefined,
    month2: undefined,
    month3: undefined,
    month4: undefined,
    month5: undefined,
    month6: undefined,
    month7: undefined,
    month8: undefined,
    month9: undefined,
    month10: undefined,
    month11: undefined,
    month12: undefined,
    productId: undefined,
    year: currentYear,
  };
  headers.value = [];
  sheets.value = [];
}
</script>

<template>
  <BasicModal
    :close-on-click-modal="false"
    :fullscreen-button="false"
    title="销量计划导入"
  >
    <UploadDragger
      v-model:file-list="fileList"
      :before-upload="() => false"
      :max-count="1"
      :show-upload-list="true"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.xlsx,.xls"
    >
      <p class="ant-upload-drag-icon flex items-center justify-center">
        <InBoxIcon class="text-primary size-[48px]" />
      </p>
      <p class="ant-upload-text">点击或者拖拽到此处上传文件</p>
    </UploadDragger>

    <div class="mt-4 flex flex-col gap-4 p-4">
      <Select
        v-model:value="form.sheetName"
        placeholder="选择 Sheet"
        :options="sheets.map((item) => ({ label: item, value: item }))"
        class="w-full"
      />

      <div
        v-for="field in excelFields"
        :key="field.key"
        class="grid grid-cols-[140px_1fr] items-center gap-3"
      >
        <div class="text-right text-gray-600">{{ field.label }}</div>
        <Select
          v-model:value="form[field.key]"
          :options="headers.map((item) => ({ label: item, value: item }))"
          placeholder="请选择对应列"
          allow-clear
          class="w-full"
        />
      </div>

      <div class="grid grid-cols-[140px_1fr] items-center gap-3">
        <div class="text-right text-gray-600">产品</div>
        <Select
          v-model:value="form.productId"
          :options="productOptions"
          :loading="productLoading"
          show-search
          option-filter-prop="label"
          option-label-prop="label"
          placeholder="请选择产品"
          class="w-full"
        />
      </div>

      <div class="grid grid-cols-[140px_1fr] items-center gap-3">
        <div class="text-right text-gray-600">年份</div>
        <Select
          v-model:value="form.year"
          :options="yearOptions"
          placeholder="请选择年份"
          class="w-full"
        />
      </div>

      <div class="flex items-center gap-2">
        <span>允许导入xlsx, xls文件</span>
        <a-button
          type="link"
          @click="
            commonDownloadExcel(
              downloadSalesPlanExcelTemplate,
              '销量计划导入模板',
            )
          "
        >
          <div class="flex items-center gap-[4px]">
            <ExcelIcon />
            <span>下载模板</span>
          </div>
        </a-button>
      </div>

      <div class="flex items-center justify-between pt-2">
        <span :class="{ 'text-red-500': checked }">
          是否更新/覆盖已存在的数据
        </span>
        <Switch v-model:checked="checked" />
      </div>
    </div>
  </BasicModal>
</template>
