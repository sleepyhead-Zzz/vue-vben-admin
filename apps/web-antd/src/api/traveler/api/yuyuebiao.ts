// @ts-ignore
/* eslint-disable */
import request from '#/api/request';

/** 新增预约表 POST /travelerBook */
export async function addBook(
  body: API.AddBookCommand,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/travelerBook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取预约表详情 GET /travelerBook/${param0} */
export async function getBookInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBookInfoParams,
  options?: { [key: string]: any },
) {
  const { bookId: param0, ...queryParams } = params;
  return request<API.ResponseDTOTravelerBookDTO>(`/travelerBook/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改预约表 PUT /travelerBook/${param0} */
export async function editBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editBookParams,
  body: API.UpdateBookCommand,
  options?: { [key: string]: any },
) {
  const { bookId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/travelerBook/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除预约表 DELETE /travelerBook/batch-delete */
export async function batchRemoveBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchRemoveBookParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOVoid>('/travelerBook/batch-delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 取消预约 PUT /travelerBook/cancel/${param0} */
export async function cancelBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelBookParams,
  options?: { [key: string]: any },
) {
  const { bookingId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/travelerBook/cancel/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 预约表下拉列表 GET /travelerBook/dropdown */
export async function dropdownBookList(options?: { [key: string]: any }) {
  return request<API.ResponseDTOListTravelerBookVO>('/travelerBook/dropdown', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取预约表列表 GET /travelerBook/list */
export async function listBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listBookParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOListTravelerBookDTO>('/travelerBook/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取预约表列表 GET /travelerBook/page */
export async function getPagedBooks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPagedBooksParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDTOPageDTOTravelerBookDTO>('/travelerBook/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除预约表 DELETE /travelerBook/remove/${param0} */
export async function removeBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeBookParams,
  options?: { [key: string]: any },
) {
  const { bookId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/travelerBook/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改预约单状态 PUT /travelerBook/status/${param0} */
export async function changeBookingStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeBookingStatusParams,
  options?: { [key: string]: any },
) {
  const { bookingId: param0, ...queryParams } = params;
  return request<API.ResponseDTOVoid>(`/travelerBook/status/${param0}`, {
    method: 'PUT',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
