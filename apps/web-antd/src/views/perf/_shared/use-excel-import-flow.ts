import type { UploadFile } from 'ant-design-vue/es/upload/interface';

import type { Ref } from 'vue';

import { ref, watch } from 'vue';

export type ImportStage =
  | 'idle'
  | 'parsingHeaders'
  | 'parsingSheets'
  | 'ready'
  | 'submitting';

export interface ExcelMappingField {
  key: string;
  label: string;
}

export interface ImportValidationResult {
  valid: boolean;
  missing: string[];
}

interface AutoMatchResult {
  matchedKeys: string[];
  missingLabels: string[];
}

interface UseExcelImportFlowOptions<TForm extends Record<string, any>> {
  form: Ref<TForm>;
  resetMappings: () => void;
  loadSheetsApi: (file: File) => Promise<string[]>;
  loadHeadersApi: (file: File, sheetName: string) => Promise<string[]>;
  autoMatch: (headers: string[]) => AutoMatchResult;
}

export function useExcelImportFlow<TForm extends Record<string, any>>(
  options: UseExcelImportFlowOptions<TForm>,
) {
  const fileList = ref<UploadFile[]>([]);
  const sheets = ref<string[]>([]);
  const headers = ref<string[]>([]);
  const stage = ref<ImportStage>('idle');
  const uploadPercent = ref(0);
  const errorText = ref('');
  const autoMatchedKeys = ref<string[]>([]);
  const missingAutoMatchLabels = ref<string[]>([]);

  function clearSheetAndHeaderState() {
    sheets.value = [];
    headers.value = [];
    autoMatchedKeys.value = [];
    missingAutoMatchLabels.value = [];
    options.form.value.sheetName = '';
    options.resetMappings();
  }

  function resetFlow() {
    fileList.value = [];
    clearSheetAndHeaderState();
    stage.value = 'idle';
    uploadPercent.value = 0;
    errorText.value = '';
  }

  async function loadSheets() {
    if (fileList.value.length !== 1) {
      clearSheetAndHeaderState();
      stage.value = 'idle';
      return;
    }

    stage.value = 'parsingSheets';
    errorText.value = '';
    clearSheetAndHeaderState();

    const file = fileList.value[0]?.originFileObj as File;
    try {
      const list = (await options.loadSheetsApi(file)) ?? [];
      sheets.value = list;
      options.form.value.sheetName = list[0] || '';
      if (!options.form.value.sheetName) {
        stage.value = 'idle';
        errorText.value = '文件中未找到可用 Sheet';
      }
    } catch {
      stage.value = 'idle';
      errorText.value = '读取 Sheet 失败，请检查文件格式';
    }
  }

  async function loadHeaders(sheetName: string) {
    if (!sheetName || fileList.value.length !== 1) {
      headers.value = [];
      autoMatchedKeys.value = [];
      missingAutoMatchLabels.value = [];
      return;
    }

    stage.value = 'parsingHeaders';
    errorText.value = '';
    headers.value = [];
    autoMatchedKeys.value = [];
    missingAutoMatchLabels.value = [];
    options.resetMappings();

    const file = fileList.value[0]?.originFileObj as File;
    try {
      const list = (await options.loadHeadersApi(file, sheetName)) ?? [];
      headers.value = list;
      const autoMatchResult = options.autoMatch(list);
      autoMatchedKeys.value = autoMatchResult.matchedKeys;
      missingAutoMatchLabels.value = autoMatchResult.missingLabels;
      stage.value = 'ready';
    } catch {
      stage.value = 'idle';
      errorText.value = '读取表头失败，请检查文件格式';
    }
  }

  watch(fileList, async (files) => {
    if (files.length !== 1) {
      clearSheetAndHeaderState();
      stage.value = 'idle';
      errorText.value = '';
      return;
    }
    await loadSheets();
  });

  watch(
    () => options.form.value.sheetName,
    async (sheetName) => {
      await loadHeaders(sheetName);
    },
  );

  return {
    autoMatchedKeys,
    errorText,
    fileList,
    headers,
    missingAutoMatchLabels,
    resetFlow,
    sheets,
    stage,
    uploadPercent,
  };
}
