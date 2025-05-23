<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { Descriptions, DescriptionsItem, Tag } from 'ant-design-vue';

import {
  renderDict,
  renderHttpMethodTag,
  renderJsonPreview,
} from '#/utils/render';

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onOpenChange: handleOpenChange,
  onClosed() {
    currentLog.value = null;
  },
});

const currentLog = shallowRef<MonitorAPI.OperationLogDTO | null>(null);
function handleOpenChange(open: boolean) {
  if (!open) {
    return null;
  }
  const { record } = drawerApi.getData() as {
    record: MonitorAPI.OperationLogDTO;
  };
  currentLog.value = record;
}

const actionInfo = computed(() => {
  if (!currentLog.value) {
    return '-';
  }
  const data = currentLog.value;
  return `账号: ${data.username} / ${data.deptName} / ${data.operatorIp} / ${data.operatorLocation}`;
});
</script>

<template>
  <BasicDrawer :footer="false" class="w-[600px]" title="查看日志">
    <Descriptions v-if="currentLog" size="small" bordered :column="1">
      <DescriptionsItem label="日志编号" :label-style="{ minWidth: '120px' }">
        {{ currentLog.operationId }}
      </DescriptionsItem>
      <DescriptionsItem label="操作结果">
        <component
          :is="renderDict(currentLog.status, DictEnum.SYS_COMMON_STATUS)"
        />
      </DescriptionsItem>
      <DescriptionsItem label="操作模块">
        <div class="flex items-center">
          <Tag>{{ currentLog.requestModule }}</Tag>
          <component
            :is="renderDict(currentLog.businessType, DictEnum.SYS_OPER_TYPE)"
          />
        </div>
      </DescriptionsItem>
      <DescriptionsItem label="操作信息">
        {{ actionInfo }}
      </DescriptionsItem>
      <DescriptionsItem label="请求信息">
        <component :is="renderHttpMethodTag(currentLog.requestMethod)" />
        {{ currentLog.requestUrl }}
      </DescriptionsItem>
      <DescriptionsItem v-if="currentLog.errorStack" label="异常信息">
        <span class="font-semibold text-red-600">
          {{ currentLog.errorStack }}
        </span>
      </DescriptionsItem>
      <DescriptionsItem label="方法">
        {{ currentLog.calledMethod }}
      </DescriptionsItem>
      <DescriptionsItem label="请求参数">
        <div class="max-h-[300px] overflow-y-auto">
          <component :is="renderJsonPreview(currentLog.operationParam)" />
        </div>
      </DescriptionsItem>
      <DescriptionsItem v-if="currentLog.operationResult" label="响应参数">
        <div class="max-h-[300px] overflow-y-auto">
          <component :is="renderJsonPreview(currentLog.operationResult)" />
        </div>
      </DescriptionsItem>
      <DescriptionsItem label="请求耗时">
        {{ `${currentLog.costTime} ms` }}
      </DescriptionsItem>
      <DescriptionsItem label="操作时间">
        {{ `${currentLog.operationTime}` }}
      </DescriptionsItem>
    </Descriptions>
  </BasicDrawer>
</template>
