// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增字典数据表 POST /system/dict/data */
export async function addDictData(
  body: SystemAPI.AddDictDataCommand,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/dict/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改字典数据表 PUT /system/dict/data/${param0} */
export async function editDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editDictDataParams,
  body: SystemAPI.UpdateDictDataCommand,
  options?: { [key: string]: any },
) {
  const { dictDataCode: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/dict/data/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取字典数据表详情 GET /system/dict/data/${param0} */
export async function getDictDataInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getDictDataInfoParams,
  options?: { [key: string]: any },
) {
  const { dictCode: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysDictDataDTO>(
    `/system/dict/data/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 批量删除字典数据表 DELETE /system/dict/data/batch-delete */
export async function batchRemoveDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.batchRemoveDictDataParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/dict/data/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 字典数据表下拉列表 GET /system/dict/data/dropdown */
export async function dropdownDictDataList(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOListSysDictDataVO>(
    '/system/dict/data/dropdown',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取字典数据表列表 GET /system/dict/data/list */
export async function listDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.listDictDataParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOListSysDictDataDTO>(
    '/system/dict/data/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 分页获取字典数据表列表 GET /system/dict/data/page */
export async function getPagedDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedDictDataParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysDictDataDTO>(
    '/system/dict/data/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除字典数据表 DELETE /system/dict/data/remove/${param0} */
export async function removeDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeDictDataParams,
  options?: { [key: string]: any },
) {
  const { dictCode: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(
    `/system/dict/data/remove/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据字典类型查询字典数据信息 GET /system/dict/data/type/${param0} */
export async function getDictDataByType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getDictDataByTypeParams,
  options?: { [key: string]: any },
) {
  const { dictType: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOListSysDictDataDTO>(
    `/system/dict/data/type/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
