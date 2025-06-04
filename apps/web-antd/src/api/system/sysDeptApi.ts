// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增部门 POST /system/dept/ */
export async function addDept(
  body: SystemAPI.AddDeptCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/dept/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 部门详情 GET /system/dept/${param0} */
export async function getDeptInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getDeptInfoParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTODeptDTO>(`/system/dept/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改部门 PUT /system/dept/${param0} */
export async function editDept(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editDeptParams,
  body: SystemAPI.UpdateDeptCommand,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/dept/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除部门 DELETE /system/dept/${param0} */
export async function removeDept(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeDeptParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/dept/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取部门树级结构 GET /system/dept/dept-tree */
export async function dropdownDeptList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.dropdownDeptListParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOListTreeLong>('/system/dept/dept-tree', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 部门列表 GET /system/dept/list */
export async function listDept(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.listDeptParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOListDeptDTO>('/system/dept/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询部门列表（排除节点） GET /system/dept/list/exclude/${param0} */
export async function deptNodeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.deptNodeListParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOListDeptDTO>(
    `/system/dept/list/exclude/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 获取部门下的所有用户信息 GET /system/dept/list/user/${param0} */
export async function listUserByDept(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.listUserByDeptParams,
  options?: { [key: string]: any },
) {
  const { deptId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOListUserDTO>(
    `/system/dept/list/user/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
