// download.ts
import { requestClient } from '#/api/request';
import type { AxiosRequestConfig, AxiosResponse } from '@vben/request';

/**
 * 下载文件
 * @param params 包含 ossId 和可选的 query 参数
 * @param onProgress 可选的下载进度回调
 * @returns Blob 数据
 */
export async function downloadFile(
  params: { ossId: string; [key: string]: any },
  onDownloadProgress?: AxiosRequestConfig['onDownloadProgress'],
) {
  return requestClient.get<AxiosResponse<Blob>>(
    `/system/file/download/${params.ossId}`,
    {
      responseType: 'blob',
      timeout: 30 * 1000,
      onDownloadProgress,
    },
  );
}
