import type {
  HttpResponse,
  RequestClientConfig,
  RequestClientOptions,
  RequestResponse,
} from '@vben/request';

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

const { apiURL, clientId } = useAppConfig(
  import.meta.env,
  import.meta.env.PROD,
);

let isLogoutProcessing = false;

type LooseResponseInterceptor = {
  fulfilled?: (response: RequestResponse<any>) => any | Promise<any>;
  rejected?: (error: any) => any;
};

function addLooseResponseInterceptor(
  client: RequestClient,
  interceptor: LooseResponseInterceptor,
) {
  client.addResponseInterceptor(interceptor as never);
}

function getContentType(response: RequestResponse<any>) {
  const contentType = response.headers?.['content-type'];
  if (Array.isArray(contentType)) {
    return contentType.join(';');
  }
  return contentType ?? '';
}

function isBlobResponse(response: RequestResponse<any>) {
  return response.config.responseType === 'blob';
}

function isBusinessResponse(data: unknown): data is HttpResponse {
  return !!data && typeof data === 'object' && 'code' in data;
}

function isFormDataPayload(data: unknown): data is FormData {
  return typeof FormData !== 'undefined' && data instanceof FormData;
}

function clearContentTypeHeader(headers: Record<string, any>) {
  // AxiosHeaders
  if (typeof headers.delete === 'function') {
    headers.delete('Content-Type');
    headers.delete('content-type');
    return;
  }

  // Plain object headers
  delete headers['Content-Type'];
  delete headers['content-type'];
}

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
      config.headers = (config.headers ?? {}) as any;
      const headers = config.headers as Record<string, any>;

      // 添加token
      headers.Authorization = formatToken(accessStore.accessToken);

      /**
       * locale跟后台不一致 需要转换
       */
      const language = preferences.app.locale.replace('-', '_');
      headers['Accept-Language'] = language;
      headers['Content-Language'] = language;

      /**
       * 添加全局clientId
       * 关于header的clientId被错误绑定到实体类
       * https://gitee.com/dapppp/ruoyi-plus-vben5/issues/IC0BDS
       */
      headers.ClientID = clientId;

      // FormData 请求必须让浏览器自动注入 multipart boundary
      // 否则继承默认 application/json 会导致后端拿不到文件
      if (isFormDataPayload(config.data)) {
        clearContentTypeHeader(headers);
      }

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
  const handleBusinessResponse = async (response: RequestResponse<any>) => {
    /**
     * 需要判断下载二进制的情况 正常是返回二进制 报错会返回json
     * 当type为blob且content-type为application/json时 则判断已经下载出错
     */
    if (isBlobResponse(response)) {
      const contentType = getContentType(response);

      // 如果返回的是 JSON，说明是错误信息
      if (contentType.includes('application/json')) {
        const blob = response.data as Blob;
        const text = await blob.text();
        try {
          response.data = JSON.parse(text);
        } catch (err) {
          notify.error('JSON 解析失败:' + err);
          throw new Error('下载失败，且返回的错误信息格式错误');
        }
      } else {
        return response.data;
      }
    }

    const axiosResponseData = response.data;

    if (!isBusinessResponse(axiosResponseData)) {
      throw new Error($t('http.apiRequestFailed'));
    }

    const { code, message } = axiosResponseData;

    const hasSuccess =
      response.status >= 200 && response.status < 400 && code === 200;

    if (hasSuccess) {
      return axiosResponseData;
    }

    if (code === 107 || code === 108 || code === 106) {
      const timeoutMsg = $t('http.loginTimeout');
      if (isLogoutProcessing) {
        throw new Error(timeoutMsg);
      }

      isLogoutProcessing = true;
      notify.error(timeoutMsg);

      const userStore = useAuthStore();
      // 注销后处理
      userStore.logout().finally(() => {
        isLogoutProcessing = false;
      });

      throw new Error(timeoutMsg);
    }

    const errorMessage = message || $t('http.apiRequestFailed');
    notify.error(errorMessage);
    throw new Error(errorMessage);
  };

  addLooseResponseInterceptor(client, {
    fulfilled: handleBusinessResponse,
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

export const requestClient = createRequestClient(apiURL);

export const baseRequestClient = new RequestClient({ baseURL: apiURL });

export default function request<T = any>(
  url: string,
  config: RequestClientConfig,
): Promise<T> {
  return requestClient.request<T>(url, config);
}
