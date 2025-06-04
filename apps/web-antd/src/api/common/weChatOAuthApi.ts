// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 此处后端没有提供注释 GET /login/wx/callback */
export async function callback(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CommonAPI.callbackParams,
  options?: { [key: string]: any }
) {
  return request<any>("/login/wx/callback", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
