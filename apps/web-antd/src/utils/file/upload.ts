import { message } from 'ant-design-vue';

export async function commonUploadFile(
  api: Function,
  file: File,
  extraData: Record<string, any> = {},
  options: {
    headers?: Record<string, string>;
    onProgress?: (percent: number) => void;
  } = {},
) {
  const hideLoading = message.loading('上传中...', 0);

  try {
    // 直接调用接口，传 extraData 和 file
    const response = await api(extraData, file, {
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        ...options.headers,
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        options.onProgress?.(percent);
      },
    });

    message.success('上传成功');
    return response;
  } catch (error) {
    console.error('上传失败:', error);
    message.error('上传失败');
    throw error;
  } finally {
    hideLoading();
  }
}
