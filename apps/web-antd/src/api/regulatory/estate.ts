// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增房屋和构筑物类固定资产 POST /regulatory/estate */
export async function addEstate(
  body: RegulatoryAPI.AddRegEstateCommand,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOVoid>("/regulatory/estate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取房屋和构筑物类固定资产详情 GET /regulatory/estate/${param0} */
export async function getEstateInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.getEstateInfoParams,
  options?: { [key: string]: any }
) {
  const { estateId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTORegEstateDTO>(
    `/regulatory/estate/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改房屋和构筑物类固定资产 PUT /regulatory/estate/${param0} */
export async function editEstate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.editEstateParams,
  body: RegulatoryAPI.UpdateRegEstateCommand,
  options?: { [key: string]: any }
) {
  const { estateId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTOVoid>(
    `/regulatory/estate/${param0}`,
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

/** 批量删除房屋和构筑物类固定资产 DELETE /regulatory/estate/batch-delete */
export async function batchRemoveEstate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.batchRemoveEstateParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOVoid>(
    "/regulatory/estate/batch-delete",
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 房屋和构筑物类固定资产下拉列表 GET /regulatory/estate/dropdown */
export async function dropDownListEstate(options?: { [key: string]: any }) {
  return request<RegulatoryAPI.ResponseDTOListRegEstateVO>(
    "/regulatory/estate/dropdown",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 房屋和构筑物类固定资产列表导出 GET /regulatory/estate/excel */
export async function exportEstateByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.exportEstateByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/regulatory/estate/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 房屋和构筑物类固定资产导入excel下载 GET /regulatory/estate/excelTemplate */
export async function downloadtEstateExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/regulatory/estate/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 房屋和构筑物类固定资产列表导入 POST /regulatory/estate/importData */
export async function importEstateByExcel(
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
    "/regulatory/estate/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取房屋和构筑物类固定资产列表 GET /regulatory/estate/list */
export async function listEstate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.listEstateParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOListRegEstateDTO>(
    "/regulatory/estate/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取房屋和构筑物类固定资产列表 GET /regulatory/estate/page */
export async function getPagedEstates(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.getPagedEstatesParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOPageDTORegEstateDTO>(
    "/regulatory/estate/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除房屋和构筑物类固定资产 DELETE /regulatory/estate/remove/${param0} */
export async function removeEstate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.removeEstateParams,
  options?: { [key: string]: any }
) {
  const { estateId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTOVoid>(
    `/regulatory/estate/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
