declare namespace API {
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

  type callbackParams = {
    code: string;
  };

  type CurrentLoginUserDTO = {
    user?: UserDTO;
    permissions?: string[];
    roles?: string[];
  };

  type deleteFileParams = {
    fileName: string;
  };

  type downloadFileParams = {
    fileName: string;
  };

  type FileMetadataDTO = {
    fileName?: string;
    filePath?: string;
    fileSize?: number;
    fileType?: string;
    fileExtension?: string;
    creatorId?: number;
    createTime?: string;
  };

  type getFileUrlParams = {
    filePath: string;
  };

  type LoginCommand = {
    username?: string;
    password?: string;
    captchaCode?: string;
    captchaCodeKey?: string;
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

  type ResponseDTOCurrentLoginUserDTO = {
    code?: number;
    message?: string;
    data?: CurrentLoginUserDTO;
  };

  type ResponseDTOListFileMetadataDTO = {
    code?: number;
    message?: string;
    data?: FileMetadataDTO[];
  };

  type ResponseDTOListRouterDTO = {
    code?: number;
    message?: string;
    data?: RouterDTO[];
  };

  type ResponseDTOString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type ResponseDTOTokenDTO = {
    code?: number;
    message?: string;
    data?: TokenDTO;
  };

  type ResponseDTOVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
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

  type RouterDTO = {
    name?: string;
    path?: string;
    hidden?: boolean;
    redirect?: string;
    component?: string;
    query?: string;
    alwaysShow?: boolean;
    meta?: RouterMeta;
    children?: RouterDTO[];
  };

  type RouterMeta = {
    title?: string;
    activeIcon?: string;
    icon?: string;
    noCache?: boolean;
    link?: string;
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
    iframeSrc?: string;
    ignoreAccess?: boolean;
    loaded?: boolean;
    maxNumOfOpenTab?: number;
    menuVisibleWithForbidden?: boolean;
    openInNewWindow?: boolean;
    order?: number;
    query?: Record<string, any>;
  };

  type TokenDTO = {
    scope?: string;
    openid?: string;
    access_token?: string;
    refresh_token?: string;
    expire_in?: number;
    refresh_expire_in?: number;
    client_id?: string;
  };

  type uploadMultipleParams = {
    files: string[];
    folder?: string;
  };

  type uploadSingleParams = {
    folder?: string;
    originalName?: string;
    fileType?: string;
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
    avatar?: string;
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

  type WxUserProfileCommand = {
    code?: string;
    cloudId?: string;
    encryptedData?: string;
    iv?: string;
    rawData?: string;
    signature?: string;
  };
}
