<script setup lang="ts">
import type { RuleObject } from 'ant-design-vue/es/form';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';
import { $t } from '@vben/locales';
import { cloneDeep } from '@vben/utils';

import { Button, Form, FormItem, Input, RadioGroup } from 'ant-design-vue';

import { addNotice, editNotice, getNoticeInfo } from '#/api/system/notice';
import { Tinymce } from '#/components/tinymce';
import { getDictOptions } from '#/utils/dict';
import { useBeforeCloseDiff } from '#/utils/popup';

import DeptTreeSelect from './dept-tree-select.vue';
import UserTableSelect from './user-table-select.vue';

const emit = defineEmits<{ reload: [] }>();

/* ======================= 基础状态 ======================= */

const isUpdate = ref(false);
const title = computed(() =>
  isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add'),
);

interface FormData {
  noticeId?: number;
  noticeTitle?: string;
  status?: string;
  noticeType?: string;
  noticeContent?: string;
  deptIds?: number[];
  userIds?: number[];
}

const defaultValues: FormData = {
  noticeId: undefined,
  noticeTitle: '',
  status: '0',
  noticeType: '1',
  noticeContent: '',
  deptIds: [],
  userIds: [],
};

const formData = ref<FormData>({ ...defaultValues });

/* ======================= 表单校验 ======================= */

type AntdFormRules<T> = Partial<Record<keyof T, RuleObject[]>> & {
  [key: string]: RuleObject[];
};

const formRules = ref<AntdFormRules<FormData>>({
  noticeTitle: [{ required: true, message: $t('ui.formRules.required') }],
  noticeType: [{ required: true, message: $t('ui.formRules.selectRequired') }],
  status: [{ required: true, message: $t('ui.formRules.selectRequired') }],
  noticeContent: [{ required: true, message: $t('ui.formRules.required') }],
});

const { validate, validateInfos, resetFields } = Form.useForm(
  formData,
  formRules,
);

/* ======================= 关闭校验 ======================= */

function customFormValueGetter() {
  return JSON.stringify(formData.value);
}

const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: customFormValueGetter,
    currentGetter: customFormValueGetter,
  },
);

/* ======================= 用户选择器引用 ======================= */

const userSelectRef = ref<InstanceType<typeof UserTableSelect>>();

/* ======================= Modal ======================= */

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[900px]',
  fullscreenButton: true,
  onBeforeClose,
  onClosed: handleClosed,
  onConfirm: handleConfirm,
  onOpenChange: async (isOpen) => {
    if (!isOpen) return;

    modalApi.modalLoading(true);

    const { id } = modalApi.getData() as { id?: number };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const { data } = await getNoticeInfo({ noticeId: id });

      // 先基础字段赋值
      formData.value.noticeId = data.noticeId;
      formData.value.noticeTitle = data.noticeTitle;
      formData.value.noticeType = data.noticeType;
      formData.value.noticeContent = data.noticeContent;
      formData.value.status = data.status;

      // 处理部门和用户
      const deptDispatch = data.dispatchList?.find(
        (d: any) => d.dispatchType === '2',
      );
      const userDispatch = data.dispatchList?.find(
        (d: any) => d.dispatchType === '3',
      );

      formData.value.deptIds = deptDispatch?.dispatchIds || [];
      formData.value.userIds = userDispatch?.dispatchIds || [];
    }

    await markInitialized();
    modalApi.modalLoading(false);
  },
});

/* ======================= 提交 ======================= */

async function handleConfirm() {
  try {
    modalApi.lock(true);
    await validate();

    const data = cloneDeep(formData.value);

    const dispatchList: any[] = [];

    if (data.deptIds?.length) {
      dispatchList.push({
        dispatchType: '2',
        dispatchIds: data.deptIds,
      });
    }

    if (data.userIds?.length) {
      dispatchList.push({
        dispatchType: '3',
        dispatchIds: data.userIds,
      });
    }

    if (dispatchList.length === 0) {
      dispatchList.push({
        dispatchType: '1',
        dispatchIds: [],
      });
    }

    const submitData = {
      noticeTitle: data.noticeTitle,
      noticeType: data.noticeType,
      noticeContent: data.noticeContent,
      status: data.status,
      dispatchList,
    };
    await (isUpdate.value
      ? editNotice({ noticeId: data.noticeId }, submitData)
      : addNotice(submitData));

    resetInitialized();
    emit('reload');
    modalApi.close();
  } finally {
    modalApi.lock(false);
  }
}

function handleClosed() {
  formData.value = { ...defaultValues };
  resetFields();
  resetInitialized();
}
</script>

<template>
  <BasicModal :title="title">
    <Form layout="vertical">
      <FormItem label="公告标题" v-bind="validateInfos.noticeTitle">
        <Input v-model:value="formData.noticeTitle" />
      </FormItem>

      <div class="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <FormItem label="公告状态" v-bind="validateInfos.status">
          <RadioGroup
            v-model:value="formData.status"
            button-style="solid"
            option-type="button"
            :options="getDictOptions(DictEnum.SYS_NOTICE_STATUS)"
          />
        </FormItem>

        <FormItem label="公告类型" v-bind="validateInfos.noticeType">
          <RadioGroup
            v-model:value="formData.noticeType"
            button-style="solid"
            option-type="button"
            :options="getDictOptions(DictEnum.SYS_NOTICE_TYPE)"
          />
        </FormItem>
      </div>

      <!-- 投递部门 -->
      <FormItem label="投递部门">
        <DeptTreeSelect v-model="formData.deptIds" />
      </FormItem>

      <!-- 投递用户 -->
      <FormItem label="投递用户">
        <Button type="primary" @click="userSelectRef?.open()">
          选择用户
        </Button>
        <span class="ml-2 text-gray-500">
          已选择 {{ formData.userIds?.length || 0 }} 人
        </span>
      </FormItem>

      <FormItem label="公告内容" v-bind="validateInfos.noticeContent">
        <Tinymce v-model="formData.noticeContent" />
      </FormItem>
    </Form>

    <!-- 用户选择弹窗 -->
    <UserTableSelect ref="userSelectRef" v-model="formData.userIds" />
  </BasicModal>
</template>
