// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 通知详情 GET /user/notice/${param0} */
export async function detail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.detailParams,
  options?: { [key: string]: any },
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysNoticeDetailDTO>(
    `/user/notice/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 标记通知为已读 POST /user/notice/${param0}/read */
export async function read(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.readParams,
  options?: { [key: string]: any },
) {
  const { noticeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/user/notice/${param0}/read`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取通知公告表列表 GET /user/notice/page */
export async function getPagedUserNotice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedUserNoticeParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysUserNoticeListDTO>(
    '/user/notice/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 未读通知数量 GET /user/notice/unread/count */
export async function unreadCount(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOInteger>('/user/notice/unread/count', {
    method: 'GET',
    ...(options || {}),
  });
}
