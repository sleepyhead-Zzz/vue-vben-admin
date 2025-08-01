// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 获取当前登录用户信息 GET /getLoginUserInfo */
export async function getLoginUserInfo(options?: { [key: string]: any }) {
  return request<CommonAPI.ResponseDTOCurrentLoginUserDTO>(
    "/getLoginUserInfo",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 获取用户对应的菜单路由 用于动态生成路由 GET /getRouters */
export async function getRouters(options?: { [key: string]: any }) {
  return request<CommonAPI.ResponseDTOListRouterDTO>("/getRouters", {
    method: "GET",
    ...(options || {}),
  });
}

/** 登录 POST /login */
export async function login(
  body: CommonAPI.LoginCommand,
  options?: { [key: string]: any }
) {
  return request<CommonAPI.ResponseDTOTokenDTO>("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /login/wx/auth */
export async function getAuthorizeUrl(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CommonAPI.getAuthorizeUrlParams,
  options?: { [key: string]: any }
) {
  return request<CommonAPI.ResponseDTOCaptchaDTO>("/login/wx/auth", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /login/wx/callback */
export async function wxLoginCallback(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CommonAPI.wxLoginCallbackParams,
  options?: { [key: string]: any }
) {
  return request<CommonAPI.ResponseDTOString>("/login/wx/callback", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /login/wx/status */
export async function getWxLoginStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CommonAPI.getWxLoginStatusParams,
  options?: { [key: string]: any }
) {
  return request<CommonAPI.ResponseDTOMapStringString>("/login/wx/status", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 注册接口 POST /register */
export async function register(
  body: CommonAPI.AddUserCommand,
  options?: { [key: string]: any }
) {
  return request<CommonAPI.ResponseDTOVoid>("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
