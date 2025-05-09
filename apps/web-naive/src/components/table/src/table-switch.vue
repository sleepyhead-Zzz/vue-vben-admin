<script setup lang="ts">
import { computed, ref } from 'vue';

import { $t } from '@vben/locales';

import { isFunction } from 'lodash-es';
import { NSwitch } from 'naive-ui';

import { dialog } from '#/adapter/naive';

type CheckedType = boolean | number | string;

interface Props {
  checkedText?: string;
  unCheckedText?: string;
  checkedValue?: CheckedType;
  unCheckedValue?: CheckedType;
  disabled?: boolean;
  api: () => PromiseLike<void>;
  confirm?: boolean;
  confirmText?: (checked: CheckedType) => string;
}

const props = withDefaults(defineProps<Props>(), {
  checkedText: undefined,
  unCheckedText: undefined,
  checkedValue: '0',
  unCheckedValue: '1',
  confirm: false,
  confirmText: undefined,
});

const emit = defineEmits<{ reload: [] }>();

const checkedTextComputed = computed(() => {
  return props.checkedText ?? $t('pages.common.enable');
});

const unCheckedTextComputed = computed(() => {
  return props.unCheckedText ?? $t('pages.common.disable');
});

const currentChecked = defineModel<CheckedType>('value', {
  default: false,
});

const loading = ref(false);

function confirmUpdate(checked: CheckedType, lastStatus: CheckedType) {
  const content = isFunction(props.confirmText)
    ? props.confirmText(checked)
    : '确认要更新状态吗？';

  dialog.warning({
    title: '提示',
    content,
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        loading.value = true;
        const { api } = props;
        isFunction(api) && (await api());
        emit('reload');
      } catch {
        currentChecked.value = lastStatus;
      } finally {
        loading.value = false;
      }
    },
    onNegativeClick: () => {
      currentChecked.value = lastStatus;
    },
  });
}

async function handleChange(checked: boolean) {
  const { checkedValue, unCheckedValue } = props;
  const valueToSet = checked ? checkedValue : unCheckedValue;
  const lastStatus = checked ? unCheckedValue : checkedValue;

  currentChecked.value = valueToSet;

  try {
    loading.value = true;

    if (props.confirm) {
      confirmUpdate(valueToSet, lastStatus);
      return;
    }

    isFunction(props.api) && (await props.api());
    emit('reload');
  } catch {
    currentChecked.value = lastStatus;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <NSwitch
    :loading="loading"
    :disabled="disabled"
    :value="currentChecked === checkedValue"
    :checked-value="true"
    :unchecked-value="false"
    :checked-text="checkedTextComputed"
    :unchecked-text="unCheckedTextComputed"
    @update:value="handleChange"
  />
</template>
