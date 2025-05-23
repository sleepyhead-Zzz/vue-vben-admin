// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 强退用户 DELETE /monitor/online/onlineUser/${param0} */
export async function logoutOnlineUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MonitorAPI.logoutOnlineUserParams,
  options?: { [key: string]: any },
) {
  const { tokenId: param0, ...queryParams } = params;
  return request<MonitorAPI.ResponseDTOVoid>(
    `/monitor/online/onlineUser/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 在线用户列表 GET /monitor/online/onlineUsers */
export async function onlineUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MonitorAPI.onlineUsersParams,
  options?: { [key: string]: any },
) {
  return request<MonitorAPI.ResponseDTOPageDTOOnlineUserDTO>(
    '/monitor/online/onlineUsers',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
