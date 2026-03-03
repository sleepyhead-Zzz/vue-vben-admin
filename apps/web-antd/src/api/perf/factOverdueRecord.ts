// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增逾期扣分记录：按客户记录最终扣分值 POST /perf/FactOverdueRecord */
export async function addFactOverdueRecord(
  body: PerfAPI.AddPerfFactOverdueRecordCommand,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/FactOverdueRecord", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除逾期扣分记录：按客户记录最终扣分值 DELETE /perf/FactOverdueRecord */
export async function removeFactOverdueRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactOverdueRecordParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOVoid>("/perf/FactOverdueRecord", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取逾期扣分记录：按客户记录最终扣分值详情 GET /perf/FactOverdueRecord/${param0} */
export async function getFactOverdueRecordInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactOverdueRecordInfoParams,
  options?: { [key: string]: any }
) {
  const { overdueId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactOverdueRecordDTO>(
    `/perf/FactOverdueRecord/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改逾期扣分记录：按客户记录最终扣分值 PUT /perf/FactOverdueRecord/${param0} */
export async function editFactOverdueRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editFactOverdueRecordParams,
  body: PerfAPI.UpdatePerfFactOverdueRecordCommand,
  options?: { [key: string]: any }
) {
  const { overdueId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/FactOverdueRecord/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 逾期扣分记录：按客户记录最终扣分值列表导出 GET /perf/FactOverdueRecord/excel */
export async function exportFactOverdueRecordByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactOverdueRecordByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/perf/FactOverdueRecord/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 逾期扣分记录：按客户记录最终扣分值导入Excel模板下载 GET /perf/FactOverdueRecord/excelTemplate */
export async function downloadFactOverdueRecordExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/perf/FactOverdueRecord/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 逾期扣分记录：按客户记录最终扣分值列表导入 POST /perf/FactOverdueRecord/importData */
export async function importFactOverdueRecordByExcel(
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
    "/perf/FactOverdueRecord/importData",
    {
      method: "POST",
      data: formData,
      requestType: "form",
      ...(options || {}),
    }
  );
}

/** 获取逾期扣分记录：按客户记录最终扣分值列表 GET /perf/FactOverdueRecord/list */
export async function getFactOverdueRecordList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactOverdueRecordListParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOListPerfFactOverdueRecordDTO>(
    "/perf/FactOverdueRecord/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 逾期扣分记录：按客户记录最终扣分值下拉列表 GET /perf/FactOverdueRecord/option-select */
export async function optionFactOverdueRecordSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactOverdueRecordVO>(
    "/perf/FactOverdueRecord/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取逾期扣分记录：按客户记录最终扣分值列表 GET /perf/FactOverdueRecord/page */
export async function getPagedFactOverdueRecord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactOverdueRecordParams,
  options?: { [key: string]: any }
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactOverdueRecordDTO>(
    "/perf/FactOverdueRecord/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除逾期扣分记录：按客户记录最终扣分值 DELETE /perf/FactOverdueRecord/remove/${param0} */
export async function removeFactOverdueRecordById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactOverdueRecordByIdParams,
  options?: { [key: string]: any }
) {
  const { overdueId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactOverdueRecord/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
