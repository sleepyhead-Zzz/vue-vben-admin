// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 此处后端没有提供注释 GET /auth/code */
export async function getCaptchaCode(options?: { [key: string]: any }) {
  return request<CommonAPI.ResponseDTOCaptchaDTO>("/auth/code", {
    method: "GET",
    ...(options || {}),
  });
}
