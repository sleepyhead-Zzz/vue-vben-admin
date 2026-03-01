// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增新客户得分记录 POST /perf/FactNewCustomerScore */
export async function addFactNewCustomerScore(
  body: PerfAPI.AddPerfFactNewCustomerScoreCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactNewCustomerScore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除新客户得分记录 DELETE /perf/FactNewCustomerScore */
export async function removeFactNewCustomerScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactNewCustomerScoreParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactNewCustomerScore', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取新客户得分记录详情 GET /perf/FactNewCustomerScore/${param0} */
export async function getFactNewCustomerScoreInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactNewCustomerScoreInfoParams,
  options?: { [key: string]: any },
) {
  const { newCustomerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactNewCustomerScoreDTO>(
    `/perf/FactNewCustomerScore/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改新客户得分记录 PUT /perf/FactNewCustomerScore/${param0} */
export async function editFactNewCustomerScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editFactNewCustomerScoreParams,
  body: PerfAPI.UpdatePerfFactNewCustomerScoreCommand,
  options?: { [key: string]: any },
) {
  const { newCustomerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactNewCustomerScore/${param0}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}

/** 新客户得分记录列表导出 GET /perf/FactNewCustomerScore/excel */
export async function exportFactNewCustomerScoreByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactNewCustomerScoreByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/perf/FactNewCustomerScore/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 新客户得分记录导入Excel模板下载 GET /perf/FactNewCustomerScore/excelTemplate */
export async function downloadFactNewCustomerScoreExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/perf/FactNewCustomerScore/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新客户得分记录列表导入 POST /perf/FactNewCustomerScore/importData */
export async function importFactNewCustomerScoreByExcel(
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

  return request<PerfAPI.ResponseDTOString>(
    '/perf/FactNewCustomerScore/importData',
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}

/** 获取新客户得分记录列表 GET /perf/FactNewCustomerScore/list */
export async function getFactNewCustomerScoreList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactNewCustomerScoreListParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOListPerfFactNewCustomerScoreDTO>(
    '/perf/FactNewCustomerScore/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 新客户得分记录下拉列表 GET /perf/FactNewCustomerScore/option-select */
export async function optionFactNewCustomerScoreSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactNewCustomerScoreVO>(
    '/perf/FactNewCustomerScore/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取新客户得分记录列表 GET /perf/FactNewCustomerScore/page */
export async function getPagedFactNewCustomerScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactNewCustomerScoreParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactNewCustomerScoreDTO>(
    '/perf/FactNewCustomerScore/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除新客户得分记录 DELETE /perf/FactNewCustomerScore/remove/${param0} */
export async function removeFactNewCustomerScoreById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactNewCustomerScoreByIdParams,
  options?: { [key: string]: any },
) {
  const { newCustomerId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactNewCustomerScore/remove/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
