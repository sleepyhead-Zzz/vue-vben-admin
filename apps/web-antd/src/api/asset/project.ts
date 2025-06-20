// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增巡检项目 POST /asset/project */
export async function addProject(
  body: AssetAPI.AddAssetInspectionProjectCommand,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOVoid>("/asset/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取巡检项目详情 GET /asset/project/${param0} */
export async function getProjectInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getProjectInfoParams,
  options?: { [key: string]: any }
) {
  const { projectId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetInspectionProjectDTO>(
    `/asset/project/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改巡检项目 PUT /asset/project/${param0} */
export async function editProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editProjectParams,
  body: AssetAPI.UpdateAssetInspectionProjectCommand,
  options?: { [key: string]: any }
) {
  const { projectId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/project/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除巡检项目 DELETE /asset/project/batch-delete */
export async function batchRemoveProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.batchRemoveProjectParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOVoid>("/asset/project/batch-delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 巡检项目下拉列表 GET /asset/project/dropdown */
export async function dropdownProjectList(options?: { [key: string]: any }) {
  return request<AssetAPI.ResponseDTOListAssetInspectionProjectVO>(
    "/asset/project/dropdown",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 巡检项目列表导出 GET /asset/project/excel */
export async function exportProjectByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportProjectByExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/asset/project/excel", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 巡检项目导入excel下载 GET /asset/project/excelTemplate */
export async function downloadExcelTemplate1(options?: { [key: string]: any }) {
  return request<any>("/asset/project/excelTemplate", {
    method: "GET",
    ...(options || {}),
  });
}

/** 巡检项目列表导入 POST /asset/project/importData */
export async function importProjectByExcel(
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

  return request<AssetAPI.ResponseDTOString>("/asset/project/importData", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 获取巡检项目列表 GET /asset/project/list */
export async function listProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.listProjectParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOListAssetInspectionProjectDTO>(
    "/asset/project/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取巡检项目列表 GET /asset/project/page */
export async function getPagedProjects(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedProjectsParams,
  options?: { [key: string]: any }
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetInspectionProjectDTO>(
    "/asset/project/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除巡检项目 DELETE /asset/project/remove/${param0} */
export async function removeProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeProjectParams,
  options?: { [key: string]: any }
) {
  const { projectId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/project/remove/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}
