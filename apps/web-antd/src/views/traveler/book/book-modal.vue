<!--
使用antd原生Form生成 详细用法参考ant-design-vue Form组件文档
vscode默认配置文件会自动格式化/移除未使用依赖
-->
<script setup lang="ts">
import type { RuleObject } from 'ant-design-vue/es/form';

import type { BookForm } from '#/api/domain/book/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { cloneDeep, getPopupContainer } from '@vben/utils';

import {
  DatePicker,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Select,
  Textarea,
} from 'ant-design-vue';
import { pick } from 'lodash-es';

import { addBook, editBook, getBookInfo } from '#/api/traveler/book';
import { useBeforeCloseDiff } from '#/utils/popup';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

/**
 * 定义默认值 用于reset
 */
const defaultValues: Partial<BookForm> = {
  bookId: undefined,
  travelerName: undefined,
  documentType: undefined,
  documentNumber: undefined,
  gender: undefined,
  language: undefined,
  phoneNumber: undefined,
  service: undefined,
  address: undefined,
  remarks: undefined,
  travelerType: undefined,
  flightNumber: undefined,
  checkedBaggage: undefined,
  handBaggage: undefined,
  companionName: undefined,
  relation: undefined,
  companionPhone: undefined,
  status: undefined,
  flightTime: undefined,
  staffId: undefined,
  orderTime: undefined,
  serviceStartTime: undefined,
  serviceEndTime: undefined,
  cancelTime: undefined,
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
const formRules = ref<AntdFormRules<BookForm>>({
  travelerName: [{ required: true, message: '不能为空' }],
});

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
      const record = await getBookInfo(id);
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
    await (isUpdate.value ? editBook(data) : addBook(data));
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
      <FormItem label="" v-bind="validateInfos.travelerName">
        <Input
          v-model:value="formData.travelerName"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.documentType">
        <Select
          v-model:value="formData.documentType"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.documentNumber">
        <Input
          v-model:value="formData.documentNumber"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.gender">
        <Input
          v-model:value="formData.gender"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.language">
        <Input
          v-model:value="formData.language"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.phoneNumber">
        <Input
          v-model:value="formData.phoneNumber"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.service">
        <Input
          v-model:value="formData.service"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.address">
        <Input
          v-model:value="formData.address"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.remarks">
        <Textarea
          v-model:value="formData.remarks"
          :placeholder="$t('ui.formRules.required')"
          :rows="4"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.travelerType">
        <Select
          v-model:value="formData.travelerType"
          :options="[]"
          :get-popup-container="getPopupContainer"
          :placeholder="$t('ui.formRules.selectRequired')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.flightNumber">
        <Input
          v-model:value="formData.flightNumber"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.checkedBaggage">
        <Input
          v-model:value="formData.checkedBaggage"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.handBaggage">
        <Input
          v-model:value="formData.handBaggage"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.companionName">
        <Input
          v-model:value="formData.companionName"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.relation">
        <Input
          v-model:value="formData.relation"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.companionPhone">
        <Input
          v-model:value="formData.companionPhone"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="状态" v-bind="validateInfos.status">
        <RadioGroup
          option-type="button"
          button-style="solid"
          v-model:value="formData.status"
          :options="[]"
        />
      </FormItem>
      <FormItem label="" v-bind="validateInfos.flightTime">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.flightTime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="服务人员" v-bind="validateInfos.staffId">
        <Input
          v-model:value="formData.staffId"
          :placeholder="$t('ui.formRules.required')"
        />
      </FormItem>
      <FormItem label="接单时间" v-bind="validateInfos.orderTime">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.orderTime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="服务开始时间" v-bind="validateInfos.serviceStartTime">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.serviceStartTime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="服务结束时间" v-bind="validateInfos.serviceEndTime">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.serviceEndTime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
      <FormItem label="取消时间" v-bind="validateInfos.cancelTime">
        <!-- 需要自行调整参数 -->
        <DatePicker
          v-model:value="formData.cancelTime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>
