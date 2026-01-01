// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 添加职位 POST /system/post */
export async function addPost(
  body: SystemAPI.AddSysPostCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除职位 DELETE /system/post */
export async function removePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removePostParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/post', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 职位详情 GET /system/post/${param0} */
export async function getPostInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPostInfoParams,
  options?: { [key: string]: any },
) {
  const { postId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysPostDTO>(`/system/post/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改职位 PUT /system/post/${param0} */
export async function editPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editPostParams,
  body: SystemAPI.UpdateSysPostCommand,
  options?: { [key: string]: any },
) {
  const { postId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/post/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 职位列表导出 GET /system/post/excel */
export async function exportPostByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.exportPostByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/system/post/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 职位列表（树级） 职位树级下拉框 GET /system/post/option-select */
export async function optionPostSelect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.optionPostSelectParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOListSysPostDTO>(
    '/system/post/option-select',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 职位列表 POST /system/post/page */
export async function getPagedPost(
  body: SystemAPI.SysPostQuery,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysPostDTO>('/system/post/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
