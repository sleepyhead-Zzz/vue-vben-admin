// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增用户 POST /system/user */
export async function addUser(
  body: SystemAPI.AddUserCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户详情 GET /system/user/ */
export async function getUserDetailInfo1(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOUserDetailDTO>('/system/user/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户详情 GET /system/user/${param0} */
export async function getUserDetailInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getUserDetailInfoParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOUserDetailDTO>(`/system/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改用户 PUT /system/user/${param0} */
export async function editUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editUserParams,
  body: SystemAPI.UpdateUserCommand,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/user/${param0}`, {
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
  params: SystemAPI.removeUserParams,
  options?: { [key: string]: any },
) {
  const { userIds: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 重置用户密码 PUT /system/user/${param0}/password */
export async function resetPassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.resetPasswordParams,
  body: SystemAPI.ResetPasswordCommand,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/user/${param0}/password`, {
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
  params: SystemAPI.changeUserStatusParams,
  body: SystemAPI.ChangeStatusCommand,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/user/${param0}/status`, {
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
  params: SystemAPI.exportUserByExcelParams,
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

/** 用户导入excel下载 GET /system/user/excelTemplate */
export async function downloadExcelTemplate(options?: { [key: string]: any }) {
  return request<any>('/system/user/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户列表导入 POST /system/user/importData */
export async function importUserByExcel(
  body: {
    updateSupport?: boolean;
  },
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(
            ele,
            new Blob([JSON.stringify(item)], { type: 'application/json' }),
          );
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<SystemAPI.ResponseDTOString>('/system/user/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 用户列表 POST /system/user/page */
export async function getPagedUser(
  body: SystemAPI.SearchUserQuerySearchUserDO,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysUserDTO>('/system/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
