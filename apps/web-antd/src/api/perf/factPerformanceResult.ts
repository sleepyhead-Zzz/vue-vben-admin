// @ts-ignore
/* eslint-disable */
import request, { rawBusinessRequest } from '#/api/request';

/** 新增最终绩效结果锁定：避免历史规则变动导致分数变化 POST /perf/FactPerformanceResult */
export async function addFactPerformanceResult(
  body: PerfAPI.AddPerfFactPerformanceResultCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactPerformanceResult', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除最终绩效结果锁定：避免历史规则变动导致分数变化 DELETE /perf/FactPerformanceResult */
export async function removeFactPerformanceResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactPerformanceResultParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactPerformanceResult', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取最终绩效结果锁定：避免历史规则变动导致分数变化详情 GET /perf/FactPerformanceResult/${param0} */
export async function getFactPerformanceResultInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactPerformanceResultInfoParams,
  options?: { [key: string]: any },
) {
  const { performanceId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactPerformanceResultDTO>(
    `/perf/FactPerformanceResult/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改最终绩效结果锁定：避免历史规则变动导致分数变化 PUT /perf/FactPerformanceResult/${param0} */
export async function editFactPerformanceResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editFactPerformanceResultParams,
  body: PerfAPI.UpdatePerfFactPerformanceResultCommand,
  options?: { [key: string]: any },
) {
  const { performanceId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactPerformanceResult/${param0}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取绩效计算任务状态 GET /perf/FactPerformanceResult/calc/jobs/${param0} */
export async function getCalcJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getCalcJobParams,
  options?: { [key: string]: any },
) {
  const { jobId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerformanceCalcJobDTO>(
    `/perf/FactPerformanceResult/calc/jobs/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 手动导出绩效计算结果并上传OSS POST /perf/FactPerformanceResult/calc/jobs/${param0}/export */
export async function exportCalcJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportCalcJobParams,
  options?: { [key: string]: any },
) {
  const { jobId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerformanceCalcJobDTO>(
    `/perf/FactPerformanceResult/calc/jobs/${param0}/export`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 分页获取绩效计算任务日志 GET /perf/FactPerformanceResult/calc/jobs/${param0}/logs */
export async function getCalcJobLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getCalcJobLogsParams,
  options?: { [key: string]: any },
) {
  const { jobId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPageDTOPerformanceCalcJobLogDTO>(
    `/perf/FactPerformanceResult/calc/jobs/${param0}/logs`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 触发月度绩效计算（销量/利润按当年1月1日至目标月末累计） POST /perf/FactPerformanceResult/calc/monthly/trigger */
export async function triggerMonthlyCalculation(
  body: PerfAPI.TriggerMonthlyCalculationCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPerformanceCalcTriggerResponseDTO>(
    '/perf/FactPerformanceResult/calc/monthly/trigger',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 触发月度绩效计算，保留完整业务响应 POST /perf/FactPerformanceResult/calc/monthly/trigger */
export async function triggerMonthlyCalculationWithResponse(
  body: PerfAPI.TriggerMonthlyCalculationCommand,
  options?: { [key: string]: any },
) {
  return rawBusinessRequest<PerfAPI.PerformanceCalcTriggerResponseDTO>(
    '/perf/FactPerformanceResult/calc/monthly/trigger',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 触发区间绩效计算（每月按当年1月1日至当月月末累计） POST /perf/FactPerformanceResult/calc/range/trigger */
export async function triggerRangeCalculation(
  body: PerfAPI.TriggerRangeCalculationCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPerformanceCalcTriggerResponseDTO>(
    '/perf/FactPerformanceResult/calc/range/trigger',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 触发区间绩效计算，保留完整业务响应 POST /perf/FactPerformanceResult/calc/range/trigger */
export async function triggerRangeCalculationWithResponse(
  body: PerfAPI.TriggerRangeCalculationCommand,
  options?: { [key: string]: any },
) {
  return rawBusinessRequest<PerfAPI.PerformanceCalcTriggerResponseDTO>(
    '/perf/FactPerformanceResult/calc/range/trigger',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 最终绩效结果锁定：避免历史规则变动导致分数变化列表导出 GET /perf/FactPerformanceResult/excel */
export async function exportFactPerformanceResultByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactPerformanceResultByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/perf/FactPerformanceResult/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 获取最终绩效结果锁定：避免历史规则变动导致分数变化列表 GET /perf/FactPerformanceResult/list */
export async function getFactPerformanceResultList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactPerformanceResultListParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOListPerfFactPerformanceResultDTO>(
    '/perf/FactPerformanceResult/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 最终绩效结果锁定：避免历史规则变动导致分数变化下拉列表 GET /perf/FactPerformanceResult/option-select */
export async function optionFactPerformanceResultSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactPerformanceResultVO>(
    '/perf/FactPerformanceResult/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取最终绩效结果锁定：避免历史规则变动导致分数变化列表 GET /perf/FactPerformanceResult/page */
export async function getPagedFactPerformanceResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactPerformanceResultParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactPerformanceResultDTO>(
    '/perf/FactPerformanceResult/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除最终绩效结果锁定：避免历史规则变动导致分数变化 DELETE /perf/FactPerformanceResult/remove/${param0} */
export async function removeFactPerformanceResultById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactPerformanceResultByIdParams,
  options?: { [key: string]: any },
) {
  const { performanceId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactPerformanceResult/remove/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
