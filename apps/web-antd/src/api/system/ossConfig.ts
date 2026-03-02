// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增对象存储配置 POST /system/oss_config */
export async function addOssConfig(
  body: SystemAPI.AddSysOssConfigCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/oss_config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取对象存储配置详情 GET /system/oss_config/${param0} */
export async function getOssConfigInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getOssConfigInfoParams,
  options?: { [key: string]: any },
) {
  const { ossConfigId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysOssConfigDTO>(
    `/system/oss_config/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改对象存储配置 PUT /system/oss_config/${param0} */
export async function editOssConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editOssConfigParams,
  body: SystemAPI.UpdateSysOssConfigCommand,
  options?: { [key: string]: any },
) {
  const { ossConfigId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/oss_config/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除对象存储配置 DELETE /system/oss_config/batch-delete */
export async function removeOssConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeOssConfigParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/oss_config/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /system/oss_config/changeStatus */
export async function changeOssConfigStatus(
  body: SystemAPI.UpdateSysOssConfigStatusCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/oss_config/changeStatus', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 对象存储配置列表导出 GET /system/oss_config/excel */
export async function exportOssConfigByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.exportOssConfigByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/system/oss_config/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 对象存储配置导入excel下载 GET /system/oss_config/excelTemplate */
export async function downloadOssConfigExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/system/oss_config/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 对象存储配置列表导入 POST /system/oss_config/importData */
export async function importOssConfigByExcel(
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

  return request<SystemAPI.ResponseDTOString>('/system/oss_config/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 分页获取对象存储配置列表 GET /system/oss_config/page */
export async function getPagedOssConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedOssConfigParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysOssConfigDTO>(
    '/system/oss_config/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除对象存储配置 DELETE /system/oss_config/remove/${param0} */
export async function removeOssConfigById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeOssConfigByIdParams,
  options?: { [key: string]: any },
) {
  const { ossConfigId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(
    `/system/oss_config/remove/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
