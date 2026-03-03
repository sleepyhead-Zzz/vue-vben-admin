// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增系统授权 POST /system/client */
export async function addClient(
  body: SystemAPI.AddSysClientCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/client', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改系统授权 PUT /system/client/${param0} */
export async function editClient(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editClientParams,
  body: SystemAPI.UpdateSysClientCommand,
  options?: { [key: string]: any },
) {
  const { clientId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/client/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取系统授权详情 GET /system/client/${param0} */
export async function getClientInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getClientInfoParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysClientDTO>(
    `/system/client/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 批量删除系统授权 DELETE /system/client/batch-delete */
export async function removeClient(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeClientParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/client/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 状态修改 PUT /system/client/changeStatus */
export async function changeClientStatus(
  body: SystemAPI.UpdateSysClientCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOInteger>('/system/client/changeStatus', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 系统授权列表导出 GET /system/client/excel */
export async function exportClientByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.exportClientByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/system/client/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 系统授权导入excel下载 GET /system/client/excelTemplate */
export async function downloadClientExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/system/client/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 系统授权列表导入 POST /system/client/importData */
export async function importClientByExcel(
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

  return request<SystemAPI.ResponseDTOString>('/system/client/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 分页获取系统授权列表 GET /system/client/page */
export async function getPagedClient(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedClientParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysClientDTO>(
    '/system/client/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除系统授权 DELETE /system/client/remove/${param0} */
export async function removeById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeByIdParams,
  options?: { [key: string]: any },
) {
  const { clientId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/client/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
