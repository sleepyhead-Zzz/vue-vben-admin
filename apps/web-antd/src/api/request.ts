import type {
  AxiosRequestConfig,
  HttpResponse,
  RequestClientOptions,
} from '@vben/request';

import { ref } from 'vue';

import { useAppConfig } from '@vben/hooks';
import { $t } from '@vben/locales';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  RequestClient,
} from '@vben/request';
import { useAccessStore } from '@vben/stores';

import { message as notify } from 'ant-design-vue';
import { useAuthStore } from '#/store';

import { refreshTokenApi } from './core';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

// 使用 useRef 等管理状态
const isLogoutProcessing = ref(false);

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({ ...options, baseURL });

  /**
   * 重新认证逻辑
   */
  const doReAuthenticate = async () => {
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
  };

  /**
   * 刷新token逻辑
   */
  const doRefreshToken = async () => {
    const accessStore = useAccessStore();
    const resp = await refreshTokenApi();
    const newToken = resp.data;
    accessStore.setAccessToken(newToken);
    return newToken;
  };

  const formatToken = (token: null | string) =>
    token ? `Bearer ${token}` : null;

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();

      // 添加token
      config.headers.Authorization = formatToken(accessStore.accessToken);

      /**
       * locale跟后台不一致 需要转换
       */
      const language = preferences.app.locale.replace('-', '_');
      config.headers['Accept-Language'] = language;
      config.headers['Content-Language'] = language;
      return config;
    },
  });

  // 通用的错误处理
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((message: string) => {
      notify.error(message);
    }),
  );

  // 响应拦截器
  client.addResponseInterceptor<HttpResponse>({
    fulfilled: async (response) => {
      /**
       * 需要判断下载二进制的情况 正常是返回二进制 报错会返回json
       * 当type为blob且content-type为application/json时 则判断已经下载出错
       */

      // ✅ 检测是否是错误 JSON 而不是实际文件
      if (response.config.responseType === 'blob') {
        const contentType = response.headers['content-type'];

        // ✅ 如果返回的是 JSON，说明是错误信息
        if (contentType && contentType.includes('application/json')) {
          const blob = response.data as unknown as Blob;
          const text = await blob.text();
          try {
            response.data = JSON.parse(text); // 只在确定是 JSON 时解析
          } catch (err) {
            notify.error('JSON 解析失败:' + err);
            throw new Error('下载失败，且返回的错误信息格式错误');
          }
        } else {
          // ✅ 返回的是正常 blob，直接返回，不再解析为 JSON
          return response;
        }
      }

      const axiosResponseData = response.data;

      if (!axiosResponseData) throw new Error($t('http.apiRequestFailed'));

      const { code, message } = axiosResponseData;

      const hasSuccess =
        response.status >= 200 && response.status < 400 && code === 200;

      if (hasSuccess) {
        const successMsg = message;
        notify.success(successMsg);

        return axiosResponseData;
      }

      let timeoutMsg = '';

      if (code === 107 || code === 108 || code === 106) {
        if (isLogoutProcessing.value) {
          timeoutMsg = $t('http.loginTimeout'); // 这里给timeoutMsg赋值
          notify.error(timeoutMsg);
          throw new Error(timeoutMsg);
        }
        isLogoutProcessing.value = true;

        const _msg = $t('http.loginTimeout');
        const userStore = useAuthStore();

        // 注销后处理
        userStore.logout().finally(() => {
          isLogoutProcessing.value = false; // 正确地设置为false
        });

        throw new Error(_msg);
      } else {
        notify.error(message);
        throw new Error(message);
      }
    },
  });

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  return client;
}

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
});

const request = async <T = any>(
  url: string,
  options: AxiosRequestConfig & { requestType?: 'form' | 'json' } = {},
) => {
  return await requestClient.request<T>(url, options);
};
export const baseRequestClient = new RequestClient({ baseURL: apiURL });

export default request;
