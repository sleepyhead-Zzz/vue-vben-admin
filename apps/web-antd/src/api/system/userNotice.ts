// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 通知详情 GET /user/notice/${param0} */
export async function getUserNoticeDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getUserNoticeDetailParams,
  options?: { [key: string]: any }
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysUserNotificationDetailDTO>(
    `/user/notice/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 标记通知为已读 POST /user/notice/${param0}/read */
export async function markNoticeAsRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.markNoticeAsReadParams,
  options?: { [key: string]: any }
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/user/notice/${param0}/read`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取通知公告表列表 GET /user/notice/page */
export async function getPagedUserNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedUserNoticeParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOPageDTOSysUserNotificationListDTO>(
    "/user/notice/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /user/notice/read/all */
export async function readAllNotice(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOVoid>("/user/notice/read/all", {
    method: "POST",
    ...(options || {}),
  });
}

/** 未读通知数量 GET /user/notice/unread/count */
export async function getUnreadNoticeCount(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOInteger>("/user/notice/unread/count", {
    method: "GET",
    ...(options || {}),
  });
}
