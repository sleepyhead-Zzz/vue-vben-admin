declare namespace TravelerAPI {
  type AddBookCommand = {
    travelerName?: string;
    documentType?: string;
    documentNumber?: string;
    gender?: string;
    language?: string;
    phoneNumber?: string;
    service?: string;
    address?: string;
    /** 血压是否正常 */
    bloodPressureNormal?: string;
    /** 心脏是否正常 */
    heartNormal?: string;
    remarks?: string;
    travelerType?: string;
    flightNumber?: string;
    checkedBaggage?: number;
    handBaggage?: number;
    companionName?: string;
    relation?: string;
    companionPhone?: string;
    flightTime?: string;
    /** 服务人员 */
    staffId?: string;
    /** 开始时间 */
    serviceStartTime?: string;
    serviceEndTime?: string;
  };

  type AddEvaluationCommand = {
    bookId?: number;
    serviceAttitude?: number;
    professionalism?: number;
    evaluationContent?: string;
    fileIds?: number[];
  };

  type batchRemoveBookParams = {
    bookIds: number[];
  };

  type batchRemoveEvaluationParams = {
    evaluationIds: number[];
  };

  type cancelBookParams = {
    bookId: number;
  };

  type changeBookingStatusParams = {
    bookId: number;
    status: number;
  };

  type editBookParams = {
    bookId: number;
  };

  type editEvaluationParams = {
    evaluationId: number;
  };

  type getBookInfoParams = {
    /** 记录ID */
    bookId: number;
  };

  type getEvaluationInfoByBookIdParams = {
    /** 预约ID */
    bookId: number;
  };

  type getEvaluationInfoParams = {
    /** 记录ID */
    evaluationId: number;
  };

  type getPagedBooksParams = {
    keyword?: string;
    status?: string;
    pageNum?: number;
    pageSize?: number;
    /** 排序字段 */
    orderColumn?: string;
    /** 排序方向 */
    orderDirection?: string;
    /** 时间范围字段名 */
    timeRangeColumn?: string;
    /** 开始时间 */
    beginTime?: Date;
    /** 结束时间 */
    endTime?: Date;
  };

  type getPagedEvaluationsParams = {
    pageNum?: number;
    pageSize?: number;
    /** 排序字段 */
    orderColumn?: string;
    /** 排序方向 */
    orderDirection?: string;
    /** 时间范围字段名 */
    timeRangeColumn?: string;
    /** 开始时间 */
    beginTime?: Date;
    /** 结束时间 */
    endTime?: Date;
  };

  type listBookParams = {
    keyword?: string;
    status?: string;
    /** 排序字段 */
    orderColumn?: string;
    /** 排序方向 */
    orderDirection?: string;
    /** 时间范围字段名 */
    timeRangeColumn?: string;
    /** 开始时间 */
    beginTime?: Date;
    /** 结束时间 */
    endTime?: Date;
  };

  type listEvaluationParams = {
    /** 排序字段 */
    orderColumn?: string;
    /** 排序方向 */
    orderDirection?: string;
    /** 时间范围字段名 */
    timeRangeColumn?: string;
    /** 开始时间 */
    beginTime?: Date;
    /** 结束时间 */
    endTime?: Date;
  };

  type PageDTOTravelerBookDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: TravelerBookDTO[];
  };

  type PageDTOTravelerEvaluationDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: TravelerEvaluationDTO[];
  };

  type removeBookParams = {
    bookId: number;
  };

  type removeEvaluationParams = {
    evaluationId: number;
  };

  type ResponseDTOListTravelerBookDTO = {
    code?: number;
    message?: string;
    data?: TravelerBookDTO[];
  };

  type ResponseDTOListTravelerEvaluationDTO = {
    code?: number;
    message?: string;
    data?: TravelerEvaluationDTO[];
  };

  type ResponseDTOPageDTOTravelerBookDTO = {
    code?: number;
    message?: string;
    data?: PageDTOTravelerBookDTO;
  };

  type ResponseDTOPageDTOTravelerEvaluationDTO = {
    code?: number;
    message?: string;
    data?: PageDTOTravelerEvaluationDTO;
  };

  type ResponseDTOTravelerBookDTO = {
    code?: number;
    message?: string;
    data?: TravelerBookDTO;
  };

  type ResponseDTOTravelerEvaluationDTO = {
    code?: number;
    message?: string;
    data?: TravelerEvaluationDTO;
  };

  type ResponseDTOVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type SysFileUploadDTO = {
    url?: string;
    fileName?: string;
    fileId?: number;
  };

  type TravelerBookDTO = {
    bookId?: number;
    travelerName?: string;
    documentType?: string;
    documentNumber?: string;
    gender?: string;
    language?: string;
    phoneNumber?: string;
    service?: string;
    address?: string;
    /** 血压是否正常 */
    bloodPressureNormal?: string;
    /** 心脏是否正常 */
    heartNormal?: string;
    remarks?: string;
    travelerType?: string;
    flightNumber?: string;
    checkedBaggage?: number;
    handBaggage?: number;
    companionName?: string;
    relation?: string;
    companionPhone?: string;
    /** 状态 */
    status?: number;
    flightTime?: string;
    createTime?: string;
    /** 服务人员 */
    staffId?: number;
    staffName?: string;
    staffPhone?: string;
    /** 开始时间 */
    serviceStartTime?: string;
    /** 接单时间 */
    orderTime?: string;
    /** 服务结束时间 */
    serviceEndTime?: string;
    /** 取消时间 */
    cancelTime?: string;
    createDept?: number;
  };

  type TravelerEvaluationDTO = {
    evaluationId?: number;
    bookId?: number;
    serviceAttitude?: number;
    professionalism?: number;
    evaluationContent?: string;
    files?: SysFileUploadDTO[];
  };

  type UpdateBookCommand = {
    travelerName?: string;
    documentType?: string;
    documentNumber?: string;
    gender?: string;
    language?: string;
    phoneNumber?: string;
    service?: string;
    address?: string;
    /** 血压是否正常 */
    bloodPressureNormal?: string;
    /** 心脏是否正常 */
    heartNormal?: string;
    remarks?: string;
    travelerType?: string;
    flightNumber?: string;
    checkedBaggage?: number;
    handBaggage?: number;
    companionName?: string;
    relation?: string;
    companionPhone?: string;
    flightTime?: string;
    /** 服务人员 */
    staffId?: string;
    /** 开始时间 */
    serviceStartTime?: string;
    serviceEndTime?: string;
    bookId?: number;
  };

  type UpdateEvaluationCommand = {
    bookId?: number;
    serviceAttitude?: number;
    professionalism?: number;
    evaluationContent?: string;
    fileIds?: number[];
    evaluationId?: number;
  };
}
