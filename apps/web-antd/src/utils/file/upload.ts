import { message } from 'ant-design-vue';

type UploadApi<TResp = any> = (
  body: any,
  file?: File,
  options?: {
    [key: string]: any;
    headers?: Record<string, string>;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
  },
) => Promise<TResp>;

export async function commonUploadFile<TResp = any>(
  api: UploadApi<TResp>,
  file: File,
  extraData: Record<string, any> = {},
  options: {
    errorText?: string;
    headers?: Record<string, string>;
    loadingText?: string;
    onProgress?: (percent: number) => void;
    successText?: string;
  } = {},
) {
  const hideLoading = message.loading(options.loadingText ?? '上传中...', 0);

  try {
    const response = await api(extraData, file, {
      // ✅ 不要手动写 multipart/form-data，让 axios 自动加 boundary
      headers: {
        ...options.headers,
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        // ✅ total 可能为 0/undefined，必须兜底
        if (!progressEvent.total) return;

        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );

        // 避免异常值
        const safePercent = Number.isFinite(percent)
          ? Math.min(100, Math.max(0, percent))
          : 0;

        options.onProgress?.(safePercent);
      },
    });

    message.success(options.successText ?? '上传成功');
    return response;
  } catch (error) {
    console.error('上传失败:', error);
    message.error(options.errorText ?? '上传失败');
    throw error;
  } finally {
    hideLoading();
  }
}
