// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增通知公告表 POST /sysNotice */
export async function addNotice(
  body: SystemAPI.AddNoticeCommand,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOVoid>("/sysNotice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取通知公告表详情 GET /sysNotice/${param0} */
export async function getNoticeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getNoticeInfoParams,
  options?: { [key: string]: any }
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysNoticeDTO>(`/sysNotice/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改通知公告表 PUT /sysNotice/${param0} */
export async function editNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editNoticeParams,
  body: SystemAPI.UpdateNoticeCommand,
  options?: { [key: string]: any }
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/sysNotice/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除通知公告表 DELETE /sysNotice/batch-delete */
export async function batchRemoveNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.batchRemoveNoticeParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOVoid>("/sysNotice/batch-delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取通知公告表列表 GET /sysNotice/list */
export async function listNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.listNoticeParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOListSysNoticeDTO>("/sysNotice/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取通知公告表列表 GET /sysNotice/page */
export async function getPagedNotices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedNoticesParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOPageDTOSysNoticeDTO>("/sysNotice/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除通知公告表 DELETE /sysNotice/remove/${param0} */
export async function removeNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeNoticeParams,
  options?: { [key: string]: any }
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/sysNotice/remove/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
