<script setup lang="tsx">
import { computed } from 'vue';

import { NTag } from 'naive-ui';

defineOptions({ name: 'OptionsTag' });

const props = defineProps<{
  options: { color?: string; label: string; value: number | string }[];
  value: number | string;
}>();

const found = computed(() =>
  props.options.find((item) => item.value === props.value),
);
</script>

<template>
  <NTag
    v-if="found"
    type="default"
    :style="found.color ? `background-color: ${found.color}; color: white` : ''"
  >
    {{ found.label }}
  </NTag>
  <span v-else>未知</span>
</template>
