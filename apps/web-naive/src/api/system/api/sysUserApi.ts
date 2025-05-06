// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增用户 POST /system/user */
export async function addUser(
  body: API.AddUserCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/system/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户详情 GET /system/user/${param0} */
export async function getUserDetailInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserDetailInfoParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.ResponseDTOUserDetailDTO>(`/system/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改用户 PUT /system/user/${param0} */
export async function editUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editUserParams,
  body: API.UpdateUserCommand,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/user/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /system/user/${param0} */
export async function removeUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeUserParams,
  options?: { [key: string]: any },
) {
  const { userIds: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 重置用户密码 PUT /system/user/${param0}/password */
export async function resetPassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPasswordParams,
  body: API.ResetPasswordCommand,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/user/${param0}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户状态 PUT /system/user/${param0}/status */
export async function changeUserStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeUserStatusParams,
  body: API.ChangeStatusCommand,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/user/${param0}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 用户列表导出 GET /system/user/excel */
export async function exportUserByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exportUserByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/system/user/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 用户列表导入 POST /system/user/excel */
export async function importUserByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.importUserByExcelParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/system/user/excel', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户导入excel下载 GET /system/user/excelTemplate */
export async function downloadExcelTemplate(options?: { [key: string]: any }) {
  return request<any>('/system/user/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户列表 POST /system/user/page */
export async function getPagedUser(
  body: API.SearchUserQuerySearchUserDO,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTOUserDTO>('/system/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
