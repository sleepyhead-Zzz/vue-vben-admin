import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

interface UploadAvatarParams {
  file: Blob;
  filename: string;
  name?: string; // 允许传入字段名，默认是 'avatarfile'
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}

/**
 * 上传头像（使用 multipart/form-data）
 * POST /system/user/profile/avatar
 * 后端字段：avatarfile（文件字段名）
 */
export async function uploadAvatarApi({
  file,
  filename,
  name = 'avatarfile',
}: UploadAvatarParams) {
  const formData = new FormData();
  formData.append(name, file, filename);

  return requestClient.post('/system/user/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
