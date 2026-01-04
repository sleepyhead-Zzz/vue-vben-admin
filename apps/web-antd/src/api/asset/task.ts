// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增巡检任务 POST /asset/task */
export async function addTask(
  body: AssetAPI.AddAssetInspectionTaskCommand,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOVoid>("/asset/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取巡检任务详情 GET /asset/task/${param0} */
export async function getTaskInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getTaskInfoParams,
  options?: { [key: string]: any }
) {
  const { taskId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetInspectionTaskDTO>(
    `/asset/task/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改巡检任务 PUT /asset/task/${param0} */
export async function editTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editTaskParams,
  body: AssetAPI.UpdateAssetInspectionTaskCommand,
  options?: { [key: string]: any }
) {
  const { taskId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/task/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除巡检任务 DELETE /asset/task/batch-delete */
export async function removeTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeTaskParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOVoid>("/asset/task/batch-delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 巡检任务列表导出 GET /asset/task/excel */
export async function exportTaskByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportTaskByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/asset/task/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 巡检任务导入excel下载 GET /asset/task/excelTemplate */
export async function downloadTaskExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/asset/task/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 巡检任务列表导入 POST /asset/task/importData */
export async function importTaskByExcel(
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

  return request<AssetAPI.ResponseDTOString>("/asset/task/importData", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 巡检任务下拉列表 GET /asset/task/option-select */
export async function optionTaskSelect(options?: { [key: string]: any }) {
  return request<AssetAPI.ResponseDTOListAssetInspectionTaskVO>(
    "/asset/task/option-select",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 分页获取巡检任务列表 GET /asset/task/page */
export async function getPagedTask(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedTaskParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetInspectionTaskDTO>(
    "/asset/task/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除巡检任务 DELETE /asset/task/remove/${param0} */
export async function removeTaskById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeTaskByIdParams,
  options?: { [key: string]: any }
) {
  const { taskId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/task/remove/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
