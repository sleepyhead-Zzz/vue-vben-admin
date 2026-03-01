// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增销售明细事实 POST /perf/salesdata */
export async function addSalesData(
  body: PerfAPI.AddPerfFactSalesDataCommand,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/salesdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除销售明细事实 DELETE /perf/salesdata */
export async function removeSalesData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeSalesDataParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/salesdata", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改销售明细事实 PUT /perf/salesdata/${param0} */
export async function editSalesData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editSalesDataParams,
  body: PerfAPI.UpdatePerfFactSalesDataCommand,
  options?: { [key: string]: any }
) {
  const { saleId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/salesdata/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取销售明细事实详情 GET /perf/salesdata/${param0} */
export async function getSalesDataInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getSalesDataInfoParams,
  options?: { [key: string]: any }
) {
  const { salesId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactSalesDataDTO>(
    `/perf/salesdata/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 销售明细事实列表导出 GET /perf/salesdata/excel */
export async function exportSalesDataByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportSalesDataByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/salesdata/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 销售明细事实列表导入 POST /perf/salesdata/importData */
export async function importSalesDataByExcel(
  body: {
    request?: PerfAPI.SalesDataImportRequest;
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
    "/perf/salesdata/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取销售明细事实列表 GET /perf/salesdata/list */
export async function getSalesDataList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getSalesDataListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfFactSalesDataDTO>(
    "/perf/salesdata/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 销售明细事实下拉列表 GET /perf/salesdata/option-select */
export async function optionSalesDataSelect(options?: { [key: string]: any }) {
  return request<PerfAPI.ResponseDTOListPerfFactSalesDataVO>(
    "/perf/salesdata/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取销售明细事实列表 GET /perf/salesdata/page */
export async function getPagedSalesData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedSalesDataParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactSalesDataDTO>(
    "/perf/salesdata/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除销售明细事实 DELETE /perf/salesdata/remove/${param0} */
export async function removeSalesDataById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeSalesDataByIdParams,
  options?: { [key: string]: any }
) {
  const { salesId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/salesdata/remove/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
