declare namespace SystemAPI {
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

  type AddSysClientCommand = {
    /** 客户端id */
    clientId?: string;
    /** 客户端key */
    clientKey?: string;
    /** 客户端秘钥 */
    clientSecret?: string;
    /** 授权类型 */
    grantTypeList: string[];
    /** 设备类型 */
    deviceType?: string;
    /** token活跃超时时间 */
    activeTimeout?: number;
    /** token固定超时 */
    timeout?: number;
    /** 状态（0正常 1停用） */
    status?: string;
  };

  type AddSysDeptCommand = {
    parentId: number;
    deptName?: string;
    orderNum: number;
    leaderId?: number;
    phone?: string;
    email?: string;
    status?: string;
  };

  type AddSysMenuCommand = {
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

  type AddSysOssConfigCommand = {
    /** 配置key */
    configKey?: string;
    /** accessKey */
    accessKey?: string;
    /** 秘钥 */
    secretKey?: string;
    /** 桶名称 */
    bucketName?: string;
    /** 前缀 */
    prefix?: string;
    /** 访问站点 */
    endpoint?: string;
    /** 自定义域名 */
    domain?: string;
    /** 是否https（Y=是,N=否） */
    isHttps?: string;
    /** 域 */
    region?: string;
    /** 桶权限类型(0=private 1=public 2=custom) */
    accessPolicy?: string;
    /** 是否默认（0=是,1=否） */
    status?: string;
    /** 扩展字段 */
    ext1?: string;
  };

  type AddSysPostCommand = {
    deptId: number;
    belongDeptId?: number;
    postCode?: string;
    postName?: string;
    postCategory?: string;
    postSort: number;
    status?: string;
    remark?: string;
  };

  type AddSysRoleCommand = {
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

  type AddUserCommand = {
    deptId?: number;
    userName?: string;
    nickName?: string;
    email?: string;
    phoneNumber?: string;
    sex?: number;
    avatar?: string;
    password?: string;
    status?: number;
    roleIds?: number[];
    postIds?: number[];
    remark?: string;
    creatorId?: number;
    createDeptId?: number;
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

  type assignUsersToRoleParams = {
    command: RoleUserAssignCommand;
  };

  type changeRoleDataScopeParams = {
    roleId: number;
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

  type deptNodeListParams = {
    deptId: number;
  };

  type DeptTreeSelectDTO = {
    checkedKeys?: number[];
    deptIds?: TreeLong[];
  };

  type downloadParams = {
    ossId: number;
  };

  type editClientParams = {
    clientId: number;
  };

  type editConfigParams = {
    configId: number;
  };

  type editDeptParams = {
    deptId: number;
  };

  type editDictDataParams = {
    dictCode: number;
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

  type editOssConfigParams = {
    ossConfigId: number;
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

  type exportClientByExcelParams = {
    query: SysClientQuery;
  };

  type exportOssConfigByExcelParams = {
    query: SysOssConfigQuery;
  };

  type exportPostByExcelParams = {
    query: SysPostQuery;
  };

  type exportRoleByExcelParams = {
    query: RoleQuery;
  };

  type exportUserByExcelParams = {
    query: SearchUserQuerySearchUserDO;
  };

  type getClientInfoParams = {
    /** 记录ID */
    id: number;
  };

  type getConfigInfoParams = {
    /** 记录ID */
    configId: number;
  };

  type getConfigKeyParams = {
    configKey: string;
  };

  type getConfigListParams = {
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

  type getDeptInfoParams = {
    deptId: number;
  };

  type getDeptListParams = {
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

  type getDictDataByTypeParams = {
    dictType: string;
  };

  type getDictDataInfoParams = {
    /** 记录ID */
    dictCode: number;
  };

  type getDictTypeInfoParams = {
    /** 记录ID */
    dictTypeId: number;
  };

  type getMenuInfoParams = {
    menuId: number;
  };

  type getMenuListParams = {
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

  type getNoticeInfoParams = {
    /** 记录ID */
    noticeId: number;
  };

  type getNoticeListParams = {
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

  type getOssConfigInfoParams = {
    /** 记录ID */
    ossConfigId: number;
  };

  type getPagedClientParams = {
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

  type getPagedConfigParams = {
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

  type getPagedDictDataParams = {
    dictType?: string;
    dictLabel?: string;
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

  type getPagedDictTypeParams = {
    dictType?: string;
    dictName?: string;
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

  type getPagedNoticeParams = {
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

  type getPagedOssConfigParams = {
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

  type getPagedOssParams = {
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

  type getRoleMenuTreeSelectParams = {
    roleId: number;
  };

  type getUserDetailInfoParams = {
    userId: number;
  };

  type listOssInfoByIdsParams = {
    ossIds: number[];
  };

  type listUserByDeptParams = {
    deptId: number;
  };

  type MenuCascadeRemoveCommand = {
    menuIds?: number[];
  };

  type MenuTreeSelectDTO = {
    checkedKeys?: number[];
    menus?: TreeLong[];
  };

  type optionDeptListParams = {
    query: SysDeptQuery;
  };

  type optionMenuSelectParams = {
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

  type optionPostSelectParams = {
    postCode?: string;
    postName?: string;
    status?: string;
    belongDeptId?: number;
    deptId?: number;
    postIds?: number[];
    postCategory?: string;
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

  type optionRoleSelectParams = {
    roleIds?: number[];
  };

  type PageDTOSysClientDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysClientDTO[];
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

  type PageDTOSysOssConfigDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysOssConfigDTO[];
  };

  type PageDTOSysOssDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysOssDTO[];
  };

  type PageDTOSysPostDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysPostDTO[];
  };

  type PageDTOSysRoleDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysRoleDTO[];
  };

  type PageDTOSysUserDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysUserDTO[];
  };

  type removeByIdParams = {
    clientId: number;
  };

  type removeClientParams = {
    ids: number[];
  };

  type removeConfigByIdParams = {
    configId: number;
  };

  type removeConfigParams = {
    configIds: number[];
  };

  type removeDeptByIdParams = {
    deptId: number;
  };

  type removeDictDataByCodeParams = {
    dictCode: number;
  };

  type removeDictDataParams = {
    dictCodes: number[];
  };

  type removeDictTypeByIdParams = {
    dictTypeId: number;
  };

  type removeDictTypesParams = {
    dictTypeIds: number[];
  };

  type removeMenuParams = {
    menuId: number;
  };

  type removeNoticeByIdParams = {
    noticeId: number;
  };

  type removeNoticeParams = {
    noticeIds: number[];
  };

  type removeOssConfigByIdParams = {
    ossConfigId: number;
  };

  type removeOssConfigParams = {
    ossConfigIds: number[];
  };

  type removeOssParams = {
    ossIds: number[];
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
    userId: number;
    password: string;
  };

  type resetPasswordParams = {
    userId: number;
  };

  type ResponseDTODeptTreeSelectDTO = {
    code?: number;
    message?: string;
    data?: DeptTreeSelectDTO;
  };

  type ResponseDTOInteger = {
    code?: number;
    message?: string;
    data?: number;
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

  type ResponseDTOListSysDeptDTO = {
    code?: number;
    message?: string;
    data?: SysDeptDTO[];
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

  type ResponseDTOListSysOssPreviewDTO = {
    code?: number;
    message?: string;
    data?: SysOssPreviewDTO[];
  };

  type ResponseDTOListSysPostDTO = {
    code?: number;
    message?: string;
    data?: SysPostDTO[];
  };

  type ResponseDTOListSysRoleDTO = {
    code?: number;
    message?: string;
    data?: SysRoleDTO[];
  };

  type ResponseDTOListSysUserDTO = {
    code?: number;
    message?: string;
    data?: SysUserDTO[];
  };

  type ResponseDTOListTreeLong = {
    code?: number;
    message?: string;
    data?: TreeLong[];
  };

  type ResponseDTOMenuTreeSelectDTO = {
    code?: number;
    message?: string;
    data?: MenuTreeSelectDTO;
  };

  type ResponseDTOPageDTOSysClientDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysClientDTO;
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

  type ResponseDTOPageDTOSysOssConfigDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysOssConfigDTO;
  };

  type ResponseDTOPageDTOSysOssDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysOssDTO;
  };

  type ResponseDTOPageDTOSysPostDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysPostDTO;
  };

  type ResponseDTOPageDTOSysRoleDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysRoleDTO;
  };

  type ResponseDTOPageDTOSysUserDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysUserDTO;
  };

  type ResponseDTOString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type ResponseDTOSysClientDTO = {
    code?: number;
    message?: string;
    data?: SysClientDTO;
  };

  type ResponseDTOSysConfigDTO = {
    code?: number;
    message?: string;
    data?: SysConfigDTO;
  };

  type ResponseDTOSysDeptDTO = {
    code?: number;
    message?: string;
    data?: SysDeptDTO;
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

  type ResponseDTOSysOssConfigDTO = {
    code?: number;
    message?: string;
    data?: SysOssConfigDTO;
  };

  type ResponseDTOSysOssDTO = {
    code?: number;
    message?: string;
    data?: SysOssDTO;
  };

  type ResponseDTOSysOssUploadDTO = {
    code?: number;
    message?: string;
    data?: SysOssUploadDTO;
  };

  type ResponseDTOSysPostDTO = {
    code?: number;
    message?: string;
    data?: SysPostDTO;
  };

  type ResponseDTOSysRoleDTO = {
    code?: number;
    message?: string;
    data?: SysRoleDTO;
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

  type revokeUsersFromRoleParams = {
    command: RoleUserAssignCommand;
  };

  type roleDeptTreeSelectParams = {
    roleId: number;
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
    roleId?: number;
  };

  type RoleUserAssignCommand = {
    roleId?: number;
    userIds?: number[];
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
    userName?: string;
    /** 用户状态 */
    status?: number;
    /** 手机号 */
    phoneNumber?: string;
    /** 部门ID */
    deptId?: number;
  };

  type SysClientDTO = {
    /** id */
    id?: number;
    /** 客户端id */
    clientId?: string;
    /** 客户端key */
    clientKey?: string;
    /** 客户端秘钥 */
    clientSecret?: string;
    /** 授权类型 */
    grantTypeList?: string[];
    /** 设备类型 */
    deviceType?: string;
    /** token活跃超时时间 */
    activeTimeout?: number;
    /** token固定超时 */
    timeout?: number;
    /** 状态 */
    status?: string;
  };

  type SysClientQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
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

  type SysDeptDTO = {
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
    children?: SysDeptDTO[];
  };

  type SysDeptQuery = {
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
    dictTypeId?: number;
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

  type SysOssConfigDTO = {
    /** 主键 */
    ossConfigId?: number;
    /** 配置key */
    configKey?: string;
    /** accessKey */
    accessKey?: string;
    /** 秘钥 */
    secretKey?: string;
    /** 桶名称 */
    bucketName?: string;
    /** 前缀 */
    prefix?: string;
    /** 访问站点 */
    endpoint?: string;
    /** 自定义域名 */
    domain?: string;
    /** 是否https */
    isHttps?: string;
    /** 域 */
    region?: string;
    /** 桶权限类型(0=private 1=public 2=custom) */
    accessPolicy?: string;
    /** 是否默认 */
    status?: string;
    /** 扩展字段 */
    ext1?: string;
  };

  type SysOssConfigQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
  };

  type SysOssDTO = {
    ossId?: number;
    /** 文件名 */
    fileName?: string;
    /** 原始名 */
    originalName?: string;
    /** 文件大小（单位：字节） */
    fileSize?: number;
    /** 文件类型（如 image/jpeg、application/pdf） */
    fileType?: string;
    /** 文件扩展名（如 jpg、pdf） */
    fileExtension?: string;
    /** URL */
    url?: string;
    status?: string;
    service?: string;
    creatorId?: number;
    createTime?: string;
  };

  type SysOssPreviewDTO = {
    ossId?: number;
    /** 原始名 */
    originalName?: string;
    /** URL */
    url?: string;
  };

  type SysOssUploadDTO = {
    url?: string;
    fileName?: string;
    originalName?: string;
    ossId?: number;
  };

  type SysPostDTO = {
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
    createTime?: string;
  };

  type SysPostQuery = {
    orderColumn?: string;
    orderDirection?: string;
    timeRangeColumn?: string;
    beginTime?: string;
    endTime?: string;
    pageNum?: number;
    pageSize?: number;
    postCode?: string;
    postName?: string;
    status?: string;
    belongDeptId?: number;
    deptId?: number;
    postIds?: number[];
    postCategory?: string;
  };

  type SysRoleDTO = {
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

  type SysUserDTO = {
    /** 用户ID */
    userId?: number;
    /** 部门ID */
    deptId?: number;
    /** 用户名 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 用户类型 */
    userType?: string;
    /** 邮件 */
    email?: string;
    /** 号码 */
    phoneNumber?: string;
    /** 性别 */
    sex?: string;
    /** 用户头像 */
    avatarFileId?: number;
    /** 用户头像 */
    avatarFileUrl?: string;
    /** 状态 */
    status?: string;
    /** 最后登录IP */
    loginIp?: string;
    /** 最后登录时间 */
    loginDate?: string;
    /** 备注 */
    remark?: string;
    /** 部门名称 */
    deptName?: string;
    roles?: SysRoleDTO[];
    posts?: SysPostDTO[];
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

  type updateAvatarParams = {
    file: string;
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
    dictCode?: number;
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

  type UpdateProfileCommand = {
    userId?: number;
    sex?: string;
    nickName?: string;
    phoneNumber?: string;
    email?: string;
  };

  type UpdateSysClientCommand = {
    /** 客户端id */
    clientId?: string;
    /** 客户端key */
    clientKey?: string;
    /** 客户端秘钥 */
    clientSecret?: string;
    /** 授权类型 */
    grantTypeList: string[];
    /** 设备类型 */
    deviceType?: string;
    /** token活跃超时时间 */
    activeTimeout?: number;
    /** token固定超时 */
    timeout?: number;
    /** 状态（0正常 1停用） */
    status?: string;
    id?: number;
  };

  type UpdateSysDeptCommand = {
    parentId: number;
    deptName?: string;
    orderNum: number;
    leaderId?: number;
    phone?: string;
    email?: string;
    status?: string;
    deptId: number;
  };

  type UpdateSysMenuCommand = {
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

  type UpdateSysOssConfigCommand = {
    /** 配置key */
    configKey?: string;
    /** accessKey */
    accessKey?: string;
    /** 秘钥 */
    secretKey?: string;
    /** 桶名称 */
    bucketName?: string;
    /** 前缀 */
    prefix?: string;
    /** 访问站点 */
    endpoint?: string;
    /** 自定义域名 */
    domain?: string;
    /** 是否https（Y=是,N=否） */
    isHttps?: string;
    /** 域 */
    region?: string;
    /** 桶权限类型(0=private 1=public 2=custom) */
    accessPolicy?: string;
    /** 是否默认（0=是,1=否） */
    status?: string;
    /** 扩展字段 */
    ext1?: string;
    ossConfigId?: number;
  };

  type UpdateSysOssConfigStatusCommand = {
    ossConfigId?: number;
    status?: string;
  };

  type UpdateSysPostCommand = {
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

  type UpdateSysRoleCommand = {
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

  type UpdateSysRoleDataScopeCommand = {
    roleId: number;
    deptIds: number[];
    dataScope?: string;
    deptCheckStrictly?: boolean;
  };

  type UpdateSysRoleStatusCommand = {
    roleId?: number;
    status?: string;
  };

  type UpdateUserCommand = {
    deptId?: number;
    userName?: string;
    nickName?: string;
    email?: string;
    phoneNumber?: string;
    sex?: number;
    avatar?: string;
    password?: string;
    status?: number;
    roleIds?: number[];
    postIds?: number[];
    remark?: string;
    creatorId?: number;
    createDeptId?: number;
    userId?: number;
    updaterId?: number;
  };

  type UpdateUserPasswordCommand = {
    userId?: number;
    newPassword?: string;
    oldPassword?: string;
  };

  type UpdateUserRoleCommand = {
    userId?: number;
    roleId?: number;
  };

  type uploadParams = {
    originalName?: string;
    ossType?: string;
  };

  type UserDetailDTO = {
    user?: SysUserDTO;
    roleIds?: number[];
    roles?: SysRoleDTO[];
    postIds?: number[];
    posts?: SysPostDTO[];
  };

  type UserProfileDTO = {
    user?: SysUserDTO;
    roleGroup?: string;
    postGroup?: string;
  };
}
