// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增家具 POST /regulatory/furniture */
export async function addFurniture(
  body: RegulatoryAPI.AddRegFurnitureCommand,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOVoid>("/regulatory/furniture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取家具详情 GET /regulatory/furniture/${param0} */
export async function getFurnitureInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.getFurnitureInfoParams,
  options?: { [key: string]: any }
) {
  const { furnitureId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTORegFurnitureDTO>(
    `/regulatory/furniture/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改家具 PUT /regulatory/furniture/${param0} */
export async function editFurniture(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.editFurnitureParams,
  body: RegulatoryAPI.UpdateRegFurnitureCommand,
  options?: { [key: string]: any }
) {
  const { furnitureId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTOVoid>(
    `/regulatory/furniture/${param0}`,
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

/** 批量删除家具 DELETE /regulatory/furniture/batch-delete */
export async function batchRemoveFurniture(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.batchRemoveFurnitureParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOVoid>(
    "/regulatory/furniture/batch-delete",
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 家具下拉列表 GET /regulatory/furniture/dropdown */
export async function dropDownListFurniture(options?: { [key: string]: any }) {
  return request<RegulatoryAPI.ResponseDTOListRegFurnitureVO>(
    "/regulatory/furniture/dropdown",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 家具列表导出 GET /regulatory/furniture/excel */
export async function exportFurnitureByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.exportFurnitureByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/regulatory/furniture/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 家具导入excel下载 GET /regulatory/furniture/excelTemplate */
export async function downloadFurnitureExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/regulatory/furniture/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 家具列表导入 POST /regulatory/furniture/importData */
export async function importFurnitureByExcel(
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

  return request<RegulatoryAPI.ResponseDTOString>(
    "/regulatory/furniture/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取家具列表 GET /regulatory/furniture/list */
export async function listFurniture(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.listFurnitureParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOListRegFurnitureDTO>(
    "/regulatory/furniture/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取家具列表 GET /regulatory/furniture/page */
export async function getPagedFurnitures(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.getPagedFurnituresParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOPageDTORegFurnitureDTO>(
    "/regulatory/furniture/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除家具 DELETE /regulatory/furniture/remove/${param0} */
export async function removeFurniture(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.removeFurnitureParams,
  options?: { [key: string]: any }
) {
  const { furnitureId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTOVoid>(
    `/regulatory/furniture/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
