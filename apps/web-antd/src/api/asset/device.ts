// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增设备 POST /asset/device */
export async function addDevice(
  body: AssetAPI.AddAssetDeviceCommand,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/device', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备详情 GET /asset/device/${param0} */
export async function getDeviceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getDeviceInfoParams,
  options?: { [key: string]: any },
) {
  const { deviceId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetDeviceDTO>(
    `/asset/device/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改设备 PUT /asset/device/${param0} */
export async function editDevice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editDeviceParams,
  body: AssetAPI.UpdateAssetDeviceCommand,
  options?: { [key: string]: any },
) {
  const { deviceId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/device/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除设备 DELETE /asset/device/batch-delete */
export async function batchRemoveDevice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.batchRemoveDeviceParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/device/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设备下拉列表 GET /asset/device/dropdown */
export async function dropDownListDevice(options?: { [key: string]: any }) {
  return request<AssetAPI.ResponseDTOListAssetDeviceVO>(
    '/asset/device/dropdown',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 设备列表导出 GET /asset/device/excel */
export async function exportDeviceByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportDeviceByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/asset/device/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 设备导入excel下载 GET /asset/device/excelTemplate */
export async function downloadExcelTemplate5(options?: { [key: string]: any }) {
  return request<any>('/asset/device/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设备列表导入 POST /asset/device/importData */
export async function importDeviceByExcel(
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

  return request<AssetAPI.ResponseDTOString>('/asset/device/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取设备的巡检项目详情 GET /asset/device/inspection/${param0} */
export async function getInspectionItemByDeviceId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getInspectionItemByDeviceIdParams,
  options?: { [key: string]: any },
) {
  const { deviceId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOListAssetInspectionProjectDTO>(
    `/asset/device/inspection/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 获取设备列表 GET /asset/device/list */
export async function listDevice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.listDeviceParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOListAssetDeviceDTO>('/asset/device/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取设备列表 GET /asset/device/page */
export async function getPagedDevices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedDevicesParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetDeviceDTO>(
    '/asset/device/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除设备 DELETE /asset/device/remove/${param0} */
export async function removeDevice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeDeviceParams,
  options?: { [key: string]: any },
) {
  const { deviceId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/device/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
