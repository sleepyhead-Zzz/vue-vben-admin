declare namespace PerfAPI {
  type AddPerfDimCustomerCommand = {
    /** 客户编码（ERP编码） */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 客户首次成交日期 */
    firstOrderDate?: string;
  };

  type AddPerfDimCustomerOwnerCommand = {
    /** 客户ID */
    customerId?: number;
    /** 销售人员ID（sys_user.id） */
    userId?: number;
    /** 归属开始日期 */
    startDate?: string;
    /** 归属结束日期（为空表示当前有效） */
    endDate?: string;
  };

  type AddPerfDimPeriodCommand = {
    /** 年份 */
    year: number;
    /** 周期类型：YEAR / MONTH / QUARTER */
    periodType: string;
    /** 月份（MONTH时必填） */
    month?: number;
    /** 季度（QUARTER时必填） */
    quarter?: number;
  };

  type AddPerfDimProductCommand = {
    /** 产品名称 */
    productName?: string;
    /** 产品分类（预留扩展） */
    category?: string;
    /** 是否启用 true=启用 false=停用 */
    isActive?: boolean;
  };

  type AddPerfFactProfitDataCommand = {
    /** 销售人员ID */
    userId?: number;
    /** 产品编码 */
    productId?: number;
    /** 净利润金额 */
    netProfit?: number;
    /** 订单日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
  };

  type AddPerfFactProfitPlanCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    productId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 计划利润金额 */
    planProfit?: number;
  };

  type AddPerfFactSalesDataCommand = {
    /** 销售人员ID */
    userId?: number;
    /** 业务经理姓名 */
    userName?: string;
    /** 客户ID */
    customerId?: number;
    /** 售达方名称 */
    customerName?: string;
    /** 产品编码 */
    productId?: number;
    /** 交货单数量 */
    quantity?: number;
    /** 交货单创建日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
  };

  type AddPerfFactSalesPlanCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    productId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 计划销量（吨） */
    planQuantity?: number;
  };

  type ColumnMappingDTO = {
    fieldName?: string;
    columnName?: string;
  };

  type editDimCustomerOwnerParams = {
    ownerId: number;
  };

  type editDimCustomerParams = {
    customerId: number;
  };

  type editFactProfitDataParams = {
    profitId: number;
  };

  type editFactProfitPlanParams = {
    planId: number;
  };

  type editPeriodParams = {
    periodId: number;
  };

  type editProductParams = {
    productId: number;
  };

  type editSalesDataParams = {
    saleId: number;
  };

  type editSalesPlanParams = {
    planId: number;
  };

  type exportDimCustomerByExcelParams = {
    query: PerfDimCustomerQuery;
  };

  type exportDimCustomerOwnerByExcelParams = {
    query: PerfDimCustomerOwnerQuery;
  };

  type exportFactProfitDataByExcelParams = {
    query: PerfFactProfitDataQuery;
  };

  type exportFactProfitPlanByExcelParams = {
    query: PerfFactProfitPlanQuery;
  };

  type exportPeriodByExcelParams = {
    query: PerfDimPeriodQuery;
  };

  type exportProductByExcelParams = {
    query: PerfDimProductQuery;
  };

  type exportSalesDataByExcelParams = {
    query: PerfFactSalesDataQuery;
  };

  type exportSalesPlanByExcelParams = {
    query: PerfFactSalesPlanQuery;
  };

  type getDimCustomerInfoParams = {
    /** 记录ID */
    customerId: number;
  };

  type getDimCustomerListParams = {
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

  type getDimCustomerOwnerInfoParams = {
    /** 记录ID */
    ownerId: number;
  };

  type getDimCustomerOwnerListParams = {
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

  type getFactProfitDataInfoParams = {
    /** 记录ID */
    profitId: number;
  };

  type getFactProfitDataListParams = {
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

  type getFactProfitPlanInfoParams = {
    /** 记录ID */
    planId: number;
  };

  type getFactProfitPlanListParams = {
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

  type getPagedDimCustomerOwnerParams = {
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

  type getPagedDimCustomerParams = {
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

  type getPagedFactProfitDataParams = {
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

  type getPagedFactProfitPlanParams = {
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

  type getPagedPeriodParams = {
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

  type getPagedProductParams = {
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

  type getPagedSalesDataParams = {
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

  type getPagedSalesPlanParams = {
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

  type getPeriodInfoParams = {
    /** 记录ID */
    periodId: number;
  };

  type getPeriodListParams = {
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

  type getProductInfoParams = {
    /** 记录ID */
    productId: number;
  };

  type getProductListParams = {
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

  type getSalesDataInfoParams = {
    /** 记录ID */
    salesId: number;
  };

  type getSalesDataListParams = {
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

  type getSalesPlanInfoParams = {
    /** 记录ID */
    salesPlanId: number;
  };

  type getSalesPlanListParams = {
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

  type ImportResponseDTO = {
    successCount?: number;
    failureCount?: number;
    hasError?: boolean;
    errorFileUrl?: string;
  };

  type PageDTOPerfDimCustomerDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfDimCustomerDTO[];
  };

  type PageDTOPerfDimCustomerOwnerDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfDimCustomerOwnerDTO[];
  };

  type PageDTOPerfDimPeriodDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfDimPeriodDTO[];
  };

  type PageDTOPerfDimProductDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfDimProductDTO[];
  };

  type PageDTOPerfFactProfitDataDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactProfitDataDTO[];
  };

  type PageDTOPerfFactProfitPlanDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactProfitPlanDTO[];
  };

  type PageDTOPerfFactSalesDataDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactSalesDataDTO[];
  };

  type PageDTOPerfFactSalesPlanDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactSalesPlanDTO[];
  };

  type PerfDimCustomerDTO = {
    /** 客户主键ID */
    customerId?: number;
    /** 客户编码 */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 客户首次成交日期 */
    firstOrderDate?: string;
  };

  type PerfDimCustomerOwnerDTO = {
    ownerId?: number;
    /** 客户ID */
    customerId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 归属开始日期 */
    startDate?: string;
    /** 归属结束日期 */
    endDate?: string;
  };

  type PerfDimCustomerOwnerQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type PerfDimCustomerOwnerVO = {
    /** ${comment} */
    id?: number;
    /** 客户ID */
    customerId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 归属开始日期 */
    startDate?: string;
    /** 归属结束日期 */
    endDate?: string;
  };

  type PerfDimCustomerQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type PerfDimCustomerVO = {
    /** 客户主键ID */
    customerId?: number;
    /** 客户编码 */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 客户首次成交日期 */
    firstOrderDate?: string;
  };

  type PerfDimPeriodDTO = {
    /** 周期主键ID */
    periodId?: number;
    /** 年份 */
    year?: number;
    /** 月份 */
    month?: number;
    /** 季度 */
    quarter?: number;
    /** 周期类型：month/quarter/year */
    periodType?: string;
    /** 周期开始日期 */
    startDate?: string;
    /** 周期结束日期 */
    endDate?: string;
  };

  type PerfDimPeriodQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type PerfDimPeriodVO = {
    /** 周期主键ID */
    periodId?: number;
    /** 年份 */
    year?: number;
    /** 月份 */
    month?: number;
    /** 季度 */
    quarter?: number;
    /** 周期类型：month/quarter/year */
    periodType?: string;
    /** 周期开始日期 */
    startDate?: string;
    /** 周期结束日期 */
    endDate?: string;
  };

  type PerfDimProductDTO = {
    /** 产品编码，例如 PMMA / MS */
    productId?: number;
    /** 产品名称 */
    productName?: string;
    /** 产品分类 */
    category?: string;
    /** 是否启用 true=启用 false=停用 */
    isActive?: string;
  };

  type PerfDimProductQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type PerfDimProductVO = {
    /** 产品编码，例如 PMMA / MS */
    productId?: number;
    /** 产品名称 */
    productName?: string;
  };

  type PerfFactProfitDataDTO = {
    /** ${comment} */
    profitId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 产品编码 */
    productId?: number;
    /** 净利润金额 */
    netProfit?: number;
    /** 订单日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
  };

  type PerfFactProfitDataQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type PerfFactProfitDataVO = {
    /** ${comment} */
    profitId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 产品编码 */
    productId?: number;
    /** 净利润金额 */
    netProfit?: number;
    /** 订单日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
  };

  type PerfFactProfitPlanDTO = {
    /** ${comment} */
    id?: number;
    /** ${comment} */
    userId?: number;
    /** ${comment} */
    productId?: number;
    /** ${comment} */
    periodId?: number;
    /** 计划利润金额 */
    planProfit?: number;
  };

  type PerfFactProfitPlanQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type PerfFactProfitPlanVO = {
    /** ${comment} */
    id?: number;
    /** ${comment} */
    userId?: number;
    /** ${comment} */
    productId?: number;
    /** ${comment} */
    periodId?: number;
    /** 计划利润金额 */
    planProfit?: number;
  };

  type PerfFactSalesDataDTO = {
    /** ${comment} */
    saleId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 业务经理姓名 */
    userName?: string;
    /** 客户ID */
    customerId?: number;
    /** 产品编码 */
    productId?: number;
    /** 销售数量 */
    quantity?: number;
    /** 交货单创建日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
  };

  type PerfFactSalesDataQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type PerfFactSalesDataVO = {
    /** ${comment} */
    saleId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 客户ID */
    customerId?: number;
    /** 产品编码 */
    productId?: number;
    /** 销售数量 */
    quantity?: number;
    /** 交货单创建日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
  };

  type PerfFactSalesPlanDTO = {
    /** ${comment} */
    planId?: number;
    /** ${comment} */
    userId?: number;
    /** ${comment} */
    productId?: number;
    /** ${comment} */
    periodId?: number;
    /** 计划销量 */
    planQuantity?: number;
  };

  type PerfFactSalesPlanQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type PerfFactSalesPlanVO = {
    /** ${comment} */
    id?: number;
    /** ${comment} */
    userId?: number;
    /** ${comment} */
    productId?: number;
    /** ${comment} */
    periodId?: number;
    /** 计划销量 */
    planQuantity?: number;
  };

  type removeDimCustomerByIdParams = {
    customerId: number;
  };

  type removeDimCustomerOwnerByIdParams = {
    ownerId: number;
  };

  type removeDimCustomerOwnerParams = {
    ownerIds: number[];
  };

  type removeDimCustomerParams = {
    customerIds: number[];
  };

  type removeFactProfitDataByIdParams = {
    profitId: number;
  };

  type removeFactProfitDataParams = {
    profitIds: number[];
  };

  type removeFactProfitPlanByIdParams = {
    planId: number;
  };

  type removeFactProfitPlanParams = {
    planIds: number[];
  };

  type removePeriodByIdParams = {
    periodId: number;
  };

  type removePeriodParams = {
    periodIds: number[];
  };

  type removeProductByIdParams = {
    productId: number;
  };

  type removeProductParams = {
    productIds: number[];
  };

  type removeSalesDataByIdParams = {
    salesId: number;
  };

  type removeSalesDataParams = {
    salesIds: number[];
  };

  type removeSalesPlanByIdParams = {
    salesPlanId: number;
  };

  type removeSalesPlanParams = {
    salesPlanIds: number[];
  };

  type ResponseDTOImportResponseDTO = {
    code?: number;
    message?: string;
    data?: ImportResponseDTO;
  };

  type ResponseDTOListPerfDimCustomerDTO = {
    code?: number;
    message?: string;
    data?: PerfDimCustomerDTO[];
  };

  type ResponseDTOListPerfDimCustomerOwnerDTO = {
    code?: number;
    message?: string;
    data?: PerfDimCustomerOwnerDTO[];
  };

  type ResponseDTOListPerfDimCustomerOwnerVO = {
    code?: number;
    message?: string;
    data?: PerfDimCustomerOwnerVO[];
  };

  type ResponseDTOListPerfDimCustomerVO = {
    code?: number;
    message?: string;
    data?: PerfDimCustomerVO[];
  };

  type ResponseDTOListPerfDimPeriodDTO = {
    code?: number;
    message?: string;
    data?: PerfDimPeriodDTO[];
  };

  type ResponseDTOListPerfDimPeriodVO = {
    code?: number;
    message?: string;
    data?: PerfDimPeriodVO[];
  };

  type ResponseDTOListPerfDimProductDTO = {
    code?: number;
    message?: string;
    data?: PerfDimProductDTO[];
  };

  type ResponseDTOListPerfDimProductVO = {
    code?: number;
    message?: string;
    data?: PerfDimProductVO[];
  };

  type ResponseDTOListPerfFactProfitDataDTO = {
    code?: number;
    message?: string;
    data?: PerfFactProfitDataDTO[];
  };

  type ResponseDTOListPerfFactProfitDataVO = {
    code?: number;
    message?: string;
    data?: PerfFactProfitDataVO[];
  };

  type ResponseDTOListPerfFactProfitPlanDTO = {
    code?: number;
    message?: string;
    data?: PerfFactProfitPlanDTO[];
  };

  type ResponseDTOListPerfFactProfitPlanVO = {
    code?: number;
    message?: string;
    data?: PerfFactProfitPlanVO[];
  };

  type ResponseDTOListPerfFactSalesDataDTO = {
    code?: number;
    message?: string;
    data?: PerfFactSalesDataDTO[];
  };

  type ResponseDTOListPerfFactSalesDataVO = {
    code?: number;
    message?: string;
    data?: PerfFactSalesDataVO[];
  };

  type ResponseDTOListPerfFactSalesPlanDTO = {
    code?: number;
    message?: string;
    data?: PerfFactSalesPlanDTO[];
  };

  type ResponseDTOListPerfFactSalesPlanVO = {
    code?: number;
    message?: string;
    data?: PerfFactSalesPlanVO[];
  };

  type ResponseDTOPageDTOPerfDimCustomerDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfDimCustomerDTO;
  };

  type ResponseDTOPageDTOPerfDimCustomerOwnerDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfDimCustomerOwnerDTO;
  };

  type ResponseDTOPageDTOPerfDimPeriodDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfDimPeriodDTO;
  };

  type ResponseDTOPageDTOPerfDimProductDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfDimProductDTO;
  };

  type ResponseDTOPageDTOPerfFactProfitDataDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactProfitDataDTO;
  };

  type ResponseDTOPageDTOPerfFactProfitPlanDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactProfitPlanDTO;
  };

  type ResponseDTOPageDTOPerfFactSalesDataDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactSalesDataDTO;
  };

  type ResponseDTOPageDTOPerfFactSalesPlanDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactSalesPlanDTO;
  };

  type ResponseDTOPerfDimCustomerDTO = {
    code?: number;
    message?: string;
    data?: PerfDimCustomerDTO;
  };

  type ResponseDTOPerfDimCustomerOwnerDTO = {
    code?: number;
    message?: string;
    data?: PerfDimCustomerOwnerDTO;
  };

  type ResponseDTOPerfDimPeriodDTO = {
    code?: number;
    message?: string;
    data?: PerfDimPeriodDTO;
  };

  type ResponseDTOPerfDimProductDTO = {
    code?: number;
    message?: string;
    data?: PerfDimProductDTO;
  };

  type ResponseDTOPerfFactProfitDataDTO = {
    code?: number;
    message?: string;
    data?: PerfFactProfitDataDTO;
  };

  type ResponseDTOPerfFactProfitPlanDTO = {
    code?: number;
    message?: string;
    data?: PerfFactProfitPlanDTO;
  };

  type ResponseDTOPerfFactSalesDataDTO = {
    code?: number;
    message?: string;
    data?: PerfFactSalesDataDTO;
  };

  type ResponseDTOPerfFactSalesPlanDTO = {
    code?: number;
    message?: string;
    data?: PerfFactSalesPlanDTO;
  };

  type ResponseDTOString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type ResponseDTOVoid = {
    code?: number;
    message?: string;
    data?: any;
  };

  type SalesDataImportRequest = {
    sheetName?: string;
    columnMappings?: ColumnMappingDTO[];
    updateSupport?: boolean;
    /** 产品编码 */
    productId?: number;
  };

  type UpdatePerfDimCustomerCommand = {
    /** 客户编码（ERP编码） */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 客户首次成交日期 */
    firstOrderDate?: string;
    customerId?: number;
  };

  type UpdatePerfDimCustomerOwnerCommand = {
    /** 客户ID */
    customerId?: number;
    /** 销售人员ID（sys_user.id） */
    userId?: number;
    /** 归属开始日期 */
    startDate?: string;
    /** 归属结束日期（为空表示当前有效） */
    endDate?: string;
    ownerId?: number;
  };

  type UpdatePerfDimPeriodCommand = {
    /** 年份 */
    year: number;
    /** 周期类型：YEAR / MONTH / QUARTER */
    periodType: string;
    /** 月份（MONTH时必填） */
    month?: number;
    /** 季度（QUARTER时必填） */
    quarter?: number;
    periodId?: number;
  };

  type UpdatePerfDimProductCommand = {
    /** 产品名称 */
    productName?: string;
    /** 产品分类（预留扩展） */
    category?: string;
    /** 是否启用 true=启用 false=停用 */
    isActive?: boolean;
    productId?: number;
  };

  type UpdatePerfFactProfitDataCommand = {
    /** 销售人员ID */
    userId?: number;
    /** 产品编码 */
    productId?: number;
    /** 净利润金额 */
    netProfit?: number;
    /** 订单日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
    profitId?: number;
  };

  type UpdatePerfFactProfitPlanCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    productId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 计划利润金额 */
    planProfit?: number;
    planId?: number;
  };

  type UpdatePerfFactSalesDataCommand = {
    /** 销售人员ID */
    userId?: number;
    /** 业务经理姓名 */
    userName?: string;
    /** 客户ID */
    customerId?: number;
    /** 售达方名称 */
    customerName?: string;
    /** 产品编码 */
    productId?: number;
    /** 交货单数量 */
    quantity?: number;
    /** 交货单创建日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
    saleId?: number;
  };

  type UpdatePerfFactSalesPlanCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    productId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 计划销量（吨） */
    planQuantity?: number;
    planId?: number;
  };
}
