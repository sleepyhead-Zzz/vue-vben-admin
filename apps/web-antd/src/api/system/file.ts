// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 批量删除文件上传 DELETE /system/file/batch-delete */
export async function batchRemoveFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.batchRemoveFileParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOVoid>('/system/file/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /system/file/download/${param0} */
export async function download(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.downloadParams,
  options?: { [key: string]: any },
) {
  const { fileId: param0, ...queryParams } = params;
  return request<any>(`/system/file/download/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取文件上传列表 GET /system/file/list */
export async function listFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.listFileParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOListSysFileDTO>('/system/file/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID串获取文件上传详情 GET /system/file/listByIds/${param0} */
export async function listFileInfoByIds(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.listFileInfoByIdsParams,
  options?: { [key: string]: any },
) {
  const { ossIds: param0, ...queryParams } = params;
  return request<SystemAPI.ResponseDTOListSysFileDTO>(
    `/system/file/listByIds/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 分页获取文件上传列表 GET /system/file/page */
export async function getPagedFiles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.getPagedFilesParams,
  options?: { [key: string]: any },
) {
  return request<SystemAPI.ResponseDTOPageDTOSysFileDTO>('/system/file/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /system/file/upload */
export async function upload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: SystemAPI.uploadParams,
  body: {},
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

  return request<SystemAPI.ResponseDTOSysFileUploadDTO>('/system/file/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
