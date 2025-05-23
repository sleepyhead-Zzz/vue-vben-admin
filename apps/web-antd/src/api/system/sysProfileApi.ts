// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 获取个人信息 GET /system/user/profile */
export async function userProfile(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOUserProfileDTO>('/system/user/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改个人信息 PUT /system/user/profile */
export async function updateProfile(
  body: SystemAPI.UpdateProfileCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改个人头像 POST /system/user/profile/avatar */
export async function updateAvatar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.updateAvatarParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOSysFileDTO>(
    '/system/user/profile/avatar',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 重置个人密码 PUT /system/user/profile/password */
export async function updatePassword(
  body: SystemAPI.UpdateUserPasswordCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/user/profile/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
