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

  type AddDeptCommand = {
    parentId: number;
    deptName?: string;
    orderNum: number;
    leaderId?: number;
    phone?: string;
    email?: string;
    status?: string;
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

  type batchRemoveClientParams = {
    ids: number[];
  };

  type batchRemoveConfigParams = {
    configIds: number[];
  };

  type batchRemoveDictDataParams = {
    dictCodes: number[];
  };

  type batchRemoveDictTypeParams = {
    dictTypeIds: number[];
  };

  type batchRemoveFileParams = {
    fileIds: number[];
  };

  type batchRemoveNoticeParams = {
    noticeIds: number[];
  };

  type cancelAuthUserAllParams = {
    roleId: number;
    userIds: number[];
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

  type downloadParams = {
    fileId: number;
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

  type editClientParams = {
    id: number;
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

  type exportPostParams = {
    query: PostQuery;
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

  type getDeptInfoParams = {
    deptId: number;
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

  type getNoticeInfoParams = {
    /** 记录ID */
    noticeId: number;
  };

  type getPagedClientsParams = {
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

  type getPagedDictTypesParams = {
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

  type getPagedFilesParams = {
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

  type getRoleMenuTreeSelectParams = {
    roleId: number;
  };

  type getUserDetailInfoParams = {
    userId: number;
  };

  type listClientParams = {
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
    dictType?: string;
    dictLabel?: string;
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
    dictType?: string;
    dictName?: string;
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

  type listFileInfoByIdsParams = {
    ossIds: number[];
  };

  type listFileParams = {
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

  type MenuTreeSelectDTO = {
    checkedKeys?: number[];
    menus?: TreeLong[];
  };

  type optionSelectParams = {
    roleIds?: number[];
  };

  type optionSelectPostParams = {
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

  type PageDTOSysFileDTO = {
    /** 总记录数 */
    total?: number;
    /** 列表数据 */
    rows?: SysFileDTO[];
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
    status?: string;
    belongDeptId?: number;
    deptId?: number;
    postIds?: number[];
    postCategory?: string;
  };

  type removeClientParams = {
    id: number;
  };

  type removeConfigParams = {
    configId: number;
  };

  type removeDeptParams = {
    deptId: number;
  };

  type removeDictDataParams = {
    dictCode: number;
  };

  type removeDictTypeParams = {
    dictTypeId: number;
  };

  type removeMenuParams = {
    menuId: number;
  };

  type removeNoticeParams = {
    noticeId: number;
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

  type ResponseDTOInteger = {
    code?: number;
    message?: string;
    data?: number;
  };

  type ResponseDTOListDeptDTO = {
    code?: number;
    message?: string;
    data?: DeptDTO[];
  };

  type ResponseDTOListPostDTO = {
    code?: number;
    message?: string;
    data?: PostDTO[];
  };

  type ResponseDTOListRoleDTO = {
    code?: number;
    message?: string;
    data?: RoleDTO[];
  };

  type ResponseDTOListSysClientDTO = {
    code?: number;
    message?: string;
    data?: SysClientDTO[];
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

  type ResponseDTOListSysFileDTO = {
    code?: number;
    message?: string;
    data?: SysFileDTO[];
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

  type ResponseDTOMenuTreeSelectDTO = {
    code?: number;
    message?: string;
    data?: MenuTreeSelectDTO;
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

  type ResponseDTOPageDTOSysFileDTO = {
    code?: number;
    message?: string;
    data?: PageDTOSysFileDTO;
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

  type ResponseDTOSysFileDTO = {
    code?: number;
    message?: string;
    data?: SysFileDTO;
  };

  type ResponseDTOSysFileUploadDTO = {
    code?: number;
    message?: string;
    data?: SysFileUploadDTO;
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
    userName?: string;
    /** 用户状态 */
    status?: number;
    /** 手机号 */
    phoneNumber?: string;
    /** 部门ID */
    deptId?: number;
  };

  type selectAuthUserAllParams = {
    roleId: number;
    userIds: number[];
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

  type SysFileDTO = {
    fileId?: number;
    /** 文件名 */
    fileName?: string;
    /** 文件存储路径 */
    filePath?: string;
    /** 原始名 */
    originalName?: string;
    /** 文件大小（单位：字节） */
    fileSize?: number;
    /** 文件类型（如 image/jpeg、application/pdf） */
    fileType?: string;
    /** 文件扩展名（如 jpg、pdf） */
    fileExtension?: string;
    /** 桶名 */
    bucketName?: string;
    /** 访问策略 */
    accessPolicy?: string;
    /** URL */
    url?: string;
    status?: string;
    creatorId?: number;
    createTime?: string;
  };

  type SysFileUploadDTO = {
    url?: string;
    fileName?: string;
    fileId?: number;
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

  type UpdateDataScopeCommand = {
    roleId: number;
    deptIds: number[];
    dataScope?: string;
  };

  type UpdateDeptCommand = {
    parentId: number;
    deptName?: string;
    orderNum: number;
    leaderId?: number;
    phone?: string;
    email?: string;
    status?: string;
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
    sex?: string;
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
    folder?: string;
    originalName?: string;
    fileType?: string;
  };

  type UserDetailDTO = {
    user?: UserDTO;
    roleIds?: number[];
    roles?: RoleDTO[];
    postIds?: number[];
    posts?: PostDTO[];
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
    roleGroup?: string;
    postGroup?: string;
  };
}
