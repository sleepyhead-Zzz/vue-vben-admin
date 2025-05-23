<script setup lang="ts">
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { Descriptions, DescriptionsItem } from 'ant-design-vue';

import { renderBrowserIcon, renderDict, renderOsIcon } from '#/utils/render';

const loginInfo = ref<MonitorAPI.LoginLogDTO>();
const [BasicModal, modalApi] = useVbenModal({
  onOpenChange: (isOpen) => {
    if (!isOpen) {
      return null;
    }
    const record = modalApi.getData() as MonitorAPI.LoginLogDTO;
    loginInfo.value = record;
  },
  onClosed() {
    loginInfo.value = undefined;
  },
});
</script>

<template>
  <BasicModal
    :footer="false"
    :fullscreen-button="false"
    class="w-[550px]"
    title="登录日志"
  >
    <Descriptions v-if="loginInfo" size="small" :column="1" bordered>
      <DescriptionsItem label="登录状态">
        <component
          :is="renderDict(loginInfo.status, DictEnum.SYS_COMMON_STATUS)"
        />
      </DescriptionsItem>
      <DescriptionsItem label="账号信息">
        {{
          `账号: ${loginInfo.userName} / ${loginInfo.ipAddress} / ${loginInfo.loginLocation}`
        }}
      </DescriptionsItem>
      <DescriptionsItem label="登录时间">
        {{ loginInfo.loginTime }}
      </DescriptionsItem>
      <DescriptionsItem label="登录信息">
        <span
          class="font-semibold"
          :class="{ 'text-red-500': loginInfo.status !== '0' }"
        >
          {{ loginInfo.msg }}
        </span>
      </DescriptionsItem>
      <DescriptionsItem label="登录设备">
        <component :is="renderOsIcon(loginInfo.operationSystem)" />
      </DescriptionsItem>
      <DescriptionsItem label="浏览器">
        <component :is="renderBrowserIcon(loginInfo.browser)" />
      </DescriptionsItem>
    </Descriptions>
  </BasicModal>
</template>
