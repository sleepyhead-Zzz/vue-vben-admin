// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增信息卡信息 POST /regulatory/card */
export async function addCard(
  body: RegulatoryAPI.AddRegCardCommand,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOVoid>("/regulatory/card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取信息卡信息详情 GET /regulatory/card/${param0} */
export async function getCardInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.getCardInfoParams,
  options?: { [key: string]: any }
) {
  const { cardId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTORegCardDTO>(
    `/regulatory/card/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改信息卡信息 PUT /regulatory/card/${param0} */
export async function editCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.editCardParams,
  body: RegulatoryAPI.UpdateRegCardCommand,
  options?: { [key: string]: any }
) {
  const { cardId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTOVoid>(`/regulatory/card/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除信息卡信息 DELETE /regulatory/card/batch-delete */
export async function batchRemoveCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.batchRemoveCardParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOVoid>(
    "/regulatory/card/batch-delete",
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 信息卡信息下拉列表 GET /regulatory/card/dropdown */
export async function dropDownListCard(options?: { [key: string]: any }) {
  return request<RegulatoryAPI.ResponseDTOListRegCardVO>(
    "/regulatory/card/dropdown",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 信息卡信息列表导出 GET /regulatory/card/excel */
export async function exportCardByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.exportCardByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/regulatory/card/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 信息卡信息导入excel下载 GET /regulatory/card/excelTemplate */
export async function downloadExcelTemplate1(options?: { [key: string]: any }) {
  return request<any>("/regulatory/card/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 信息卡信息列表导入 POST /regulatory/card/importData */
export async function importCardByExcel(
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
    "/regulatory/card/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取信息卡信息列表 GET /regulatory/card/list */
export async function listCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.listCardParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOListRegCardDTO>(
    "/regulatory/card/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取信息卡信息列表 GET /regulatory/card/page */
export async function getPagedCards(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.getPagedCardsParams,
  options?: { [key: string]: any }
) {
  return request<RegulatoryAPI.ResponseDTOPageDTORegCardDTO>(
    "/regulatory/card/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除信息卡信息 DELETE /regulatory/card/remove/${param0} */
export async function removeCard(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: RegulatoryAPI.removeCardParams,
  options?: { [key: string]: any }
) {
  const { cardId: param0, ...queryParams } = params;
  return request<RegulatoryAPI.ResponseDTOVoid>(
    `/regulatory/card/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
