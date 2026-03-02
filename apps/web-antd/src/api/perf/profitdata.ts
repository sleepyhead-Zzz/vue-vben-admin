// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增利润明细事实 POST /perf/profitdata */
export async function addProfitData(
  body: PerfAPI.AddPerfFactProfitDataCommand,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/profitdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除利润明细事实 DELETE /perf/profitdata */
export async function removeProfitData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeProfitDataParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/profitdata", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取利润明细事实详情 GET /perf/profitdata/${param0} */
export async function getProfitDataInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getProfitDataInfoParams,
  options?: { [key: string]: any }
) {
  const { profitId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactProfitDataDTO>(
    `/perf/profitdata/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改利润明细事实 PUT /perf/profitdata/${param0} */
export async function editProfitData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editProfitDataParams,
  body: PerfAPI.UpdatePerfFactProfitDataCommand,
  options?: { [key: string]: any }
) {
  const { profitId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/profitdata/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 利润明细事实列表导出 GET /perf/profitdata/excel */
export async function exportProfitDataByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportProfitDataByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/profitdata/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 利润明细事实导入Excel模板下载 GET /perf/profitdata/excelTemplate */
export async function downloadProfitDataExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/perf/profitdata/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 利润明细事实列表导入 POST /perf/profitdata/importData */
export async function importProfitDataByExcel(
  body: {
    request?: PerfAPI.ProfitDataImportRequest;
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
    "/perf/profitdata/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取利润明细事实列表 GET /perf/profitdata/list */
export async function getProfitDataList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getProfitDataListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfFactProfitDataDTO>(
    "/perf/profitdata/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 利润明细事实下拉列表 GET /perf/profitdata/option-select */
export async function optionProfitDataSelect(options?: { [key: string]: any }) {
  return request<PerfAPI.ResponseDTOListPerfFactProfitDataVO>(
    "/perf/profitdata/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取利润明细事实列表 GET /perf/profitdata/page */
export async function getPagedProfitData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedProfitDataParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactProfitDataDTO>(
    "/perf/profitdata/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除利润明细事实 DELETE /perf/profitdata/remove/${param0} */
export async function removeProfitDataById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeProfitDataByIdParams,
  options?: { [key: string]: any }
) {
  const { profitId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/profitdata/remove/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
