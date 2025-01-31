<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NCard } from 'naive-ui';

import { ApiService } from '#/apis';

const data = ref();
const postInfo = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {},
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const postId = drawerApi.getData<Record<string, any>>().postId;
      const { data } = await ApiService.getInfo1(postId);
      postInfo.value = data;
      const title = `${$t('system.post.info')}: ${postInfo.value.postName}`;
      drawerApi.setState({ title });
    }
  },
});
</script>
<template>
  <Drawer>
    <div class="flex-col-center">
      <NCard size="small"> {{ data }} </NCard>
    </div>
  </Drawer>
</template>
