declare namespace API {
  type AddConfigCommand = {
    /** 参数名称 */
    configName?: string;
    /** 参数键名 */
    configKey?: string;
    /** 参数键值 */
    configValue?: string;
    /** 系统内置（Y是 N否） */
    configType?: string;
    /** 备注 */
    remark?: string;
  };

  type AddDeptCommand = {
    parentId: number;
    deptName?: string;
    orderNum: number;
    leaderId?: number;
    phone?: string;
    email?: string;
    status?: number;
  };

  type AddDictDataCommand = {
    /** 字典排序 */
    dictSort?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典键值 */
    dictValue?: string;
    /** 字典类型 */
    dictType?: string;
    /** 样式属性（其他样式扩展） */
    cssClass?: string;
    /** 表格回显样式 */
    listClass?: string;
    /** 是否默认（Y是 N否） */
    isDefault?: string;
    /** 备注 */
    remark?: string;
  };

  type AddDictTypeCommand = {
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 备注 */
    remark?: string;
  };

  type AddMenuCommand = {
    parentId?: number;
    menuName?: string;
    orderNum: number;
    path?: string;
    component?: string;
    queryParam?: string;
    isFrame?: string;
    isCache?: string;
    menuType?: string;
    visible?: string;
    status?: string;
    perms?: string;
    icon?: string;
    remark?: string;
  };

  type AddNoticeCommand = {
    /** 公告标题 */
    noticeTitle?: string;
    /** 公告类型（1通知 2公告） */
    noticeType?: string;
    /** 公告内容 */
    noticeContent?: string;
    /** 公告状态（0正常 1关闭） */
    status?: string;
    /** 备注 */
    remark?: string;
  };

  type AddPostCommand = {
    deptId: number;
    belongDeptId?: number;
    postCode?: string;
    postName?: string;
    postCategory?: string;
    postSort: number;
    status?: string;
    remark?: string;
  };

  type AddRoleCommand = {
    roleName?: string;
    roleKey?: string;
    roleSort: number;
    dataScope?: string;
    menuCheckStrictly?: boolean;
    deptCheckStrictly?: boolean;
    status?: string;
    remark?: string;
    menuIds?: number[];
    deptIds?: number[];
  };

  type addRoleForUserByBulkParams = {
    roleId: number;
    userIds: number[];
  };

  type AddUserCommand = {
    deptId?: number;
    username?: string;
    nickname?: string;
    email?: string;
    phoneNumber?: string;
    sex?: number;
    avatar?: string;
    password?: string;
    status?: number;
    roleId?: number;
    postId?: number;
    remark?: string;
  };

  type AllocatedRoleQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    roleId?: number;
    username?: string;
    phoneNumber?: string;
  };

  type allocatedUserListParams = {
    roleId: number;
    query: AllocatedRoleQuery;
  };

  type batchRemoveConfigParams = {
    configIds: number[];
  };

  type batchRemoveDictDataParams = {
    dictDataIds: number[];
  };

  type batchRemoveDictTypeParams = {
    dictTypeIds: number[];
  };

  type batchRemoveNoticeParams = {
    noticeIds: number[];
  };

  type changeRoleStatusParams = {
    roleId: number;
  };

  type ChangeStatusCommand = {
    userId?: number;
    status?: string;
  };

  type changeUserStatusParams = {
    userId: number;
  };

  type dataScopeParams = {
    roleId: number;
  };

  type deleteRoleOfUserByBulkParams = {
    userIds: number[];
  };

  type DeptDTO = {
    deptId?: number;
    deptName?: string;
    parentId?: number;
    parentName?: string;
    ancestors?: string;
    deptCategory?: string;
    orderNum?: number;
    leaderId?: number;
    leaderName?: string;
    phone?: string;
    email?: string;
    status?: string;
    createTime?: string;
    children?: DeptDTO[];
  };

  type deptNodeListParams = {
    deptId: number;
  };

  type DeptQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    deptId?: number;
    parentId?: number;
    status?: string;
    deptName?: string;
  };

  type DeptTreeSelectDTO = {
    checkedKeys?: number[];
    deptIds?: TreeLong[];
  };

  type dropdownDeptListParams = {
    query: DeptQuery;
  };

  type dropdownMenuParams = {
    menuName?: string;
    visible?: string;
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

  type editConfigParams = {
    configId: number;
  };

  type editDeptParams = {
    deptId: number;
  };

  type editDictDataParams = {
    dictDataId: number;
  };

  type editDictTypeParams = {
    dictTypeId: number;
  };

  type editMenuParams = {
    menuId: number;
  };

  type editNoticeParams = {
    noticeId: number;
  };

  type editPostParams = {
    postId: number;
  };

  type editRoleParams = {
    roleId: number;
  };

  type editUserParams = {
    userId: number;
  };

  type exportPostParams = {
    query: PostQuery;
  };

  type exportUserByExcelParams = {
    query: SearchUserQuerySearchUserDO;
  };

  type getConfigInfoParams = {
    /** 记录ID */
    id: number;
  };

  type getConfigKeyParams = {
    configKey: string;
  };

  type getDeptInfoParams = {
    deptId: number;
  };

  type getDictDataInfoParams = {
    /** 记录ID */
    dictDataId: number;
  };

  type getDictTypeInfoParams = {
    /** 记录ID */
    dictTypeId: number;
  };

  type getMenuInfoParams = {
    menuId: number;
  };

  type getNoticeInfoParams = {
    /** 记录ID */
    noticeId: number;
  };

  type getPagedConfigsParams = {
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

  type getPagedDictDatasParams = {
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

  type getPagedDictTypesParams = {
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

  type getPagedNoticesParams = {
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

  type getPostInfoParams = {
    postId: number;
  };

  type getRoleInfoParams = {
    roleId: number;
  };

  type getUserDetailInfoParams = {
    userId: number;
  };

  type importUserByExcelParams = {
    file: string;
  };

  type listConfigParams = {
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

  type listDeptParams = {
    deptId?: number;
    parentId?: number;
    status?: string;
    deptName?: string;
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

  type listDictDataParams = {
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

  type listDictTypeParams = {
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

  type listMenuParams = {
    menuName?: string;
    visible?: string;
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

  type listNoticeParams = {
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

  type listUserByDeptParams = {
    deptId: number;
  };

  type LoginLogDTO = {
    /** ID */
    logId?: string;
    /** 用户名 */
    username?: string;
    /** ip地址 */
    ipAddress?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 操作系统 */
    operationSystem?: string;
    /** 浏览器 */
    browser?: string;
    status?: number;
    /** 状态 */
    statusStr?: string;
    /** 描述 */
    msg?: string;
    /** 登录时间 */
    loginTime?: string;
  };

  type OperationLogDTO = {
    /** ID */
    operationId?: number;
    businessType?: number;
    /** 操作类型 */
    businessTypeStr?: string;
    /** 操作类型 */
    requestMethod?: string;
    /** 操作类型 */
    requestModule?: string;
    /** 操作类型 */
    requestUrl?: string;
    /** 操作类型 */
    calledMethod?: string;
    operatorType?: number;
    /** 操作人类型 */
    operatorTypeStr?: string;
    /** 用户ID */
    userId?: number;
    /** 用户名 */
    username?: string;
    /** ip地址 */
    operatorIp?: string;
    /** ip地点 */
    operatorLocation?: string;
    /** 部门ID */
    deptId?: number;
    /** 部门 */
    deptName?: string;
    /** 操作参数 */
    operationParam?: string;
    /** 操作结果 */
    operationResult?: string;
    status?: number;
    /** 状态 */
    statusStr?: string;
    /** 错误堆栈 */
    errorStack?: string;
    /** 操作时间 */
    operationTime?: string;
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

  type operationLogsParams = {
    query: OperationLogQuery;
  };

  type optionSelectParams = {
    roleIds?: number[];
  };

  type PageDTOLoginLogDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: LoginLogDTO[];
  };

  type PageDTOOperationLogDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: OperationLogDTO[];
  };

  type PageDTOPostDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: PostDTO[];
  };

  type PageDTORoleDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: RoleDTO[];
  };

  type PageDTOSysConfigDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysConfigDTO[];
  };

  type PageDTOSysDictDataDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysDictDataDTO[];
  };

  type PageDTOSysDictTypeDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysDictTypeDTO[];
  };

  type PageDTOSysNoticeDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysNoticeDTO[];
  };

  type PageDTOUserDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: UserDTO[];
  };

  type PostDTO = {
    /** 岗位ID */
    postId?: number;
    /** 部门ID */
    deptId?: number;
    /** 岗位编码 */
    postCode?: string;
    /** 岗位名称 */
    postName?: string;
    /** 岗位排序 */
    postSort?: number;
    /** 备注 */
    remark?: string;
    status?: string;
    /** 状态 */
    statusStr?: string;
    createTime?: string;
  };

  type PostQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    postCode?: string;
    postName?: string;
    status?: number;
    belongDeptId?: number;
  };

  type removeConfigParams = {
    configId: number;
  };

  type removeDeptParams = {
    deptId: number;
  };

  type removeDictDataParams = {
    dictDataId: number;
  };

  type removeDictTypeParams = {
    dictTypeId: number;
  };

  type removeLoginInfosParams = {
    ids: number[];
  };

  type removeMenuParams = {
    menuId: number;
  };

  type removeNoticeParams = {
    noticeId: number;
  };

  type removeOperationLogsParams = {
    operationIds: number[];
  };

  type removePostParams = {
    ids: number[];
  };

  type removeRoleParams = {
    roleIds: number[];
  };

  type removeUserParams = {
    userIds: number[];
  };

  type ResetPasswordCommand = {
    userId?: number;
    password?: string;
  };

  type resetPasswordParams = {
    userId: number;
  };

  type ResponseDTODeptDTO = {
    code?: number;
    message?: string;
    data?: DeptDTO;
  };

  type ResponseDTODeptTreeSelectDTO = {
    code?: number;
    message?: string;
    data?: DeptTreeSelectDTO;
  };

  type ResponseDTOListDeptDTO = {
    code?: number;
    message?: string;
    data?: DeptDTO[];
  };

  type ResponseDTOListRoleDTO = {
    code?: number;
    message?: string;
    data?: RoleDTO[];
  };

  type ResponseDTOListSysConfigDTO = {
    code?: number;
    message?: string;
    data?: SysConfigDTO[];
  };

  type ResponseDTOListSysConfigVO = {
    code?: number;
    message?: string;
    data?: SysConfigVO[];
  };

  type ResponseDTOListSysDictDataDTO = {
    code?: number;
    message?: string;
    data?: SysDictDataDTO[];
  };

  type ResponseDTOListSysDictDataVO = {
    code?: number;
    message?: string;
    data?: SysDictDataVO[];
  };

  type ResponseDTOListSysDictTypeDTO = {
    code?: number;
    message?: string;
    data?: SysDictTypeDTO[];
  };

  type ResponseDTOListSysDictTypeVO = {
    code?: number;
    message?: string;
    data?: SysDictTypeVO[];
  };

  type ResponseDTOListSysMenuDTO = {
    code?: number;
    message?: string;
    data?: SysMenuDTO[];
  };

  type ResponseDTOListSysNoticeDTO = {
    code?: number;
    message?: string;
    data?: SysNoticeDTO[];
  };

  type ResponseDTOListTreeLong = {
    code?: number;
    message?: string;
    data?: TreeLong[];
  };

  type ResponseDTOListUserDTO = {
    code?: number;
    message?: string;
    data?: UserDTO[];
  };

  type ResponseDTOPageDTOLoginLogDTO = {
    code?: number;
    message?: string;
    data?: PageDTOLoginLogDTO;
  };

  type ResponseDTOPageDTOOperationLogDTO = {
    code?: number;
    message?: string;
    data?: PageDTOOperationLogDTO;
  };

  type ResponseDTOPageDTOPostDTO = {
    code?: number;
    message?: string;
    data?: PageDTOPostDTO;
  };

  type ResponseDTOPageDTORoleDTO = {
    code?: number;
    message?: string;
    data?: PageDTORoleDTO;
  };

  type ResponseDTOPageDTOSysConfigDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysConfigDTO;
  };

  type ResponseDTOPageDTOSysDictDataDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysDictDataDTO;
  };

  type ResponseDTOPageDTOSysDictTypeDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysDictTypeDTO;
  };

  type ResponseDTOPageDTOSysNoticeDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysNoticeDTO;
  };

  type ResponseDTOPageDTOUserDTO = {
    code?: number;
    message?: string;
    data?: PageDTOUserDTO;
  };

  type ResponseDTOPostDTO = {
    code?: number;
    message?: string;
    data?: PostDTO;
  };

  type ResponseDTORoleDTO = {
    code?: number;
    message?: string;
    data?: RoleDTO;
  };

  type ResponseDTOString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type ResponseDTOSysConfigDTO = {
    code?: number;
    message?: string;
    data?: SysConfigDTO;
  };

  type ResponseDTOSysDictDataDTO = {
    code?: number;
    message?: string;
    data?: SysDictDataDTO;
  };

  type ResponseDTOSysDictTypeDTO = {
    code?: number;
    message?: string;
    data?: SysDictTypeDTO;
  };

  type ResponseDTOSysMenuDTO = {
    code?: number;
    message?: string;
    data?: SysMenuDTO;
  };

  type ResponseDTOSysNoticeDTO = {
    code?: number;
    message?: string;
    data?: SysNoticeDTO;
  };

  type ResponseDTOUserDetailDTO = {
    code?: number;
    message?: string;
    data?: UserDetailDTO;
  };

  type ResponseDTOUserProfileDTO = {
    code?: number;
    message?: string;
    data?: UserProfileDTO;
  };

  type ResponseDTOVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type roleDeptTreeSelectParams = {
    roleId: number;
  };

  type RoleDTO = {
    roleId?: number;
    roleName?: string;
    roleKey?: string;
    roleSort?: number;
    dataScope?: string;
    menuCheckStrictly?: boolean;
    deptCheckStrictly?: boolean;
    status?: string;
    remark?: string;
    createTime?: string;
  };

  type RoleQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    /** 角色名称 */
    roleName?: string;
    /** 角色权限字符串 */
    roleKey?: string;
    /** 角色状态 */
    status?: string;
  };

  type SearchUserQuerySearchUserDO = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    /** 用户ID */
    userId?: number;
    /** 用户名 */
    username?: string;
    /** 用户状态 */
    status?: number;
    /** 手机号 */
    phoneNumber?: string;
    /** 部门ID */
    deptId?: number;
  };

  type SysConfigDTO = {
    /** 参数主键 */
    configId?: number;
    /** 参数名称 */
    configName?: string;
    /** 参数键名 */
    configKey?: string;
    /** 参数键值 */
    configValue?: string;
    /** 系统内置（Y是 N否） */
    configType?: string;
    /** 创建部门 */
    createDept?: number;
    /** 创建者 */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type SysConfigVO = {
    /** 参数主键 */
    configId?: number;
    /** 参数名称 */
    configName?: string;
    /** 参数键名 */
    configKey?: string;
    /** 参数键值 */
    configValue?: string;
    /** 系统内置（Y是 N否） */
    configType?: string;
    /** 创建部门 */
    createDept?: number;
    /** 创建者 */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type SysDictDataDTO = {
    /** 字典编码 */
    dictCode?: number;
    /** 字典排序 */
    dictSort?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典键值 */
    dictValue?: string;
    /** 字典类型 */
    dictType?: string;
    /** 样式属性（其他样式扩展） */
    cssClass?: string;
    /** 表格回显样式 */
    listClass?: string;
    /** 是否默认（Y是 N否） */
    isDefault?: string;
    /** 创建部门 */
    createDept?: number;
    /** 创建者 */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type SysDictDataVO = {
    /** 字典编码 */
    dictCode?: number;
    /** 字典排序 */
    dictSort?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典键值 */
    dictValue?: string;
    /** 字典类型 */
    dictType?: string;
    /** 样式属性（其他样式扩展） */
    cssClass?: string;
    /** 表格回显样式 */
    listClass?: string;
    /** 是否默认（Y是 N否） */
    isDefault?: string;
    /** 创建部门 */
    createDept?: number;
    /** 创建者 */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type SysDictTypeDTO = {
    /** 字典主键 */
    dictId?: number;
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 创建部门 */
    createDept?: number;
    /** 创建者 */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type SysDictTypeVO = {
    /** 字典主键 */
    dictId?: number;
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 创建部门 */
    createDept?: number;
    /** 创建者 */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type SysMenuDTO = {
    menuId?: number;
    menuName?: string;
    parentId?: number;
    orderNum?: number;
    path?: string;
    component?: string;
    queryParam?: string;
    isFrame?: string;
    isCache?: string;
    menuType?: string;
    visible?: string;
    status?: string;
    perms?: string;
    icon?: string;
    createDept?: number;
    remark?: string;
    createTime?: string;
    children?: SysMenuDTO[];
  };

  type SysNoticeDTO = {
    /** 公告ID */
    noticeId?: number;
    /** 公告标题 */
    noticeTitle?: string;
    /** 公告类型（1通知 2公告） */
    noticeType?: string;
    /** 公告内容 */
    noticeContent?: string;
    /** 公告状态（0正常 1关闭） */
    status?: string;
    /** 创建部门 */
    createDept?: number;
    /** 创建者 */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新者 */
    updaterId?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 备注 */
    remark?: string;
  };

  type TreeLong = {
    config?: TreeNodeConfig;
    parentId?: number;
    weight?: Record<string, any>;
    name?: { empty?: boolean };
    id?: number;
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

  type UnallocatedRoleQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    roleId?: number;
    username?: string;
    phoneNumber?: string;
  };

  type unallocatedUserListParams = {
    roleId: number;
    query: UnallocatedRoleQuery;
  };

  type UpdateConfigCommand = {
    /** 参数名称 */
    configName?: string;
    /** 参数键名 */
    configKey?: string;
    /** 参数键值 */
    configValue?: string;
    /** 系统内置（Y是 N否） */
    configType?: string;
    /** 备注 */
    remark?: string;
    configId?: number;
  };

  type UpdateDataScopeCommand = {
    roleId: number;
    deptIds: number[];
    dataScope?: number;
  };

  type UpdateDeptCommand = {
    parentId: number;
    deptName?: string;
    orderNum: number;
    leaderId?: number;
    phone?: string;
    email?: string;
    status?: number;
    deptId: number;
  };

  type UpdateDictDataCommand = {
    /** 字典排序 */
    dictSort?: number;
    /** 字典标签 */
    dictLabel?: string;
    /** 字典键值 */
    dictValue?: string;
    /** 字典类型 */
    dictType?: string;
    /** 样式属性（其他样式扩展） */
    cssClass?: string;
    /** 表格回显样式 */
    listClass?: string;
    /** 是否默认（Y是 N否） */
    isDefault?: string;
    /** 备注 */
    remark?: string;
    dictDataId?: number;
  };

  type UpdateDictTypeCommand = {
    /** 字典名称 */
    dictName?: string;
    /** 字典类型 */
    dictType?: string;
    /** 备注 */
    remark?: string;
    dictTypeId?: number;
  };

  type UpdateMenuCommand = {
    parentId?: number;
    menuName?: string;
    orderNum: number;
    path?: string;
    component?: string;
    queryParam?: string;
    isFrame?: string;
    isCache?: string;
    menuType?: string;
    visible?: string;
    status?: string;
    perms?: string;
    icon?: string;
    remark?: string;
    menuId: number;
  };

  type UpdateNoticeCommand = {
    /** 公告标题 */
    noticeTitle?: string;
    /** 公告类型（1通知 2公告） */
    noticeType?: string;
    /** 公告内容 */
    noticeContent?: string;
    /** 公告状态（0正常 1关闭） */
    status?: string;
    /** 备注 */
    remark?: string;
    noticeId?: number;
  };

  type UpdatePostCommand = {
    deptId: number;
    belongDeptId?: number;
    postCode?: string;
    postName?: string;
    postCategory?: string;
    postSort: number;
    status?: string;
    remark?: string;
    postId: number;
  };

  type UpdateProfileCommand = {
    userId?: number;
    sex?: number;
    nickName?: string;
    phoneNumber?: string;
    email?: string;
  };

  type UpdateRoleCommand = {
    roleName?: string;
    roleKey?: string;
    roleSort: number;
    dataScope?: string;
    menuCheckStrictly?: boolean;
    deptCheckStrictly?: boolean;
    status?: string;
    remark?: string;
    menuIds?: number[];
    deptIds?: number[];
    roleId: number;
  };

  type UpdateStatusCommand = {
    roleId?: number;
    status?: string;
  };

  type UpdateUserCommand = {
    deptId?: number;
    username?: string;
    nickname?: string;
    email?: string;
    phoneNumber?: string;
    sex?: number;
    avatar?: string;
    password?: string;
    status?: number;
    roleId?: number;
    postId?: number;
    remark?: string;
    userId?: number;
  };

  type UpdateUserPasswordCommand = {
    userId?: number;
    newPassword?: string;
    oldPassword?: string;
  };

  type UserDetailDTO = {
    user?: UserDTO;
    roleOptions?: RoleDTO[];
    postOptions?: PostDTO[];
    postId?: number;
    roleId?: number;
    permissions?: string[];
  };

  type UserDTO = {
    /** 用户ID */
    userId?: number;
    /** 部门ID */
    deptId?: number;
    /** 用户名 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 用户类型 */
    userType?: number;
    /** 邮件 */
    email?: string;
    /** 号码 */
    phoneNumber?: string;
    /** 性别 */
    sex?: number;
    /** 用户头像 */
    avatar?: string;
    /** 状态 */
    status?: number;
    /** 最后登录IP */
    loginIp?: string;
    /** 最后登录时间 */
    loginDate?: string;
    /** 备注 */
    remark?: string;
    /** 部门名称 */
    deptName?: string;
    roles?: RoleDTO[];
    posts?: PostDTO[];
    roleIds?: number[];
    postIds?: number[];
    /** 创建部门 */
    creatDept?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 修改者ID */
    updaterId?: number;
    /** 修改时间 */
    updateTime?: string;
  };

  type UserProfileDTO = {
    user?: UserDTO;
    roleName?: string;
    postName?: string;
  };
}
