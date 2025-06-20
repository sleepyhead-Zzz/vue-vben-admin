declare namespace RegulatoryAPI {
  type AddRegFurnitureCommand = {
    /** 资产编号，唯一标识家具资产 */
    assetCode?: string;
    /** 资产名称，例如：三人位沙发 */
    assetName?: string;
    /** 资产描述，例如材质、颜色等详细信息 */
    description?: string;
    /** 管理部门，例如：物业、办公室 */
    department?: string;
    /** 房间号 */
    locationId?: number;
  };

  type batchRemoveFurnitureParams = {
    furnitureIds: number[];
  };

  type editFurnitureParams = {
    furnitureId: number;
  };

  type exportFurnitureByExcelParams = {
    query: RegFurnitureQuery;
  };

  type getFurnitureInfoParams = {
    /** 记录ID */
    furnitureId: number;
  };

  type getPagedFurnituresParams = {
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

  type listFurnitureParams = {
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

  type PageDTORegFurnitureDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: RegFurnitureDTO[];
  };

  type RegFurnitureDTO = {
    /** 主键ID */
    furnitureId?: number;
    /** 资产编号，唯一标识家具资产 */
    assetCode?: string;
    /** 资产名称，例如：三人位沙发 */
    assetName?: string;
    /** 资产描述，例如材质、颜色等详细信息 */
    description?: string;
    /** 管理部门，例如：物业、办公室 */
    department?: string;
    /** 房间号 */
    locationId?: number;
  };

  type RegFurnitureQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type RegFurnitureVO = {
    /** 主键ID */
    furnitureId?: number;
    /** 资产编号，唯一标识家具资产 */
    assetCode?: string;
    /** 资产名称，例如：三人位沙发 */
    assetName?: string;
    /** 资产描述，例如材质、颜色等详细信息 */
    description?: string;
    /** 管理部门，例如：物业、办公室 */
    department?: string;
    /** 房间号 */
    locationId?: number;
  };

  type removeFurnitureParams = {
    furnitureId: number;
  };

  type ResponseDTOListRegFurnitureDTO = {
    code?: number;
    message?: string;
    data?: RegFurnitureDTO[];
  };

  type ResponseDTOListRegFurnitureVO = {
    code?: number;
    message?: string;
    data?: RegFurnitureVO[];
  };

  type ResponseDTOPageDTORegFurnitureDTO = {
    code?: number;
    message?: string;
    data?: PageDTORegFurnitureDTO;
  };

  type ResponseDTORegFurnitureDTO = {
    code?: number;
    message?: string;
    data?: RegFurnitureDTO;
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

  type UpdateRegFurnitureCommand = {
    /** 资产编号，唯一标识家具资产 */
    assetCode?: string;
    /** 资产名称，例如：三人位沙发 */
    assetName?: string;
    /** 资产描述，例如材质、颜色等详细信息 */
    description?: string;
    /** 管理部门，例如：物业、办公室 */
    department?: string;
    /** 房间号 */
    locationId?: number;
    furnitureId?: number;
  };
}
