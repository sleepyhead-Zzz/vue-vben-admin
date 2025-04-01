<script lang="ts" setup>
import type { PostDTO } from '#/apis';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NDescriptions, NDescriptionsItem, NSpin } from 'naive-ui';

import { ApiService } from '#/apis';

const postInfo = ref<PostDTO>({});
const loading = ref(false);

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {},
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      loading.value = true;
      try {
        const postId = drawerApi.getData<Record<string, any>>().postId;
        const { data } = await ApiService.getPostInfo(postId);

        if (data) {
          postInfo.value = data;
          const title = `${$t('system.post.info')}: ${data.postName}`;
          drawerApi.setState({ title });
        } else {
          console.error('未找到职位信息');
        }
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        loading.value = false;
      }
    }
  },
});
</script>

<template>
  <Drawer>
    <div class="drawer-content">
      <NSpin :show="loading">
        <NDescriptions
          v-if="postInfo.postId"
          :column="2"
          bordered
          class="description-container"
          label-placement="left"
        >
          <NDescriptionsItem :label="$t('system.post.id')">
            {{ postInfo.postId }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.post.code')">
            {{ postInfo.postCode }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.post.name')">
            {{ postInfo.postName }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.post.sort')">
            {{ postInfo.postSort }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.post.remark')">
            {{ postInfo.remark || '无' }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.post.status')">
            {{ postInfo.statusStr }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.post.create_time')">
            {{ postInfo.createTime }}
          </NDescriptionsItem>
        </NDescriptions>
      </NSpin>
    </div>
  </Drawer>
</template>

<style scoped>
.drawer-content {
  box-sizing: border-box;
  height: 100%;
  padding: 2px;
}

.description-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
