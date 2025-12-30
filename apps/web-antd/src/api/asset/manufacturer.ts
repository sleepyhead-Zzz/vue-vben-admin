// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增生产厂商 POST /asset/manufacturer */
export async function addManufacturer(
  body: AssetAPI.AddAssetManufacturerCommand,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOVoid>("/asset/manufacturer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取生产厂商详情 GET /asset/manufacturer/${param0} */
export async function getManufacturerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getManufacturerInfoParams,
  options?: { [key: string]: any }
) {
  const { manufacturerId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetManufacturerDTO>(
    `/asset/manufacturer/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改生产厂商 PUT /asset/manufacturer/${param0} */
export async function editManufacturer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editManufacturerParams,
  body: AssetAPI.UpdateAssetManufacturerCommand,
  options?: { [key: string]: any }
) {
  const { manufacturerId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/manufacturer/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除生产厂商 DELETE /asset/manufacturer/batch-delete */
export async function batchRemoveManufacturer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.batchRemoveManufacturerParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOVoid>("/asset/manufacturer/batch-delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 生产厂商下拉列表 GET /asset/manufacturer/dropdown */
export async function dropdownlistManufacturer(options?: {
  [key: string]: any;
}) {
  return request<AssetAPI.ResponseDTOListAssetManufacturerVO>(
    "/asset/manufacturer/dropdown",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 生产厂商列表导出 GET /asset/manufacturer/excel */
export async function exportManufacturerByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportManufacturerByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/asset/manufacturer/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 生产厂商导入excel下载 GET /asset/manufacturer/excelTemplate */
export async function downloadExcelTemplate3(options?: { [key: string]: any }) {
  return request<any>("/asset/manufacturer/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 生产厂商列表导入 POST /asset/manufacturer/importData */
export async function importManufacturerByExcel(
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

  return request<AssetAPI.ResponseDTOString>("/asset/manufacturer/importData", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 获取生产厂商列表 GET /asset/manufacturer/list */
export async function listManufacturer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.listManufacturerParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOListAssetManufacturerDTO>(
    "/asset/manufacturer/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取生产厂商列表 GET /asset/manufacturer/page */
export async function getPagedManufacturers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedManufacturersParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetManufacturerDTO>(
    "/asset/manufacturer/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除生产厂商 DELETE /asset/manufacturer/remove/${param0} */
export async function removeManufacturer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeManufacturerParams,
  options?: { [key: string]: any }
) {
  const { manufacturerId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(
    `/asset/manufacturer/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
