// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增资产分类 POST /asset/category */
export async function addCategory(
  body: AssetAPI.AddAssetCategoryCommand,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取资产分类详情 GET /asset/category/${param0} */
export async function getCategoryInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getCategoryInfoParams,
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOAssetCategoryDTO>(
    `/asset/category/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改资产分类 PUT /asset/category/${param0} */
export async function editCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.editCategoryParams,
  body: AssetAPI.UpdateAssetCategoryCommand,
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/category/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除资产分类 DELETE /asset/category/batch-delete */
export async function removeCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeCategoryParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOVoid>('/asset/category/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 资产分类列表导出 GET /asset/category/excel */
export async function exportCategoryByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.exportCategoryByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/asset/category/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 资产分类导入excel下载 GET /asset/category/excelTemplate */
export async function downloadCategoryExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/asset/category/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 资产分类列表导入 POST /asset/category/importData */
export async function importCategoryByExcel(
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

  return request<AssetAPI.ResponseDTOString>('/asset/category/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取资产分类列表 GET /asset/category/list */
export async function getCategoryList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getCategoryListParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOListAssetCategoryDTO>(
    '/asset/category/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 资产分类下拉列表 GET /asset/category/option-select */
export async function optionCategorySelect(options?: { [key: string]: any }) {
  return request<AssetAPI.ResponseDTOListAssetCategoryVO>(
    '/asset/category/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取资产分类列表 GET /asset/category/page */
export async function getPagedCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.getPagedCategoryParams,
  options?: { [key: string]: any },
) {
  return request<AssetAPI.ResponseDTOPageDTOAssetCategoryDTO>(
    '/asset/category/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除资产分类 DELETE /asset/category/remove/${param0} */
export async function removeCategoryById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AssetAPI.removeCategoryByIdParams,
  options?: { [key: string]: any },
) {
  const { categoryId: param0, ...queryParams } = params;
  return request<AssetAPI.ResponseDTOVoid>(`/asset/category/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
