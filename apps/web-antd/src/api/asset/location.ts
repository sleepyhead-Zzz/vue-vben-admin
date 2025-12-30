// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增位置 POST /asset/location */
export async function addLocation(
  body: AssetAPI.AddAssetLocationCommand,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取位置详情 GET /asset/location/${param0} */
export async function getLocationInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getLocationInfoParams,
  options?: { [key: string]: any },
) {
  const { locationId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetLocationDTO>(
    `/asset/location/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改位置 PUT /asset/location/${param0} */
export async function editLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editLocationParams,
  body: AssetAPI.UpdateAssetLocationCommand,
  options?: { [key: string]: any },
) {
  const { locationId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/location/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除位置 DELETE /asset/location/batch-delete */
export async function batchRemoveLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.batchRemoveLocationParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/location/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 位置下拉列表 GET /asset/location/dropdown */
export async function dropdownlistLocation(options?: { [key: string]: any }) {
  return request<AssetAPI.ResponseDTOListTreeLong>('/asset/location/dropdown', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 位置列表导出 GET /asset/location/excel */
export async function exportLocationByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportLocationByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/asset/location/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 位置导入excel下载 GET /asset/location/excelTemplate */
export async function downloadExcelTemplate4(options?: { [key: string]: any }) {
  return request<any>('/asset/location/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 位置列表导入 POST /asset/location/importData */
export async function importLocationByExcel(
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

  return request<AssetAPI.ResponseDTOString>('/asset/location/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取位置列表 GET /asset/location/list */
export async function listLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.listLocationParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOListAssetLocationDTO>(
    '/asset/location/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 分页获取位置列表 GET /asset/location/page */
export async function getPagedLocations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedLocationsParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetLocationDTO>(
    '/asset/location/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除位置 DELETE /asset/location/remove/${param0} */
export async function removeLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeLocationParams,
  options?: { [key: string]: any },
) {
  const { locationId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/location/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
