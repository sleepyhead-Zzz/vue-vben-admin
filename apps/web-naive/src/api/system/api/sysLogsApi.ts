// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 删除登录日志 DELETE /logs/loginLogs */
export async function removeLoginInfos(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeLoginInfosParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/logs/loginLogs', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 操作日志列表 GET /logs/operationLogs */
export async function operationLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.operationLogsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTOOperationLogDTO>('/logs/operationLogs', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 删除操作日志 DELETE /logs/operationLogs */
export async function removeOperationLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeOperationLogsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/logs/operationLogs', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录日志列表 GET /logs/page */
export async function getPagedLoginInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPagedLoginInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTOLoginLogDTO>('/logs/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
