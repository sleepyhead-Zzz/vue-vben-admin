// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 添加菜单 POST /system/menu */
export async function addMenu(
  body: SystemAPI.AddMenuCommand,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOVoid>("/system/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 菜单详情 GET /system/menu/${param0} */
export async function getMenuInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getMenuInfoParams,
  options?: { [key: string]: any }
) {
  const { menuId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysMenuDTO>(`/system/menu/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 编辑菜单 PUT /system/menu/${param0} */
export async function editMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editMenuParams,
  body: SystemAPI.UpdateMenuCommand,
  options?: { [key: string]: any }
) {
  const { menuId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/menu/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /system/menu/${param0} */
export async function removeMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeMenuParams,
  options?: { [key: string]: any }
) {
  const { menuId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/menu/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 菜单列表（树级） 菜单树级下拉框 GET /system/menu/dropdown */
export async function dropdownMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.dropdownMenuParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOListTreeLong>("/system/menu/dropdown", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 菜单列表 POST /system/menu/list */
export async function listMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.listMenuParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOListSysMenuDTO>("/system/menu/list", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/menu/role/menu/tree-select/${param0} */
export async function getRoleMenuTreeSelect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getRoleMenuTreeSelectParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOMenuTreeSelectDTO>(
    `/system/menu/role/menu/tree-select/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
