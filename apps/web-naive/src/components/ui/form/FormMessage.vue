<script lang="ts" setup>
import { toValue } from 'vue';

import { ErrorMessage } from 'vee-validate';

import { useFormField } from './useFormField';

const { name, formMessageId } = useFormField();
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    :name="toValue(name)"
    as="p"
    class="text-destructive text-sm font-medium"
  />
</template>
