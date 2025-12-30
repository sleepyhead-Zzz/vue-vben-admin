declare namespace AssetAPI {
  type AddAssetCategoryCommand = {
    /** 分类名称 */
    categoryName?: string;
  };

  type AddAssetDeviceCommand = {
    /** 设备名称 */
    deviceName?: string;
    /** 设备编码 */
    deviceCode?: string;
    /** 设备状态 */
    status?: string;
    /** 图片文件ID */
    imageFileId?: number;
    /** 技术手册文件ID */
    manualFileId?: number;
    /** 设备规格型号 */
    specificationId?: number;
    /** 管理部门 */
    manageDeptId?: string;
    /** 使用部门 */
    usageDeptId?: string;
    /** 生产厂商 */
    manufacturerId?: number;
    /** 设备存放位置 */
    locationId?: number;
    /** 巡检项目 */
    inspectionProjectIds?: number[];
    /** 购买日期 */
    purchaseDate?: string;
    /** 启用日期 */
    activationDate?: string;
    /** 最近维修时间 */
    lastRepaired?: string;
  };

  type AddAssetInspectionCommand = {
    /** 关联的巡检计划ID */
    planId?: number;
    /** 巡检状态：         1进行中         2完成         3异常         4中断' */
    taskId?: number;
    status?: string;
    /** 巡检实际开始时间 */
    startDate?: string;
    /** 巡检实际结束时间 */
    endDate?: string;
    /** 巡检结果简述 */
    description?: string;
    ossIds?: number[];
    results?: AddAssetInspectionResultCommand[];
  };

  type AddAssetInspectionPlanCommand = {
    /** 计划名称 */
    planName?: string;
    /** 执行部门 */
    deptId?: number;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 巡检频率 1 天 2 周 3 月 */
    frequency?: number;
    /** 每隔多少单位周期执行一次，如每2天、每3周、每1月 */
    intervalValue?: number;
    weekdayList?: string[];
    /** 适用于monthly，1~31，逗号分隔，如1,15 */
    monthDayList?: string[];
    /** 状态 */
    status?: string;
  };

  type AddAssetInspectionProjectCommand = {
    /** 检查项名称 */
    projectName?: string;
    /** 检查方法 */
    projectType?: string;
    /** 数值下限 */
    minValue?: number;
    /** 数值上限 */
    maxValue?: number;
    /** 单位 */
    unit?: string;
  };

  type AddAssetInspectionResultCommand = {
    inspectionId?: number;
    projectId?: number;
    status?: number;
    value?: string;
  };

  type AddAssetInspectionTaskCommand = {
    /** 来源巡检计划ID */
    planId?: number;
    /** 任务名称 */
    taskName?: string;
    /** 任务状态 0待接收 1处理中 2已完成 3已过期 */
    status?: number;
    /** 巡检设备ID */
    deviceId?: number;
    /** 巡检地点ID */
    locationId?: number;
    /** 指派给的部门ID */
    assignDeptId?: number;
    /** 指派给的负责人ID（可选） */
    assignUserId?: number;
    /** 任务截止时间 */
    executeDeadline?: string;
  };

  type AddAssetLocationCommand = {
    /** 位置名称 */
    locationName?: string;
    /** 父位置ID */
    parentLocationId?: number;
    /** 位置编码 */
    locationCode?: string;
    /** 位置描述 */
    description?: string;
    /** 位置类型 */
    locationType?: string;
    /** 显示顺序 */
    orderNum?: number;
  };

  type AddAssetManufacturerCommand = {
    /** 厂商名称 */
    manufacturerName?: string;
    /** 厂商联系人 */
    manufacturerPeople?: string;
    /** 联系方式 */
    manufacturerContact?: string;
  };

  type AddAssetSpecificationCommand = {
    /** 规格型号名称 */
    specificationName?: string;
    /** 资产分类ID */
    categoryId?: number;
  };

  type AssetCategoryDTO = {
    /** 分类ID */
    categoryId?: number;
    /** 分类名称 */
    categoryName?: string;
  };

  type AssetCategoryQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type AssetCategoryVO = {
    /** 分类ID */
    categoryId?: number;
    /** 分类名称 */
    categoryName?: string;
  };

  type AssetDeviceDTO = {
    /** 设备ID */
    deviceId?: number;
    /** 设备名称 */
    deviceName?: string;
    /** 设备编码 */
    deviceCode?: string;
    /** 设备状态 */
    status?: string;
    /** 图片文件ID */
    imageFileId?: number;
    /** 图片文件ID */
    imageUrl?: string;
    /** 技术手册文件ID */
    manualFileId?: number;
    /** 设备规格型号 */
    specificationId?: number;
    /** 设备规格型号 */
    specificationName?: string;
    /** 管理部门 */
    manageDeptId?: number;
    /** 管理部门 */
    manageDeptName?: string;
    /** 使用部门 */
    usageDeptId?: number;
    /** 使用部门 */
    usageDeptName?: string;
    /** 生产厂商 */
    manufacturerId?: number;
    /** 生产厂商 */
    manufacturerName?: string;
    /** 设备存放位置 */
    locationId?: number;
    /** 设备存放位置 */
    locationName?: string;
    /** 巡检项目 */
    inspectionProjectIds?: number[];
    /** 购买日期 */
    purchaseDate?: string;
    /** 启用日期 */
    activationDate?: string;
    /** 最近维修时间 */
    lastRepaired?: string;
  };

  type AssetDeviceQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    deviceName?: string;
    deviceCode?: string;
    status?: string;
  };

  type AssetDeviceVO = {
    /** 设备ID */
    deviceId?: number;
    /** 设备名称 */
    deviceName?: string;
    /** 设备编码 */
    deviceCode?: string;
    /** 设备状态 */
    status?: string;
    /** 图片文件ID */
    imageFileId?: number;
    /** 技术手册文件ID */
    manualFileId?: number;
    /** 设备规格型号 */
    specificationId?: number;
    /** 管理部门 */
    managementDeptId?: string;
    /** 使用部门 */
    usageDeptId?: string;
    /** 生产厂商 */
    manufacturerId?: number;
    /** 设备存放位置 */
    locationId?: number;
    /** 巡检计划 */
    inspectionPlanId?: number;
    /** 购买日期 */
    purchaseDate?: string;
    /** 启用日期 */
    activationDate?: string;
    /** 最近维修时间 */
    lastRepaired?: string;
  };

  type AssetInspectionDTO = {
    /** 巡检记录ID */
    inspectionId?: number;
    /** 关联的巡检计划ID */
    planId?: number;
    /** 巡检状态：         1进行中         2完成         3异常         4中断' */
    taskId?: number;
    status?: string;
    /** 巡检实际开始时间 */
    startDate?: string;
    /** 巡检实际结束时间 */
    endDate?: string;
    /** 巡检结果简述 */
    description?: string;
  };

  type AssetInspectionPlanDTO = {
    planId?: number;
    /** 计划名称 */
    planName?: string;
    /** 执行部门ID */
    deptId?: number;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 巡检频率 */
    frequency?: number;
    /** 每隔多少单位周期执行一次，如每2天、每3周、每1月 */
    intervalValue?: number;
    /** 适用于weekly，1~7，逗号分隔，如1,3,5表示周一三五 */
    weekdayList?: string[];
    /** 适用于monthly，1~31，逗号分隔，如1,15 */
    monthDayList?: string[];
    /** 状态 */
    status?: string;
    jobId?: number;
  };

  type AssetInspectionPlanQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    planName?: string;
    frequency?: number;
    status?: string;
  };

  type AssetInspectionPlanVO = {
    planId?: number;
    /** 计划名称 */
    planName?: string;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 巡检频率 */
    frequency?: number;
    /** 每隔多少单位周期执行一次，如每2天、每3周、每1月 */
    intervalValue?: number;
    /** 适用于weekly，1~7，逗号分隔，如1,3,5表示周一三五 */
    weekdays?: string;
    /** 适用于monthly，1~31，逗号分隔，如1,15 */
    monthDays?: string;
    /** 状态 */
    status?: number;
  };

  type AssetInspectionProjectDTO = {
    /** 检查项ID */
    projectId?: number;
    /** 检查项名称 */
    projectName?: string;
    /** 检查方法 */
    projectType?: string;
    /** 数值下限 */
    minValue?: number;
    /** 数值上限 */
    maxValue?: number;
    /** 单位 */
    unit?: string;
  };

  type AssetInspectionProjectQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    projectName?: string;
    projectType?: string;
  };

  type AssetInspectionProjectVO = {
    /** 检查项ID */
    projectId?: number;
    /** 检查项名称 */
    projectName?: string;
    /** 检查方法 */
    projectType?: string;
    /** 数值下限 */
    minValue?: number;
    /** 数值上限 */
    maxValue?: number;
  };

  type AssetInspectionQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type AssetInspectionTaskDTO = {
    /** 巡检任务ID */
    taskId?: number;
    /** 来源巡检计划ID */
    planId?: number;
    /** 任务名称 */
    taskName?: string;
    /** 任务状态 0待接收 1处理中 2已完成 3已过期 */
    status?: number;
    /** 巡检设备ID */
    deviceId?: number;
    /** 巡检地点ID */
    locationId?: number;
    /** 指派给的部门ID */
    assignDeptId?: number;
    /** 指派给的负责人ID */
    assignUserId?: number;
    /** 任务截止时间 */
    executeDeadline?: string;
  };

  type AssetInspectionTaskQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    taskName?: string;
    status?: string;
  };

  type AssetInspectionTaskVO = {
    /** 巡检任务ID */
    taskId?: number;
    /** 来源巡检计划ID */
    planId?: number;
    /** 任务名称 */
    taskName?: string;
    /** 任务状态 0待接收 1处理中 2已完成 3已过期 */
    status?: number;
    /** 指派给的部门ID */
    assignDeptId?: number;
    /** 指派给的负责人ID */
    assignUserId?: number;
    /** 任务截止时间 */
    executeDeadline?: string;
  };

  type AssetInspectionVO = {
    /** 巡检记录ID */
    inspectionId?: number;
    /** 关联的巡检计划ID */
    planId?: number;
    /** 巡检状态：         1进行中         2完成         3异常         4中断' */
    taskId?: number;
    status?: number;
    /** 巡检实际开始时间 */
    startDate?: string;
    /** 巡检实际结束时间 */
    endDate?: string;
    /** 巡检结果简述 */
    description?: string;
  };

  type AssetLocationDTO = {
    /** 位置ID */
    locationId?: number;
    /** 位置名称 */
    locationName?: string;
    /** 父位置ID */
    parentLocationId?: number;
    /** 位置编码 */
    locationCode?: string;
    /** 位置描述 */
    description?: string;
    /** 位置类型 */
    locationType?: string;
    /** 显示顺序 */
    orderNum?: number;
    hasChild?: boolean;
  };

  type AssetLocationQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    locationName?: string;
    locationType?: string;
    parentLocationId?: string;
    locationCode?: string;
  };

  type AssetManufacturerDTO = {
    /** 生产厂商ID */
    manufacturerId?: number;
    /** 厂商名称 */
    manufacturerName?: string;
    /** 厂商联系人 */
    manufacturerPeople?: string;
    /** 联系方式 */
    manufacturerContact?: string;
  };

  type AssetManufacturerQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    manufacturerName?: string;
  };

  type AssetManufacturerVO = {
    /** 生产厂商ID */
    manufacturerId?: number;
    /** 厂商名称 */
    manufacturerName?: string;
    /** 厂商联系人 */
    manufacturerPeople?: string;
    /** 联系方式 */
    manufacturerContact?: string;
  };

  type AssetSpecificationDTO = {
    /** 规格型号ID */
    specificationId?: number;
    /** 规格型号名称 */
    specificationName?: string;
    /** 资产分类ID */
    categoryId?: number;
    /** 资产分类名称 */
    categoryName?: string;
  };

  type AssetSpecificationQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    specificationName?: string;
  };

  type AssetSpecificationVO = {
    /** 规格型号ID */
    specificationId?: number;
    /** 规格型号名称 */
    specificationName?: string;
    /** 资产分类ID */
    categoryId?: number;
  };

  type AssociatedDeviceQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    planId?: number;
    deviceName?: string;
    deviceCode?: string;
  };

  type associatedInspectionDevicesParams = {
    planId: number;
    query: AssociatedDeviceQuery;
  };

  type batchRemoveCategoryParams = {
    categoryIds: number[];
  };

  type batchRemoveDeviceParams = {
    deviceIds: number[];
  };

  type batchRemoveInspectionParams = {
    inspectionIds: number[];
  };

  type batchRemoveLocationParams = {
    locationIds: number[];
  };

  type batchRemoveManufacturerParams = {
    manufacturerIds: number[];
  };

  type batchRemovePlanParams = {
    planIds: number[];
  };

  type batchRemoveProjectParams = {
    projectIds: number[];
  };

  type batchRemoveSpecificationParams = {
    specificationIds: number[];
  };

  type batchRemoveTaskParams = {
    taskIds: number[];
  };

  type editCategoryParams = {
    categoryId: number;
  };

  type editDeviceParams = {
    deviceId: number;
  };

  type editInspectionParams = {
    inspectionId: number;
  };

  type editLocationParams = {
    locationId: number;
  };

  type editManufacturerParams = {
    manufacturerId: number;
  };

  type editPlanParams = {
    planId: number;
  };

  type editProjectParams = {
    projectId: number;
  };

  type editSpecificationParams = {
    specificationId: number;
  };

  type editTaskParams = {
    taskId: number;
  };

  type exportCategoryByExcelParams = {
    query: AssetCategoryQuery;
  };

  type exportDeviceByExcelParams = {
    query: AssetDeviceQuery;
  };

  type exportInspectionByExcelParams = {
    query: AssetInspectionQuery;
  };

  type exportLocationByExcelParams = {
    query: AssetLocationQuery;
  };

  type exportManufacturerByExcelParams = {
    query: AssetManufacturerQuery;
  };

  type exportPlanByExcelParams = {
    query: AssetInspectionPlanQuery;
  };

  type exportProjectByExcelParams = {
    query: AssetInspectionProjectQuery;
  };

  type exportSpecificationByExcelParams = {
    query: AssetSpecificationQuery;
  };

  type exportTaskByExcelParams = {
    query: AssetInspectionTaskQuery;
  };

  type getCategoryInfoParams = {
    /** 记录ID */
    categoryId: number;
  };

  type getDeviceInfoParams = {
    /** 记录ID */
    deviceId: number;
  };

  type getInspectionInfoParams = {
    /** 记录ID */
    inspectionId: number;
  };

  type getInspectionItemByDeviceIdParams = {
    /** 设备ID */
    deviceId: number;
  };

  type getLocationInfoParams = {
    /** 记录ID */
    locationId: number;
  };

  type getManufacturerInfoParams = {
    /** 记录ID */
    manufacturerId: number;
  };

  type getPagedCategorysParams = {
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

  type getPagedDevicesParams = {
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

  type getPagedInspectionsParams = {
    planId?: number;
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

  type getPagedLocationsParams = {
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

  type getPagedManufacturersParams = {
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

  type getPagedPlansParams = {
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

  type getPagedProjectsParams = {
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

  type getPagedSpecificationsParams = {
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

  type getPagedTasksParams = {
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

  type getPlanInfoParams = {
    /** 记录ID */
    planId: number;
  };

  type getProjectInfoParams = {
    /** 记录ID */
    projectId: number;
  };

  type getSpecificationInfoParams = {
    /** 记录ID */
    specificationId: number;
  };

  type getTaskInfoParams = {
    /** 记录ID */
    taskId: number;
  };

  type listCategoryParams = {
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

  type listDeviceParams = {
    deviceName?: string;
    deviceCode?: string;
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

  type listInspectionParams = {
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

  type listLocationParams = {
    locationName?: string;
    locationType?: string;
    parentLocationId?: string;
    locationCode?: string;
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

  type listManufacturerParams = {
    manufacturerName?: string;
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

  type listPlanParams = {
    planName?: string;
    frequency?: number;
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

  type listProjectParams = {
    projectName?: string;
    projectType?: string;
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

  type listSpecificationParams = {
    specificationName?: string;
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

  type listTaskParams = {
    taskName?: string;
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

  type PageDTOAssetCategoryDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetCategoryDTO[];
  };

  type PageDTOAssetDeviceDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetDeviceDTO[];
  };

  type PageDTOAssetInspectionDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetInspectionDTO[];
  };

  type PageDTOAssetInspectionPlanDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetInspectionPlanDTO[];
  };

  type PageDTOAssetInspectionProjectDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetInspectionProjectDTO[];
  };

  type PageDTOAssetInspectionTaskDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetInspectionTaskDTO[];
  };

  type PageDTOAssetLocationDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetLocationDTO[];
  };

  type PageDTOAssetManufacturerDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetManufacturerDTO[];
  };

  type PageDTOAssetSpecificationDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetSpecificationDTO[];
  };

  type removeCategoryParams = {
    categoryId: number;
  };

  type removeDeviceParams = {
    deviceId: number;
  };

  type removeInspectionParams = {
    inspectionId: number;
  };

  type removeLocationParams = {
    locationId: number;
  };

  type removeManufacturerParams = {
    manufacturerId: number;
  };

  type removePlanParams = {
    planId: number;
  };

  type removeProjectParams = {
    projectId: number;
  };

  type removeSpecificationParams = {
    specificationId: number;
  };

  type removeTaskParams = {
    taskId: number;
  };

  type ResponseDTOAssetCategoryDTO = {
    code?: number;
    message?: string;
    data?: AssetCategoryDTO;
  };

  type ResponseDTOAssetDeviceDTO = {
    code?: number;
    message?: string;
    data?: AssetDeviceDTO;
  };

  type ResponseDTOAssetInspectionDTO = {
    code?: number;
    message?: string;
    data?: AssetInspectionDTO;
  };

  type ResponseDTOAssetInspectionPlanDTO = {
    code?: number;
    message?: string;
    data?: AssetInspectionPlanDTO;
  };

  type ResponseDTOAssetInspectionProjectDTO = {
    code?: number;
    message?: string;
    data?: AssetInspectionProjectDTO;
  };

  type ResponseDTOAssetInspectionTaskDTO = {
    code?: number;
    message?: string;
    data?: AssetInspectionTaskDTO;
  };

  type ResponseDTOAssetLocationDTO = {
    code?: number;
    message?: string;
    data?: AssetLocationDTO;
  };

  type ResponseDTOAssetManufacturerDTO = {
    code?: number;
    message?: string;
    data?: AssetManufacturerDTO;
  };

  type ResponseDTOAssetSpecificationDTO = {
    code?: number;
    message?: string;
    data?: AssetSpecificationDTO;
  };

  type ResponseDTOInteger = {
    code?: number;
    message?: string;
    data?: number;
  };

  type ResponseDTOListAssetCategoryDTO = {
    code?: number;
    message?: string;
    data?: AssetCategoryDTO[];
  };

  type ResponseDTOListAssetCategoryVO = {
    code?: number;
    message?: string;
    data?: AssetCategoryVO[];
  };

  type ResponseDTOListAssetDeviceDTO = {
    code?: number;
    message?: string;
    data?: AssetDeviceDTO[];
  };

  type ResponseDTOListAssetDeviceVO = {
    code?: number;
    message?: string;
    data?: AssetDeviceVO[];
  };

  type ResponseDTOListAssetInspectionDTO = {
    code?: number;
    message?: string;
    data?: AssetInspectionDTO[];
  };

  type ResponseDTOListAssetInspectionPlanDTO = {
    code?: number;
    message?: string;
    data?: AssetInspectionPlanDTO[];
  };

  type ResponseDTOListAssetInspectionPlanVO = {
    code?: number;
    message?: string;
    data?: AssetInspectionPlanVO[];
  };

  type ResponseDTOListAssetInspectionProjectDTO = {
    code?: number;
    message?: string;
    data?: AssetInspectionProjectDTO[];
  };

  type ResponseDTOListAssetInspectionProjectVO = {
    code?: number;
    message?: string;
    data?: AssetInspectionProjectVO[];
  };

  type ResponseDTOListAssetInspectionTaskDTO = {
    code?: number;
    message?: string;
    data?: AssetInspectionTaskDTO[];
  };

  type ResponseDTOListAssetInspectionTaskVO = {
    code?: number;
    message?: string;
    data?: AssetInspectionTaskVO[];
  };

  type ResponseDTOListAssetInspectionVO = {
    code?: number;
    message?: string;
    data?: AssetInspectionVO[];
  };

  type ResponseDTOListAssetLocationDTO = {
    code?: number;
    message?: string;
    data?: AssetLocationDTO[];
  };

  type ResponseDTOListAssetManufacturerDTO = {
    code?: number;
    message?: string;
    data?: AssetManufacturerDTO[];
  };

  type ResponseDTOListAssetManufacturerVO = {
    code?: number;
    message?: string;
    data?: AssetManufacturerVO[];
  };

  type ResponseDTOListAssetSpecificationDTO = {
    code?: number;
    message?: string;
    data?: AssetSpecificationDTO[];
  };

  type ResponseDTOListAssetSpecificationVO = {
    code?: number;
    message?: string;
    data?: AssetSpecificationVO[];
  };

  type ResponseDTOListTreeLong = {
    code?: number;
    message?: string;
    data?: TreeLong[];
  };

  type ResponseDTOPageDTOAssetCategoryDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetCategoryDTO;
  };

  type ResponseDTOPageDTOAssetDeviceDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetDeviceDTO;
  };

  type ResponseDTOPageDTOAssetInspectionDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetInspectionDTO;
  };

  type ResponseDTOPageDTOAssetInspectionPlanDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetInspectionPlanDTO;
  };

  type ResponseDTOPageDTOAssetInspectionProjectDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetInspectionProjectDTO;
  };

  type ResponseDTOPageDTOAssetInspectionTaskDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetInspectionTaskDTO;
  };

  type ResponseDTOPageDTOAssetLocationDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetLocationDTO;
  };

  type ResponseDTOPageDTOAssetManufacturerDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetManufacturerDTO;
  };

  type ResponseDTOPageDTOAssetSpecificationDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetSpecificationDTO;
  };

  type ResponseDTOString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type ResponseDTOVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type TreeLong = {
    weight?: Record<string, any>;
    config?: TreeNodeConfig;
    name?: { empty?: boolean };
    id?: number;
    parentId?: number;
    empty?: boolean;
  };

  type TreeNodeConfig = {
    idKey?: string;
    parentIdKey?: string;
    weightKey?: string;
    nameKey?: string;
    childrenKey?: string;
    deep?: number;
  };

  type UnassociatedDeviceQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    planId: number;
    deviceName?: string;
    deviceCode?: string;
  };

  type unAssociatedInspectionDevicesParams = {
    planId: number;
    query: UnassociatedDeviceQuery;
  };

  type UpdateAssetCategoryCommand = {
    /** 分类名称 */
    categoryName?: string;
    categoryId?: number;
  };

  type UpdateAssetDeviceCommand = {
    /** 设备名称 */
    deviceName?: string;
    /** 设备编码 */
    deviceCode?: string;
    /** 设备状态 */
    status?: string;
    /** 图片文件ID */
    imageFileId?: number;
    /** 技术手册文件ID */
    manualFileId?: number;
    /** 设备规格型号 */
    specificationId?: number;
    /** 管理部门 */
    manageDeptId?: string;
    /** 使用部门 */
    usageDeptId?: string;
    /** 生产厂商 */
    manufacturerId?: number;
    /** 设备存放位置 */
    locationId?: number;
    /** 巡检项目 */
    inspectionProjectIds?: number[];
    /** 购买日期 */
    purchaseDate?: string;
    /** 启用日期 */
    activationDate?: string;
    /** 最近维修时间 */
    lastRepaired?: string;
    deviceId?: number;
  };

  type UpdateAssetInspectionCommand = {
    /** 关联的巡检计划ID */
    planId?: number;
    /** 巡检状态：         1进行中         2完成         3异常         4中断' */
    taskId?: number;
    status?: string;
    /** 巡检实际开始时间 */
    startDate?: string;
    /** 巡检实际结束时间 */
    endDate?: string;
    /** 巡检结果简述 */
    description?: string;
    ossIds?: number[];
    results?: AddAssetInspectionResultCommand[];
    inspectionId?: number;
  };

  type UpdateAssetInspectionPlanCommand = {
    /** 计划名称 */
    planName?: string;
    /** 执行部门 */
    deptId?: number;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 巡检频率 1 天 2 周 3 月 */
    frequency?: number;
    /** 每隔多少单位周期执行一次，如每2天、每3周、每1月 */
    intervalValue?: number;
    weekdayList?: string[];
    /** 适用于monthly，1~31，逗号分隔，如1,15 */
    monthDayList?: string[];
    /** 状态 */
    status?: string;
    planId?: number;
    jobId?: number;
  };

  type UpdateAssetInspectionProjectCommand = {
    /** 检查项名称 */
    projectName?: string;
    /** 检查方法 */
    projectType?: string;
    /** 数值下限 */
    minValue?: number;
    /** 数值上限 */
    maxValue?: number;
    /** 单位 */
    unit?: string;
    projectId?: number;
  };

  type UpdateAssetInspectionTaskCommand = {
    /** 来源巡检计划ID */
    planId?: number;
    /** 任务名称 */
    taskName?: string;
    /** 任务状态 0待接收 1处理中 2已完成 3已过期 */
    status?: number;
    /** 巡检设备ID */
    deviceId?: number;
    /** 巡检地点ID */
    locationId?: number;
    /** 指派给的部门ID */
    assignDeptId?: number;
    /** 指派给的负责人ID（可选） */
    assignUserId?: number;
    /** 任务截止时间 */
    executeDeadline?: string;
    taskId?: number;
  };

  type UpdateAssetLocationCommand = {
    /** 位置名称 */
    locationName?: string;
    /** 父位置ID */
    parentLocationId?: number;
    /** 位置编码 */
    locationCode?: string;
    /** 位置描述 */
    description?: string;
    /** 位置类型 */
    locationType?: string;
    /** 显示顺序 */
    orderNum?: number;
    locationId?: number;
  };

  type UpdateAssetManufacturerCommand = {
    /** 厂商名称 */
    manufacturerName?: string;
    /** 厂商联系人 */
    manufacturerPeople?: string;
    /** 联系方式 */
    manufacturerContact?: string;
    manufacturerId?: number;
  };

  type UpdateAssetSpecificationCommand = {
    /** 规格型号名称 */
    specificationName?: string;
    /** 资产分类ID */
    categoryId?: number;
    specificationId?: number;
  };

  type UpdateDeviceAssociationCommand = {
    planId?: number;
    deviceIds?: number[];
  };
}
