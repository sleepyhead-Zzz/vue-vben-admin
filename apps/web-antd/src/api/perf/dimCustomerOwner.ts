// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增客户归属历史 POST /perf/customer-owner */
export async function addDimCustomerOwner(
  body: PerfAPI.AddPerfDimCustomerOwnerCommand,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/customer-owner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除客户归属历史 DELETE /perf/customer-owner */
export async function removeDimCustomerOwner(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeDimCustomerOwnerParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/customer-owner", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取客户归属历史详情 GET /perf/customer-owner/${param0} */
export async function getDimCustomerOwnerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getDimCustomerOwnerInfoParams,
  options?: { [key: string]: any }
) {
  const { ownerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfDimCustomerOwnerDTO>(
    `/perf/customer-owner/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改客户归属历史 PUT /perf/customer-owner/${param0} */
export async function editDimCustomerOwner(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editDimCustomerOwnerParams,
  body: PerfAPI.UpdatePerfDimCustomerOwnerCommand,
  options?: { [key: string]: any }
) {
  const { ownerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/customer-owner/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 客户归属历史列表导出 GET /perf/customer-owner/excel */
export async function exportDimCustomerOwnerByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportDimCustomerOwnerByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/customer-owner/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 客户归属历史导入Excel模板下载 GET /perf/customer-owner/excelTemplate */
export async function downloadDimCustomerOwnerExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/perf/customer-owner/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 客户归属历史列表导入 POST /perf/customer-owner/importData */
export async function importDimCustomerOwnerByExcel(
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

  return request<PerfAPI.ResponseDTOString>("/perf/customer-owner/importData", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 获取客户归属历史列表 GET /perf/customer-owner/list */
export async function getDimCustomerOwnerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getDimCustomerOwnerListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfDimCustomerOwnerDTO>(
    "/perf/customer-owner/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 客户归属历史下拉列表 GET /perf/customer-owner/option-select */
export async function optionDimCustomerOwnerSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfDimCustomerOwnerVO>(
    "/perf/customer-owner/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取客户归属历史列表 GET /perf/customer-owner/page */
export async function getPagedDimCustomerOwner(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedDimCustomerOwnerParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfDimCustomerOwnerDTO>(
    "/perf/customer-owner/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除客户归属历史 DELETE /perf/customer-owner/remove/${param0} */
export async function removeDimCustomerOwnerById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeDimCustomerOwnerByIdParams,
  options?: { [key: string]: any }
) {
  const { ownerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/customer-owner/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
