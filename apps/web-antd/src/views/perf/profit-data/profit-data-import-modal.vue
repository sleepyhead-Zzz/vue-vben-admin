<script setup lang="ts">
import type { ImportValidationResult } from '../_shared/use-excel-import-flow';

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useVbenModal } from '@vben/common-ui';
import { ExcelIcon, InBoxIcon } from '@vben/icons';

import {
  Alert,
  Modal,
  Progress,
  Select,
  Switch,
  Tag,
  Upload,
} from 'ant-design-vue';

import { optionProductSelect } from '#/api/perf/product';
import {
  downloadProfitDataExcelTemplate,
  importProfitDataByExcel,
} from '#/api/perf/profitdata';
import { getHeaders, getSheets } from '#/api/tool/excel';
import { commonDownloadExcel } from '#/utils/file/download';
import { commonUploadFile } from '#/utils/file/upload';

import {
  showJobTaskSubmitError,
  showJobTaskSubmitFeedback,
} from '../_shared/job-task-submit-feedback';
import { useExcelImportFlow } from '../_shared/use-excel-import-flow';

const emit = defineEmits<{ reload: [] }>();
const router = useRouter();

const UploadDragger = Upload.Dragger;
const excelFields = [
  { key: 'userName', label: '业务经理姓名' },
  { key: 'netProfit', label: '净利润金额' },
  { key: 'orderDate', label: '订单日期' },
] as const;

const fieldAliases: Record<(typeof excelFields)[number]['key'], string[]> = {
  userName: ['userName', 'username', '业务经理姓名', '销售经理'],
  netProfit: ['netProfit', '净利润金额', '净利润', '利润金额'],
  orderDate: ['orderDate', '订单日期', '下单日期', '日期'],
};

const form = ref<Record<string, any>>({
  sheetName: '',
  userName: undefined,
  productId: undefined,
  netProfit: undefined,
  orderDate: undefined,
});

const checked = ref(false);
const productOptions = ref<{ label: string; value: number }[]>([]);
const productLoading = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[95vw] max-w-[1200px] md:w-[85vw] lg:w-[70vw]',
  onCancel: handleCancel,
  onConfirm: handleSubmit,
});

function normalizeHeader(value: string) {
  return value.replaceAll(/\s+/g, '').toLowerCase();
}

function resetMappings() {
  excelFields.forEach((field) => {
    form.value[field.key] = undefined;
  });
}

const flow = useExcelImportFlow({
  autoMatch(headers) {
    const normalizedHeaders = headers.map((header) => ({
      raw: header,
      normalized: normalizeHeader(header),
    }));

    const missingLabels: string[] = [];
    const matchedKeys: string[] = [];

    excelFields.forEach((field) => {
      const aliases = new Set(
        fieldAliases[field.key].map((alias) => normalizeHeader(alias)),
      );
      const matched = normalizedHeaders.find((item) =>
        aliases.has(item.normalized),
      );

      if (matched) {
        form.value[field.key] = matched.raw;
        matchedKeys.push(field.key);
      } else {
        form.value[field.key] = undefined;
        missingLabels.push(field.label);
      }
    });

    return { matchedKeys, missingLabels };
  },
  form,
  async loadHeadersApi(file, sheetName) {
    const { data } = await commonUploadFile(getHeaders, file, {
      request: sheetName,
    });

    return data ?? [];
  },
  async loadSheetsApi(file) {
    const { data } = await commonUploadFile(getSheets, file, {});
    return data ?? [];
  },
  resetMappings,
});

const {
  autoMatchedKeys,
  errorText,
  fileList,
  headers,
  missingAutoMatchLabels,
  resetFlow,
  sheets,
  stage,
  uploadPercent,
} = flow;

const fileName = computed(() => fileList.value[0]?.name || '未选择文件');

const fieldProgress = computed(() => {
  const total = excelFields.length;
  const mapped = excelFields.filter((field) => !!form.value[field.key]).length;
  return { total, mapped, percent: Math.round((mapped / total) * 100) };
});

const validation = computed<ImportValidationResult>(() => {
  const missing: string[] = [];

  if (fileList.value.length !== 1) {
    missing.push('上传一个 Excel 文件');
  }

  if (!form.value.sheetName) {
    missing.push('选择 Sheet');
  }

  if (!form.value.productId) {
    missing.push('选择产品');
  }

  excelFields.forEach((field) => {
    if (!form.value[field.key]) {
      missing.push(`映射 ${field.label}`);
    }
  });

  return {
    valid: missing.length === 0,
    missing,
  };
});

const stageStep = computed(() => {
  if (stage.value === 'idle' || stage.value === 'parsingSheets') {
    return 0;
  }
  if (stage.value === 'parsingHeaders' || stage.value === 'ready') {
    return 1;
  }
  return 2;
});

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

function beforeUpload(file: File) {
  if (!/\.(?:xlsx|xls)$/i.test(file.name)) {
    Modal.warning({ title: '提示', content: '仅支持 .xlsx 或 .xls 文件' });
    return Upload.LIST_IGNORE;
  }
  return false;
}

async function handleSubmit() {
  if (!validation.value.valid) {
    Modal.warning({
      title: '提交前请先完成必要项',
      content: validation.value.missing.join('、'),
    });
    return;
  }

  const file = fileList.value[0]?.originFileObj as File;

  const columnMappings = excelFields.map((field) => ({
    fieldName: field.key,
    columnName: form.value[field.key],
  }));

  const requestObj: PerfAPI.ProfitDataImportRequest = {
    sheetName: form.value.sheetName,
    productId: form.value.productId,
    updateSupport: checked.value,
    columnMappings,
  };

  try {
    stage.value = 'submitting';
    uploadPercent.value = 0;
    modalApi.modalLoading(true);

    const response = await commonUploadFile(
      importProfitDataByExcel,
      file,
      { request: requestObj },
      {
        onProgress(percent) {
          uploadPercent.value = percent;
        },
      },
    );

    if (response.code === 200) {
      emit('reload');
    }
    showJobTaskSubmitFeedback(response, router);

    handleCancel();
  } catch (error: any) {
    showJobTaskSubmitError(error);
  } finally {
    modalApi.modalLoading(false);
    if (stage.value !== 'idle') {
      stage.value = 'ready';
    }
  }
}

function handleCancel() {
  modalApi.close();
  checked.value = false;
  resetFlow();
  form.value = {
    sheetName: '',
    userName: undefined,
    productId: undefined,
    netProfit: undefined,
    orderDate: undefined,
  };
}
</script>

<template>
  <BasicModal
    :close-on-click-modal="false"
    :fullscreen-button="false"
    title="利润明细导入"
  >
    <div class="import-shell">
      <div class="steps-grid">
        <div class="step-chip" :class="[{ active: stageStep >= 0 }]">
          1. 上传文件
        </div>
        <div class="step-chip" :class="[{ active: stageStep >= 1 }]">
          2. Sheet 与映射
        </div>
        <div class="step-chip" :class="[{ active: stageStep >= 2 }]">
          3. 提交后台任务
        </div>
      </div>

      <section class="import-card">
        <div class="section-title">第一步：上传 Excel</div>
        <UploadDragger
          v-model:file-list="fileList"
          :before-upload="beforeUpload"
          :max-count="1"
          :show-upload-list="true"
          accept=".xlsx,.xls"
          class="upload-zone"
        >
          <p class="ant-upload-drag-icon flex items-center justify-center">
            <InBoxIcon class="size-[52px] text-[#0f766e]" />
          </p>
          <p class="ant-upload-text text-[16px] font-medium text-slate-700">
            点击或拖拽上传利润明细文件
          </p>
          <p class="text-xs text-slate-500">
            支持 .xlsx / .xls，仅允许一个文件
          </p>
        </UploadDragger>

        <div
          class="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500"
        >
          <Tag color="blue">当前文件</Tag>
          <span>{{ fileName }}</span>
        </div>

        <Alert
          v-if="stage === 'parsingSheets'"
          class="mt-3"
          message="正在解析 Sheet，请稍候..."
          show-icon
          type="info"
        />

        <Alert
          v-if="errorText"
          class="mt-3"
          :message="errorText"
          show-icon
          type="error"
        />
      </section>

      <section class="import-card">
        <div class="flex items-center justify-between gap-2">
          <div class="section-title">第二步：Sheet 与字段映射</div>
          <div class="text-xs text-slate-500">
            已映射 {{ fieldProgress.mapped }}/{{ fieldProgress.total }}
          </div>
        </div>

        <Progress
          :percent="fieldProgress.percent"
          :show-info="false"
          size="small"
        />

        <div class="mt-3">
          <div class="mb-1 text-xs text-slate-500">Sheet</div>
          <Select
            v-model:value="form.sheetName"
            :disabled="sheets.length === 0"
            :loading="stage === 'parsingSheets'"
            placeholder="选择 Sheet"
            :options="sheets.map((item) => ({ label: item, value: item }))"
            class="w-full"
          />
        </div>

        <Alert
          v-if="stage === 'parsingHeaders'"
          class="mt-3"
          message="正在解析表头并自动匹配字段..."
          show-icon
          type="info"
        />

        <Alert
          v-if="missingAutoMatchLabels.length > 0"
          class="mt-3"
          :message="`自动匹配未覆盖：${missingAutoMatchLabels.join('、')}`"
          show-icon
          type="warning"
        />

        <div class="mapping-grid mt-4">
          <div
            v-for="field in excelFields"
            :key="field.key"
            class="mapping-row"
            :class="{ 'mapping-row-warning': !form[field.key] }"
          >
            <div
              class="flex items-center justify-end gap-2 text-right text-slate-600"
            >
              <span>{{ field.label }}</span>
              <Tag v-if="autoMatchedKeys.includes(field.key)" color="green">
                自动匹配
              </Tag>
            </div>

            <Select
              v-model:value="form[field.key]"
              :options="headers.map((item) => ({ label: item, value: item }))"
              placeholder="请选择对应列"
              allow-clear
              class="w-full"
            />
          </div>
        </div>
      </section>

      <section class="import-card">
        <div class="section-title">第三步：提交后台任务</div>

        <div class="mt-3">
          <div class="mb-1 text-xs text-slate-500">产品</div>
          <Select
            v-model:value="form.productId"
            :options="productOptions"
            :loading="productLoading"
            show-search
            option-filter-prop="label"
            option-label-prop="label"
            allow-clear
            placeholder="请选择产品"
            class="w-full"
          />
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span class="text-xs text-slate-500">允许导入 xlsx、xls 文件</span>
          <a-button
            type="link"
            @click="
              commonDownloadExcel(
                downloadProfitDataExcelTemplate,
                '利润明细导入模板',
              )
            "
          >
            <div class="flex items-center gap-1">
              <ExcelIcon />
              <span>下载模板</span>
            </div>
          </a-button>
        </div>

        <div
          class="mt-2 flex items-center justify-between rounded-lg px-3 py-2"
        >
          <span
            class="text-sm"
            :class="[checked ? 'text-red-500' : 'text-slate-600']"
          >
            是否更新/覆盖已存在的数据
          </span>
          <Switch v-model:checked="checked" />
        </div>

        <div class="mt-4 rounded-lg border p-3">
          <div class="text-xs font-medium text-slate-700">可提交条件</div>
          <ul class="mt-2 space-y-1 text-xs">
            <li
              v-for="item in validation.missing"
              :key="item"
              class="text-amber-600"
            >
              待完成：{{ item }}
            </li>
            <li v-if="validation.valid" class="text-emerald-600">
              已满足全部条件，可直接提交后台任务
            </li>
          </ul>
        </div>

        <div v-if="stage === 'submitting'" class="mt-4">
          <div class="mb-1 text-xs text-slate-500">
            上传进度 {{ uploadPercent }}%
          </div>
          <Progress :percent="uploadPercent" size="small" />
        </div>
      </section>
    </div>
  </BasicModal>
</template>

<style scoped>
.import-shell {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.step-chip {
  padding: 8px 10px;
  font-size: 12px;
  line-height: 18px;
  color: #64748b;
  text-align: center;
  border-radius: 10px;
}

.step-chip.active {
  font-weight: 600;
  color: #0f766e;
  border-color: #2dd4bf;
}

.import-card {
  padding: 14px;
  border-radius: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.upload-zone {
  margin-top: 8px;
}

.mapping-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mapping-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 10px;
  align-items: center;
  padding: 6px 8px;
  border: 1px solid transparent;
  border-radius: 10px;
}

.mapping-row-warning {
  border-color: #fed7aa;
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }

  .mapping-row {
    grid-template-columns: 1fr;
  }
}
</style>
