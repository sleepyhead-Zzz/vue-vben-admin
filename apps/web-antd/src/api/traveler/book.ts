// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** 新增预约表 POST /traveler/book */
export async function addBook(
  body: TravelerAPI.AddBookCommand,
  options?: { [key: string]: any }
) {
  return request<TravelerAPI.ResponseDTOVoid>("/traveler/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取预约表详情 GET /traveler/book/${param0} */
export async function getBookInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.getBookInfoParams,
  options?: { [key: string]: any }
) {
  const { bookId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOTravelerBookDTO>(
    `/traveler/book/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改预约表 PUT /traveler/book/${param0} */
export async function editBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.editBookParams,
  body: TravelerAPI.UpdateBookCommand,
  options?: { [key: string]: any }
) {
  const { bookId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOVoid>(`/traveler/book/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除预约表 DELETE /traveler/book/batch-delete */
export async function batchRemoveBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.batchRemoveBookParams,
  options?: { [key: string]: any }
) {
  return request<TravelerAPI.ResponseDTOVoid>("/traveler/book/batch-delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 取消预约 PUT /traveler/book/cancel/${param0} */
export async function cancelBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.cancelBookParams,
  options?: { [key: string]: any }
) {
  const { bookId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOVoid>(
    `/traveler/book/cancel/${param0}`,
    {
      method: "PUT",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取预约表列表 GET /traveler/book/list */
export async function listBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.listBookParams,
  options?: { [key: string]: any }
) {
  return request<TravelerAPI.ResponseDTOListTravelerBookDTO>(
    "/traveler/book/list",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页获取预约表列表 GET /traveler/book/page */
export async function getPagedBooks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.getPagedBooksParams,
  options?: { [key: string]: any }
) {
  return request<TravelerAPI.ResponseDTOPageDTOTravelerBookDTO>(
    "/traveler/book/page",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 删除预约表 DELETE /traveler/book/remove/${param0} */
export async function removeBook(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.removeBookParams,
  options?: { [key: string]: any }
) {
  const { bookId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOVoid>(
    `/traveler/book/remove/${param0}`,
    {
      method: "DELETE",
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 修改预约单状态 PUT /traveler/book/status/${param0} */
export async function changeBookingStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: TravelerAPI.changeBookingStatusParams,
  options?: { [key: string]: any }
) {
  const { bookId: param0, ...queryParams } = params;
  return request<TravelerAPI.ResponseDTOVoid>(
    `/traveler/book/status/${param0}`,
    {
      method: "PUT",
      params: {
        ...queryParams,
      },
      ...(options || {}),
    }
  );
}
