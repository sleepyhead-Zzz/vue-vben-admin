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
    /** 巡检对象类型 */
    inspectionObjectType?: string;
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
    status?: string;
    value?: string;
  };

  type AddAssetInspectionTaskCommand = {
    /** 来源巡检计划ID */
    planId?: number;
    /** 任务名称 */
    taskName?: string;
    /** 任务状态 0待接收 1处理中 2已完成 3已过期 */
    status?: string;
    inspectionObjectType?: string;
    /** 巡检ID */
    objectId?: number;
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

  type AddAssetRepairCommand = {
    /** 设备ID */
    deviceId?: number;
    /** 故障类型（1=硬件 2=软件 3=网络 4=其他） */
    faultType?: string;
    /** 故障描述 */
    faultDescription?: string;
    /** 紧急程度（1=紧急 2=一般 3=低） */
    repairLevel?: string;
    /** 状态（1=待受理 2=已受理 3=维修中 4=已完成 5=已关闭） */
    repairStatus?: string;
    /** 报修人ID */
    reporterId?: number;
    /** 受理/维修人ID */
    handlerId?: number;
    /** 维修结果说明 */
    repairResult?: string;
    /** 是否修复（0=否 1=是） */
    isFixed?: string;
    /** 报修时间 */
    reportTime?: string;
    /** 受理时间 */
    acceptTime?: string;
    /** 完成时间 */
    finishTime?: string;
    /** 关闭时间 */
    closeTime?: string;
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
    /** 巡检对象类型 */
    inspectionObjectType?: string;
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
    status?: string;
    inspectionObjectType?: string;
    objectId?: number;
    objectName?: string;
    /** 指派给的部门ID */
    assignDeptId?: number;
    assignDeptName?: string;
    /** 指派给的负责人ID */
    assignUserId?: number;
    assignUserName?: string;
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
    totalChildCount?: number;
    checkedChildCount?: number;
    checked?: boolean;
  };

  type AssetLocationQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    locationName?: string;
    locationType?: string;
    parentLocationId?: number;
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

  type AssetPlanCheckedLocationDTO = {
    planId?: number;
    checkedLocationIds?: number[];
  };

  type AssetRepairDTO = {
    /** 报修单ID */
    repairId?: number;
    /** 设备ID */
    deviceId?: number;
    /** 设备名称 */
    deviceName?: string;
    /** 故障类型 */
    faultType?: string;
    /** 故障描述 */
    faultDescription?: string;
    /** 紧急程度 */
    repairLevel?: string;
    /** 状态 */
    repairStatus?: string;
    /** 报修人ID */
    reporterId?: number;
    /** 报修人ID */
    reporterName?: string;
    /** 受理/维修人ID */
    handlerId?: number;
    handlerName?: string;
    /** 维修结果说明 */
    repairResult?: string;
    /** 是否修复 */
    isFixed?: string;
    /** 报修时间 */
    reportTime?: string;
    /** 受理时间 */
    acceptTime?: string;
    /** 完成时间 */
    finishTime?: string;
    /** 关闭时间 */
    closeTime?: string;
  };

  type AssetRepairQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
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

  type associatedPlanDevicesParams = {
    planId: number;
    query: AssociatedDeviceQuery;
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

  type editRepairParams = {
    repairId: number;
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

  type exportRepairByExcelParams = {
    query: AssetRepairQuery;
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

  type getCategoryListParams = {
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

  type getLocationListParams = {
    locationName?: string;
    locationType?: string;
    parentLocationId?: number;
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

  type getLocationTreeParams = {
    parentLocationId?: number;
    planId?: number;
  };

  type getManufacturerInfoParams = {
    /** 记录ID */
    manufacturerId: number;
  };

  type getPagedCategoryParams = {
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

  type getPagedDeviceParams = {
    deviceName?: string;
    deviceCode?: string;
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

  type getPagedInspectionParams = {
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

  type getPagedManufacturerParams = {
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

  type getPagedPlanParams = {
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

  type getPagedProjectParams = {
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

  type getPagedRepairParams = {
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

  type getPagedSpecificationParams = {
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

  type getPagedTaskParams = {
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

  type getPlanLocationsParams = {
    planId: number;
  };

  type getProjectInfoParams = {
    /** 记录ID */
    projectId: number;
  };

  type getRepairInfoParams = {
    /** 记录ID */
    repairId: number;
  };

  type getRepairListParams = {
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

  type getSpecificationInfoParams = {
    /** 记录ID */
    specificationId: number;
  };

  type getSpecificationListParams = {
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

  type getTaskInfoParams = {
    /** 记录ID */
    taskId: number;
  };

  type InspectionPlanLocationSaveCommand = {
    planId: number;
    locationIds?: number[];
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

  type PageDTOAssetManufacturerDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetManufacturerDTO[];
  };

  type PageDTOAssetRepairDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetRepairDTO[];
  };

  type PageDTOAssetSpecificationDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: AssetSpecificationDTO[];
  };

  type removeCategoryByIdParams = {
    categoryId: number;
  };

  type removeCategoryParams = {
    categoryIds: number[];
  };

  type removeDeviceByIdParams = {
    deviceId: number;
  };

  type removeDeviceParams = {
    deviceIds: number[];
  };

  type removeInspectionByIdParams = {
    inspectionId: number;
  };

  type removeInspectionParams = {
    inspectionIds: number[];
  };

  type removeLocationByIdParams = {
    locationId: number;
  };

  type removeLocationParams = {
    locationIds: number[];
  };

  type removeManufacturerByIdParams = {
    manufacturerId: number;
  };

  type removeManufacturerParams = {
    manufacturerIds: number[];
  };

  type removePlanByIdParams = {
    planId: number;
  };

  type removePlanParams = {
    planIds: number[];
  };

  type removeProjectByIdParams = {
    projectId: number;
  };

  type removeProjectParams = {
    projectIds: number[];
  };

  type removeRepairByIdParams = {
    repairId: number;
  };

  type removeRepairParams = {
    repairIds: number[];
  };

  type removeSpecificationByIdParams = {
    specificationId: number;
  };

  type removeSpecificationParams = {
    specificationIds: number[];
  };

  type removeTaskByIdParams = {
    taskId: number;
  };

  type removeTaskParams = {
    taskIds: number[];
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

  type ResponseDTOAssetPlanCheckedLocationDTO = {
    code?: number;
    message?: string;
    data?: AssetPlanCheckedLocationDTO;
  };

  type ResponseDTOAssetRepairDTO = {
    code?: number;
    message?: string;
    data?: AssetRepairDTO;
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

  type ResponseDTOListAssetDeviceVO = {
    code?: number;
    message?: string;
    data?: AssetDeviceVO[];
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

  type ResponseDTOListAssetManufacturerVO = {
    code?: number;
    message?: string;
    data?: AssetManufacturerVO[];
  };

  type ResponseDTOListAssetRepairDTO = {
    code?: number;
    message?: string;
    data?: AssetRepairDTO[];
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

  type ResponseDTOPageDTOAssetManufacturerDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetManufacturerDTO;
  };

  type ResponseDTOPageDTOAssetRepairDTO = {
    code?: number;
    message?: string;
    data?: PageDTOAssetRepairDTO;
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

  type unAssociatedPlanDevicesParams = {
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
    /** 巡检对象类型 */
    inspectionObjectType?: string;
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
    status?: string;
    inspectionObjectType?: string;
    /** 巡检ID */
    objectId?: number;
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

  type UpdateAssetRepairCommand = {
    /** 设备ID */
    deviceId?: number;
    /** 故障类型（1=硬件 2=软件 3=网络 4=其他） */
    faultType?: string;
    /** 故障描述 */
    faultDescription?: string;
    /** 紧急程度（1=紧急 2=一般 3=低） */
    repairLevel?: string;
    /** 状态（1=待受理 2=已受理 3=维修中 4=已完成 5=已关闭） */
    repairStatus?: string;
    /** 报修人ID */
    reporterId?: number;
    /** 受理/维修人ID */
    handlerId?: number;
    /** 维修结果说明 */
    repairResult?: string;
    /** 是否修复（0=否 1=是） */
    isFixed?: string;
    /** 报修时间 */
    reportTime?: string;
    /** 受理时间 */
    acceptTime?: string;
    /** 完成时间 */
    finishTime?: string;
    /** 关闭时间 */
    closeTime?: string;
    repairId?: number;
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
