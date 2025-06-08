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
    managementDeptId?: string;
    /** 使用部门 */
    usageDeptId?: string;
    /** 生产厂商 */
    manufacturerId?: number;
    /** 设备存放位置 */
    locationId?: number;
    /** 巡检方案 */
    inspectionPlanId?: number;
    /** 购买日期 */
    purchaseDate?: string;
    /** 启用日期 */
    activationDate?: string;
    /** 最近维修时间 */
    lastRepaired?: string;
  };

  type AddAssetInspectionPlanCommand = {
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

  type AddAssetInspectionProjectCommand = {
    /** 检查项名称 */
    projectName?: string;
    /** 检查方法 */
    projectType?: string;
    /** 数值下限 */
    minValue?: number;
    /** 数值上限 */
    maxValue?: number;
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
    /** 巡检方案 */
    inspectionPlanId?: number;
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
    /** 巡检方案 */
    inspectionPlanId?: number;
    /** 购买日期 */
    purchaseDate?: string;
    /** 启用日期 */
    activationDate?: string;
    /** 最近维修时间 */
    lastRepaired?: string;
  };

  type AssetInspectionPlanDTO = {
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

  type AssetInspectionPlanQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
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
  };

  type AssetInspectionProjectQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
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
  };

  type AssetLocationQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type AssetLocationVO = {
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
  };

  type AssetSpecificationQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type AssetSpecificationVO = {
    /** 规格型号ID */
    specificationId?: number;
    /** 规格型号名称 */
    specificationName?: string;
    /** 资产分类ID */
    categoryId?: number;
  };

  type batchRemoveCategoryParams = {
    categoryIds: number[];
  };

  type batchRemoveDeviceParams = {
    deviceIds: number[];
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

  type editCategoryParams = {
    categoryId: number;
  };

  type editDeviceParams = {
    deviceId: number;
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

  type exportCategoryByExcelParams = {
    query: AssetCategoryQuery;
  };

  type exportDeviceByExcelParams = {
    query: AssetDeviceQuery;
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

  type getCategoryInfoParams = {
    /** 记录ID */
    categoryId: number;
  };

  type getDeviceInfoParams = {
    /** 记录ID */
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

  type ResponseDTOListAssetLocationDTO = {
    code?: number;
    message?: string;
    data?: AssetLocationDTO[];
  };

  type ResponseDTOListAssetLocationVO = {
    code?: number;
    message?: string;
    data?: AssetLocationVO[];
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
    managementDeptId?: string;
    /** 使用部门 */
    usageDeptId?: string;
    /** 生产厂商 */
    manufacturerId?: number;
    /** 设备存放位置 */
    locationId?: number;
    /** 巡检方案 */
    inspectionPlanId?: number;
    /** 购买日期 */
    purchaseDate?: string;
    /** 启用日期 */
    activationDate?: string;
    /** 最近维修时间 */
    lastRepaired?: string;
    deviceId?: number;
  };

  type UpdateAssetInspectionPlanCommand = {
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
    planId?: number;
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
    projectId?: number;
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
}
