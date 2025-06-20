// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增评价 POST /traveler/evaluation */
export async function addEvaluation(
  body: TravelerAPI.AddEvaluationCommand,
  options?: { [key: string]: any }
) {
  return request<TravelerAPI.ResponseDTOVoid>("/traveler/evaluation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取评价详情 GET /traveler/evaluation/${param0} */
export async function getEvaluationInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.getEvaluationInfoParams,
  options?: { [key: string]: any }
) {
  const { evaluationId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOTravelerEvaluationDTO>(
    `/traveler/evaluation/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改评价 PUT /traveler/evaluation/${param0} */
export async function editEvaluation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.editEvaluationParams,
  body: TravelerAPI.UpdateEvaluationCommand,
  options?: { [key: string]: any }
) {
  const { evaluationId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOVoid>(
    `/traveler/evaluation/${param0}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}

/** 根据预约单获取评价详情 GET /traveler/evaluation/${param0}/book */
export async function getEvaluationInfoByBookId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.getEvaluationInfoByBookIdParams,
  options?: { [key: string]: any }
) {
  const { bookId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOTravelerEvaluationDTO>(
    `/traveler/evaluation/${param0}/book`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 批量删除评价 DELETE /traveler/evaluation/batch-delete */
export async function batchRemoveEvaluation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.batchRemoveEvaluationParams,
  options?: { [key: string]: any }
) {
  return request<TravelerAPI.ResponseDTOVoid>(
    "/traveler/evaluation/batch-delete",
    {
      method: "DELETE",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取评价列表 GET /traveler/evaluation/list */
export async function listEvaluation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.listEvaluationParams,
  options?: { [key: string]: any }
) {
  return request<TravelerAPI.ResponseDTOListTravelerEvaluationDTO>(
    "/traveler/evaluation/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取评价列表 GET /traveler/evaluation/page */
export async function getPagedEvaluations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.getPagedEvaluationsParams,
  options?: { [key: string]: any }
) {
  return request<TravelerAPI.ResponseDTOPageDTOTravelerEvaluationDTO>(
    "/traveler/evaluation/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除评价 DELETE /traveler/evaluation/remove/${param0} */
export async function removeEvaluation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.removeEvaluationParams,
  options?: { [key: string]: any }
) {
  const { evaluationId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOVoid>(
    `/traveler/evaluation/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
