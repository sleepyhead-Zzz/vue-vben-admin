declare namespace PerfAPI {
  type AddPerfDimCustomerCommand = {
    /** 客户编码（ERP编码） */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 客户首次成交日期 */
    firstOrderDate?: string;
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

  type AddPerfFactKeyTaskScoreCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 重点工作平均得分 */
    scoreValue?: number;
    /** Q1得分 */
    q1Score?: number;
    /** Q2得分 */
    q2Score?: number;
    /** Q3得分 */
    q3Score?: number;
    /** Q4得分 */
    q4Score?: number;
  };

  type AddPerfFactManagementScoreCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 评分类型：1-周报，2-样品反馈，3-执行力，4-逾期 */
    scoreType?: string;
    /** 得分（可正可负） */
    scoreValue?: number;
  };

  type AddPerfFactNewCustomerScoreCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    customerId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** ${column.columnComment} */
    scoreValue?: number;
  };

  type AddPerfFactOverdueRecordCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    customerId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 逾期区间：0_10/11_30/31_59/60_90/90_plus */
    overdueLevel?: string;
    /** 最终扣分值 */
    scoreValue?: number;
  };

  type AddPerfFactPerformanceResultCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 销量得分 */
    salesScore?: number;
    /** 利润得分 */
    profitScore?: number;
    /** 重点工作得分 */
    keyTaskScore?: number;
    /** 内部管理得分 */
    managementScore?: number;
    /** 新客户得分 */
    newCustomerScore?: number;
    /** 最终绩效总分 */
    finalScore?: number;
    /** 绩效计算时间 */
    calculatedAt?: string;
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
    /** 用户ID */
    userId?: number;
    /** 产品ID */
    productId?: number;
    /** 期间ID */
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
    /** 交货单号码 */
    deliveryNo?: string;
    /** 批次 */
    batchNo?: string;
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
    /** 用户ID */
    userId?: number;
    /** 产品ID */
    productId?: number;
    /** 期间ID */
    periodId?: number;
    /** 计划销量（吨） */
    planQuantity?: number;
  };

  type ColumnMappingDTO = {
    fieldName?: string;
    columnName?: string;
  };

  type editDimCustomerParams = {
    customerId: number;
  };

  type editFactKeyTaskScoreParams = {
    taskId: number;
  };

  type editFactManagementScoreParams = {
    managementId: number;
  };

  type editFactNewCustomerScoreParams = {
    newCustomerId: number;
  };

  type editFactOverdueRecordParams = {
    overdueId: number;
  };

  type editFactPerformanceResultParams = {
    performanceId: number;
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

  type editProfitDataParams = {
    profitId: number;
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

  type exportFactKeyTaskScoreByExcelParams = {
    query: PerfFactKeyTaskScoreQuery;
  };

  type exportFactManagementScoreByExcelParams = {
    query: PerfFactManagementScoreQuery;
  };

  type exportFactNewCustomerScoreByExcelParams = {
    query: PerfFactNewCustomerScoreQuery;
  };

  type exportFactOverdueRecordByExcelParams = {
    query: PerfFactOverdueRecordQuery;
  };

  type exportFactPerformanceResultByExcelParams = {
    query: PerfFactPerformanceResultQuery;
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

  type exportProfitDataByExcelParams = {
    query: PerfFactProfitDataQuery;
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

  type getFactKeyTaskScoreInfoParams = {
    /** 记录ID */
    taskId: number;
  };

  type getFactKeyTaskScoreListParams = {
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

  type getFactManagementScoreInfoParams = {
    /** 记录ID */
    managementId: number;
  };

  type getFactManagementScoreListParams = {
    userId?: number;
    periodId?: number;
    scoreType?: string;
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

  type getFactNewCustomerScoreInfoParams = {
    /** 记录ID */
    newCustomerId: number;
  };

  type getFactNewCustomerScoreListParams = {
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

  type getFactOverdueRecordInfoParams = {
    /** 记录ID */
    overdueId: number;
  };

  type getFactOverdueRecordListParams = {
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

  type getFactPerformanceResultInfoParams = {
    /** 记录ID */
    performanceId: number;
  };

  type getFactPerformanceResultListParams = {
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

  type getPagedDimCustomerParams = {
    customerName?: string;
    customerCode?: string;
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

  type getPagedFactKeyTaskScoreParams = {
    userId?: number;
    periodId?: number;
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

  type getPagedFactManagementScoreParams = {
    userId?: number;
    periodId?: number;
    scoreType?: string;
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

  type getPagedFactNewCustomerScoreParams = {
    userId?: number;
    customerId?: number;
    periodId?: number;
    scoreValue?: number;
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

  type getPagedFactOverdueRecordParams = {
    periodId?: number;
    userId?: number;
    overdueLevel?: string;
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

  type getPagedFactPerformanceResultParams = {
    userId?: number;
    periodId?: number;
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
    userId?: number;
    productId?: number;
    periodId?: number;
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
    year?: number;
    /** 周期类型：1-年度，2-月度，3-季度 */
    periodType?: string;
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
    productName?: string;
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

  type getPagedProfitDataParams = {
    userId?: number;
    productId?: number;
    periodId?: number;
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
    productId?: number;
    userId?: number;
    periodId?: number;
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
    userId?: number;
    productId?: number;
    periodId?: number;
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
    /** 周期类型：1-年度，2-月度，3-季度 */
    periodType?: string;
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

  type getProfitDataInfoParams = {
    /** 记录ID */
    profitId: number;
  };

  type getProfitDataListParams = {
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

  type JobSubmitResponseDTO = {
    /** 任务ID */
    taskId?: number;
    /** workflowId */
    workflowId?: string;
    /** runId */
    runId?: string;
    /** 任务状态 */
    status?: string;
  };

  type KeyTaskScoreImportRequest = {
    sheetName?: string;
    columnMappings?: ColumnMappingDTO[];
    updateSupport?: boolean;
    /** 年份 */
    year?: number;
  };

  type ManagementScoreImportRequest = {
    sheetName?: string;
    columnMappings?: ColumnMappingDTO[];
    updateSupport?: boolean;
    /** 年份 */
    year?: number;
    /** 类型：1-周报，2-样品反馈，3-执行力，4-逾期 */
    scoreType?: string;
  };

  type optionPeriodSelectParams = {
    /** 周期类型：1-年度，2-月度，3-季度 */
    periodType?: string;
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

  type PageDTOPerfDimCustomerDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfDimCustomerDTO[];
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

  type PageDTOPerfFactKeyTaskScoreDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactKeyTaskScoreDTO[];
  };

  type PageDTOPerfFactManagementScoreDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactManagementScoreDTO[];
  };

  type PageDTOPerfFactNewCustomerScoreDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactNewCustomerScoreDTO[];
  };

  type PageDTOPerfFactOverdueRecordDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactOverdueRecordDTO[];
  };

  type PageDTOPerfFactPerformanceResultDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PerfFactPerformanceResultDTO[];
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

  type PerfDimCustomerQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    customerCode?: string;
    customerName?: string;
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
    year?: number;
    /** 周期类型：1-年度，2-月度，3-季度 */
    periodType?: string;
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
    productName?: string;
  };

  type PerfDimProductVO = {
    /** 产品编码，例如 PMMA / MS */
    productId?: number;
    /** 产品名称 */
    productName?: string;
  };

  type PerfFactKeyTaskScoreDTO = {
    taskId?: number;
    userId?: number;
    userName?: string;
    periodId?: number;
    periodName?: string;
    /** 重点工作平均得分 */
    scoreValue?: number;
    /** Q1得分 */
    q1Score?: number;
    /** Q2得分 */
    q2Score?: number;
    /** Q3得分 */
    q3Score?: number;
    /** Q4得分 */
    q4Score?: number;
  };

  type PerfFactKeyTaskScoreQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    userId?: number;
    periodId?: number;
  };

  type PerfFactKeyTaskScoreVO = {
    taskId?: number;
    userId?: number;
    periodId?: number;
    scoreValue?: number;
    /** Q1得分 */
    q1Score?: number;
    /** Q2得分 */
    q2Score?: number;
    /** Q3得分 */
    q3Score?: number;
    /** Q4得分 */
    q4Score?: number;
    /** 平均得分 */
    avgScore?: number;
  };

  type PerfFactManagementScoreDTO = {
    managementId?: number;
    userId?: number;
    userName?: string;
    periodId?: number;
    periodName?: string;
    /** 评分类型：1-周报，2-样品反馈，3-执行力，4-逾期 */
    scoreType?: string;
    /** 评分类型名称 */
    scoreTypeName?: string;
    /** 得分 */
    scoreValue?: number;
  };

  type PerfFactManagementScoreQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    userId?: number;
    periodId?: number;
    scoreType?: string;
  };

  type PerfFactManagementScoreVO = {
    managementId?: number;
    userId?: number;
    periodId?: number;
    scoreType?: string;
    scoreValue?: number;
  };

  type PerfFactNewCustomerScoreDTO = {
    newCustomerId?: number;
    userId?: number;
    customerId?: number;
    periodId?: number;
    scoreValue?: number;
  };

  type PerfFactNewCustomerScoreQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    userId?: number;
    customerId?: number;
    periodId?: number;
    scoreValue?: number;
  };

  type PerfFactNewCustomerScoreVO = {
    newCustomerId?: number;
    userId?: number;
    customerId?: number;
    periodId?: number;
    scoreValue?: number;
  };

  type PerfFactOverdueRecordDTO = {
    overdueId?: number;
    userId?: number;
    userName?: string;
    customerId?: number;
    customerName?: string;
    periodId?: number;
    periodName?: string;
    /** 逾期区间：0_10/11_30/31_59/60_90/90_plus */
    overdueLevel?: string;
    /** 最终扣分值 */
    scoreValue?: number;
  };

  type PerfFactOverdueRecordQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    userId?: number;
    periodId?: number;
    overdueLevel?: string;
  };

  type PerfFactOverdueRecordVO = {
    overdueId?: number;
    userId?: number;
    customerId?: number;
    periodId?: number;
    overdueLevel?: string;
    scoreValue?: number;
  };

  type PerfFactPerformanceResultDTO = {
    performanceId?: number;
    userId?: number;
    /** 用户名 */
    userName?: string;
    periodId?: number;
    /** 绩效周期名称 */
    periodName?: string;
    /** 销量得分 */
    salesScore?: number;
    /** 利润得分 */
    profitScore?: number;
    /** 重点工作得分 */
    keyTaskScore?: number;
    /** 内部管理得分 */
    managementScore?: number;
    /** 新客户得分 */
    newCustomerScore?: number;
    /** 最终绩效总分 */
    finalScore?: number;
    /** 绩效计算时间 */
    calculatedAt?: string;
  };

  type PerfFactPerformanceResultQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    userId?: number;
    periodId?: number;
  };

  type PerfFactPerformanceResultVO = {
    performanceId?: number;
    userId?: number;
    periodId?: number;
    salesScore?: number;
    profitScore?: number;
    keyTaskScore?: number;
    managementScore?: number;
    newCustomerScore?: number;
    finalScore?: number;
    calculatedAt?: string;
  };

  type PerfFactProfitDataDTO = {
    /** ${comment} */
    profitId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 业务经理姓名 */
    userName?: string;
    /** 产品编码 */
    productId?: number;
    /** 产品名称 */
    productName?: string;
    /** 净利润金额 */
    netProfit?: number;
    /** 订单日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
    /** 归属绩效周期名称 */
    periodName?: string;
  };

  type PerfFactProfitDataQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    userId?: number;
    productId?: number;
    periodId?: number;
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
    /** 业务经理姓名 */
    userName?: string;
    /** ${comment} */
    productId?: number;
    /** 产品名称 */
    productName?: string;
    /** ${comment} */
    periodId?: number;
    /** 归属绩效周期名称 */
    periodName?: string;
    /** 计划利润金额 */
    planProfit?: number;
  };

  type PerfFactProfitPlanQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    userId?: number;
    productId?: number;
    periodId?: number;
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
    /** 客户ID */
    customerName?: string;
    /** 交货单号码 */
    deliveryNo?: string;
    /** 批次 */
    batchNo?: string;
    /** 产品编码 */
    productId?: number;
    /** 产品编码 */
    productName?: string;
    /** 销售数量 */
    quantity?: number;
    /** 交货单创建日期 */
    orderDate?: string;
    /** 归属绩效周期ID */
    periodId?: number;
    /** 归属绩效周期名称 */
    periodName?: string;
  };

  type PerfFactSalesDataQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    productId?: number;
    userId?: number;
    periodId?: number;
  };

  type PerfFactSalesDataVO = {
    /** ${comment} */
    saleId?: number;
    /** 销售人员ID */
    userId?: number;
    /** 客户ID */
    customerId?: number;
    /** 交货单号码 */
    deliveryNo?: string;
    /** 批次 */
    batchNo?: string;
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
    /** 业务经理姓名 */
    userName?: string;
    /** ${comment} */
    productId?: number;
    /** 产品名称 */
    productName?: string;
    /** ${comment} */
    periodId?: number;
    /** 归属绩效周期名称 */
    periodName?: string;
    /** 计划销量 */
    planQuantity?: number;
  };

  type PerfFactSalesPlanQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    userId?: number;
    productId?: number;
    periodId?: number;
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

  type PerformanceCalcTriggerResponseDTO = {
    /** 任务ID */
    taskId?: number;
    /** Workflow ID */
    workflowId?: string;
    /** Workflow Run ID */
    runId?: string;
    /** 任务状态 */
    status?: string;
    /** 提交时间 */
    submittedAt?: string;
    /** 导出状态 */
    exportStatus?: string;
    /** 导出OSS ID */
    exportOssId?: number;
  };

  type ProfitDataImportRequest = {
    sheetName?: string;
    columnMappings?: ColumnMappingDTO[];
    updateSupport?: boolean;
    /** 产品编码 */
    productId?: number;
  };

  type ProfitPlanImportRequest = {
    sheetName?: string;
    columnMappings?: ColumnMappingDTO[];
    updateSupport?: boolean;
    /** 产品编码 */
    productId?: number;
    /** 年份(为空默认当前年) */
    year?: number;
  };

  type removeDimCustomerByIdParams = {
    customerId: number;
  };

  type removeDimCustomerParams = {
    customerIds: number[];
  };

  type removeFactKeyTaskScoreByIdParams = {
    taskId: number;
  };

  type removeFactKeyTaskScoreParams = {
    FactKeyTaskScoreIds: number[];
  };

  type removeFactManagementScoreByIdParams = {
    managementId: number;
  };

  type removeFactManagementScoreParams = {
    FactManagementScoreIds: number[];
  };

  type removeFactNewCustomerScoreByIdParams = {
    newCustomerId: number;
  };

  type removeFactNewCustomerScoreParams = {
    FactNewCustomerScoreIds: number[];
  };

  type removeFactOverdueRecordByIdParams = {
    overdueId: number;
  };

  type removeFactOverdueRecordParams = {
    FactOverdueRecordIds: number[];
  };

  type removeFactPerformanceResultByIdParams = {
    performanceId: number;
  };

  type removeFactPerformanceResultParams = {
    FactPerformanceResultIds: number[];
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

  type removeProfitDataByIdParams = {
    profitId: number;
  };

  type removeProfitDataParams = {
    profitIds: number[];
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

  type ResponseDTOJobSubmitResponseDTO = {
    code?: number;
    message?: string;
    data?: JobSubmitResponseDTO;
  };

  type ResponseDTOListPerfDimCustomerDTO = {
    code?: number;
    message?: string;
    data?: PerfDimCustomerDTO[];
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

  type ResponseDTOListPerfFactKeyTaskScoreDTO = {
    code?: number;
    message?: string;
    data?: PerfFactKeyTaskScoreDTO[];
  };

  type ResponseDTOListPerfFactKeyTaskScoreVO = {
    code?: number;
    message?: string;
    data?: PerfFactKeyTaskScoreVO[];
  };

  type ResponseDTOListPerfFactManagementScoreDTO = {
    code?: number;
    message?: string;
    data?: PerfFactManagementScoreDTO[];
  };

  type ResponseDTOListPerfFactManagementScoreVO = {
    code?: number;
    message?: string;
    data?: PerfFactManagementScoreVO[];
  };

  type ResponseDTOListPerfFactNewCustomerScoreDTO = {
    code?: number;
    message?: string;
    data?: PerfFactNewCustomerScoreDTO[];
  };

  type ResponseDTOListPerfFactNewCustomerScoreVO = {
    code?: number;
    message?: string;
    data?: PerfFactNewCustomerScoreVO[];
  };

  type ResponseDTOListPerfFactOverdueRecordDTO = {
    code?: number;
    message?: string;
    data?: PerfFactOverdueRecordDTO[];
  };

  type ResponseDTOListPerfFactOverdueRecordVO = {
    code?: number;
    message?: string;
    data?: PerfFactOverdueRecordVO[];
  };

  type ResponseDTOListPerfFactPerformanceResultDTO = {
    code?: number;
    message?: string;
    data?: PerfFactPerformanceResultDTO[];
  };

  type ResponseDTOListPerfFactPerformanceResultVO = {
    code?: number;
    message?: string;
    data?: PerfFactPerformanceResultVO[];
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

  type ResponseDTOPageDTOPerfFactKeyTaskScoreDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactKeyTaskScoreDTO;
  };

  type ResponseDTOPageDTOPerfFactManagementScoreDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactManagementScoreDTO;
  };

  type ResponseDTOPageDTOPerfFactNewCustomerScoreDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactNewCustomerScoreDTO;
  };

  type ResponseDTOPageDTOPerfFactOverdueRecordDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactOverdueRecordDTO;
  };

  type ResponseDTOPageDTOPerfFactPerformanceResultDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPerfFactPerformanceResultDTO;
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

  type ResponseDTOPerfFactKeyTaskScoreDTO = {
    code?: number;
    message?: string;
    data?: PerfFactKeyTaskScoreDTO;
  };

  type ResponseDTOPerfFactManagementScoreDTO = {
    code?: number;
    message?: string;
    data?: PerfFactManagementScoreDTO;
  };

  type ResponseDTOPerfFactNewCustomerScoreDTO = {
    code?: number;
    message?: string;
    data?: PerfFactNewCustomerScoreDTO;
  };

  type ResponseDTOPerfFactOverdueRecordDTO = {
    code?: number;
    message?: string;
    data?: PerfFactOverdueRecordDTO;
  };

  type ResponseDTOPerfFactPerformanceResultDTO = {
    code?: number;
    message?: string;
    data?: PerfFactPerformanceResultDTO;
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

  type ResponseDTOPerformanceCalcTriggerResponseDTO = {
    code?: number;
    message?: string;
    data?: PerformanceCalcTriggerResponseDTO;
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

  type SalesPlanImportRequest = {
    sheetName?: string;
    columnMappings?: ColumnMappingDTO[];
    updateSupport?: boolean;
    /** 产品编码 */
    productId?: number;
    /** 年份(为空默认当前年) */
    year?: number;
  };

  type TriggerMonthlyCalculationCommand = {
    /** 年份 */
    year: number;
    /** 月份（计算口径：当年1月1日至该月月末累计） */
    month: number;
    /** 是否覆盖已存在结果，默认false */
    overwrite?: boolean;
    /** 是否自动导出并上传OSS，默认true */
    autoExport?: boolean;
  };

  type TriggerRangeCalculationCommand = {
    /** 年份 */
    year: number;
    /** 起始月份（每月按当年累计口径计算） */
    fromMonth: number;
    /** 结束月份（每月按当年累计口径计算） */
    toMonth: number;
    /** 是否覆盖已存在结果，默认false */
    overwrite?: boolean;
    /** 是否自动导出并上传OSS，默认true */
    autoExport?: boolean;
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

  type UpdatePerfFactKeyTaskScoreCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 重点工作平均得分 */
    scoreValue?: number;
    /** Q1得分 */
    q1Score?: number;
    /** Q2得分 */
    q2Score?: number;
    /** Q3得分 */
    q3Score?: number;
    /** Q4得分 */
    q4Score?: number;
    taskId?: number;
  };

  type UpdatePerfFactManagementScoreCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 评分类型：1-周报，2-样品反馈，3-执行力，4-逾期 */
    scoreType?: string;
    /** 得分（可正可负） */
    scoreValue?: number;
    managementId?: number;
  };

  type UpdatePerfFactNewCustomerScoreCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    customerId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** ${column.columnComment} */
    scoreValue?: number;
    newCustomerId?: number;
  };

  type UpdatePerfFactOverdueRecordCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    customerId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 逾期区间：0_10/11_30/31_59/60_90/90_plus */
    overdueLevel?: string;
    /** 最终扣分值 */
    scoreValue?: number;
    overdueId?: number;
  };

  type UpdatePerfFactPerformanceResultCommand = {
    /** ${column.columnComment} */
    userId?: number;
    /** ${column.columnComment} */
    periodId?: number;
    /** 销量得分 */
    salesScore?: number;
    /** 利润得分 */
    profitScore?: number;
    /** 重点工作得分 */
    keyTaskScore?: number;
    /** 内部管理得分 */
    managementScore?: number;
    /** 新客户得分 */
    newCustomerScore?: number;
    /** 最终绩效总分 */
    finalScore?: number;
    /** 绩效计算时间 */
    calculatedAt?: string;
    performanceId?: number;
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
    /** 用户ID */
    userId?: number;
    /** 产品ID */
    productId?: number;
    /** 期间ID */
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
    /** 交货单号码 */
    deliveryNo?: string;
    /** 批次 */
    batchNo?: string;
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
    /** 用户ID */
    userId?: number;
    /** 产品ID */
    productId?: number;
    /** 期间ID */
    periodId?: number;
    /** 计划销量（吨） */
    planQuantity?: number;
    planId?: number;
  };
}
