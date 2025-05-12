// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增评价 POST /travelerEvaluation */
export async function addEvaluation(
  body: API.AddEvaluationCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/travelerEvaluation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取评价详情 GET /travelerEvaluation/${param0} */
export async function getEvaluationInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEvaluationInfoParams,
  options?: { [key: string]: any },
) {
  const { evaluationId: param0, ...queryParams } = params;
  return request<API.ResponseDTOTravelerEvaluationDTO>(
    `/travelerEvaluation/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改评价 PUT /travelerEvaluation/${param0} */
export async function editEvaluation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editEvaluationParams,
  body: API.UpdateEvaluationCommand,
  options?: { [key: string]: any },
) {
  const { evaluationId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/travelerEvaluation/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除评价 DELETE /travelerEvaluation/batch-delete */
export async function batchRemoveEvaluation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchRemoveEvaluationParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/travelerEvaluation/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 评价下拉列表 GET /travelerEvaluation/dropdown */
export async function dropdownEvaluationList(options?: { [key: string]: any }) {
  return request<API.ResponseDTOListTravelerEvaluationVO>(
    '/travelerEvaluation/dropdown',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取评价列表 GET /travelerEvaluation/list */
export async function listEvaluation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listEvaluationParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOListTravelerEvaluationDTO>(
    '/travelerEvaluation/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 分页获取评价列表 GET /travelerEvaluation/page */
export async function getPagedEvaluations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPagedEvaluationsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTOTravelerEvaluationDTO>(
    '/travelerEvaluation/page',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 删除评价 DELETE /travelerEvaluation/remove/${param0} */
export async function removeEvaluation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeEvaluationParams,
  options?: { [key: string]: any },
) {
  const { evaluationId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/travelerEvaluation/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
