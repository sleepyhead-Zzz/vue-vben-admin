// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增最终绩效结果锁定：避免历史规则变动导致分数变化 POST /perf/FactPerformanceResult */
export async function addFactPerformanceResult(
  body: PerfAPI.AddPerfFactPerformanceResultCommand,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/FactPerformanceResult", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除最终绩效结果锁定：避免历史规则变动导致分数变化 DELETE /perf/FactPerformanceResult */
export async function removeFactPerformanceResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactPerformanceResultParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/FactPerformanceResult", {
    method: "DELETE",
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
  options?: { [key: string]: any }
) {
  const { performanceId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactPerformanceResultDTO>(
    `/perf/FactPerformanceResult/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改最终绩效结果锁定：避免历史规则变动导致分数变化 PUT /perf/FactPerformanceResult/${param0} */
export async function editFactPerformanceResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editFactPerformanceResultParams,
  body: PerfAPI.UpdatePerfFactPerformanceResultCommand,
  options?: { [key: string]: any }
) {
  const { performanceId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactPerformanceResult/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 最终绩效结果锁定：避免历史规则变动导致分数变化列表导出 GET /perf/FactPerformanceResult/excel */
export async function exportFactPerformanceResultByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactPerformanceResultByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/FactPerformanceResult/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 最终绩效结果锁定：避免历史规则变动导致分数变化导入Excel模板下载 GET /perf/FactPerformanceResult/excelTemplate */
export async function downloadFactPerformanceResultExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/perf/FactPerformanceResult/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 最终绩效结果锁定：避免历史规则变动导致分数变化列表导入 POST /perf/FactPerformanceResult/importData */
export async function importFactPerformanceResultByExcel(
  body: {
    updateSupport?: boolean;
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

  return request<PerfAPI.ResponseDTOString>(
    "/perf/FactPerformanceResult/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取最终绩效结果锁定：避免历史规则变动导致分数变化列表 GET /perf/FactPerformanceResult/list */
export async function getFactPerformanceResultList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactPerformanceResultListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfFactPerformanceResultDTO>(
    "/perf/FactPerformanceResult/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 最终绩效结果锁定：避免历史规则变动导致分数变化下拉列表 GET /perf/FactPerformanceResult/option-select */
export async function optionFactPerformanceResultSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactPerformanceResultVO>(
    "/perf/FactPerformanceResult/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取最终绩效结果锁定：避免历史规则变动导致分数变化列表 GET /perf/FactPerformanceResult/page */
export async function getPagedFactPerformanceResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactPerformanceResultParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactPerformanceResultDTO>(
    "/perf/FactPerformanceResult/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除最终绩效结果锁定：避免历史规则变动导致分数变化 DELETE /perf/FactPerformanceResult/remove/${param0} */
export async function removeFactPerformanceResultById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactPerformanceResultByIdParams,
  options?: { [key: string]: any }
) {
  const { performanceId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactPerformanceResult/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
