// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增办公资产信息 POST /regulatory/office */
export async function addOffice(
  body: RegulatoryAPI.AddRegOfficeCommand,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOVoid>("/regulatory/office", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取办公资产信息详情 GET /regulatory/office/${param0} */
export async function getOfficeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.getOfficeInfoParams,
  options?: { [key: string]: any }
) {
  const { officeId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTORegOfficeDTO>(
    `/regulatory/office/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改办公资产信息 PUT /regulatory/office/${param0} */
export async function editOffice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.editOfficeParams,
  body: RegulatoryAPI.UpdateRegOfficeCommand,
  options?: { [key: string]: any }
) {
  const { officeId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTOVoid>(
    `/regulatory/office/${param0}`,
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

/** 批量删除办公资产信息 DELETE /regulatory/office/batch-delete */
export async function batchRemoveOffice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.batchRemoveOfficeParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOVoid>(
    "/regulatory/office/batch-delete",
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 办公资产信息下拉列表 GET /regulatory/office/dropdown */
export async function dropDownListOffice(options?: { [key: string]: any }) {
  return request<RegulatoryAPI.ResponseDTOListRegOfficeVO>(
    "/regulatory/office/dropdown",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 办公资产信息列表导出 GET /regulatory/office/excel */
export async function exportOfficeByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.exportOfficeByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/regulatory/office/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 办公资产信息导入excel下载 GET /regulatory/office/excelTemplate */
export async function downloadtOfficeExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/regulatory/office/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 办公资产信息列表导入 POST /regulatory/office/importData */
export async function importOfficeByExcel(
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
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<RegulatoryAPI.ResponseDTOString>(
    "/regulatory/office/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取办公资产信息列表 GET /regulatory/office/list */
export async function listOffice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.listOfficeParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOListRegOfficeDTO>(
    "/regulatory/office/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取办公资产信息列表 GET /regulatory/office/page */
export async function getPagedOffices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.getPagedOfficesParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOPageDTORegOfficeDTO>(
    "/regulatory/office/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除办公资产信息 DELETE /regulatory/office/remove/${param0} */
export async function removeOffice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.removeOfficeParams,
  options?: { [key: string]: any }
) {
  const { officeId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTOVoid>(
    `/regulatory/office/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
