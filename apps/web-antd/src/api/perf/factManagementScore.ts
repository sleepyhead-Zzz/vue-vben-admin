// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增内部管理得分：周报/样品反馈/执行力等 POST /perf/FactManagementScore */
export async function addFactManagementScore(
  body: PerfAPI.AddPerfFactManagementScoreCommand,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactManagementScore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除内部管理得分：周报/样品反馈/执行力等 DELETE /perf/FactManagementScore */
export async function removeFactManagementScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactManagementScoreParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOVoid>('/perf/FactManagementScore', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取内部管理得分：周报/样品反馈/执行力等详情 GET /perf/FactManagementScore/${param0} */
export async function getFactManagementScoreInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactManagementScoreInfoParams,
  options?: { [key: string]: any },
) {
  const { managementId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOPerfFactManagementScoreDTO>(
    `/perf/FactManagementScore/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改内部管理得分：周报/样品反馈/执行力等 PUT /perf/FactManagementScore/${param0} */
export async function editFactManagementScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.editFactManagementScoreParams,
  body: PerfAPI.UpdatePerfFactManagementScoreCommand,
  options?: { [key: string]: any },
) {
  const { managementId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactManagementScore/${param0}`,
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

/** 内部管理得分：周报/样品反馈/执行力等列表导出 GET /perf/FactManagementScore/excel */
export async function exportFactManagementScoreByExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.exportFactManagementScoreByExcelParams,
  options?: { [key: string]: any },
) {
  return request<any>('/perf/FactManagementScore/excel', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}

/** 内部管理得分：周报/样品反馈/执行力等导入Excel模板下载 GET /perf/FactManagementScore/excelTemplate */
export async function downloadFactManagementScoreExcelTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>('/perf/FactManagementScore/excelTemplate', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 内部管理得分：周报/样品反馈/执行力等列表导入 POST /perf/FactManagementScore/importData */
export async function importFactManagementScoreByExcel(
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
    '/perf/FactManagementScore/importData',
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}

/** 获取内部管理得分：周报/样品反馈/执行力等列表 GET /perf/FactManagementScore/list */
export async function getFactManagementScoreList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getFactManagementScoreListParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOListPerfFactManagementScoreDTO>(
    '/perf/FactManagementScore/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 内部管理得分：周报/样品反馈/执行力等下拉列表 GET /perf/FactManagementScore/option-select */
export async function optionFactManagementScoreSelect(options?: {
  [key: string]: any;
}) {
  return request<PerfAPI.ResponseDTOListPerfFactManagementScoreVO>(
    '/perf/FactManagementScore/option-select',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 分页获取内部管理得分：周报/样品反馈/执行力等列表 GET /perf/FactManagementScore/page */
export async function getPagedFactManagementScore(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.getPagedFactManagementScoreParams,
  options?: { [key: string]: any },
) {
  return request<PerfAPI.ResponseDTOPageDTOPerfFactManagementScoreDTO>(
    '/perf/FactManagementScore/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除内部管理得分：周报/样品反馈/执行力等 DELETE /perf/FactManagementScore/remove/${param0} */
export async function removeFactManagementScoreById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: PerfAPI.removeFactManagementScoreByIdParams,
  options?: { [key: string]: any },
) {
  const { managementId: param0, ...queryParams } = params;
  return request<PerfAPI.ResponseDTOVoid>(
    `/perf/FactManagementScore/remove/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
