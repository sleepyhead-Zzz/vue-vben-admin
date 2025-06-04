// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增字典类型表 POST /system/dict/type */
export async function addDictType(
  body: SystemAPI.AddDictTypeCommand,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOVoid>("/system/dict/type", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取字典类型表详情 GET /system/dict/type/${param0} */
export async function getDictTypeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getDictTypeInfoParams,
  options?: { [key: string]: any }
) {
  const { dictTypeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOSysDictTypeDTO>(
    `/system/dict/type/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改字典类型表 PUT /system/dict/type/${param0} */
export async function editDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.editDictTypeParams,
  body: SystemAPI.UpdateDictTypeCommand,
  options?: { [key: string]: any }
) {
  const { dictTypeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(`/system/dict/type/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除字典类型表 DELETE /system/dict/type/batch-delete */
export async function batchRemoveDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.batchRemoveDictTypeParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOVoid>("/system/dict/type/batch-delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 字典类型表下拉列表 GET /system/dict/type/dropdown */
export async function dropdownDictTypeList(options?: { [key: string]: any }) {
  return request<SystemAPI.ResponseDTOListSysDictTypeVO>(
    "/system/dict/type/dropdown",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 获取字典类型表列表 GET /system/dict/type/list */
export async function listDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.listDictTypeParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOListSysDictTypeDTO>(
    "/system/dict/type/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取字典类型表列表 GET /system/dict/type/page */
export async function getPagedDictTypes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedDictTypesParams,
  options?: { [key: string]: any }
) {
  return request<SystemAPI.ResponseDTOPageDTOSysDictTypeDTO>(
    "/system/dict/type/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除字典类型表 DELETE /system/dict/type/remove/${param0} */
export async function removeDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.removeDictTypeParams,
  options?: { [key: string]: any }
) {
  const { dictTypeId: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOVoid>(
    `/system/dict/type/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
