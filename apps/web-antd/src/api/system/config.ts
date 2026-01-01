// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增参数配置表 POST /sysConfig */
export async function addConfig(
  body: SystemAPI.AddConfigCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/sysConfig', {
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
  params: SystemAPI.getConfigInfoParams,
  options?: { [key: string]: any },
) {
  const { configId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysConfigDTO>(`/sysConfig/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改参数配置表 PUT /sysConfig/${param0} */
export async function editConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editConfigParams,
  body: SystemAPI.UpdateConfigCommand,
  options?: { [key: string]: any },
) {
  const { configId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/sysConfig/${param0}`, {
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
export async function removeConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeConfigParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/sysConfig/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据参数键名查询参数值 GET /sysConfig/configKey/${param0} */
export async function getConfigKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getConfigKeyParams,
  options?: { [key: string]: any },
) {
  const { configKey: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOString>(
    `/sysConfig/configKey/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 获取参数配置表列表 GET /sysConfig/list */
export async function getConfigList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getConfigListParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOListSysConfigDTO>('/sysConfig/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 参数配置表下拉列表 GET /sysConfig/option-select */
export async function optionConfigSelect(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOListSysConfigVO>(
    '/sysConfig/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取参数配置表列表 GET /sysConfig/page */
export async function getPagedConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedConfigParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysConfigDTO>('/sysConfig/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /sysConfig/refreshCache */
export async function refreshCache(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOVoid>('/sysConfig/refreshCache', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 删除参数配置表 DELETE /sysConfig/remove/${param0} */
export async function removeConfigById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeConfigByIdParams,
  options?: { [key: string]: any },
) {
  const { configId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/sysConfig/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
