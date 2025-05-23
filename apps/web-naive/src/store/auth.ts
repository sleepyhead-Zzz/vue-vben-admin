import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { $t } from '@vben/locales';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { defineStore } from 'pinia';

import { notification } from '#/adapter/naive';
import { logoutApi } from '#/api';
import { getLoginUserInfo, login } from '#/api/common/loginApi';
import { router } from '#/router/index';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: API.CurrentLoginUserDTO | null | undefined = null;

    try {
      loginLoading.value = true;

      const response = await login(params);
      const accessToken = response.data?.access_token;
      // 如果成功获取到 accessToken
      if (accessToken) {
        // 将 accessToken 存储到 accessStore 中
        accessStore.setAccessToken(accessToken);
        accessStore.setRefreshToken(accessToken);

        // 获取用户信息并存储到 accessStore 中
        userInfo = await fetchUserInfo();

        /**
         * 在这里设置权限
         */
        const accessCodes = userInfo.permissions ?? [];
        accessStore.setAccessCodes(accessCodes);

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(DEFAULT_HOME_PATH);
        }

        if (userInfo.user?.nickName) {
          notification.success({
            content: $t('authentication.loginSuccess'),
            description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.user.nickName}`,
            duration: 3000,
          });
        }
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      resetAllStores();
      accessStore.setLoginExpired(false);

      // 回登陆页带上当前路由地址
      await router.replace({
        path: LOGIN_PATH,
        query: redirect
          ? {
              redirect: encodeURIComponent(router.currentRoute.value.fullPath),
            }
          : {},
      });
    }
  }

  async function fetchUserInfo() {
    const backUserInfo = await getLoginUserInfo();
    if (!backUserInfo) {
      throw new Error('获取用户信息失败.');
    }

    const { permissions = [], roles = [], user } = backUserInfo.data ?? {};

    if (!user) {
      throw new Error('用户信息缺失.');
    }

    /**
     * 从后台user -> vben user转换
     */
    const userInfo: UserInfo = {
      avatar: user.avatar ?? '', // 如果 avatar 为空，则使用默认值 ''
      permissions,
      realName: user.nickName ?? '',
      roles,
      userId: user.userId ?? '',
      username: user.userName ?? '',
    };

    userStore.setUserInfo(userInfo);

    /**
     * 需要重新加载字典
     * 比如退出登录切换到其他租户
     */
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
