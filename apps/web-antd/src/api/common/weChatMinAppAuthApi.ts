// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 此处后端没有提供注释 POST /login/wx/miniApp/login */
export async function miniAppLogin(
  body: CommonAPI.WxUserProfileCommand,
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/login/wx/miniApp/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
