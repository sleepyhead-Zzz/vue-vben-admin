// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 添加角色 POST /system/role */
export async function addRole(
  body: SystemAPI.AddSysRoleCommand,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOVoid>("/system/role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色详情 GET /system/role/${param0} */
export async function getRoleInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getRoleInfoParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysRoleDTO>(`/system/role/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改角色 PUT /system/role/${param0} */
export async function editRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editRoleParams,
  body: SystemAPI.UpdateSysRoleCommand,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/role/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /system/role/${param0} */
export async function removeRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeRoleParams,
  options?: { [key: string]: any }
) {
  const { roleIds: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/role/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 已关联该角色的用户列表 GET /system/role/${param0}/allocated/query */
export async function allocatedUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.allocatedUserListParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOPageDTOSysUserDTO>(
    `/system/role/${param0}/allocated/query`,
    {
      method: "GET",
      params: {
        ...queryParams,
        query: undefined,
        ...queryParams["query"],
      },
      ...(options || {}),
    }
  );
}

/** 修改角色数据权限 PUT /system/role/${param0}/dataScope */
export async function changeRoleDataScope(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.changeRoleDataScopeParams,
  body: SystemAPI.UpdateSysRoleDataScopeCommand,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(
    `/system/role/${param0}/dataScope`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 修改角色状态 PUT /system/role/${param0}/status */
export async function changeRoleStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.changeRoleStatusParams,
  body: SystemAPI.UpdateSysRoleStatusCommand,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/role/${param0}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 未关联该角色的用户列表 GET /system/role/${param0}/unallocated/query */
export async function unallocatedUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.unallocatedUserListParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOPageDTOSysUserDTO>(
    `/system/role/${param0}/unallocated/query`,
    {
      method: "GET",
      params: {
        ...queryParams,
        query: undefined,
        ...queryParams["query"],
      },
      ...(options || {}),
    }
  );
}

/** 批量添加用户和角色关联 POST /system/role/authUser/assign */
export async function assignUsersToRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.assignUsersToRoleParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOInteger>("/system/role/authUser/assign", {
    method: "POST",
    params: {
      ...params,
      command: undefined,
      ...params["command"],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /system/role/authUser/cancel */
export async function cancelAuthUser(
  body: SystemAPI.UpdateUserRoleCommand,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOInteger>("/system/role/authUser/cancel", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量解除角色和用户的关联 PUT /system/role/authUser/revoke */
export async function revokeUsersFromRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.revokeUsersFromRoleParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOInteger>("/system/role/authUser/revoke", {
    method: "PUT",
    params: {
      ...params,
      command: undefined,
      ...params["command"],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/role/dept-tree/${param0} */
export async function roleDeptTreeSelect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.roleDeptTreeSelectParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTODeptTreeSelectDTO>(
    `/system/role/dept-tree/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 角色列表导出 POST /system/role/export */
export async function exportRoleByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.exportRoleByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/system/role/export", {
    method: "POST",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/role/option-select */
export async function optionRoleSelect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.optionRoleSelectParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOListSysRoleDTO>(
    "/system/role/option-select",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 角色列表 POST /system/role/page */
export async function getPagedRole(
  body: SystemAPI.RoleQuery,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOPageDTOSysRoleDTO>("/system/role/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
