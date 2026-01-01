// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增规格型号 POST /asset/specification */
export async function addSpecification(
  body: AssetAPI.AddAssetSpecificationCommand,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/specification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取规格型号详情 GET /asset/specification/${param0} */
export async function getSpecificationInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getSpecificationInfoParams,
  options?: { [key: string]: any },
) {
  const { specificationId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetSpecificationDTO>(
    `/asset/specification/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改规格型号 PUT /asset/specification/${param0} */
export async function editSpecification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editSpecificationParams,
  body: AssetAPI.UpdateAssetSpecificationCommand,
  options?: { [key: string]: any },
) {
  const { specificationId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/specification/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除规格型号 DELETE /asset/specification/batch-delete */
export async function removeSpecification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeSpecificationParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>(
    '/asset/specification/batch-delete',
    {
      method: 'DELETE',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 规格型号列表导出 GET /asset/specification/excel */
export async function exportSpecificationByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportSpecificationByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/asset/specification/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 规格型号导入excel下载 GET /asset/specification/excelTemplate */
export async function downloadSpecificationExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/asset/specification/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 规格型号列表导入 POST /asset/specification/importData */
export async function importSpecificationByExcel(
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

  return request<AssetAPI.ResponseDTOString>(
    '/asset/specification/importData',
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}

/** 获取规格型号列表 GET /asset/specification/list */
export async function getSpecificationList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getSpecificationListParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOListAssetSpecificationDTO>(
    '/asset/specification/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 规格型号下拉列表 GET /asset/specification/option-select */
export async function optionSpecificationSelect(options?: {
  [key: string]: any;
}) {
  return request<AssetAPI.ResponseDTOListAssetSpecificationVO>(
    '/asset/specification/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取规格型号列表 GET /asset/specification/page */
export async function getPagedSpecification(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedSpecificationParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetSpecificationDTO>(
    '/asset/specification/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除规格型号 DELETE /asset/specification/remove/${param0} */
export async function removeSpecificationById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeSpecificationByIdParams,
  options?: { [key: string]: any },
) {
  const { specificationId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(
    `/asset/specification/remove/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
