// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 获取当前登录用户信息 GET /getLoginUserInfo */
export async function getLoginUserInfo(options?: { [key: string]: any }) {
  return request<API.ResponseDTOCurrentLoginUserDTO>('/getLoginUserInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户对应的菜单路由 用于动态生成路由 GET /getRouters */
export async function getRouters(options?: { [key: string]: any }) {
  return request<API.ResponseDTOListRouterDTO>('/getRouters', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 POST /login */
export async function login(
  body: API.LoginCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOTokenDTO>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /register */
export async function register(
  body: API.AddUserCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
