// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增利润计划 POST /perf/FactProfitPlan */
export async function addFactProfitPlan(
  body: PerfAPI.AddPerfFactProfitPlanCommand,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/FactProfitPlan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除利润计划 DELETE /perf/FactProfitPlan */
export async function removeFactProfitPlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactProfitPlanParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/FactProfitPlan", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取利润计划详情 GET /perf/FactProfitPlan/${param0} */
export async function getFactProfitPlanInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactProfitPlanInfoParams,
  options?: { [key: string]: any }
) {
  const { planId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactProfitPlanDTO>(
    `/perf/FactProfitPlan/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改利润计划 PUT /perf/FactProfitPlan/${param0} */
export async function editFactProfitPlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editFactProfitPlanParams,
  body: PerfAPI.UpdatePerfFactProfitPlanCommand,
  options?: { [key: string]: any }
) {
  const { planId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/FactProfitPlan/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 利润计划列表导出 GET /perf/FactProfitPlan/excel */
export async function exportFactProfitPlanByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactProfitPlanByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/FactProfitPlan/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 利润计划导入Excel模板下载 GET /perf/FactProfitPlan/excelTemplate */
export async function downloadFactProfitPlanExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/perf/FactProfitPlan/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 利润计划列表导入 POST /perf/FactProfitPlan/importData */
export async function importFactProfitPlanByExcel(
  body: {
    request?: PerfAPI.ProfitPlanImportRequest;
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
    "/perf/FactProfitPlan/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取利润计划列表 GET /perf/FactProfitPlan/list */
export async function getFactProfitPlanList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactProfitPlanListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfFactProfitPlanDTO>(
    "/perf/FactProfitPlan/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 利润计划下拉列表 GET /perf/FactProfitPlan/option-select */
export async function optionFactProfitPlanSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactProfitPlanVO>(
    "/perf/FactProfitPlan/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取利润计划列表 GET /perf/FactProfitPlan/page */
export async function getPagedFactProfitPlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactProfitPlanParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactProfitPlanDTO>(
    "/perf/FactProfitPlan/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除利润计划 DELETE /perf/FactProfitPlan/remove/${param0} */
export async function removeFactProfitPlanById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactProfitPlanByIdParams,
  options?: { [key: string]: any }
) {
  const { planId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactProfitPlan/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
