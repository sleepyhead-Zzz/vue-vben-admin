// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增巡检计划 POST /asset/plan */
export async function addPlan(
  body: AssetAPI.AddAssetInspectionPlanCommand,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/plan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取巡检计划详情 GET /asset/plan/${param0} */
export async function getPlanInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPlanInfoParams,
  options?: { [key: string]: any },
) {
  const { planId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetInspectionPlanDTO>(
    `/asset/plan/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改巡检计划 PUT /asset/plan/${param0} */
export async function editPlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editPlanParams,
  body: AssetAPI.UpdateAssetInspectionPlanCommand,
  options?: { [key: string]: any },
) {
  const { planId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/plan/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 新增巡检计划与设备的关联 POST /asset/plan/associate-device */
export async function assignDevicesToPlan(
  body: AssetAPI.UpdateDeviceAssociationCommand,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOInteger>('/asset/plan/associate-device', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取巡检计划关联的巡检设备 GET /asset/plan/associated-device/${param0}/list */
export async function associatedPlanDevices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.associatedPlanDevicesParams,
  options?: { [key: string]: any },
) {
  const { planId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOPageDTOAssetDeviceDTO>(
    `/asset/plan/associated-device/${param0}/list`,
    {
      method: 'GET',
      params: {
        ...queryParams,
        query: undefined,
        ...queryParams['query'],
      },
      ...(options || {}),
    },
  );
}

/** 批量删除巡检计划 DELETE /asset/plan/batch-delete */
export async function removePlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removePlanParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/plan/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 巡检计划列表导出 GET /asset/plan/excel */
export async function exportPlanByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportPlanByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/asset/plan/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 巡检计划导入excel下载 GET /asset/plan/excelTemplate */
export async function downloadPlanExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/asset/plan/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 巡检计划列表导入 POST /asset/plan/importData */
export async function importPlanByExcel(
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

  return request<AssetAPI.ResponseDTOString>('/asset/plan/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 巡检计划下拉列表 GET /asset/plan/option-select */
export async function optionPlanSelect(options?: { [key: string]: any }) {
  return request<AssetAPI.ResponseDTOListAssetInspectionPlanVO>(
    '/asset/plan/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取巡检计划列表 GET /asset/plan/page */
export async function getPagedPlan(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedPlanParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetInspectionPlanDTO>(
    '/asset/plan/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除巡检计划 DELETE /asset/plan/remove/${param0} */
export async function removePlanById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removePlanByIdParams,
  options?: { [key: string]: any },
) {
  const { planId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/plan/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消巡检计划与设备的关联 PUT /asset/plan/unassociate-device */
export async function revokeDevicesFromPlan(
  body: AssetAPI.UpdateDeviceAssociationCommand,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOInteger>(
    '/asset/plan/unassociate-device',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取巡检计划未关联的巡检设备 GET /asset/plan/unassociated-device/${param0}/list */
export async function unAssociatedPlanDevices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.unAssociatedPlanDevicesParams,
  options?: { [key: string]: any },
) {
  const { planId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOPageDTOAssetDeviceDTO>(
    `/asset/plan/unassociated-device/${param0}/list`,
    {
      method: 'GET',
      params: {
        ...queryParams,
        query: undefined,
        ...queryParams['query'],
      },
      ...(options || {}),
    },
  );
}
