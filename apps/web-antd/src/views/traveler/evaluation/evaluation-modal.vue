<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { RuleObject } from 'ant-design-vue/es/form';

import type { EvaluationForm } from '#/api/domain/evaluation/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Form, FormItem, Input } from 'ant-design-vue';
import { pick } from 'lodash-es';

import {
  addEvaluation,
  editEvaluation,
  getEvaluationInfo,
} from '#/api/domain/evaluation';
import { Tinymce } from '#/components/tinymce';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<EvaluationForm> = {
  evaluationId: undefined,
  bookId: undefined,
  serviceAttitude: undefined,
  professionalism: undefined,
  evaluationContent: undefined,
};

/**
 * 表单数据ref
 */
const formData = ref(defaultValues);

type AntdFormRules<T> = Partial<Record<keyof T, RuleObject[]>> & {
  [key: string]: RuleObject[];
};
/**
 * 表单校验规则
 */
const formRules = ref<AntdFormRules<EvaluationForm>>({});

/**
 * useForm解构出表单方法
 */
const { validate, validateInfos, resetFields } = Form.useForm(
  formData,
  formRules,
);

function customFormValueGetter() {
  return JSON.stringify(formData.value);
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[550px]',
  fullscreenButton: false,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    const { id } = modalApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await getEvaluationInfo(id);
      // 只赋值存在的字段
      const filterRecord = pick(record, Object.keys(defaultValues));
      formData.value = filterRecord;
    }
    await markInitialized();

    modalApi.modalLoading(false);
  },
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await validate();
    // 可能会做数据处理 使用cloneDeep深拷贝
    const data = cloneDeep(formData.value);
    await (isUpdate.value ? editEvaluation(data) : addEvaluation(data));
    resetInitialized();
    emit('reload');
    modalApi.close();
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}

async function handleClosed() {
  formData.value = defaultValues;
  resetFields();
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form :label-col="{ span: 4 }">
      <FormItem label="" v-bind="validateInfos.bookId">
        <Input
          v-model:value="formData.bookId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.serviceAttitude">
        <Input
          v-model:value="formData.serviceAttitude"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.professionalism">
        <Input
          v-model:value="formData.professionalism"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.evaluationContent">
        <Tinymce :disabled="false" v-model="formData.evaluationContent" />
      </FormItem>
    </Form>
  </BasicModal>
</template>
