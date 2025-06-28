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
    creatorId?: number;
  };

  type AddRegEstateCommand = {
    /** 资产分类编号 */
    assetCategoryCode?: string;
    /** 资产分类名称 */
    assetCategoryName?: string;
    /** 资产名称 */
    assetName?: string;
    /** 计量单位 */
    unit?: string;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 采购组织形式 */
    procurementMethod?: string;
    /** 竣工日期 */
    completionDate?: string;
    /** 构筑物计量 */
    constructionMeasurement?: number;
    /** 使用年限（月） */
    usageYears?: number;
    /** 建筑面积 */
    totalArea?: number;
    /** 使用面积 */
    usableArea?: number;
    /** 实际办公室面积 */
    officeArea?: number;
    /** 会议室 */
    meetingRoomArea?: number;
    /** 车库 */
    garageArea?: number;
    /** 食堂 */
    canteenArea?: number;
    /** 配电室 */
    powerRoomArea?: number;
    /** 机房 */
    machineRoomArea?: number;
    /** 地下面积 */
    basementArea?: number;
    /** 建筑结构 */
    structureType?: string;
    /** 产权形式 */
    propertyType?: string;
    /** 权属证明 */
    ownershipProof?: string;
    /** 权属证号 */
    ownershipNumber?: string;
    /** 发证时间 */
    issueDate?: string;
    /** 坐落位置 */
    location?: string;
    /** 价值类型 */
    valueType?: string;
    /** 价值（原值） */
    originalValue?: number;
    /** 财政拨款 */
    fundFinance?: number;
    /** 事业收入 */
    fundBusiness?: number;
    /** 其中：预算外收入 */
    fundOffbudget?: number;
    /** 其他资金 */
    fundOther?: number;
    /** 其中：财政性结余资金 */
    fundBalance?: number;
    /** 累计折旧 */
    accumulatedDepreciation?: number;
    /** 账面净值 */
    netBookValue?: number;
    /** 会计凭证号 */
    voucherCode?: string;
    /** 折旧状态 */
    depreciationStatus?: string;
    /** 均价 */
    unitPrice?: number;
    /** 使用/管理部门 */
    managementDept?: string;
    /** 使用状况 */
    usageStatus?: string;
    /** 自用面积 */
    selfUseArea?: number;
    /** 出借面积 */
    lentArea?: number;
    /** 出租面积 */
    rentedArea?: number;
    /** 对外投资面积 */
    investArea?: number;
    /** 担保面积 */
    guaranteeArea?: number;
    /** 其他面积 */
    otherArea?: number;
    /** 自用价值 */
    selfUseValue?: number;
    /** 出借价值 */
    lentValue?: number;
    /** 出租价值 */
    rentedValue?: number;
    /** 对外投资价值 */
    investValue?: number;
    /** 担保价值 */
    guaranteeValue?: number;
    /** 其他价值 */
    otherValue?: number;
    /** 出借对方单位 */
    lentUnit?: string;
    /** 出租对方单位 */
    rentedUnit?: string;
    /** 投入本单位使用时间 */
    useStartDate?: string;
    /** 备注 */
    remarks?: string;
    /** 制单人 */
    createdBy?: string;
    /** 审核人 */
    approvedBy?: string;
    /** 月折旧率 */
    depreciationRateMonthly?: number;
    /** 月折旧额 */
    depreciationAmountMonthly?: number;
    /** 预计残值 */
    estimatedSalvage?: number;
    /** 残值率 */
    salvageRate?: number;
    /** 已提折旧月数 */
    depreciatedMonths?: number;
    /** 折旧方法 */
    depreciationMethod?: string;
    /** 是否已入账（1是，0否） */
    isAccounted?: number;
    /** 是否未处置（1是，0否） */
    isDisposed?: number;
    creatorId?: number;
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

  type AddRegOfficeCommand = {
    /** 单据日期 */
    documentDate?: string;
    /** 资产编号 */
    assetCode?: string;
    /** 资产国标大类名称 */
    assetCategory?: string;
    /** 资产名称 */
    assetName?: string;
    /** 厂牌型号 */
    brandModel?: string;
    /** 计量单位 */
    unit?: string;
    /** 数量 */
    quantity?: number;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 管理部门 */
    manageDept?: string;
    /** 使用人 */
    userName?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 使用日期 */
    usageDate?: string;
    /** 存放地点 */
    storageLocation?: string;
    /** 用途分类 */
    usageCategory?: string;
    /** 价值类型 */
    valueType?: string;
    /** 资产原值 */
    originalValue?: number;
    /** 累计折旧 */
    accumulatedDepreciation?: number;
    /** 账面净值 */
    netBookValue?: number;
    /** 折旧年限（月） */
    depreciationYears?: number;
    /** 每月累计折旧 */
    monthlyDepreciation?: number;
    /** 已提折旧月数 */
    depreciatedMonths?: number;
    /** 会计凭证号 */
    accountingVoucher?: string;
    /** 折旧状态 */
    depreciationStatus?: string;
    /** 折旧方法 */
    depreciationMethod?: string;
    /** 使用状况 */
    usageStatus?: string;
    /** 使用方向 */
    usageDirection?: string;
    /** 制单人 */
    createdBy?: string;
    /** 审核人 */
    approvedBy?: string;
    /** 是否已入账（1是，0否） */
    isAccounted?: number;
    /** 是否未处置（1是，0否） */
    isDisposed?: number;
  };

  type batchRemoveCardParams = {
    cardIds: number[];
  };

  type batchRemoveEstateParams = {
    estateIds: number[];
  };

  type batchRemoveFurnitureParams = {
    furnitureIds: number[];
  };

  type batchRemoveOfficeParams = {
    officeIds: number[];
  };

  type editCardParams = {
    cardId: number;
  };

  type editEstateParams = {
    estateId: number;
  };

  type editFurnitureParams = {
    furnitureId: number;
  };

  type editOfficeParams = {
    officeId: number;
  };

  type exportCardByExcelParams = {
    query: RegCardQuery;
  };

  type exportEstateByExcelParams = {
    query: RegEstateQuery;
  };

  type exportFurnitureByExcelParams = {
    query: RegFurnitureQuery;
  };

  type exportOfficeByExcelParams = {
    query: RegOfficeQuery;
  };

  type getCardInfoParams = {
    /** 记录ID */
    cardId: number;
  };

  type getEstateInfoParams = {
    /** 记录ID */
    estateId: number;
  };

  type getFurnitureInfoParams = {
    /** 记录ID */
    furnitureId: number;
  };

  type getOfficeInfoParams = {
    /** 记录ID */
    officeId: number;
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

  type getPagedEstatesParams = {
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

  type getPagedOfficesParams = {
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

  type listEstateParams = {
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

  type listOfficeParams = {
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

  type PageDTORegEstateDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: RegEstateDTO[];
  };

  type PageDTORegFurnitureDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: RegFurnitureDTO[];
  };

  type PageDTORegOfficeDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: RegOfficeDTO[];
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
    userId?: number;
    /** 创建人 */
    creator_name?: string;
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

  type RegEstateDTO = {
    /** 主键 ID */
    estateId?: number;
    /** 资产分类编号 */
    assetCategoryCode?: string;
    /** 资产分类名称 */
    assetCategoryName?: string;
    /** 资产名称 */
    assetName?: string;
    /** 计量单位 */
    unit?: string;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 采购组织形式 */
    procurementMethod?: string;
    /** 竣工日期 */
    completionDate?: string;
    /** 构筑物计量 */
    constructionMeasurement?: number;
    /** 使用年限 */
    usageYears?: number;
    /** 建筑面积 */
    totalArea?: number;
    /** 使用面积 */
    usableArea?: number;
    /** 实际办公室面积 */
    officeArea?: number;
    /** 会议室 */
    meetingRoomArea?: number;
    /** 车库 */
    garageArea?: number;
    /** 食堂 */
    canteenArea?: number;
    /** 配电室 */
    powerRoomArea?: number;
    /** 机房 */
    machineRoomArea?: number;
    /** 地下面积 */
    basementArea?: number;
    /** 建筑结构 */
    structureType?: string;
    /** 产权形式 */
    propertyType?: string;
    /** 权属证明 */
    ownershipProof?: string;
    /** 权属证号 */
    ownershipNumber?: string;
    /** 发证时间 */
    issueDate?: string;
    /** 坐落位置 */
    location?: string;
    /** 价值类型 */
    valueType?: string;
    /** 价值 */
    originalValue?: number;
    /** 财政拨款 */
    fundFinance?: number;
    /** 事业收入 */
    fundBusiness?: number;
    /** 其中：预算外收入 */
    fundOffbudget?: number;
    /** 其他资金 */
    fundOther?: number;
    /** 其中：财政性结余资金 */
    fundBalance?: number;
    /** 累计折旧 */
    accumulatedDepreciation?: number;
    /** 账面净值 */
    netBookValue?: number;
    /** 会计凭证号 */
    voucherCode?: string;
    /** 折旧状态 */
    depreciationStatus?: string;
    /** 均价 */
    unitPrice?: number;
    /** 使用/管理部门 */
    managementDept?: string;
    /** 使用状况 */
    usageStatus?: string;
    /** 自用面积 */
    selfUseArea?: number;
    /** 出借面积 */
    lentArea?: number;
    /** 出租面积 */
    rentedArea?: number;
    /** 对外投资面积 */
    investArea?: number;
    /** 担保面积 */
    guaranteeArea?: number;
    /** 其他面积 */
    otherArea?: number;
    /** 自用价值 */
    selfUseValue?: number;
    /** 出借价值 */
    lentValue?: number;
    /** 出租价值 */
    rentedValue?: number;
    /** 对外投资价值 */
    investValue?: number;
    /** 担保价值 */
    guaranteeValue?: number;
    /** 其他价值 */
    otherValue?: number;
    /** 出借对方单位 */
    lentUnit?: string;
    /** 出租对方单位 */
    rentedUnit?: string;
    /** 投入本单位使用时间 */
    useStartDate?: string;
    /** 备注 */
    remarks?: string;
    /** 制单人 */
    createdBy?: string;
    /** 审核人 */
    approvedBy?: string;
    /** 月折旧率 */
    depreciationRateMonthly?: number;
    /** 月折旧额 */
    depreciationAmountMonthly?: number;
    /** 预计残值 */
    estimatedSalvage?: number;
    /** 残值率 */
    salvageRate?: number;
    /** 已提折旧月数 */
    depreciatedMonths?: number;
    /** 折旧方法 */
    depreciationMethod?: string;
    /** 是否已入账 */
    isAccounted?: number;
    /** 是否未处置 */
    isDisposed?: number;
  };

  type RegEstateQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type RegEstateVO = {
    /** 主键 ID */
    estateId?: number;
    /** 资产分类编号 */
    assetCategoryCode?: string;
    /** 资产分类名称 */
    assetCategoryName?: string;
    /** 资产名称 */
    assetName?: string;
    /** 计量单位 */
    unit?: string;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 采购组织形式 */
    procurementMethod?: string;
    /** 竣工日期 */
    completionDate?: string;
    /** 构筑物计量 */
    constructionMeasurement?: number;
    /** 使用年限 */
    usageYears?: number;
    /** 建筑面积 */
    totalArea?: number;
    /** 使用面积 */
    usableArea?: number;
    /** 实际办公室面积 */
    officeArea?: number;
    /** 会议室 */
    meetingRoomArea?: number;
    /** 车库 */
    garageArea?: number;
    /** 食堂 */
    canteenArea?: number;
    /** 配电室 */
    powerRoomArea?: number;
    /** 机房 */
    machineRoomArea?: number;
    /** 地下面积 */
    basementArea?: number;
    /** 建筑结构 */
    structureType?: string;
    /** 产权形式 */
    propertyType?: string;
    /** 权属证明 */
    ownershipProof?: string;
    /** 权属证号 */
    ownershipNumber?: string;
    /** 发证时间 */
    issueDate?: string;
    /** 坐落位置 */
    location?: string;
    /** 价值类型 */
    valueType?: string;
    /** 价值 */
    originalValue?: number;
    /** 财政拨款 */
    fundFinance?: number;
    /** 事业收入 */
    fundBusiness?: number;
    /** 其中：预算外收入 */
    fundOffbudget?: number;
    /** 其他资金 */
    fundOther?: number;
    /** 其中：财政性结余资金 */
    fundBalance?: number;
    /** 累计折旧 */
    accumulatedDepreciation?: number;
    /** 账面净值 */
    netBookValue?: number;
    /** 会计凭证号 */
    voucherCode?: string;
    /** 折旧状态 */
    depreciationStatus?: string;
    /** 均价 */
    unitPrice?: number;
    /** 使用/管理部门 */
    managementDept?: string;
    /** 使用状况 */
    usageStatus?: string;
    /** 自用面积 */
    selfUseArea?: number;
    /** 出借面积 */
    lentArea?: number;
    /** 出租面积 */
    rentedArea?: number;
    /** 对外投资面积 */
    investArea?: number;
    /** 担保面积 */
    guaranteeArea?: number;
    /** 其他面积 */
    otherArea?: number;
    /** 自用价值 */
    selfUseValue?: number;
    /** 出借价值 */
    lentValue?: number;
    /** 出租价值 */
    rentedValue?: number;
    /** 对外投资价值 */
    investValue?: number;
    /** 担保价值 */
    guaranteeValue?: number;
    /** 其他价值 */
    otherValue?: number;
    /** 出借对方单位 */
    lentUnit?: string;
    /** 出租对方单位 */
    rentedUnit?: string;
    /** 投入本单位使用时间 */
    useStartDate?: string;
    /** 备注 */
    remarks?: string;
    /** 制单人 */
    createdBy?: string;
    /** 审核人 */
    approvedBy?: string;
    /** 月折旧率 */
    depreciationRateMonthly?: number;
    /** 月折旧额 */
    depreciationAmountMonthly?: number;
    /** 预计残值 */
    estimatedSalvage?: number;
    /** 残值率 */
    salvageRate?: number;
    /** 已提折旧月数 */
    depreciatedMonths?: number;
    /** 折旧方法 */
    depreciationMethod?: string;
    /** 是否已入账 */
    isAccounted?: number;
    /** 是否未处置 */
    isDisposed?: number;
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

  type RegOfficeDTO = {
    /** 主键ID */
    officeId?: number;
    /** 单据日期 */
    documentDate?: string;
    /** 资产编号 */
    assetCode?: string;
    /** 资产国标大类名称 */
    assetCategory?: string;
    /** 资产名称 */
    assetName?: string;
    /** 厂牌型号 */
    brandModel?: string;
    /** 计量单位 */
    unit?: string;
    /** 数量 */
    quantity?: number;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 管理部门 */
    manageDept?: string;
    /** 使用人 */
    userName?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 使用日期 */
    usageDate?: string;
    /** 存放地点 */
    storageLocation?: string;
    /** 用途分类 */
    usageCategory?: string;
    /** 价值类型 */
    valueType?: string;
    /** 资产原值 */
    originalValue?: number;
    /** 累计折旧 */
    accumulatedDepreciation?: number;
    /** 账面净值 */
    netBookValue?: number;
    /** 折旧年限 */
    depreciationYears?: number;
    /** 每月累计折旧 */
    monthlyDepreciation?: number;
    /** 已提折旧月数 */
    depreciatedMonths?: number;
    /** 会计凭证号 */
    accountingVoucher?: string;
    /** 折旧状态 */
    depreciationStatus?: string;
    /** 折旧方法 */
    depreciationMethod?: string;
    /** 使用状况 */
    usageStatus?: string;
    /** 使用方向 */
    usageDirection?: string;
    /** 制单人 */
    createdBy?: string;
    /** 审核人 */
    approvedBy?: string;
    /** 是否已入账 */
    isAccounted?: number;
    /** 是否未处置 */
    isDisposed?: number;
  };

  type RegOfficeQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type RegOfficeVO = {
    /** 主键ID */
    officeId?: number;
    /** 单据日期 */
    documentDate?: string;
    /** 资产编号 */
    assetCode?: string;
    /** 资产国标大类名称 */
    assetCategory?: string;
    /** 资产名称 */
    assetName?: string;
    /** 厂牌型号 */
    brandModel?: string;
    /** 计量单位 */
    unit?: string;
    /** 数量 */
    quantity?: number;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 管理部门 */
    manageDept?: string;
    /** 使用人 */
    userName?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 使用日期 */
    usageDate?: string;
    /** 存放地点 */
    storageLocation?: string;
    /** 用途分类 */
    usageCategory?: string;
    /** 价值类型 */
    valueType?: string;
    /** 资产原值 */
    originalValue?: number;
    /** 累计折旧 */
    accumulatedDepreciation?: number;
    /** 账面净值 */
    netBookValue?: number;
    /** 折旧年限 */
    depreciationYears?: number;
    /** 每月累计折旧 */
    monthlyDepreciation?: number;
    /** 已提折旧月数 */
    depreciatedMonths?: number;
    /** 会计凭证号 */
    accountingVoucher?: string;
    /** 折旧状态 */
    depreciationStatus?: string;
    /** 折旧方法 */
    depreciationMethod?: string;
    /** 使用状况 */
    usageStatus?: string;
    /** 使用方向 */
    usageDirection?: string;
    /** 制单人 */
    createdBy?: string;
    /** 审核人 */
    approvedBy?: string;
    /** 是否已入账 */
    isAccounted?: number;
    /** 是否未处置 */
    isDisposed?: number;
  };

  type removeCardParams = {
    cardId: number;
  };

  type removeEstateParams = {
    estateId: number;
  };

  type removeFurnitureParams = {
    furnitureId: number;
  };

  type removeOfficeParams = {
    officeId: number;
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

  type ResponseDTOListRegEstateDTO = {
    code?: number;
    message?: string;
    data?: RegEstateDTO[];
  };

  type ResponseDTOListRegEstateVO = {
    code?: number;
    message?: string;
    data?: RegEstateVO[];
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

  type ResponseDTOListRegOfficeDTO = {
    code?: number;
    message?: string;
    data?: RegOfficeDTO[];
  };

  type ResponseDTOListRegOfficeVO = {
    code?: number;
    message?: string;
    data?: RegOfficeVO[];
  };

  type ResponseDTOPageDTORegCardDTO = {
    code?: number;
    message?: string;
    data?: PageDTORegCardDTO;
  };

  type ResponseDTOPageDTORegEstateDTO = {
    code?: number;
    message?: string;
    data?: PageDTORegEstateDTO;
  };

  type ResponseDTOPageDTORegFurnitureDTO = {
    code?: number;
    message?: string;
    data?: PageDTORegFurnitureDTO;
  };

  type ResponseDTOPageDTORegOfficeDTO = {
    code?: number;
    message?: string;
    data?: PageDTORegOfficeDTO;
  };

  type ResponseDTORegCardDTO = {
    code?: number;
    message?: string;
    data?: RegCardDTO;
  };

  type ResponseDTORegEstateDTO = {
    code?: number;
    message?: string;
    data?: RegEstateDTO;
  };

  type ResponseDTORegFurnitureDTO = {
    code?: number;
    message?: string;
    data?: RegFurnitureDTO;
  };

  type ResponseDTORegOfficeDTO = {
    code?: number;
    message?: string;
    data?: RegOfficeDTO;
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
    creatorId?: number;
    cardId?: number;
    updaterId?: number;
  };

  type UpdateRegEstateCommand = {
    /** 资产分类编号 */
    assetCategoryCode?: string;
    /** 资产分类名称 */
    assetCategoryName?: string;
    /** 资产名称 */
    assetName?: string;
    /** 计量单位 */
    unit?: string;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 采购组织形式 */
    procurementMethod?: string;
    /** 竣工日期 */
    completionDate?: string;
    /** 构筑物计量 */
    constructionMeasurement?: number;
    /** 使用年限（月） */
    usageYears?: number;
    /** 建筑面积 */
    totalArea?: number;
    /** 使用面积 */
    usableArea?: number;
    /** 实际办公室面积 */
    officeArea?: number;
    /** 会议室 */
    meetingRoomArea?: number;
    /** 车库 */
    garageArea?: number;
    /** 食堂 */
    canteenArea?: number;
    /** 配电室 */
    powerRoomArea?: number;
    /** 机房 */
    machineRoomArea?: number;
    /** 地下面积 */
    basementArea?: number;
    /** 建筑结构 */
    structureType?: string;
    /** 产权形式 */
    propertyType?: string;
    /** 权属证明 */
    ownershipProof?: string;
    /** 权属证号 */
    ownershipNumber?: string;
    /** 发证时间 */
    issueDate?: string;
    /** 坐落位置 */
    location?: string;
    /** 价值类型 */
    valueType?: string;
    /** 价值（原值） */
    originalValue?: number;
    /** 财政拨款 */
    fundFinance?: number;
    /** 事业收入 */
    fundBusiness?: number;
    /** 其中：预算外收入 */
    fundOffbudget?: number;
    /** 其他资金 */
    fundOther?: number;
    /** 其中：财政性结余资金 */
    fundBalance?: number;
    /** 累计折旧 */
    accumulatedDepreciation?: number;
    /** 账面净值 */
    netBookValue?: number;
    /** 会计凭证号 */
    voucherCode?: string;
    /** 折旧状态 */
    depreciationStatus?: string;
    /** 均价 */
    unitPrice?: number;
    /** 使用/管理部门 */
    managementDept?: string;
    /** 使用状况 */
    usageStatus?: string;
    /** 自用面积 */
    selfUseArea?: number;
    /** 出借面积 */
    lentArea?: number;
    /** 出租面积 */
    rentedArea?: number;
    /** 对外投资面积 */
    investArea?: number;
    /** 担保面积 */
    guaranteeArea?: number;
    /** 其他面积 */
    otherArea?: number;
    /** 自用价值 */
    selfUseValue?: number;
    /** 出借价值 */
    lentValue?: number;
    /** 出租价值 */
    rentedValue?: number;
    /** 对外投资价值 */
    investValue?: number;
    /** 担保价值 */
    guaranteeValue?: number;
    /** 其他价值 */
    otherValue?: number;
    /** 出借对方单位 */
    lentUnit?: string;
    /** 出租对方单位 */
    rentedUnit?: string;
    /** 投入本单位使用时间 */
    useStartDate?: string;
    /** 备注 */
    remarks?: string;
    /** 制单人 */
    createdBy?: string;
    /** 审核人 */
    approvedBy?: string;
    /** 月折旧率 */
    depreciationRateMonthly?: number;
    /** 月折旧额 */
    depreciationAmountMonthly?: number;
    /** 预计残值 */
    estimatedSalvage?: number;
    /** 残值率 */
    salvageRate?: number;
    /** 已提折旧月数 */
    depreciatedMonths?: number;
    /** 折旧方法 */
    depreciationMethod?: string;
    /** 是否已入账（1是，0否） */
    isAccounted?: number;
    /** 是否未处置（1是，0否） */
    isDisposed?: number;
    creatorId?: number;
    estateId?: number;
    updaterId?: number;
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

  type UpdateRegOfficeCommand = {
    /** 单据日期 */
    documentDate?: string;
    /** 资产编号 */
    assetCode?: string;
    /** 资产国标大类名称 */
    assetCategory?: string;
    /** 资产名称 */
    assetName?: string;
    /** 厂牌型号 */
    brandModel?: string;
    /** 计量单位 */
    unit?: string;
    /** 数量 */
    quantity?: number;
    /** 取得方式 */
    acquisitionMethod?: string;
    /** 管理部门 */
    manageDept?: string;
    /** 使用人 */
    userName?: string;
    /** 取得日期 */
    acquisitionDate?: string;
    /** 使用日期 */
    usageDate?: string;
    /** 存放地点 */
    storageLocation?: string;
    /** 用途分类 */
    usageCategory?: string;
    /** 价值类型 */
    valueType?: string;
    /** 资产原值 */
    originalValue?: number;
    /** 累计折旧 */
    accumulatedDepreciation?: number;
    /** 账面净值 */
    netBookValue?: number;
    /** 折旧年限（月） */
    depreciationYears?: number;
    /** 每月累计折旧 */
    monthlyDepreciation?: number;
    /** 已提折旧月数 */
    depreciatedMonths?: number;
    /** 会计凭证号 */
    accountingVoucher?: string;
    /** 折旧状态 */
    depreciationStatus?: string;
    /** 折旧方法 */
    depreciationMethod?: string;
    /** 使用状况 */
    usageStatus?: string;
    /** 使用方向 */
    usageDirection?: string;
    /** 制单人 */
    createdBy?: string;
    /** 审核人 */
    approvedBy?: string;
    /** 是否已入账（1是，0否） */
    isAccounted?: number;
    /** 是否未处置（1是，0否） */
    isDisposed?: number;
    officeId?: number;
  };
}
