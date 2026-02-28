// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增巡检记录 POST /asset/inspection */
export async function addInspection(
  body: AssetAPI.AddAssetInspectionCommand,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOVoid>("/asset/inspection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取巡检记录详情 GET /asset/inspection/${param0} */
export async function getInspectionInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getInspectionInfoParams,
  options?: { [key: string]: any }
) {
  const { inspectionId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetInspectionDTO>(
    `/asset/inspection/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改巡检记录 PUT /asset/inspection/${param0} */
export async function editInspection(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editInspectionParams,
  body: AssetAPI.UpdateAssetInspectionCommand,
  options?: { [key: string]: any }
) {
  const { inspectionId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/inspection/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除巡检记录 DELETE /asset/inspection/batch-delete */
export async function removeInspection(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeInspectionParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOVoid>("/asset/inspection/batch-delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 巡检记录列表导出 GET /asset/inspection/excel */
export async function exportInspectionByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportInspectionByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/asset/inspection/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 巡检记录导入excel下载 GET /asset/inspection/excelTemplate */
export async function downloadInspectionExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/asset/inspection/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 巡检记录列表导入 POST /asset/inspection/importData */
export async function importInspectionByExcel(
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

  return request<AssetAPI.ResponseDTOString>("/asset/inspection/importData", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 巡检记录下拉列表 GET /asset/inspection/option-select */
export async function optionInspectionSelect(options?: { [key: string]: any }) {
  return request<AssetAPI.ResponseDTOListAssetInspectionVO>(
    "/asset/inspection/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取巡检记录列表 GET /asset/inspection/page */
export async function getPagedInspection(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedInspectionParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetInspectionDTO>(
    "/asset/inspection/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除巡检记录 DELETE /asset/inspection/remove/${param0} */
export async function removeInspectionById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeInspectionByIdParams,
  options?: { [key: string]: any }
) {
  const { inspectionId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(
    `/asset/inspection/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
