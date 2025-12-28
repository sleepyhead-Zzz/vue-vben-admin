declare namespace ToolAPI {
  type batchGenCodeParams = {
    tableIdStr: string;
  };

  type columnListParams = {
    tableId: number;
  };

  type dataListParams = {
    pageQuery: GenPageQuery;
  };

  type downloadParams = {
    tableId: number;
  };

  type generatorCodeWithPathParams = {
    tableId: number;
  };

  type genListParams = {
    pageQuery: GenPageQuery;
  };

  type GenPageQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    tableName?: string;
    dataName?: string;
    tableComment?: string;
  };

  type GenTableColumnDTO = {
    columnId?: number;
    tableId?: number;
    columnName?: string;
    columnComment?: string;
    columnType?: string;
    javaType?: string;
    javaField?: string;
    isPk?: string;
    isIncrement?: string;
    isRequired?: string;
    isInsert?: string;
    isEdit?: string;
    isList?: string;
    isQuery?: string;
    queryType?: string;
    htmlType?: string;
    dictType?: string;
    sort?: number;
  };

  type GenTableColumnEntity = {
    /** 创建部门 */
    createDept?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者ID */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 删除标志（0代表存在 1代表删除） */
    deleted?: boolean;
    columnId?: number;
    tableId?: number;
    columnName?: string;
    columnComment?: string;
    columnType?: string;
    javaType?: string;
    javaField?: string;
    isPk?: string;
    isIncrement?: string;
    isRequired?: string;
    isInsert?: string;
    isEdit?: string;
    isList?: string;
    isQuery?: string;
    queryType?: string;
    htmlType?: string;
    dictType?: string;
    sort?: number;
    increment?: boolean;
    capJavaField?: string;
    query?: boolean;
    list?: boolean;
    required?: boolean;
    pk?: boolean;
    insert?: boolean;
    edit?: boolean;
    usableColumn?: boolean;
    superColumn?: boolean;
  };

  type GenTableDTO = {
    tableId?: number;
    dataName?: string;
    tableName?: string;
    tableComment?: string;
    subTableName?: string;
    subTableFkName?: string;
    className?: string;
    tplCategory?: string;
    packageName?: string;
    moduleName?: string;
    businessName?: string;
    functionName?: string;
    functionAuthor?: string;
    genType?: string;
    genPath?: string;
    pkColumn?: GenTableColumnDTO;
    columns?: GenTableColumnDTO[];
    options?: string;
    remark?: string;
    treeCode?: string;
    treeParentCode?: string;
    treeName?: string;
    menuIds?: number[];
    parentMenuId?: number;
    parentMenuName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type GenTableEntity = {
    /** 创建部门 */
    createDept?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者ID */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 删除标志（0代表存在 1代表删除） */
    deleted?: boolean;
    tableId?: number;
    dataName?: string;
    tableName?: string;
    tableComment?: string;
    subTableName?: string;
    subTableFkName?: string;
    className?: string;
    tplCategory?: string;
    packageName?: string;
    moduleName?: string;
    businessName?: string;
    functionName?: string;
    functionAuthor?: string;
    genType?: string;
    genPath?: string;
    pkColumn?: GenTableColumnEntity;
    columns?: GenTableColumnEntity[];
    options?: string;
    remark?: string;
    treeCode?: string;
    treeParentCode?: string;
    treeName?: string;
    menuIds?: number[];
    parentMenuId?: number;
    parentMenuName?: string;
    params?: Record<string, any>;
    tree?: boolean;
    crud?: boolean;
  };

  type getInfoParams = {
    tableId: number;
  };

  type ImportTableDTO = {
    tables?: string;
    dataName?: string;
  };

  type PageDTOGenTableColumnDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: GenTableColumnDTO[];
  };

  type PageDTOGenTableDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: GenTableDTO[];
  };

  type PageDTOGenTableEntity = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: GenTableEntity[];
  };

  type previewParams = {
    tableId: number;
  };

  type removeGeneratorParams = {
    tableIds: number[];
  };

  type ResponseDTOMapStringObject = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type ResponseDTOMapStringString = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type ResponseDTOPageDTOGenTableColumnDTO = {
    code?: number;
    message?: string;
    data?: PageDTOGenTableColumnDTO;
  };

  type ResponseDTOPageDTOGenTableDTO = {
    code?: number;
    message?: string;
    data?: PageDTOGenTableDTO;
  };

  type ResponseDTOPageDTOGenTableEntity = {
    code?: number;
    message?: string;
    data?: PageDTOGenTableEntity;
  };

  type ResponseDTOVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type syncDbParams = {
    tableId: number;
  };
}
