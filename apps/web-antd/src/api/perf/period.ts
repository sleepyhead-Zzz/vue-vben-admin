// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增绩效周期维度 POST /perf/period */
export async function addPeriod(
  body: PerfAPI.AddPerfDimPeriodCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除绩效周期维度 DELETE /perf/period */
export async function removePeriod(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removePeriodParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/period', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取绩效周期维度详情 GET /perf/period/${param0} */
export async function getPeriodInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPeriodInfoParams,
  options?: { [key: string]: any },
) {
  const { periodId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfDimPeriodDTO>(
    `/perf/period/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改绩效周期维度 PUT /perf/period/${param0} */
export async function editPeriod(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editPeriodParams,
  body: PerfAPI.UpdatePerfDimPeriodCommand,
  options?: { [key: string]: any },
) {
  const { periodId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/period/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 绩效周期维度列表导出 GET /perf/period/excel */
export async function exportPeriodByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportPeriodByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/perf/period/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 绩效周期维度导入Excel模板下载 GET /perf/period/excelTemplate */
export async function downloadPeriodExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/perf/period/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 绩效周期维度列表导入 POST /perf/period/importData */
export async function importPeriodByExcel(
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

  return request<PerfAPI.ResponseDTOString>('/perf/period/importData', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取绩效周期维度列表 GET /perf/period/list */
export async function getPeriodList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPeriodListParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOListPerfDimPeriodDTO>('/perf/period/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 绩效周期维度下拉列表 GET /perf/period/option-select */
export async function optionPeriodSelect(options?: { [key: string]: any }) {
  return request<PerfAPI.ResponseDTOListPerfDimPeriodVO>(
    '/perf/period/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取绩效周期维度列表 GET /perf/period/page */
export async function getPagedPeriod(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedPeriodParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfDimPeriodDTO>(
    '/perf/period/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除绩效周期维度 DELETE /perf/period/remove/${param0} */
export async function removePeriodById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removePeriodByIdParams,
  options?: { [key: string]: any },
) {
  const { periodId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/period/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
