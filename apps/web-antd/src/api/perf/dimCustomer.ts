// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增客户维度 POST /perf/customer */
export async function addDimCustomer(
  body: PerfAPI.AddPerfDimCustomerCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除客户维度 DELETE /perf/customer */
export async function removeDimCustomer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeDimCustomerParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/customer', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取客户维度详情 GET /perf/customer/${param0} */
export async function getDimCustomerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getDimCustomerInfoParams,
  options?: { [key: string]: any },
) {
  const { customerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfDimCustomerDTO>(
    `/perf/customer/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改客户维度 PUT /perf/customer/${param0} */
export async function editDimCustomer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editDimCustomerParams,
  body: PerfAPI.UpdatePerfDimCustomerCommand,
  options?: { [key: string]: any },
) {
  const { customerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/customer/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 客户维度列表导出 GET /perf/customer/excel */
export async function exportDimCustomerByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportDimCustomerByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/perf/customer/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 客户维度导入Excel模板下载 GET /perf/customer/excelTemplate */
export async function downloadDimCustomerExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/perf/customer/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 客户维度列表导入 POST /perf/customer/importData */
export async function importDimCustomerByExcel(
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

  return request<PerfAPI.ResponseDTOString>('/perf/customer/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取客户维度列表 GET /perf/customer/list */
export async function getDimCustomerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getDimCustomerListParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOListPerfDimCustomerDTO>(
    '/perf/customer/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 客户维度下拉列表 GET /perf/customer/option-select */
export async function optionDimCustomerSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfDimCustomerVO>(
    '/perf/customer/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取客户维度列表 GET /perf/customer/page */
export async function getPagedDimCustomer(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedDimCustomerParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfDimCustomerDTO>(
    '/perf/customer/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除客户维度 DELETE /perf/customer/remove/${param0} */
export async function removeDimCustomerById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeDimCustomerByIdParams,
  options?: { [key: string]: any },
) {
  const { customerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/customer/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
