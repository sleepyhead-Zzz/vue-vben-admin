declare namespace API {
  type AddDeptCommand = {
    deptName?: string;
    email?: string;
    leaderId?: number;
    orderNum: number;
    parentId: number;
    phone?: string;
    status?: number;
  };

  type AddMenuCommand = {
    component?: string;
    icon?: string;
    isCache?: string;
    isFrame?: string;
    menuName?: string;
    menuType?: string;
    orderNum: number;
    parentId?: number;
    path?: string;
    perms?: string;
    queryParam?: string;
    remark?: string;
    status?: string;
    visible?: string;
  };

  type AddPostCommand = {
    belongDeptId?: number;
    deptId: number;
    postCategory?: string;
    postCode?: string;
    postName?: string;
    postSort: number;
    remark?: string;
    status?: string;
  };

  type AddRoleCommand = {
    dataScope?: string;
    deptCheckStrictly?: boolean;
    deptIds?: number[];
    menuCheckStrictly?: boolean;
    menuIds?: number[];
    remark?: string;
    roleKey?: string;
    roleName?: string;
    roleSort: number;
    status?: string;
  };

  type addRoleForUserByBulkParams = {
    roleId: number;
    userIds: number[];
  };

  type AddUserCommand = {
    avatar?: string;
    deptId?: number;
    email?: string;
    nickname?: string;
    password?: string;
    phoneNumber?: string;
    postId?: number;
    remark?: string;
    roleId?: number;
    sex?: number;
    status?: number;
    username?: string;
  };

  type AllocatedRoleQuery = {
    beginTime?: string;
    endTime?: string;
    orderColumn?: string;
    orderDirection?: string;
    pageNum?: number;
    pageSize?: number;
    phoneNumber?: string;
    roleId?: number;
    timeRangeColumn?: string;
    username?: string;
  };

  type allocatedUserListParams = {
    query: AllocatedRoleQuery;
    roleId: number;
  };

  type callbackParams = {
    code: string;
  };

  type changeRoleStatusParams = {
    roleId: number;
  };

  type ChangeStatusCommand = {
    status?: string;
    userId?: number;
  };

  type changeUserStatusParams = {
    userId: number;
  };

  type CurrentLoginUserDTO = {
    permissions?: string[];
    roles?: string[];
    user?: UserDTO;
  };

  type dataScopeParams = {
    roleId: number;
  };

  type deleteFileParams = {
    fileName: string;
  };

  type deleteRoleOfUserByBulkParams = {
    userIds: number[];
  };

  type DeptDTO = {
    ancestors?: string;
    children?: DeptDTO[];
    createTime?: string;
    deptCategory?: string;
    deptId?: number;
    deptName?: string;
    email?: string;
    leaderId?: number;
    leaderName?: string;
    orderNum?: number;
    parentId?: number;
    parentName?: string;
    phone?: string;
    status?: string;
  };

  type DeptTreeSelectDTO = {
    checkedKeys?: number[];
    deptIds?: TreeLong[];
  };

  type downloadFileParams = {
    fileName: string;
  };

  type dropdownMenuParams = {
    /** 开始时间 */
    beginTime?: Date;
    /** 结束时间 */
    endTime?: Date;
    menuName?: string;
    /** 排序字段 */
    orderColumn?: string;
    /** 排序方向 */
    orderDirection?: string;
    status?: string;
    /** 时间范围字段名 */
    timeRangeColumn?: string;
    visible?: string;
  };

  type editDeptParams = {
    deptId: number;
  };

  type editMenuParams = {
    menuId: number;
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

  type FileMetadataDTO = {
    createTime?: string;
    creatorId?: number;
    fileExtension?: string;
    fileName?: string;
    filePath?: string;
    fileSize?: number;
    fileType?: string;
  };

  type getDeptInfoParams = {
    deptId: number;
  };

  type getFileUrlParams = {
    filePath: string;
  };

  type getMenuInfoParams = {
    menuId: number;
  };

  type getPagedLoginInfoParams = {
    /** 开始时间 */
    beginTime?: Date;
    /** 结束时间 */
    endTime?: Date;
    ipAddress?: string;
    /** 排序字段 */
    orderColumn?: string;
    /** 排序方向 */
    orderDirection?: string;
    pageNum?: number;
    pageSize?: number;
    status?: string;
    /** 时间范围字段名 */
    timeRangeColumn?: string;
    username?: string;
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

  type listDeptParams = {
    /** 开始时间 */
    beginTime?: Date;
    deptId?: number;
    /** 结束时间 */
    endTime?: Date;
    /** 排序字段 */
    orderColumn?: string;
    /** 排序方向 */
    orderDirection?: string;
    parentId?: number;
    /** 时间范围字段名 */
    timeRangeColumn?: string;
  };

  type listMenuParams = {
    /** 开始时间 */
    beginTime?: Date;
    /** 结束时间 */
    endTime?: Date;
    menuName?: string;
    /** 排序字段 */
    orderColumn?: string;
    /** 排序方向 */
    orderDirection?: string;
    status?: string;
    /** 时间范围字段名 */
    timeRangeColumn?: string;
    visible?: string;
  };

  type LoginCommand = {
    captchaCode?: string;
    captchaCodeKey?: string;
    password?: string;
    username?: string;
  };

  type LoginLogDTO = {
    /** 浏览器 */
    browser?: string;
    /** ip地址 */
    ipAddress?: string;
    /** ID */
    logId?: string;
    /** 登录地点 */
    loginLocation?: string;
    /** 登录时间 */
    loginTime?: string;
    /** 描述 */
    msg?: string;
    /** 操作系统 */
    operationSystem?: string;
    status?: number;
    /** 状态 */
    statusStr?: string;
    /** 用户名 */
    username?: string;
  };

  type MenuDetailDTO = {
    children?: SysMenuDTO[];
    component?: string;
    createDept?: number;
    createTime?: string;
    icon?: string;
    isCache?: string;
    isFrame?: string;
    keepAlive?: boolean;
    menuId?: number;
    menuName?: string;
    menuType?: string;
    meta?: RouterMeta;
    order?: number;
    orderNum?: number;
    parentId?: number;
    path?: string;
    permission?: string;
    perms?: string;
    queryParam?: string;
    remark?: string;
    status?: string;
    title?: string;
    visible?: string;
  };

  type OperationLogDTO = {
    businessType?: number;
    /** 操作类型 */
    businessTypeStr?: string;
    /** 操作类型 */
    calledMethod?: string;
    /** 部门ID */
    deptId?: number;
    /** 部门 */
    deptName?: string;
    /** 错误堆栈 */
    errorStack?: string;
    /** ID */
    operationId?: number;
    /** 操作参数 */
    operationParam?: string;
    /** 操作结果 */
    operationResult?: string;
    /** 操作时间 */
    operationTime?: string;
    /** ip地址 */
    operatorIp?: string;
    /** ip地点 */
    operatorLocation?: string;
    operatorType?: number;
    /** 操作人类型 */
    operatorTypeStr?: string;
    /** 操作类型 */
    requestMethod?: string;
    /** 操作类型 */
    requestModule?: string;
    /** 操作类型 */
    requestUrl?: string;
    status?: number;
    /** 状态 */
    statusStr?: string;
    /** 用户ID */
    userId?: number;
    /** 用户名 */
    username?: string;
  };

  type OperationLogQuery = {
    beginTime?: string;
    businessType?: string;
    endTime?: string;
    orderColumn?: string;
    orderDirection?: string;
    pageNum?: number;
    pageSize?: number;
    requestModule?: string;
    status?: string;
    timeRangeColumn?: string;
    username?: string;
  };

  type operationLogsParams = {
    query: OperationLogQuery;
  };

  type optionSelectParams = {
    roleIds?: number[];
  };

  type PageDTOLoginLogDTO = {
    /** 列表数据 */
    rows?: LoginLogDTO[];
    /** 总记录数 */
    total?: number;
  };

  type PageDTOOperationLogDTO = {
    /** 列表数据 */
    rows?: OperationLogDTO[];
    /** 总记录数 */
    total?: number;
  };

  type PageDTOPostDTO = {
    /** 列表数据 */
    rows?: PostDTO[];
    /** 总记录数 */
    total?: number;
  };

  type PageDTORoleDTO = {
    /** 列表数据 */
    rows?: RoleDTO[];
    /** 总记录数 */
    total?: number;
  };

  type PageDTOUserDTO = {
    /** 列表数据 */
    rows?: UserDTO[];
    /** 总记录数 */
    total?: number;
  };

  type PostDTO = {
    createTime?: string;
    /** 岗位编码 */
    postCode?: string;
    /** 岗位ID */
    postId?: number;
    /** 岗位名称 */
    postName?: string;
    /** 岗位排序 */
    postSort?: number;
    /** 备注 */
    remark?: string;
    status?: number;
    /** 状态 */
    statusStr?: string;
  };

  type PostQuery = {
    beginTime?: string;
    endTime?: string;
    orderColumn?: string;
    orderDirection?: string;
    pageNum?: number;
    pageSize?: number;
    postCode?: string;
    postName?: string;
    status?: number;
    timeRangeColumn?: string;
  };

  type removeDeptParams = {
    deptId: number;
  };

  type removeLoginInfosParams = {
    ids: number[];
  };

  type removeMenuParams = {
    menuId: number;
  };

  type removeOperationLogsParams = {
    operationIds: number[];
  };

  type removePostParams = {
    ids: number[];
  };

  type removeRoleParams = {
    roleId: number[];
  };

  type removeUserParams = {
    userIds: number[];
  };

  type ResetPasswordCommand = {
    password?: string;
    userId?: number;
  };

  type resetPasswordParams = {
    userId: number;
  };

  type ResponseDTOCurrentLoginUserDTO = {
    code?: number;
    data?: CurrentLoginUserDTO;
    message?: string;
  };

  type ResponseDTODeptDTO = {
    code?: number;
    data?: DeptDTO;
    message?: string;
  };

  type ResponseDTODeptTreeSelectDTO = {
    code?: number;
    data?: DeptTreeSelectDTO;
    message?: string;
  };

  type ResponseDTOListDeptDTO = {
    code?: number;
    data?: DeptDTO[];
    message?: string;
  };

  type ResponseDTOListFileMetadataDTO = {
    code?: number;
    data?: FileMetadataDTO[];
    message?: string;
  };

  type ResponseDTOListRoleDTO = {
    code?: number;
    data?: RoleDTO[];
    message?: string;
  };

  type ResponseDTOListRouterDTO = {
    code?: number;
    data?: RouterDTO[];
    message?: string;
  };

  type ResponseDTOListSysMenuDTO = {
    code?: number;
    data?: SysMenuDTO[];
    message?: string;
  };

  type ResponseDTOListTreeLong = {
    code?: number;
    data?: TreeLong[];
    message?: string;
  };

  type ResponseDTOMenuDetailDTO = {
    code?: number;
    data?: MenuDetailDTO;
    message?: string;
  };

  type ResponseDTOPageDTOLoginLogDTO = {
    code?: number;
    data?: PageDTOLoginLogDTO;
    message?: string;
  };

  type ResponseDTOPageDTOOperationLogDTO = {
    code?: number;
    data?: PageDTOOperationLogDTO;
    message?: string;
  };

  type ResponseDTOPageDTOPostDTO = {
    code?: number;
    data?: PageDTOPostDTO;
    message?: string;
  };

  type ResponseDTOPageDTORoleDTO = {
    code?: number;
    data?: PageDTORoleDTO;
    message?: string;
  };

  type ResponseDTOPageDTOUserDTO = {
    code?: number;
    data?: PageDTOUserDTO;
    message?: string;
  };

  type ResponseDTOPostDTO = {
    code?: number;
    data?: PostDTO;
    message?: string;
  };

  type ResponseDTORoleDTO = {
    code?: number;
    data?: RoleDTO;
    message?: string;
  };

  type ResponseDTOString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type ResponseDTOTokenDTO = {
    code?: number;
    data?: TokenDTO;
    message?: string;
  };

  type ResponseDTOUserDetailDTO = {
    code?: number;
    data?: UserDetailDTO;
    message?: string;
  };

  type ResponseDTOUserProfileDTO = {
    code?: number;
    data?: UserProfileDTO;
    message?: string;
  };

  type ResponseDTOVoid = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type roleDeptTreeSelectParams = {
    roleId: number;
  };

  type RoleDTO = {
    createTime?: string;
    dataScope?: string;
    deptCheckStrictly?: boolean;
    menuCheckStrictly?: boolean;
    remark?: string;
    roleId?: number;
    roleKey?: string;
    roleName?: string;
    roleSort?: number;
    status?: string;
  };

  type RoleQuery = {
    beginTime?: string;
    endTime?: string;
    orderColumn?: string;
    orderDirection?: string;
    pageNum?: number;
    pageSize?: number;
    /** 角色权限字符串 */
    roleKey?: string;
    /** 角色名称 */
    roleName?: string;
    /** 角色状态 */
    status?: string;
    timeRangeColumn?: string;
  };

  type RouterDTO = {
    alwaysShow?: boolean;
    children?: RouterDTO[];
    component?: string;
    hidden?: boolean;
    meta?: RouterMeta;
    name?: string;
    path?: string;
    query?: string;
    redirect?: string;
  };

  type RouterMeta = {
    activeIcon?: string;
    activePath?: string;
    affixTab?: boolean;
    affixTabOrder?: number;
    authority?: string[];
    badge?: string;
    badgeType?: string;
    badgeVariants?: string;
    hideChildrenInMenu?: boolean;
    hideInBreadcrumb?: boolean;
    hideInMenu?: boolean;
    hideInTab?: boolean;
    icon?: string;
    iframeSrc?: string;
    ignoreAccess?: boolean;
    link?: string;
    loaded?: boolean;
    maxNumOfOpenTab?: number;
    menuVisibleWithForbidden?: boolean;
    noCache?: boolean;
    openInNewWindow?: boolean;
    order?: number;
    query?: Record<string, any>;
    title?: string;
  };

  type SearchUserQuerySearchUserDO = {
    beginTime?: string;
    /** 部门ID */
    deptId?: number;
    endTime?: string;
    orderColumn?: string;
    orderDirection?: string;
    pageNum?: number;
    pageSize?: number;
    /** 手机号 */
    phoneNumber?: string;
    /** 用户状态 */
    status?: number;
    timeRangeColumn?: string;
    /** 用户ID */
    userId?: number;
    /** 用户名 */
    username?: string;
  };

  type SysMenuDTO = {
    children?: SysMenuDTO[];
    component?: string;
    createDept?: number;
    createTime?: string;
    icon?: string;
    isCache?: string;
    isFrame?: string;
    menuId?: number;
    menuName?: string;
    menuType?: string;
    orderNum?: number;
    parentId?: number;
    path?: string;
    perms?: string;
    queryParam?: string;
    remark?: string;
    status?: string;
    visible?: string;
  };

  type TokenDTO = {
    access_token?: string;
    client_id?: string;
    expire_in?: number;
    openid?: string;
    refresh_expire_in?: number;
    refresh_token?: string;
    scope?: string;
  };

  type TreeLong = {
    config?: TreeNodeConfig;
    empty?: boolean;
    id?: number;
    name?: { empty?: boolean };
    parentId?: number;
    weight?: Record<string, any>;
  };

  type TreeNodeConfig = {
    childrenKey?: string;
    deep?: number;
    idKey?: string;
    nameKey?: string;
    parentIdKey?: string;
    weightKey?: string;
  };

  type UnallocatedRoleQuery = {
    beginTime?: string;
    endTime?: string;
    orderColumn?: string;
    orderDirection?: string;
    pageNum?: number;
    pageSize?: number;
    phoneNumber?: string;
    roleId?: number;
    timeRangeColumn?: string;
    username?: string;
  };

  type unallocatedUserListParams = {
    query: UnallocatedRoleQuery;
    roleId: number;
  };

  type UpdateDataScopeCommand = {
    dataScope?: number;
    deptIds: number[];
    roleId: number;
  };

  type UpdateDeptCommand = {
    deptId: number;
    deptName?: string;
    email?: string;
    leaderId?: number;
    orderNum: number;
    parentId: number;
    phone?: string;
    status?: number;
  };

  type UpdateMenuCommand = {
    component?: string;
    icon?: string;
    isCache?: string;
    isFrame?: string;
    menuId: number;
    menuName?: string;
    menuType?: string;
    orderNum: number;
    parentId?: number;
    path?: string;
    perms?: string;
    queryParam?: string;
    remark?: string;
    status?: string;
    visible?: string;
  };

  type UpdatePostCommand = {
    belongDeptId?: number;
    deptId: number;
    postCategory?: string;
    postCode?: string;
    postId: number;
    postName?: string;
    postSort: number;
    remark?: string;
    status?: string;
  };

  type UpdateProfileCommand = {
    email?: string;
    nickName?: string;
    phoneNumber?: string;
    sex?: number;
    userId?: number;
  };

  type UpdateRoleCommand = {
    dataScope?: string;
    deptCheckStrictly?: boolean;
    deptIds?: number[];
    menuCheckStrictly?: boolean;
    menuIds?: number[];
    remark?: string;
    roleId: number;
    roleKey?: string;
    roleName?: string;
    roleSort: number;
    status?: string;
  };

  type UpdateStatusCommand = {
    roleId?: number;
    status?: string;
  };

  type UpdateUserCommand = {
    avatar?: string;
    deptId?: number;
    email?: string;
    nickname?: string;
    password?: string;
    phoneNumber?: string;
    postId?: number;
    remark?: string;
    roleId?: number;
    sex?: number;
    status?: number;
    userId?: number;
    username?: string;
  };

  type UpdateUserPasswordCommand = {
    newPassword?: string;
    oldPassword?: string;
    userId?: number;
  };

  type uploadMultipleParams = {
    files: string[];
    folder?: string;
  };

  type uploadSingleParams = {
    fileType?: string;
    folder?: string;
    originalName?: string;
  };

  type UserDetailDTO = {
    permissions?: string[];
    postId?: number;
    postOptions?: PostDTO[];
    roleId?: number;
    roleOptions?: RoleDTO[];
    user?: UserDTO;
  };

  type UserDTO = {
    /** 用户头像 */
    avatar?: string;
    /** 创建部门 */
    creatDept?: number;
    /** 创建时间 */
    createTime?: string;
    /** 创建者ID */
    creatorId?: number;
    /** 部门ID */
    deptId?: number;
    /** 部门名称 */
    deptName?: string;
    /** 邮件 */
    email?: string;
    /** 最后登录时间 */
    loginDate?: string;
    /** 最后登录IP */
    loginIp?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 号码 */
    phoneNumber?: string;
    postIds?: number[];
    posts?: PostDTO[];
    /** 备注 */
    remark?: string;
    roleIds?: number[];
    roles?: RoleDTO[];
    /** 性别 */
    sex?: number;
    /** 状态 */
    status?: number;
    /** 修改者ID */
    updaterId?: number;
    /** 修改时间 */
    updateTime?: string;
    /** 用户ID */
    userId?: number;
    /** 用户名 */
    userName?: string;
    /** 用户类型 */
    userType?: number;
  };

  type UserProfileDTO = {
    postName?: string;
    roleName?: string;
    user?: UserDTO;
  };

  type WxUserProfileCommand = {
    cloudId?: string;
    code?: string;
    encryptedData?: string;
    iv?: string;
    rawData?: string;
    signature?: string;
  };
}
