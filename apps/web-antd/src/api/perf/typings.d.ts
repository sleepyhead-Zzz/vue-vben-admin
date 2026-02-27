declare namespace PerfAPI {
  type AddPerfDimPeriodCommand = {
    /** 年份 */
    year?: number;
    /** 月份（period_type=month时有效） */
    month?: number;
    /** 季度（period_type=quarter时有效） */
    quarter?: number;
    /** 周期类型：month/quarter/year */
    periodType?: string;
    /** 周期开始日期 */
    startDate?: string;
    /** 周期结束日期 */
    endDate?: string;
  };

  type AddPerfDimProductCommand = {
    /** 产品名称 */
    productName?: string;
    /** 产品分类（预留扩展） */
    category?: string;
    /** 是否启用 true=启用 false=停用 */
    isActive?: boolean;
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
    productCode?: string;
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
    productCode?: string;
    /** ${column.columnComment} */
    periodId?: number;
    /** 计划销量（吨） */
    planQuantity?: number;
  };

  type ColumnMappingDTO = {
    fieldName?: string;
    columnName?: string;
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
    productCode?: string;
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
    productCode?: string;
    /** 产品名称 */
    productName?: string;
  };

  type PerfFactSalesDataDTO = {
    /** ${comment} */
    saleId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 客户ID */
    customerId?: number;
    /** 产品编码 */
    productCode?: string;
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
    productCode?: string;
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
    productCode?: string;
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
    productCode?: string;
    /** ${comment} */
    periodId?: number;
    /** 计划销量 */
    planQuantity?: number;
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
    salesdataId: number;
  };

  type removeSalesDataParams = {
    salesdataIds: number[];
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
    /** 销售人员ID */
    userId?: number;
    /** 业务经理姓名 */
    userName?: string;
    /** 客户ID */
    customerId?: number;
    /** 售达方名称 */
    customerName?: string;
    /** 产品编码 */
    productCode?: string;
    /** 交货单数量 */
    quantity?: number;
    /** 交货单创建日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
  };

  type UpdatePerfDimPeriodCommand = {
    /** 年份 */
    year?: number;
    /** 月份（period_type=month时有效） */
    month?: number;
    /** 季度（period_type=quarter时有效） */
    quarter?: number;
    /** 周期类型：month/quarter/year */
    periodType?: string;
    /** 周期开始日期 */
    startDate?: string;
    /** 周期结束日期 */
    endDate?: string;
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
    productCode?: string;
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
    productCode?: string;
    /** ${column.columnComment} */
    periodId?: number;
    /** 计划销量（吨） */
    planQuantity?: number;
    planId?: number;
  };
}
