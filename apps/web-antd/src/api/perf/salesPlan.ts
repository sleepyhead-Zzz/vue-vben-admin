// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增销量计划 POST /perf/salesPlan */
export async function addSalesPlan(
  body: PerfAPI.AddPerfFactSalesPlanCommand,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/salesPlan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除销量计划 DELETE /perf/salesPlan */
export async function removeSalesPlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeSalesPlanParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/salesPlan", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改销量计划 PUT /perf/salesPlan/${param0} */
export async function editSalesPlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editSalesPlanParams,
  body: PerfAPI.UpdatePerfFactSalesPlanCommand,
  options?: { [key: string]: any }
) {
  const { planId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/salesPlan/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取销量计划详情 GET /perf/salesPlan/${param0} */
export async function getSalesPlanInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getSalesPlanInfoParams,
  options?: { [key: string]: any }
) {
  const { salesPlanId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactSalesPlanDTO>(
    `/perf/salesPlan/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 销量计划列表导出 GET /perf/salesPlan/excel */
export async function exportSalesPlanByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportSalesPlanByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/salesPlan/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 销量计划导入Excel模板下载 GET /perf/salesPlan/excelTemplate */
export async function downloadSalesPlanExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/perf/salesPlan/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 销量计划列表导入 POST /perf/salesPlan/importData */
export async function importSalesPlanByExcel(
  body: {
    request?: PerfAPI.SalesPlanImportRequest;
  },
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(
            ele,
            new Blob([JSON.stringify(item)], { type: "application/json" })
          );
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<PerfAPI.ResponseDTOImportResponseDTO>(
    "/perf/salesPlan/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取销量计划列表 GET /perf/salesPlan/list */
export async function getSalesPlanList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getSalesPlanListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfFactSalesPlanDTO>(
    "/perf/salesPlan/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 销量计划下拉列表 GET /perf/salesPlan/option-select */
export async function optionSalesPlanSelect(options?: { [key: string]: any }) {
  return request<PerfAPI.ResponseDTOListPerfFactSalesPlanVO>(
    "/perf/salesPlan/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取销量计划列表 GET /perf/salesPlan/page */
export async function getPagedSalesPlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedSalesPlanParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactSalesPlanDTO>(
    "/perf/salesPlan/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除销量计划 DELETE /perf/salesPlan/remove/${param0} */
export async function removeSalesPlanById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeSalesPlanByIdParams,
  options?: { [key: string]: any }
) {
  const { salesPlanId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/salesPlan/remove/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
