import { preferences } from '@vben/preferences';
import { useAccessStore } from '@vben/stores';

import axios from 'axios';

import { message as message2 } from '#/adapter/naive';
import { refreshTokenApi } from '#/api/core';
import { useAuthStore } from '#/store';

// 格式化 Token
function formatToken(token: null | string) {
  return token ? `Bearer ${token}` : null;
}

// 请求拦截器
axios.interceptors.request.use(
  async (config) => {
    const accessStore = useAccessStore();
    // 设置 Authorization 头
    config.headers.Authorization = formatToken(accessStore.accessToken);
    // 设置 Accept-Language 头
    config.headers['Accept-Language'] = preferences.app.locale;
    return config;
  },
  (error) => {
    // 请求出错时的处理
    return Promise.reject(error);
  },
);

// 重新认证逻辑
async function doReAuthenticate() {
  console.warn('Access token or refresh token is invalid or expired.');
  const accessStore = useAccessStore();
  const authStore = useAuthStore();
  accessStore.setAccessToken(null);
  if (
    preferences.app.loginExpiredMode === 'modal' &&
    accessStore.isAccessChecked
  ) {
    accessStore.setLoginExpired(true);
  } else {
    await authStore.logout();
  }
}

// 刷新 Token
async function doRefreshToken() {
  const accessStore = useAccessStore();
  const resp = await refreshTokenApi();
  const newToken = resp.data;
  accessStore.setAccessToken(newToken);
  return newToken;
}

// 响应拦截器（成功）
axios.interceptors.response.use(
  (response) => {
    const { data: responseData, status } = response;
    const { code, message } = responseData;
    if (status >= 200 && status < 400 && code === 0) {
      return response;
    }
    if (code === 107 || code === 108) {
      // Token过期或无效时的处理逻辑
      if (preferences.app.enableRefreshToken) {
        return doRefreshToken().then((newToken) => {
          if (response?.config) {
            response.config.headers.Authorization = formatToken(newToken);
            return axios(response.config); // 重试请求
          }
          throw new Error('Unauthorized: Code 108');
        });
      } else {
        doReAuthenticate();
        message2.error(message);
        return Promise.reject(new Error('Unauthorized: Code 108'));
      }
    }
    message2.error(message);
    return Promise.reject(new Error(message || 'Unknown error'));
  },
  (error) => {
    // 其他非 200-400 范围的错误处理
    const errorMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      'Something went wrong';
    message2.error(errorMessage); // 提示错误信息
    return Promise.reject(new Error(errorMessage));
  },
);
