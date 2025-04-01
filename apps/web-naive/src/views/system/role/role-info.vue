<script lang="ts" setup>
import type { RoleDTO } from '#/apis';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NDescriptions, NDescriptionsItem, NSpin, NTag } from 'naive-ui';

import { ApiService } from '#/apis';

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
        const { data } = await ApiService.getRoleInfo(roleId);

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
          <NDescriptionsItem :label="$t('system.role.name')">
            {{ roleInfo.roleName }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.role.key')">
            {{ roleInfo.roleKey }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.role.sort')">
            {{ roleInfo.roleSort }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.role.status')">
            <NTag :type="roleInfo.status === 1 ? 'success' : 'error'">
              {{
                roleInfo.status === 1
                  ? $t('system.role.statusNormal')
                  : $t('system.role.statusDisabled')
              }}
            </NTag>
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.role.remark')">
            {{ roleInfo.remark || $t('common.none') }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.role.createTime')">
            {{ roleInfo.createTime }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.role.dataScope')">
            {{ roleInfo.dataScope }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.role.selectedMenuList')">
            {{ roleInfo.selectedMenuList?.join(', ') || $t('common.none') }}
          </NDescriptionsItem>
          <NDescriptionsItem :label="$t('system.role.selectedDeptList')">
            {{ roleInfo.selectedDeptList?.join(', ') || $t('common.none') }}
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
