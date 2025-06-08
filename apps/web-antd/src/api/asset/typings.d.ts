declare namespace AssetAPI {
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

  type batchRemoveLocationParams = {
    locationIds: number[];
  };

  type batchRemoveProjectParams = {
    projectIds: number[];
  };

  type editLocationParams = {
    locationId: number;
  };

  type editProjectParams = {
    projectId: number;
  };

  type exportLocationByExcelParams = {
    query: AssetLocationQuery;
  };

  type exportProjectByExcelParams = {
    query: AssetInspectionProjectQuery;
  };

  type getLocationInfoParams = {
    /** 记录ID */
    locationId: number;
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

  type getProjectInfoParams = {
    /** 记录ID */
    projectId: number;
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

  type removeLocationParams = {
    locationId: number;
  };

  type removeProjectParams = {
    projectId: number;
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
}
