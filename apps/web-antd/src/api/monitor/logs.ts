// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 此处后端没有提供注释 DELETE /monitor/logs/clean-login-info */
export async function cleanLoginInfo(options?: { [key: string]: any }) {
  return request<MonitorAPI.ResponseDTOVoid>("/monitor/logs/clean-login-info", {
    method: "DELETE",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /monitor/logs/cleanOperationLog */
export async function cleanOperationLog(options?: { [key: string]: any }) {
  return request<MonitorAPI.ResponseDTOVoid>(
    "/monitor/logs/cleanOperationLog",
    {
      method: "DELETE",
      ...(options || {}),
    }
  );
}

/** 删除登录日志 DELETE /monitor/logs/loginLogs */
export async function removeLoginInfos(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MonitorAPI.removeLoginInfosParams,
  options?: { [key: string]: any }
) {
  return request<MonitorAPI.ResponseDTOVoid>("/monitor/logs/loginLogs", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录日志导出 将登录日志导出到excel GET /monitor/logs/loginLogs/excel */
export async function loginInfosExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MonitorAPI.loginInfosExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/monitor/logs/loginLogs/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 操作日志列表 GET /monitor/logs/operationLogs */
export async function operationLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MonitorAPI.operationLogsParams,
  options?: { [key: string]: any }
) {
  return request<MonitorAPI.ResponseDTOPageDTOOperationLogDTO>(
    "/monitor/logs/operationLogs",
    {
      method: "GET",
      params: {
        ...params,
        query: undefined,
        ...params["query"],
      },
      ...(options || {}),
    }
  );
}

/** 删除操作日志 DELETE /monitor/logs/operationLogs */
export async function removeOperationLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MonitorAPI.removeOperationLogsParams,
  options?: { [key: string]: any }
) {
  return request<MonitorAPI.ResponseDTOVoid>("/monitor/logs/operationLogs", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 操作日志导出 GET /monitor/logs/operationLogs/excel */
export async function operationLogsExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MonitorAPI.operationLogsExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/monitor/logs/operationLogs/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 登录日志列表 GET /monitor/logs/page */
export async function getPagedLoginInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: MonitorAPI.getPagedLoginInfoParams,
  options?: { [key: string]: any }
) {
  return request<MonitorAPI.ResponseDTOPageDTOLoginLogDTO>(
    "/monitor/logs/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
