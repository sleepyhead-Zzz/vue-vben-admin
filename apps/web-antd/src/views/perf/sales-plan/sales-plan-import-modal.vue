<script setup lang="ts">
import type { ImportValidationResult } from '../_shared/use-excel-import-flow';

import { computed, h, onMounted, ref } from 'vue';

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
  downloadSalesPlanExcelTemplate,
  importSalesPlanByExcel,
} from '#/api/perf/salesPlan';
import { getHeaders, getSheets } from '#/api/tool/excel';
import { commonDownloadExcel } from '#/utils/file/download';
import { commonUploadFile } from '#/utils/file/upload';

import { useExcelImportFlow } from '../_shared/use-excel-import-flow';

const emit = defineEmits<{ reload: [] }>();

const UploadDragger = Upload.Dragger;
const excelFields = [
  { key: 'userName', label: 'username' },
  ...Array.from({ length: 12 }).map((_, index) => ({
    key: `month${index + 1}`,
    label: `${index + 1}月`,
  })),
] as const;

const fieldAliases: Record<(typeof excelFields)[number]['key'], string[]> = {
  userName: ['userName', 'username', '销售人员姓名', '业务经理姓名', '姓名'],
  month1: ['month1', '1月', '1月销量', '一月'],
  month2: ['month2', '2月', '2月销量', '二月'],
  month3: ['month3', '3月', '3月销量', '三月'],
  month4: ['month4', '4月', '4月销量', '四月'],
  month5: ['month5', '5月', '5月销量', '五月'],
  month6: ['month6', '6月', '6月销量', '六月'],
  month7: ['month7', '7月', '7月销量', '七月'],
  month8: ['month8', '8月', '8月销量', '八月'],
  month9: ['month9', '9月', '9月销量', '九月'],
  month10: ['month10', '10月', '10月销量', '十月'],
  month11: ['month11', '11月', '11月销量', '十一月'],
  month12: ['month12', '12月', '12月销量', '十二月'],
};

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 7 }).map((_, index) => {
  const year = currentYear - 3 + index;
  return { label: `${year}`, value: year };
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

  if (!form.value.year) {
    missing.push('选择年份');
  }

  if (!form.value.userName) {
    missing.push('映射 username 列');
  }

  const hasMappedMonth = Array.from({ length: 12 }).some(
    (_, index) => !!form.value[`month${index + 1}`],
  );
  if (!hasMappedMonth) {
    missing.push('至少映射一个月份列');
  }

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

function buildResultContent(
  response: PerfAPI.ResponseDTOImportResponseDTO,
  fallbackText: string,
) {
  const result = response.data;
  const messageHtml = response.message || fallbackText;

  return h('div', { class: 'space-y-3' }, [
    h('div', { class: 'rounded-lg border border-[#dbeafe] bg-[#eff6ff] p-3' }, [
      h('div', { class: 'font-medium text-[#1e3a8a]' }, '导入结果'),
      h('div', { class: 'mt-2 text-sm text-[#1e293b]' }, [
        `成功 ${result?.successCount ?? 0} 条，失败 ${result?.failureCount ?? 0} 条`,
      ]),
      result?.errorFileUrl
        ? h(
            'a',
            {
              class:
                'mt-2 inline-block rounded border border-[#93c5fd] px-2 py-1 text-xs text-[#1d4ed8]',
              href: result.errorFileUrl,
              rel: 'noopener noreferrer',
              target: '_blank',
            },
            '下载错误明细',
          )
        : null,
    ]),
    h('details', { class: 'rounded border border-slate-200 p-2 text-sm' }, [
      h(
        'summary',
        { class: 'cursor-pointer text-slate-600' },
        '查看后端原始消息',
      ),
      h('div', {
        class: 'mt-2 max-h-[220px] overflow-y-auto text-slate-700',
        innerHTML: messageHtml,
      }),
    ]),
  ]);
}

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

  const columnMappings = excelFields
    .filter((field) => !!form.value[field.key])
    .map((field) => ({
      fieldName: field.key,
      columnName: form.value[field.key],
    }));

  // ✅ 这是你真正要给后端的 request（会被生成器打成 JSON part）
  const requestObj: PerfAPI.SalesPlanImportRequest = {
    sheetName: form.value.sheetName,
    productId: form.value.productId,
    year: Number(form.value.year),
    updateSupport: checked.value,
    columnMappings,
  };

  try {
    stage.value = 'submitting';
    uploadPercent.value = 0;
    modalApi.modalLoading(true);

    // ✅ 关键：用 commonUploadFile 包裹生成器函数
    const response = await commonUploadFile(
      importSalesPlanByExcel,
      file,
      { request: requestObj }, // 👈 extraData 就是 body
      {
        onProgress(percent) {
          uploadPercent.value = percent;
        },
      },
    );

    if (response.code === 200) {
      emit('reload');
    }

    Modal[response.code === 200 ? 'success' : 'error']({
      title: '提示',
      width: 560,
      content: buildResultContent(
        response,
        response.code === 200 ? '导入成功' : '导入失败',
      ),
    });

    handleCancel();
  } catch (error: any) {
    Modal.error({
      title: '错误',
      content: error?.message || '导入失败',
    });
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
}
</script>

<template>
  <BasicModal
    :close-on-click-modal="false"
    :fullscreen-button="false"
    title="销量计划导入"
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
          3. 导入配置
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
            点击或拖拽上传销售计划文件
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
        <div class="section-title">第三步：导入配置与提交</div>

        <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <div class="mb-1 text-xs text-slate-500">产品</div>
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

          <div>
            <div class="mb-1 text-xs text-slate-500">年份</div>
            <Select
              v-model:value="form.year"
              :options="yearOptions"
              placeholder="请选择年份"
              class="w-full"
            />
          </div>
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span class="text-xs text-slate-500">允许导入 xlsx、xls 文件</span>
          <a-button
            type="link"
            @click="
              commonDownloadExcel(
                downloadSalesPlanExcelTemplate,
                '销量计划导入模板',
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
              已满足全部条件，可直接提交导入
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
