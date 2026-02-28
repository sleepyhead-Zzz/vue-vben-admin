// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增利润明细事实 POST /perf/FactProfitData */
export async function addFactProfitData(
  body: PerfAPI.AddPerfFactProfitDataCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactProfitData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除利润明细事实 DELETE /perf/FactProfitData */
export async function removeFactProfitData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactProfitDataParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactProfitData', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取利润明细事实详情 GET /perf/FactProfitData/${param0} */
export async function getFactProfitDataInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactProfitDataInfoParams,
  options?: { [key: string]: any },
) {
  const { profitId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactProfitDataDTO>(
    `/perf/FactProfitData/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改利润明细事实 PUT /perf/FactProfitData/${param0} */
export async function editFactProfitData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editFactProfitDataParams,
  body: PerfAPI.UpdatePerfFactProfitDataCommand,
  options?: { [key: string]: any },
) {
  const { profitId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/FactProfitData/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 利润明细事实列表导出 GET /perf/FactProfitData/excel */
export async function exportFactProfitDataByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactProfitDataByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/perf/FactProfitData/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 利润明细事实导入Excel模板下载 GET /perf/FactProfitData/excelTemplate */
export async function downloadFactProfitDataExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/perf/FactProfitData/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 利润明细事实列表导入 POST /perf/FactProfitData/importData */
export async function importFactProfitDataByExcel(
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

  return request<PerfAPI.ResponseDTOString>('/perf/FactProfitData/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取利润明细事实列表 GET /perf/FactProfitData/list */
export async function getFactProfitDataList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactProfitDataListParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOListPerfFactProfitDataDTO>(
    '/perf/FactProfitData/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 利润明细事实下拉列表 GET /perf/FactProfitData/option-select */
export async function optionFactProfitDataSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactProfitDataVO>(
    '/perf/FactProfitData/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取利润明细事实列表 GET /perf/FactProfitData/page */
export async function getPagedFactProfitData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactProfitDataParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactProfitDataDTO>(
    '/perf/FactProfitData/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除利润明细事实 DELETE /perf/FactProfitData/remove/${param0} */
export async function removeFactProfitDataById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactProfitDataByIdParams,
  options?: { [key: string]: any },
) {
  const { profitId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactProfitData/remove/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
