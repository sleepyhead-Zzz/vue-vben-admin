// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 修改保存代码生成业务 PUT /tool/generator */
export async function editSave(
  body: ToolAPI.GenTableEntity,
  options?: { [key: string]: any },
) {
  return request<ToolAPI.ResponseDTOVoid>('/tool/generator', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改代码生成业务 GET /tool/generator/${param0} */
export async function getInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.getInfoParams,
  options?: { [key: string]: any },
) {
  const { tableId: param0, ...queryParams } = params;
  return request<ToolAPI.ResponseDTOMapStringObject>(
    `/tool/generator/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 删除代码生成 DELETE /tool/generator/${param0} */
export async function remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.removeParams,
  options?: { [key: string]: any },
) {
  const { tableIds: param0, ...queryParams } = params;
  return request<ToolAPI.ResponseDTOVoid>(`/tool/generator/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量生成代码 GET /tool/generator/batchGenCode */
export async function batchGenCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.batchGenCodeParams,
  options?: { [key: string]: any },
) {
  return request<any>('/tool/generator/batchGenCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询数据表字段列表 GET /tool/generator/column/${param0} */
export async function columnList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.columnListParams,
  options?: { [key: string]: any },
) {
  const { tableId: param0, ...queryParams } = params;
  return request<ToolAPI.ResponseDTOPageDTOGenTableColumnDTO>(
    `/tool/generator/column/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 查询数据库列表 GET /tool/generator/db/list */
export async function dataList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.dataListParams,
  options?: { [key: string]: any },
) {
  return request<ToolAPI.ResponseDTOPageDTOGenTableEntity>(
    '/tool/generator/db/list',
    {
      method: 'GET',
      params: {
        ...params,
        pageQuery: undefined,
        ...params['pageQuery'],
      },
      ...(options || {}),
    },
  );
}

/** 下载方式 GET /tool/generator/download/${param0} */
export async function download(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.downloadParams,
  options?: { [key: string]: any },
) {
  const { tableId: param0, ...queryParams } = params;
  return request<any>(`/tool/generator/download/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 生成代码（自定义路径） GET /tool/generator/genCode/${param0} */
export async function genCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.genCodeParams,
  options?: { [key: string]: any },
) {
  const { tableId: param0, ...queryParams } = params;
  return request<ToolAPI.ResponseDTOVoid>(`/tool/generator/genCode/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导入表结构（保存） POST /tool/generator/importTable */
export async function importTableSave(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.importTableSaveParams,
  options?: { [key: string]: any },
) {
  return request<ToolAPI.ResponseDTOVoid>('/tool/generator/importTable', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询代码生成列表 GET /tool/generator/list */
export async function genList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.genListParams,
  options?: { [key: string]: any },
) {
  return request<ToolAPI.ResponseDTOPageDTOGenTableDTO>(
    '/tool/generator/list',
    {
      method: 'GET',
      params: {
        ...params,
        pageQuery: undefined,
        ...params['pageQuery'],
      },
      ...(options || {}),
    },
  );
}

/** 预览代码 GET /tool/generator/preview/${param0} */
export async function preview(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.previewParams,
  options?: { [key: string]: any },
) {
  const { tableId: param0, ...queryParams } = params;
  return request<ToolAPI.ResponseDTOMapStringString>(
    `/tool/generator/preview/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 同步数据库 GET /tool/generator/synchDb/${param0} */
export async function synchDb(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: ToolAPI.synchDbParams,
  options?: { [key: string]: any },
) {
  const { tableId: param0, ...queryParams } = params;
  return request<ToolAPI.ResponseDTOVoid>(`/tool/generator/synchDb/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
