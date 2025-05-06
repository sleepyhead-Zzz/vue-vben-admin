// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 此处后端没有提供注释 POST /wx/miniApp/login */
export async function miniAppLogin(
  body: API.WxUserProfileCommand,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/wx/miniApp/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
