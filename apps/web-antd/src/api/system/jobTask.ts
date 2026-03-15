// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 任务详情 GET /system/job-task/${param0} */
export async function getJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getJobParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysJobTaskDTO>(
    `/system/job-task/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 导入明细 GET /system/job-task/${param0}/import-details */
export async function pageImportDetails(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.pageImportDetailsParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOPageDTOJobImportDetailDTO>(
    `/system/job-task/${param0}/import-details`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 任务日志 GET /system/job-task/${param0}/logs */
export async function pageJobLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.pageJobLogsParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOPageDTOSysJobLogDTO>(
    `/system/job-task/${param0}/logs`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 手动导出绩效计算结果并上传OSS POST /system/job-task/${param0}/perf-calc/export */
export async function exportPerfCalc(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.exportPerfCalcParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysJobTaskDTO>(
    `/system/job-task/${param0}/perf-calc/export`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 任务进度 GET /system/job-task/${param0}/progress */
export async function getJobProgress(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getJobProgressParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysJobTaskProgressDTO>(
    `/system/job-task/${param0}/progress`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 撤销导入 POST /system/job-task/${param0}/undo-import */
export async function undoImport(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.undoImportParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(
    `/system/job-task/${param0}/undo-import`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 任务列表 GET /system/job-task/page */
export async function pageJobs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.pageJobsParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysJobTaskDTO>(
    '/system/job-task/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
