// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增参数配置表 POST /sysConfig */
export async function addConfig(
  body: API.AddConfigCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/sysConfig', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取参数配置表详情 GET /sysConfig/${param0} */
export async function getConfigInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getConfigInfoParams,
  options?: { [key: string]: any },
) {
  const { configId: param0, ...queryParams } = params;
  return request<API.ResponseDTOSysConfigDTO>(`/sysConfig/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改参数配置表 PUT /sysConfig/${param0} */
export async function editConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editConfigParams,
  body: API.UpdateConfigCommand,
  options?: { [key: string]: any },
) {
  const { configId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/sysConfig/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除参数配置表 DELETE /sysConfig/batch-delete */
export async function batchRemoveConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchRemoveConfigParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/sysConfig/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /sysConfig/configKey/${param0} */
export async function getConfigKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getConfigKeyParams,
  options?: { [key: string]: any },
) {
  const { configKey: param0, ...queryParams } = params;
  return request<API.ResponseDTOString>(`/sysConfig/configKey/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 参数配置表下拉列表 GET /sysConfig/dropdown */
export async function dropdownConfigList(options?: { [key: string]: any }) {
  return request<API.ResponseDTOListSysConfigVO>('/sysConfig/dropdown', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取参数配置表列表 GET /sysConfig/list */
export async function listConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listConfigParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOListSysConfigDTO>('/sysConfig/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取参数配置表列表 GET /sysConfig/page */
export async function getPagedConfigs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPagedConfigsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTOSysConfigDTO>('/sysConfig/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /sysConfig/refreshCache */
export async function refreshCache(options?: { [key: string]: any }) {
  return request<API.ResponseDTOVoid>('/sysConfig/refreshCache', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 删除参数配置表 DELETE /sysConfig/remove/${param0} */
export async function removeConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeConfigParams,
  options?: { [key: string]: any },
) {
  const { configId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/sysConfig/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
