// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 删除文件 根据文件名删除文件 DELETE /upload/delete/${param0} */
export async function deleteFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFileParams,
  options?: { [key: string]: any },
) {
  const { fileName: param0, ...queryParams } = params;
  return request<API.ResponseDTOString>(`/upload/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量删除文件 根据文件名列表批量删除文件 DELETE /upload/delete/batch */
export async function deleteMultipleFiles(
  body: string[],
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOString>('/upload/delete/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 下载文件 根据文件名下载文件 GET /upload/download/${param0} */
export async function downloadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadFileParams,
  options?: { [key: string]: any },
) {
  const { fileName: param0, ...queryParams } = params;
  return request<string>(`/upload/download/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取文件访问地址 根据文件路径生成可访问的临时 URL GET /upload/get-url */
export async function getFileUrl(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFileUrlParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOString>('/upload/get-url', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 上传多个文件 上传多个文件，并返回文件元数据列表 POST /upload/multiple */
export async function uploadMultiple(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadMultipleParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOListFileMetadataDTO>('/upload/multiple', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 上传单个文件 上传一个文件，并返回访问 URL POST /upload/single */
export async function uploadSingle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadSingleParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOString>('/upload/single', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
