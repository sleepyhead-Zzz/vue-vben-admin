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

/** 此处后端没有提供注释 GET /auth/sms/code */
export async function smsCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CommonAPI.smsCodeParams,
  options?: { [key: string]: any }
) {
  return request<CommonAPI.ResponseDTOVoid>("/auth/sms/code", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
