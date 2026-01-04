// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增通知公告表 POST /notice */
export async function addNotice(
  body: SystemAPI.AddNoticeCommand,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOVoid>("/notice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取通知公告表详情 GET /notice/${param0} */
export async function getNoticeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getNoticeInfoParams,
  options?: { [key: string]: any }
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysNoticeDTO>(`/notice/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改通知公告表 PUT /notice/${param0} */
export async function editNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editNoticeParams,
  body: SystemAPI.UpdateNoticeCommand,
  options?: { [key: string]: any }
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/notice/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除通知公告表 DELETE /notice/batch-delete */
export async function removeNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeNoticeParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOVoid>("/notice/batch-delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取通知公告表列表 GET /notice/list */
export async function getNoticeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getNoticeListParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOListSysNoticeDTO>("/notice/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取通知公告表列表 GET /notice/page */
export async function getPagedNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedNoticeParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOPageDTOSysNoticeDTO>("/notice/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除通知公告表 DELETE /notice/remove/${param0} */
export async function removeNoticeById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeNoticeByIdParams,
  options?: { [key: string]: any }
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/notice/remove/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
