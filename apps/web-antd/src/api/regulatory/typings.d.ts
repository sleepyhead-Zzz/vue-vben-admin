declare namespace RegulatoryAPI {
  type AddRegCardCommand = {
    /** 资产编号 */
    assetCode?: string;
    /** 资产名称 */
    assetName?: string;
    /** 业务状态 */
    businessStatus?: string;
    /** 卡片类型 */
    cardType?: string;
    /** 单位会计科目 */
    accountingSubject?: string;
    /** 资产分类 */
    assetCategory?: string;
    /** 资产分类代码 */
    assetCategoryCode?: string;
    /** 资产门类 */
    assetMajorCategory?: string;
    /** 资产原值(元) */
    originalValue?: number;
    /** 累计折旧/摊销(元) */
    accumulatedDepreciation?: number;
    /** 数量/面积 */
    quantityArea?: number;
    /** 数量计量单位 */
    quantityUnit?: string;
    /** 财务入账状态 */
    financialAccountStatus?: string;
    /** 记账日期 */
    accountingDate?: string;
    /** 记账凭证号 */
    accountingVoucherNo?: string;
    /** 品牌 */
    brand?: string;
    /** 规格型号 */
    specificationModel?: string;
    /** 存放地点 */
    storageLocation?: string;
    /** 车牌号 */
    licensePlate?: string;
    /** 管理部门 */
    managingDepartmentId?: number;
    /** 管理人 */
    manager?: string;
    /** 使用部门 */
    usingDepartmentId?: number;
    /** 使用人 */
    userId?: string;
    /** 创建人 */
    creator?: string;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 折旧/摊销年限(月) */
    depreciationLifeMonths?: number;
    /** 已提折旧/摊销月数 */
    depreciationMonths?: number;
    /** 清查编号 */
    inventoryNo?: string;
    /** 坐落位置 */
    location?: string;
    /** 项目代码 */
    projectCode?: string;
    /** 采购组织形式 */
    procurementForm?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 资产状态 */
    assetStatus?: string;
    /** 资产用途 */
    assetUse?: string;
    /** 接口状态 */
    interfaceStatus?: string;
    /** 备注 */
    remarks?: string;
  };

  type AddRegFurnitureCommand = {
    /** 资产编号，唯一标识家具资产 */
    assetCode?: string;
    /** 资产名称，例如：三人位沙发 */
    assetName?: string;
    /** 资产描述，例如材质、颜色等详细信息 */
    description?: string;
    /** 管理部门，例如：物业、办公室 */
    manageDeptId?: number;
    /** 房间号 */
    locationId?: number;
    creatorId?: number;
  };

  type batchRemoveCardParams = {
    cardIds: number[];
  };

  type batchRemoveFurnitureParams = {
    furnitureIds: number[];
  };

  type editCardParams = {
    cardId: number;
  };

  type editFurnitureParams = {
    furnitureId: number;
  };

  type exportCardByExcelParams = {
    query: RegCardQuery;
  };

  type exportFurnitureByExcelParams = {
    query: RegFurnitureQuery;
  };

  type getCardInfoParams = {
    /** 记录ID */
    cardId: number;
  };

  type getFurnitureInfoParams = {
    /** 记录ID */
    furnitureId: number;
  };

  type getPagedCardsParams = {
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

  type listCardParams = {
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

  type PageDTORegCardDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: RegCardDTO[];
  };

  type PageDTORegFurnitureDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: RegFurnitureDTO[];
  };

  type RegCardDTO = {
    /** 主键ID */
    cardId?: number;
    /** 资产编号 */
    assetCode?: string;
    /** 资产名称 */
    assetName?: string;
    /** 业务状态 */
    businessStatus?: string;
    /** 卡片类型 */
    cardType?: string;
    /** 单位会计科目 */
    accountingSubject?: string;
    /** 资产分类 */
    assetCategory?: string;
    /** 资产分类代码 */
    assetCategoryCode?: string;
    /** 资产门类 */
    assetMajorCategory?: string;
    /** 资产原值(元) */
    originalValue?: number;
    /** 累计折旧/摊销(元) */
    accumulatedDepreciation?: number;
    /** 数量/面积 */
    quantityArea?: number;
    /** 数量计量单位 */
    quantityUnit?: string;
    /** 财务入账状态 */
    financialAccountStatus?: string;
    /** 记账日期 */
    accountingDate?: string;
    /** 记账凭证号 */
    accountingVoucherNo?: string;
    /** 品牌 */
    brand?: string;
    /** 规格型号 */
    specificationModel?: string;
    /** 存放地点 */
    storageLocation?: string;
    /** 车牌号 */
    licensePlate?: string;
    /** 管理部门 */
    managingDepartmentId?: number;
    /** 管理人 */
    manager?: string;
    /** 使用部门 */
    usingDepartmentId?: number;
    /** 使用人 */
    userId?: string;
    /** 创建人 */
    creator?: string;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 折旧/摊销年限(月) */
    depreciationLifeMonths?: number;
    /** 已提折旧/摊销月数 */
    depreciationMonths?: number;
    /** 清查编号 */
    inventoryNo?: string;
    /** 坐落位置 */
    location?: string;
    /** 项目代码 */
    projectCode?: string;
    /** 采购组织形式 */
    procurementForm?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 资产状态 */
    assetStatus?: string;
    /** 资产用途 */
    assetUse?: string;
    /** 接口状态 */
    interfaceStatus?: string;
    /** 备注 */
    remarks?: string;
  };

  type RegCardQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type RegCardVO = {
    /** 主键ID */
    cardId?: number;
    /** 资产编号 */
    assetCode?: string;
    /** 资产名称 */
    assetName?: string;
    /** 业务状态 */
    businessStatus?: string;
    /** 卡片类型 */
    cardType?: string;
    /** 单位会计科目 */
    accountingSubject?: string;
    /** 资产分类 */
    assetCategory?: string;
    /** 资产分类代码 */
    assetCategoryCode?: string;
    /** 资产门类 */
    assetMajorCategory?: string;
    /** 资产原值(元) */
    originalValue?: number;
    /** 累计折旧/摊销(元) */
    accumulatedDepreciation?: number;
    /** 数量/面积 */
    quantityArea?: number;
    /** 数量计量单位 */
    quantityUnit?: string;
    /** 财务入账状态 */
    financialAccountStatus?: string;
    /** 记账日期 */
    accountingDate?: string;
    /** 记账凭证号 */
    accountingVoucherNo?: string;
    /** 品牌 */
    brand?: string;
    /** 规格型号 */
    specificationModel?: string;
    /** 存放地点 */
    storageLocation?: string;
    /** 车牌号 */
    licensePlate?: string;
    /** 管理部门 */
    managingDepartmentId?: number;
    /** 管理人 */
    manager?: string;
    /** 使用部门 */
    usingDepartmentId?: number;
    /** 使用人 */
    userId?: string;
    /** 创建人 */
    creator?: string;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 折旧/摊销年限(月) */
    depreciationLifeMonths?: number;
    /** 已提折旧/摊销月数 */
    depreciationMonths?: number;
    /** 清查编号 */
    inventoryNo?: string;
    /** 坐落位置 */
    location?: string;
    /** 项目代码 */
    projectCode?: string;
    /** 采购组织形式 */
    procurementForm?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 资产状态 */
    assetStatus?: string;
    /** 资产用途 */
    assetUse?: string;
    /** 接口状态 */
    interfaceStatus?: string;
    /** 备注 */
    remarks?: string;
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
    managerDeptId?: number;
    /** 管理部门，例如：物业、办公室 */
    manageDeptName?: string;
    /** 房间号 */
    locationId?: number;
    /** 房间号 */
    locationName?: string;
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

  type removeCardParams = {
    cardId: number;
  };

  type removeFurnitureParams = {
    furnitureId: number;
  };

  type ResponseDTOListRegCardDTO = {
    code?: number;
    message?: string;
    data?: RegCardDTO[];
  };

  type ResponseDTOListRegCardVO = {
    code?: number;
    message?: string;
    data?: RegCardVO[];
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

  type ResponseDTOPageDTORegCardDTO = {
    code?: number;
    message?: string;
    data?: PageDTORegCardDTO;
  };

  type ResponseDTOPageDTORegFurnitureDTO = {
    code?: number;
    message?: string;
    data?: PageDTORegFurnitureDTO;
  };

  type ResponseDTORegCardDTO = {
    code?: number;
    message?: string;
    data?: RegCardDTO;
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

  type UpdateRegCardCommand = {
    /** 资产编号 */
    assetCode?: string;
    /** 资产名称 */
    assetName?: string;
    /** 业务状态 */
    businessStatus?: string;
    /** 卡片类型 */
    cardType?: string;
    /** 单位会计科目 */
    accountingSubject?: string;
    /** 资产分类 */
    assetCategory?: string;
    /** 资产分类代码 */
    assetCategoryCode?: string;
    /** 资产门类 */
    assetMajorCategory?: string;
    /** 资产原值(元) */
    originalValue?: number;
    /** 累计折旧/摊销(元) */
    accumulatedDepreciation?: number;
    /** 数量/面积 */
    quantityArea?: number;
    /** 数量计量单位 */
    quantityUnit?: string;
    /** 财务入账状态 */
    financialAccountStatus?: string;
    /** 记账日期 */
    accountingDate?: string;
    /** 记账凭证号 */
    accountingVoucherNo?: string;
    /** 品牌 */
    brand?: string;
    /** 规格型号 */
    specificationModel?: string;
    /** 存放地点 */
    storageLocation?: string;
    /** 车牌号 */
    licensePlate?: string;
    /** 管理部门 */
    managingDepartmentId?: number;
    /** 管理人 */
    manager?: string;
    /** 使用部门 */
    usingDepartmentId?: number;
    /** 使用人 */
    userId?: string;
    /** 创建人 */
    creator?: string;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 折旧/摊销年限(月) */
    depreciationLifeMonths?: number;
    /** 已提折旧/摊销月数 */
    depreciationMonths?: number;
    /** 清查编号 */
    inventoryNo?: string;
    /** 坐落位置 */
    location?: string;
    /** 项目代码 */
    projectCode?: string;
    /** 采购组织形式 */
    procurementForm?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 资产状态 */
    assetStatus?: string;
    /** 资产用途 */
    assetUse?: string;
    /** 接口状态 */
    interfaceStatus?: string;
    /** 备注 */
    remarks?: string;
    cardId?: number;
  };

  type UpdateRegFurnitureCommand = {
    /** 资产编号，唯一标识家具资产 */
    assetCode?: string;
    /** 资产名称，例如：三人位沙发 */
    assetName?: string;
    /** 资产描述，例如材质、颜色等详细信息 */
    description?: string;
    /** 管理部门，例如：物业、办公室 */
    manageDeptId?: number;
    /** 房间号 */
    locationId?: number;
    creatorId?: number;
    furnitureId?: number;
    updaterId?: number;
  };
}
