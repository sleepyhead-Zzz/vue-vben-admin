<script setup lang="ts">
import type { ImportValidationResult } from '../_shared/use-excel-import-flow';

import { computed, h, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';
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

import {
  downloadFactManagementScoreExcelTemplate,
  importByType,
} from '#/api/perf/factManagementScore';
import { getHeaders, getSheets } from '#/api/tool/excel';
import { getDictOptions } from '#/utils/dict';
import { commonDownloadExcel } from '#/utils/file/download';
import { commonUploadFile } from '#/utils/file/upload';

import { useExcelImportFlow } from '../_shared/use-excel-import-flow';

const emit = defineEmits<{ reload: [] }>();

const UploadDragger = Upload.Dragger;
const scoreTypeOptions = getDictOptions(DictEnum.PerfManagementScoreType);
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 7 }).map((_, index) => {
  const year = currentYear - 3 + index;
  return { label: `${year}`, value: year };
});

const monthFields = Array.from({ length: 12 }).map((_, index) => ({
  key: `month${index + 1}` as const,
  label: `${index + 1}月`,
}));

type ImportFieldKey =
  | 'bucket0_10'
  | 'bucket11_30'
  | 'bucket30_59'
  | 'bucket60_90'
  | 'bucket90_plus'
  | 'customerName'
  | 'scoreValue'
  | 'userName'
  | `month${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`;

const excelFieldsByType: Record<
  string,
  Array<{
    key: ImportFieldKey;
    label: string;
  }>
> = {
  '1': [
    { key: 'userName', label: '销售人员姓名' },
    { key: 'scoreValue', label: '得分' },
  ],
  '2': [{ key: 'userName', label: '销售人员姓名' }, ...monthFields],
  '3': [{ key: 'userName', label: '销售人员姓名' }, ...monthFields],
  '4': [
    { key: 'userName', label: '销售人员姓名' },
    { key: 'customerName', label: '客户名称' },
    { key: 'bucket0_10', label: '0-10' },
    { key: 'bucket11_30', label: '11-30' },
    { key: 'bucket30_59', label: '30-59' },
    { key: 'bucket60_90', label: '60-90' },
    { key: 'bucket90_plus', label: '90天以上' },
  ],
};

const fieldAliases: Record<ImportFieldKey, string[]> = {
  bucket0_10: ['0-10', '0_10', '0到10'],
  bucket11_30: ['11-30', '11_30', '11,-30', '11到30'],
  bucket30_59: ['30-59', '30_59', '31-59', '31_59', '30到59', '31到59'],
  bucket60_90: ['60-90', '60_90', '60到90'],
  bucket90_plus: ['90天以上', '90_plus', '90以上', '90+'],
  userName: ['userName', 'username', '销售人员姓名', '业务经理姓名', '姓名'],
  customerName: ['customerName', '客户名称', '客户'],
  month1: ['month1', '1月', '1月得分'],
  month2: ['month2', '2月', '2月得分'],
  month3: ['month3', '3月', '3月得分'],
  month4: ['month4', '4月', '4月得分'],
  month5: ['month5', '5月', '5月得分'],
  month6: ['month6', '6月', '6月得分'],
  month7: ['month7', '7月', '7月得分'],
  month8: ['month8', '8月', '8月得分'],
  month9: ['month9', '9月', '9月得分'],
  month10: ['month10', '10月', '10月得分'],
  month11: ['month11', '11月', '11月得分'],
  month12: ['month12', '12月', '12月得分'],
  scoreValue: ['scoreValue', '得分', '最终扣分值', '分值'],
};
const allMappingKeys = Object.keys(fieldAliases) as ImportFieldKey[];

const form = ref<Record<string, any>>({
  sheetName: '',
  scoreType: undefined,
  year: currentYear,
  userName: undefined,
  customerName: undefined,
  scoreValue: undefined,
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
  bucket0_10: undefined,
  bucket11_30: undefined,
  bucket30_59: undefined,
  bucket60_90: undefined,
  bucket90_plus: undefined,
});

const checked = ref(false);
const lockScoreType = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[95vw] max-w-[1200px] md:w-[85vw] lg:w-[70vw]',
  onCancel: handleCancel,
  onConfirm: handleSubmit,
  onOpenChange(isOpen) {
    if (!isOpen) return;

    const data = (modalApi.getData() as Record<string, any> | undefined) || {};
    const defaultType = data.defaultScoreType
      ? String(data.defaultScoreType)
      : undefined;

    lockScoreType.value = !!data.lockScoreType;
    checked.value = false;
    form.value = {
      sheetName: '',
      scoreType: defaultType,
      year: data.defaultYear || currentYear,
      userName: undefined,
      customerName: undefined,
      overdueLevel: undefined,
      scoreValue: undefined,
    };
    resetFlow();
  },
});

function normalizeHeader(value: string) {
  return value.replaceAll(/\s+/g, '').toLowerCase();
}

const activeFields = computed(() => {
  const key = String(form.value.scoreType ?? '');
  if (key !== '1') {
    return [];
  }
  return excelFieldsByType[key] ?? [];
});

const needsManualMapping = computed(
  () => String(form.value.scoreType ?? '') === '1',
);

function resetMappings() {
  allMappingKeys.forEach((key) => {
    form.value[key] = undefined;
  });
}

function runAutoMatch(headers: string[]) {
  const normalizedHeaders = headers.map((header) => ({
    raw: header,
    normalized: normalizeHeader(header),
  }));

  const missingLabels: string[] = [];
  const matchedKeys: string[] = [];

  activeFields.value.forEach((field) => {
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
}

const flow = useExcelImportFlow({
  autoMatch: runAutoMatch,
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

watch(
  () => form.value.scoreType,
  () => {
    resetMappings();
    if (headers.value.length > 0 && activeFields.value.length > 0) {
      const result = runAutoMatch(headers.value);
      autoMatchedKeys.value = result.matchedKeys;
      missingAutoMatchLabels.value = result.missingLabels;
    } else {
      autoMatchedKeys.value = [];
      missingAutoMatchLabels.value = [];
    }
  },
);

const modalTitle = computed(() => {
  const title = (modalApi.getData() as Record<string, any> | undefined)?.title;
  return title || '管理/逾期导入';
});

const fileName = computed(() => fileList.value[0]?.name || '未选择文件');

const fieldProgress = computed(() => {
  if (!needsManualMapping.value) {
    return { total: 0, mapped: 0, percent: 100 };
  }
  const total = activeFields.value.length || 1;
  const mapped = activeFields.value.filter(
    (field) => !!form.value[field.key],
  ).length;
  return { total, mapped, percent: Math.round((mapped / total) * 100) };
});

const validation = computed<ImportValidationResult>(() => {
  const missing: string[] = [];

  if (fileList.value.length !== 1) {
    missing.push('上传一个 Excel 文件');
  }
  if (!form.value.scoreType) {
    missing.push('选择类型');
  }
  if (!form.value.year) {
    missing.push('选择年份');
  }

  activeFields.value.forEach((field) => {
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

function beforeUpload(file: File) {
  if (!/\.(?:xlsx|xls)$/i.test(file.name)) {
    Modal.warning({ title: '提示', content: '仅支持 .xlsx 或 .xls 文件' });
    return Upload.LIST_IGNORE;
  }
  return false;
}

function buildResultContent(response: PerfAPI.ResponseDTOImportResponseDTO) {
  const result = response.data;
  const messageHtml = response.message || '';

  return h('div', { class: 'space-y-3' }, [
    h('div', { class: 'rounded-lg border border-[#dbeafe] bg-[#eff6ff] p-3' }, [
      h('div', { class: 'font-medium text-[#1e3a8a]' }, '导入结果'),
      h('div', { class: 'mt-2 text-sm text-[#1e293b]' }, [
        `成功 ${result?.successCount ?? 0} 条，失败 ${result?.failureCount ?? 0} 条`,
      ]),
      result?.hasError
        ? h(
            'div',
            { class: 'mt-1 text-xs text-amber-600' },
            '存在失败记录，请查看错误详情',
          )
        : null,
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
    messageHtml
      ? h('details', { class: 'rounded border border-slate-200 p-2 text-sm' }, [
          h(
            'summary',
            { class: 'cursor-pointer text-slate-600' },
            '查看后端原始消息',
          ),
          h('div', {
            class: 'mt-2 max-h-[220px] overflow-y-auto text-slate-700',
            innerHTML: messageHtml,
          }),
        ])
      : null,
  ]);
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
  const columnMappings = needsManualMapping.value
    ? activeFields.value.map((field) => ({
        fieldName: field.key,
        columnName: form.value[field.key],
      }))
    : undefined;

  const requestObj: PerfAPI.ManagementScoreImportRequest = {
    scoreType: form.value.scoreType,
    year: form.value.year,
    sheetName: form.value.sheetName || undefined,
    updateSupport: checked.value,
    columnMappings,
  };

  try {
    modalApi.modalLoading(true);
    uploadPercent.value = 0;

    const response = await commonUploadFile(
      importByType,
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

    let method: 'error' | 'success' | 'warning' = 'error';
    if (response.code === 200) {
      method = response.data?.hasError ? 'warning' : 'success';
    }

    Modal[method]({
      title: '提示',
      width: 560,
      content: buildResultContent(response),
    });

    handleCancel();
  } catch (error: any) {
    Modal.error({
      title: '错误',
      content: error?.message || '导入失败',
    });
  } finally {
    modalApi.modalLoading(false);
  }
}

function handleCancel() {
  modalApi.close();
  checked.value = false;
  resetFlow();
  form.value = {
    sheetName: '',
    scoreType: undefined,
    year: currentYear,
    userName: undefined,
    customerName: undefined,
    scoreValue: undefined,
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
    bucket0_10: undefined,
    bucket11_30: undefined,
    bucket30_59: undefined,
    bucket60_90: undefined,
    bucket90_plus: undefined,
  };
}
</script>

<template>
  <BasicModal
    :close-on-click-modal="false"
    :fullscreen-button="false"
    :title="modalTitle"
  >
    <div class="import-shell">
      <div class="steps-grid">
        <div class="step-chip" :class="[{ active: stageStep >= 0 }]">
          1. 上传文件
        </div>
        <div class="step-chip" :class="[{ active: stageStep >= 1 }]">
          2. 字段映射
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
            点击或拖拽上传导入文件
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
          <div v-if="needsManualMapping" class="text-xs text-slate-500">
            已映射 {{ fieldProgress.mapped }}/{{ fieldProgress.total }}
          </div>
        </div>

        <Progress
          :percent="fieldProgress.percent"
          :show-info="false"
          size="small"
        />

        <div class="mt-3">
          <div class="mb-1 text-xs text-slate-500">Sheet（可选）</div>
          <Select
            v-model:value="form.sheetName"
            :disabled="sheets.length === 0"
            :loading="stage === 'parsingSheets'"
            placeholder="不选则默认第一张"
            :options="sheets.map((item) => ({ label: item, value: item }))"
            class="w-full"
          />
        </div>

        <Alert
          v-if="needsManualMapping && stage === 'parsingHeaders'"
          class="mt-3"
          message="正在解析表头并自动匹配字段..."
          show-icon
          type="info"
        />

        <Alert
          v-if="needsManualMapping && missingAutoMatchLabels.length > 0"
          class="mt-3"
          :message="`自动匹配未覆盖：${missingAutoMatchLabels.join('、')}`"
          show-icon
          type="warning"
        />

        <Alert
          v-if="!needsManualMapping"
          class="mt-3"
          message="当前类型由后端按业务规则自动处理月份/逾期列，前端无需手动映射。"
          show-icon
          type="info"
        />

        <div v-if="needsManualMapping" class="mapping-grid mt-4">
          <div
            v-for="field in activeFields"
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

        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <div class="mb-1 text-xs text-slate-500">类型</div>
            <Select
              v-model:value="form.scoreType"
              :disabled="lockScoreType"
              :options="scoreTypeOptions"
              option-filter-prop="label"
              option-label-prop="label"
              show-search
              allow-clear
              placeholder="请选择类型"
              class="w-full"
            />
          </div>

          <div>
            <div class="mb-1 text-xs text-slate-500">年份</div>
            <Select
              v-model:value="form.year"
              :options="yearOptions"
              option-filter-prop="label"
              option-label-prop="label"
              show-search
              allow-clear
              placeholder="请选择年份"
              class="w-full"
            />
          </div>
        </div>

        <div
          class="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500"
        >
          <span>支持 .xlsx / .xls</span>
          <a-button
            type="link"
            @click="
              commonDownloadExcel(
                downloadFactManagementScoreExcelTemplate,
                '管理与逾期导入模板',
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

        <div v-if="uploadPercent > 0 && uploadPercent < 100" class="mt-4">
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
