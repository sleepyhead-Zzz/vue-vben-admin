<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NDescriptions, NDescriptionsItem, NSpin } from 'naive-ui';

import { ApiService, type RoleDTO } from '#/apis';

const roleInfo = ref<RoleDTO>({});
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
        const roleId = drawerApi.getData<Record<string, any>>().roleId;
        const { data } = await ApiService.getInfo(roleId);

        if (data) {
          roleInfo.value = data;
          const title = `${$t('system.role.info')}: ${data.roleName}`;
          drawerApi.setState({ title });
        } else {
          console.error('未找到角色信息');
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
          v-if="roleInfo.roleId"
          :column="2"
          bordered
          class="description-container"
          label-placement="left"
        >
          <NDescriptionsItem :label="$t('system.role.id')">
            {{ roleInfo.roleId }}
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
