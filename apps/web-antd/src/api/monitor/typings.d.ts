declare namespace MonitorAPI {
  type CommandStatusDTO = {
    name?: string;
    value?: string;
  };

  type exportLoginInfoByExcelParams = {
    query: LoginLogQuery;
  };

  type exportOperationLogByExcelParams = {
    query: OperationLogQuery;
  };

  type getPagedLoginInfoParams = {
    ipAddress?: string;
    status?: string;
    username?: string;
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

  type getPagedOperationLogParams = {
    query: OperationLogQuery;
  };

  type LoginLogDTO = {
    /** ID */
    logId?: string;
    /** 用户名 */
    userName?: string;
    /** ip地址 */
    ipAddress?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 操作系统 */
    operationSystem?: string;
    /** 浏览器 */
    browser?: string;
    status?: number;
    /** 描述 */
    msg?: string;
    /** 登录时间 */
    loginTime?: string;
    clientKey?: string;
  };

  type LoginLogQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    ipAddress?: string;
    status?: string;
    username?: string;
  };

  type logoutOnlineUserParams = {
    tokenId: string;
  };

  type OnlineUserDTO = {
    tokenId?: string;
    deptName?: string;
    userName?: string;
    ipAddress?: string;
    loginLocation?: string;
    browser?: string;
    operationSystem?: string;
    loginTime?: number;
  };

  type onlineUsersParams = {
    ipAddress: string;
    username: string;
  };

  type OperationLogDTO = {
    /** ID */
    operationId?: number;
    /** 业务类型（0其它 1新增 2修改 3删除） */
    businessType?: number;
    /** 请求方式 */
    requestMethod?: string;
    /** 模块标题 */
    requestModule?: string;
    /** 操作URL */
    requestUrl?: string;
    /** 方法名称 */
    calledMethod?: string;
    /** 操作类别（0其它 1后台用户 2手机端用户） */
    operatorType?: number;
    /** 用户ID */
    userId?: number;
    /** 操作人员名称 */
    username?: string;
    /** ip地址 */
    operatorIp?: string;
    /** ip地点 */
    operatorLocation?: string;
    /** 部门ID */
    deptId?: number;
    /** 部门名称 */
    deptName?: string;
    /** 操作参数 */
    operationParam?: string;
    /** 操作结果 */
    operationResult?: string;
    status?: number;
    /** 错误堆栈 */
    errorStack?: string;
    /** 操作时间 */
    operationTime?: string;
    costTime?: number;
  };

  type OperationLogQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    businessType?: string;
    status?: string;
    username?: string;
    requestModule?: string;
  };

  type PageDTOLoginLogDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: LoginLogDTO[];
  };

  type PageDTOOnlineUserDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: OnlineUserDTO[];
  };

  type PageDTOOperationLogDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: OperationLogDTO[];
  };

  type RedisCacheInfoDTO = {
    info?: Record<string, any>;
    dbSize?: number;
    commandStats?: CommandStatusDTO[];
  };

  type removeLoginInfoParams = {
    ids: number[];
  };

  type removeOperationLogParams = {
    operationIds: number[];
  };

  type ResponseDTOPageDTOLoginLogDTO = {
    code?: number;
    message?: string;
    data?: PageDTOLoginLogDTO;
  };

  type ResponseDTOPageDTOOnlineUserDTO = {
    code?: number;
    message?: string;
    data?: PageDTOOnlineUserDTO;
  };

  type ResponseDTOPageDTOOperationLogDTO = {
    code?: number;
    message?: string;
    data?: PageDTOOperationLogDTO;
  };

  type ResponseDTORedisCacheInfoDTO = {
    code?: number;
    message?: string;
    data?: RedisCacheInfoDTO;
  };

  type ResponseDTOVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };
}
