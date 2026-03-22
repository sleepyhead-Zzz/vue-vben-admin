// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 获取新客户得分记录详情 GET /perf/FactNewCustomerScore/${param0} */
export async function getFactNewCustomerScoreInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactNewCustomerScoreInfoParams,
  options?: { [key: string]: any }
) {
  const { newCustomerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactNewCustomerScoreDTO>(
    `/perf/FactNewCustomerScore/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 新客户得分记录列表导出 GET /perf/FactNewCustomerScore/excel */
export async function exportFactNewCustomerScoreByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactNewCustomerScoreByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/FactNewCustomerScore/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 获取新客户得分记录列表 GET /perf/FactNewCustomerScore/list */
export async function getFactNewCustomerScoreList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactNewCustomerScoreListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfFactNewCustomerScoreDTO>(
    "/perf/FactNewCustomerScore/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 新客户得分记录下拉列表 GET /perf/FactNewCustomerScore/option-select */
export async function optionFactNewCustomerScoreSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactNewCustomerScoreVO>(
    "/perf/FactNewCustomerScore/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取新客户得分记录列表 GET /perf/FactNewCustomerScore/page */
export async function getPagedFactNewCustomerScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactNewCustomerScoreParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactNewCustomerScoreDTO>(
    "/perf/FactNewCustomerScore/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
