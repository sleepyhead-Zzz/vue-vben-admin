// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增设备报修 POST /asset/repair */
export async function addRepair(
  body: AssetAPI.AddAssetRepairCommand,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/repair', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除设备报修 DELETE /asset/repair */
export async function removeRepair(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeRepairParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/repair', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取设备报修详情 GET /asset/repair/${param0} */
export async function getRepairInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getRepairInfoParams,
  options?: { [key: string]: any },
) {
  const { repairId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetRepairDTO>(
    `/asset/repair/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改设备报修 PUT /asset/repair/${param0} */
export async function editRepair(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editRepairParams,
  body: AssetAPI.UpdateAssetRepairCommand,
  options?: { [key: string]: any },
) {
  const { repairId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/repair/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 设备报修列表导出 GET /asset/repair/excel */
export async function exportRepairByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportRepairByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/asset/repair/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 设备报修导入Excel模板下载 GET /asset/repair/excelTemplate */
export async function downloadRepairExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/asset/repair/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设备报修列表导入 POST /asset/repair/importData */
export async function importRepairByExcel(
  body: {
    updateSupport?: boolean;
  },
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(
            ele,
            new Blob([JSON.stringify(item)], { type: 'application/json' }),
          );
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<AssetAPI.ResponseDTOString>('/asset/repair/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取设备报修列表 GET /asset/repair/list */
export async function getRepairList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getRepairListParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOListAssetRepairDTO>('/asset/repair/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取设备报修列表 GET /asset/repair/page */
export async function getPagedRepair(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedRepairParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetRepairDTO>(
    '/asset/repair/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除设备报修 DELETE /asset/repair/remove/${param0} */
export async function removeRepairById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeRepairByIdParams,
  options?: { [key: string]: any },
) {
  const { repairId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/repair/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
