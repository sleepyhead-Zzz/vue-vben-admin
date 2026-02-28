// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增产品维度 POST /perf/product */
export async function addProduct(
  body: PerfAPI.AddPerfDimProductCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除产品维度 DELETE /perf/product */
export async function removeProduct(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeProductParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/product', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取产品维度详情 GET /perf/product/${param0} */
export async function getProductInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getProductInfoParams,
  options?: { [key: string]: any },
) {
  const { productId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfDimProductDTO>(
    `/perf/product/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改产品维度 PUT /perf/product/${param0} */
export async function editProduct(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editProductParams,
  body: PerfAPI.UpdatePerfDimProductCommand,
  options?: { [key: string]: any },
) {
  const { productId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/product/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 产品维度列表导出 GET /perf/product/excel */
export async function exportProductByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportProductByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/perf/product/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 产品维度导入Excel模板下载 GET /perf/product/excelTemplate */
export async function downloadProductExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/perf/product/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 产品维度列表导入 POST /perf/product/importData */
export async function importProductByExcel(
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

  return request<PerfAPI.ResponseDTOString>('/perf/product/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取产品维度列表 GET /perf/product/list */
export async function getProductList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getProductListParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOListPerfDimProductDTO>(
    '/perf/product/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 产品维度下拉列表 GET /perf/product/option-select */
export async function optionProductSelect(options?: { [key: string]: any }) {
  return request<PerfAPI.ResponseDTOListPerfDimProductVO>(
    '/perf/product/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取产品维度列表 GET /perf/product/page */
export async function getPagedProduct(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedProductParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfDimProductDTO>(
    '/perf/product/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除产品维度 DELETE /perf/product/remove/${param0} */
export async function removeProductById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeProductByIdParams,
  options?: { [key: string]: any },
) {
  const { productId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/product/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
