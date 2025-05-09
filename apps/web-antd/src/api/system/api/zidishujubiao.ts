// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增字典数据表 POST /system/dict/data */
export async function addDictData(
  body: API.AddDictDataCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/system/dict/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取字典数据表详情 GET /system/dict/data/${param0} */
export async function getDictDataInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictDataInfoParams,
  options?: { [key: string]: any },
) {
  const { dictDataId: param0, ...queryParams } = params;
  return request<API.ResponseDTOSysDictDataDTO>(`/system/dict/data/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改字典数据表 PUT /system/dict/data/${param0} */
export async function editDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editDictDataParams,
  body: API.UpdateDictDataCommand,
  options?: { [key: string]: any },
) {
  const { dictDataId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/dict/data/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除字典数据表 DELETE /system/dict/data/batch-delete */
export async function batchRemoveDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchRemoveDictDataParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/system/dict/data/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 字典数据表下拉列表 GET /system/dict/data/dropdown */
export async function dropdownDictDataList(options?: { [key: string]: any }) {
  return request<API.ResponseDTOListSysDictDataVO>(
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
  params: API.listDictDataParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOListSysDictDataDTO>('/system/dict/data/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取字典数据表列表 GET /system/dict/data/page */
export async function getPagedDictDatas(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPagedDictDatasParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTOSysDictDataDTO>(
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
  params: API.removeDictDataParams,
  options?: { [key: string]: any },
) {
  const { dictDataId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/system/dict/data/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
