// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增客户月度销量汇总 POST /perf/AggCustomerMonthlySales */
export async function addAggCustomerMonthlySales(
  body: PerfAPI.AddPerfAggCustomerMonthlySalesCommand,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/AggCustomerMonthlySales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除客户月度销量汇总 DELETE /perf/AggCustomerMonthlySales */
export async function removeAggCustomerMonthlySales(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeAggCustomerMonthlySalesParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/AggCustomerMonthlySales", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取客户月度销量汇总详情 GET /perf/AggCustomerMonthlySales/${param0} */
export async function getAggCustomerMonthlySalesInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getAggCustomerMonthlySalesInfoParams,
  options?: { [key: string]: any }
) {
  const { customerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfAggCustomerMonthlySalesDTO>(
    `/perf/AggCustomerMonthlySales/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改客户月度销量汇总 PUT /perf/AggCustomerMonthlySales/${param0} */
export async function editAggCustomerMonthlySales(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editAggCustomerMonthlySalesParams,
  body: PerfAPI.UpdatePerfAggCustomerMonthlySalesCommand,
  options?: { [key: string]: any }
) {
  const { customerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/AggCustomerMonthlySales/${param0}`,
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

/** 客户月度销量汇总列表导出 GET /perf/AggCustomerMonthlySales/excel */
export async function exportAggCustomerMonthlySalesByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportAggCustomerMonthlySalesByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/AggCustomerMonthlySales/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 客户月度销量汇总导入Excel模板下载 GET /perf/AggCustomerMonthlySales/excelTemplate */
export async function downloadAggCustomerMonthlySalesExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/perf/AggCustomerMonthlySales/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 客户月度销量汇总列表导入 POST /perf/AggCustomerMonthlySales/importData */
export async function importAggCustomerMonthlySalesByExcel(
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
    "/perf/AggCustomerMonthlySales/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取客户月度销量汇总列表 GET /perf/AggCustomerMonthlySales/list */
export async function getAggCustomerMonthlySalesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getAggCustomerMonthlySalesListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfAggCustomerMonthlySalesDTO>(
    "/perf/AggCustomerMonthlySales/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 客户月度销量汇总下拉列表 GET /perf/AggCustomerMonthlySales/option-select */
export async function optionAggCustomerMonthlySalesSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfAggCustomerMonthlySalesVO>(
    "/perf/AggCustomerMonthlySales/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取客户月度销量汇总列表 GET /perf/AggCustomerMonthlySales/page */
export async function getPagedAggCustomerMonthlySales(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedAggCustomerMonthlySalesParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfAggCustomerMonthlySalesDTO>(
    "/perf/AggCustomerMonthlySales/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除客户月度销量汇总 DELETE /perf/AggCustomerMonthlySales/remove/${param0} */
export async function removeAggCustomerMonthlySalesById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeAggCustomerMonthlySalesByIdParams,
  options?: { [key: string]: any }
) {
  const { customerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/AggCustomerMonthlySales/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
