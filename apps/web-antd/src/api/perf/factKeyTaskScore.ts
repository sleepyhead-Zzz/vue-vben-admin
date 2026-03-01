// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增重点工作得分 POST /perf/FactKeyTaskScore */
export async function addFactKeyTaskScore(
  body: PerfAPI.AddPerfFactKeyTaskScoreCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactKeyTaskScore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除重点工作得分 DELETE /perf/FactKeyTaskScore */
export async function removeFactKeyTaskScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactKeyTaskScoreParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactKeyTaskScore', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取重点工作得分详情 GET /perf/FactKeyTaskScore/${param0} */
export async function getFactKeyTaskScoreInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactKeyTaskScoreInfoParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactKeyTaskScoreDTO>(
    `/perf/FactKeyTaskScore/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改重点工作得分 PUT /perf/FactKeyTaskScore/${param0} */
export async function editFactKeyTaskScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editFactKeyTaskScoreParams,
  body: PerfAPI.UpdatePerfFactKeyTaskScoreCommand,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(`/perf/FactKeyTaskScore/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 重点工作得分列表导出 GET /perf/FactKeyTaskScore/excel */
export async function exportFactKeyTaskScoreByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactKeyTaskScoreByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/perf/FactKeyTaskScore/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 重点工作得分导入Excel模板下载 GET /perf/FactKeyTaskScore/excelTemplate */
export async function downloadFactKeyTaskScoreExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/perf/FactKeyTaskScore/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 重点工作得分列表导入 POST /perf/FactKeyTaskScore/importData */
export async function importFactKeyTaskScoreByExcel(
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
    '/perf/FactKeyTaskScore/importData',
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}

/** 获取重点工作得分列表 GET /perf/FactKeyTaskScore/list */
export async function getFactKeyTaskScoreList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactKeyTaskScoreListParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOListPerfFactKeyTaskScoreDTO>(
    '/perf/FactKeyTaskScore/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 重点工作得分下拉列表 GET /perf/FactKeyTaskScore/option-select */
export async function optionFactKeyTaskScoreSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactKeyTaskScoreVO>(
    '/perf/FactKeyTaskScore/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取重点工作得分列表 GET /perf/FactKeyTaskScore/page */
export async function getPagedFactKeyTaskScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactKeyTaskScoreParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactKeyTaskScoreDTO>(
    '/perf/FactKeyTaskScore/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除重点工作得分 DELETE /perf/FactKeyTaskScore/remove/${param0} */
export async function removeFactKeyTaskScoreById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactKeyTaskScoreByIdParams,
  options?: { [key: string]: any },
) {
  const { taskId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactKeyTaskScore/remove/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
