// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 添加角色 POST /system/role */
export async function addRole(
  body: API.AddRoleCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/system/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色详情 GET /system/role/${param0} */
export async function getRoleInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleInfoParams,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResponseDTORoleDTO>(`/system/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改角色 PUT /system/role/${param0} */
export async function editRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editRoleParams,
  body: API.UpdateRoleCommand,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/role/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /system/role/${param0} */
export async function removeRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeRoleParams,
  options?: { [key: string]: any },
) {
  const { roleIds: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/role/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 已关联该角色的用户列表 GET /system/role/${param0}/allocated/list */
export async function allocatedUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.allocatedUserListParams,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResponseDTOPageDTOUserDTO>(
    `/system/role/${param0}/allocated/list`,
    {
      method: 'GET',
      params: {
        ...queryParams,
        query: undefined,
        ...queryParams['query'],
      },
      ...(options || {}),
    },
  );
}

/** 修改角色数据权限 PUT /system/role/${param0}/dataScope */
export async function dataScope(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dataScopeParams,
  body: API.UpdateDataScopeCommand,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/role/${param0}/dataScope`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 修改角色状态 PUT /system/role/${param0}/status */
export async function changeRoleStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeRoleStatusParams,
  body: API.UpdateStatusCommand,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/role/${param0}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 未关联该角色的用户列表 GET /system/role/${param0}/unallocated/list */
export async function unallocatedUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unallocatedUserListParams,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResponseDTOPageDTOUserDTO>(
    `/system/role/${param0}/unallocated/list`,
    {
      method: 'GET',
      params: {
        ...queryParams,
        query: undefined,
        ...queryParams['query'],
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /system/role/authUser/cancel */
export async function cancelAuthUser(
  body: API.UpdateUserRoleCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOInteger>('/system/role/authUser/cancel', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量解除角色和用户的关联 PUT /system/role/authUser/cancelAll */
export async function cancelAuthUserAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelAuthUserAllParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOInteger>('/system/role/authUser/cancelAll', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 批量添加用户和角色关联 POST /system/role/authUser/selectAll */
export async function selectAuthUserAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.selectAuthUserAllParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOInteger>('/system/role/authUser/selectAll', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/role/dept-tree/${param0} */
export async function roleDeptTreeSelect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleDeptTreeSelectParams,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResponseDTODeptTreeSelectDTO>(
    `/system/role/dept-tree/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 角色列表 POST /system/role/list */
export async function getPagedRole(
  body: API.RoleQuery,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTORoleDTO>('/system/role/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/role/option-select */
export async function optionSelect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.optionSelectParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOListRoleDTO>('/system/role/option-select', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
