// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 获取个人信息 GET /system/user/profile */
export async function profile(options?: { [key: string]: any }) {
  return request<API.ResponseDTOUserProfileDTO>('/system/user/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改个人信息 PUT /system/user/profile */
export async function updateProfile(
  body: API.UpdateProfileCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/system/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置个人密码 PUT /system/user/profile/password */
export async function updatePassword(
  body: API.UpdateUserPasswordCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/system/user/profile/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
