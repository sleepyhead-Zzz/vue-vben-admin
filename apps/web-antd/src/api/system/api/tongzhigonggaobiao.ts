// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增通知公告表 POST /sysNotice */
export async function addNotice(
  body: API.AddNoticeCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/sysNotice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取通知公告表详情 GET /sysNotice/${param0} */
export async function getNoticeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNoticeInfoParams,
  options?: { [key: string]: any },
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<API.ResponseDTOSysNoticeDTO>(`/sysNotice/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改通知公告表 PUT /sysNotice/${param0} */
export async function editNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editNoticeParams,
  body: API.UpdateNoticeCommand,
  options?: { [key: string]: any },
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/sysNotice/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除通知公告表 DELETE /sysNotice/batch-delete */
export async function batchRemoveNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchRemoveNoticeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/sysNotice/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取通知公告表列表 GET /sysNotice/list */
export async function listNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listNoticeParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOListSysNoticeDTO>('/sysNotice/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取通知公告表列表 GET /sysNotice/page */
export async function getPagedNotices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPagedNoticesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTOSysNoticeDTO>('/sysNotice/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除通知公告表 DELETE /sysNotice/remove/${param0} */
export async function removeNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeNoticeParams,
  options?: { [key: string]: any },
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/sysNotice/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
