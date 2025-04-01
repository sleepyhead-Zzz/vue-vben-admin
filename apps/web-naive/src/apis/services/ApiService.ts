/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddDeptCommand } from '../models/AddDeptCommand';
import type { AddMenuCommand } from '../models/AddMenuCommand';
import type { AddPostCommand } from '../models/AddPostCommand';
import type { AddRepairCommand } from '../models/AddRepairCommand';
import type { AddRoleCommand } from '../models/AddRoleCommand';
import type { AddUserCommand } from '../models/AddUserCommand';
import type { AllocatedRoleQuery } from '../models/AllocatedRoleQuery';
import type { ChangeStatusCommand } from '../models/ChangeStatusCommand';
import type { LoginCommand } from '../models/LoginCommand';
import type { OperationLogQuery } from '../models/OperationLogQuery';
import type { PostQuery } from '../models/PostQuery';
import type { RepairQuery } from '../models/RepairQuery';
import type { ResetPasswordCommand } from '../models/ResetPasswordCommand';
import type { ResponseDTOCurrentLoginUserDTO } from '../models/ResponseDTOCurrentLoginUserDTO';
import type { ResponseDTODeptDTO } from '../models/ResponseDTODeptDTO';
import type { ResponseDTOListDeptDTO } from '../models/ResponseDTOListDeptDTO';
import type { ResponseDTOListMenuDTO } from '../models/ResponseDTOListMenuDTO';
import type { ResponseDTOListRepairDTO } from '../models/ResponseDTOListRepairDTO';
import type { ResponseDTOListRouterDTO } from '../models/ResponseDTOListRouterDTO';
import type { ResponseDTOListTreeLong } from '../models/ResponseDTOListTreeLong';
import type { ResponseDTOMenuDetailDTO } from '../models/ResponseDTOMenuDetailDTO';
import type { ResponseDTOPageDTOLoginLogDTO } from '../models/ResponseDTOPageDTOLoginLogDTO';
import type { ResponseDTOPageDTOOperationLogDTO } from '../models/ResponseDTOPageDTOOperationLogDTO';
import type { ResponseDTOPageDTOPostDTO } from '../models/ResponseDTOPageDTOPostDTO';
import type { ResponseDTOPageDTORoleDTO } from '../models/ResponseDTOPageDTORoleDTO';
import type { ResponseDTOPageDTOUserDTO } from '../models/ResponseDTOPageDTOUserDTO';
import type { ResponseDTOPostDTO } from '../models/ResponseDTOPostDTO';
import type { ResponseDTORepairDTO } from '../models/ResponseDTORepairDTO';
import type { ResponseDTORoleDTO } from '../models/ResponseDTORoleDTO';
import type { ResponseDTOTokenDTO } from '../models/ResponseDTOTokenDTO';
import type { ResponseDTOUserDetailDTO } from '../models/ResponseDTOUserDetailDTO';
import type { ResponseDTOUserProfileDTO } from '../models/ResponseDTOUserProfileDTO';
import type { ResponseDTOVoid } from '../models/ResponseDTOVoid';
import type { RoleQuery } from '../models/RoleQuery';
import type { SearchUserQuerySearchUserDO } from '../models/SearchUserQuerySearchUserDO';
import type { UnallocatedRoleQuery } from '../models/UnallocatedRoleQuery';
import type { UpdateDataScopeCommand } from '../models/UpdateDataScopeCommand';
import type { UpdateDeptCommand } from '../models/UpdateDeptCommand';
import type { UpdateMenuCommand } from '../models/UpdateMenuCommand';
import type { UpdatePostCommand } from '../models/UpdatePostCommand';
import type { UpdateProfileCommand } from '../models/UpdateProfileCommand';
import type { UpdateRepairCommand } from '../models/UpdateRepairCommand';
import type { UpdateRoleCommand } from '../models/UpdateRoleCommand';
import type { UpdateStatusCommand } from '../models/UpdateStatusCommand';
import type { UpdateUserCommand } from '../models/UpdateUserCommand';
import type { UpdateUserPasswordCommand } from '../models/UpdateUserPasswordCommand';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiService {
  /**
   * 用户详情
   * @param userId
   * @returns ResponseDTOUserDetailDTO OK
   * @throws ApiError
   */
  public static getUserDetailInfo(
    userId: number,
  ): CancelablePromise<ResponseDTOUserDetailDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/user/{userId}',
      path: {
        userId: userId,
      },
    });
  }
  /**
   * 修改用户
   * @param userId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static editUser(
    userId: number,
    requestBody: UpdateUserCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/user/{userId}',
      path: {
        userId: userId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 修改用户状态
   * @param userId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static changeUserStatus(
    userId: number,
    requestBody: ChangeStatusCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/user/{userId}/status',
      path: {
        userId: userId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 重置用户密码
   * @param userId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static resetPassword(
    userId: number,
    requestBody: ResetPasswordCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/user/{userId}/password',
      path: {
        userId: userId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 获取个人信息
   * @returns ResponseDTOUserProfileDTO OK
   * @throws ApiError
   */
  public static profile(): CancelablePromise<ResponseDTOUserProfileDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/user/profile',
    });
  }
  /**
   * 修改个人信息
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static updateProfile(
    requestBody: UpdateProfileCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/user/profile',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 重置个人密码
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static updatePassword(
    requestBody: UpdateUserPasswordCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/user/profile/password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 角色详情
   * @param roleId
   * @returns ResponseDTORoleDTO OK
   * @throws ApiError
   */
  public static getRoleInfo(
    roleId: number,
  ): CancelablePromise<ResponseDTORoleDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/role/{roleId}',
      path: {
        roleId: roleId,
      },
    });
  }
  /**
   * 修改角色
   * @param roleId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static editRole(
    roleId: number,
    requestBody: UpdateRoleCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/role/{roleId}',
      path: {
        roleId: roleId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 删除角色
   * @param roleId
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static removeRole(
    roleId: Array<number>,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/system/role/{roleId}',
      path: {
        roleId: roleId,
      },
    });
  }
  /**
   * 修改角色状态
   * @param roleId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static changeRoleStatus(
    roleId: number,
    requestBody: UpdateStatusCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/role/{roleId}/status',
      path: {
        roleId: roleId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 修改角色数据权限
   * @param roleId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static dataScope(
    roleId: number,
    requestBody: UpdateDataScopeCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/role/{roleId}/dataScope',
      path: {
        roleId: roleId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 职位详情
   * @param postId
   * @returns ResponseDTOPostDTO OK
   * @throws ApiError
   */
  public static getPostInfo(
    postId: number,
  ): CancelablePromise<ResponseDTOPostDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/post/{postId}',
      path: {
        postId: postId,
      },
    });
  }
  /**
   * 修改职位
   * @param postId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static editPost(
    postId: number,
    requestBody: UpdatePostCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/post/{postId}',
      path: {
        postId: postId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 菜单详情
   * @param menuId
   * @returns ResponseDTOMenuDetailDTO OK
   * @throws ApiError
   */
  public static menuInfo(
    menuId: number,
  ): CancelablePromise<ResponseDTOMenuDetailDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/menu/{menuId}',
      path: {
        menuId: menuId,
      },
    });
  }
  /**
   * 编辑菜单
   * @param menuId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static editMenu(
    menuId: number,
    requestBody: UpdateMenuCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/menu/{menuId}',
      path: {
        menuId: menuId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 删除菜单
   * @param menuId
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static removeMenu(menuId: number): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/system/menu/{menuId}',
      path: {
        menuId: menuId,
      },
    });
  }
  /**
   * 部门详情
   * @param deptId
   * @returns ResponseDTODeptDTO OK
   * @throws ApiError
   */
  public static getDeptInfo(
    deptId: number,
  ): CancelablePromise<ResponseDTODeptDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/dept/{deptId}',
      path: {
        deptId: deptId,
      },
    });
  }
  /**
   * 修改部门
   * @param deptId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static editDept(
    deptId: number,
    requestBody: UpdateDeptCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/dept/{deptId}',
      path: {
        deptId: deptId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 删除部门
   * @param deptId
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static removeDept(deptId: number): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/system/dept/{deptId}',
      path: {
        deptId: deptId,
      },
    });
  }
  /**
   * 报修详情
   * @param repairId
   * @returns ResponseDTORepairDTO OK
   * @throws ApiError
   */
  public static getInfo(
    repairId: number,
  ): CancelablePromise<ResponseDTORepairDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/repair/{repairId}',
      path: {
        repairId: repairId,
      },
    });
  }
  /**
   * 修改报修
   * @param repairId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static edit(
    repairId: number,
    requestBody: UpdateRepairCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/repair/{repairId}',
      path: {
        repairId: repairId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 删除报修
   * @param repairId
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static remove(repairId: number): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/repair/{repairId}',
      path: {
        repairId: repairId,
      },
    });
  }
  /**
   * 新增用户
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static addUser(
    requestBody: AddUserCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/user',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 用户列表
   * @param requestBody
   * @returns ResponseDTOPageDTOUserDTO OK
   * @throws ApiError
   */
  public static getPagedUser(
    requestBody: SearchUserQuerySearchUserDO,
  ): CancelablePromise<ResponseDTOPageDTOUserDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/user/page',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 添加角色
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static addRole(
    requestBody: AddRoleCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/role',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 批量添加用户和角色关联
   * @param roleId
   * @param userIds
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static addRoleForUserByBulk(
    roleId: number,
    userIds: Array<number>,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/role/{roleId}/users/{userIds}/grant/bulk',
      path: {
        roleId: roleId,
        userIds: userIds,
      },
    });
  }
  /**
   * 角色列表
   * @param requestBody
   * @returns ResponseDTOPageDTORoleDTO OK
   * @throws ApiError
   */
  public static getPagedRole(
    requestBody: RoleQuery,
  ): CancelablePromise<ResponseDTOPageDTORoleDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/role/list',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 添加职位
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static addPost(
    requestBody: AddPostCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/post',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 删除职位
   * @param ids
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static removePost(
    ids: Array<number>,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/system/post',
      query: {
        ids: ids,
      },
    });
  }
  /**
   * 职位列表
   * @param requestBody
   * @returns ResponseDTOPageDTOPostDTO OK
   * @throws ApiError
   */
  public static getPagedPost(
    requestBody: PostQuery,
  ): CancelablePromise<ResponseDTOPageDTOPostDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/post/list',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 添加菜单
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static addMenu(
    requestBody: AddMenuCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/menu',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 菜单列表
   * @param isButton
   * @param orderColumn 排序字段
   * @param orderDirection 排序方向
   * @param timeRangeColumn 时间范围字段名
   * @param beginTime 开始时间
   * @param endTime 结束时间
   * @returns ResponseDTOListMenuDTO OK
   * @throws ApiError
   */
  public static listMenu(
    isButton?: boolean,
    orderColumn?: string,
    orderDirection?: string,
    timeRangeColumn?: string,
    beginTime?: string,
    endTime?: string,
  ): CancelablePromise<ResponseDTOListMenuDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/menu/list',
      query: {
        isButton: isButton,
        orderColumn: orderColumn,
        orderDirection: orderDirection,
        timeRangeColumn: timeRangeColumn,
        beginTime: beginTime,
        endTime: endTime,
      },
    });
  }
  /**
   * 新增部门
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static addDept(
    requestBody: AddDeptCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/dept/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 新增报修
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static add(
    requestBody: AddRepairCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/repair',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 注册接口
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static register(
    requestBody: AddUserCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 登录
   * @param requestBody
   * @returns ResponseDTOTokenDTO OK
   * @throws ApiError
   */
  public static login(
    requestBody: LoginCommand,
  ): CancelablePromise<ResponseDTOTokenDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 未关联该角色的用户列表
   * @param roleId
   * @param query
   * @returns ResponseDTOPageDTOUserDTO OK
   * @throws ApiError
   */
  public static unallocatedUserList(
    roleId: number,
    query: UnallocatedRoleQuery,
  ): CancelablePromise<ResponseDTOPageDTOUserDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/role/{roleId}/unallocated/list',
      path: {
        roleId: roleId,
      },
      query: {
        query: query,
      },
    });
  }
  /**
   * 已关联该角色的用户列表
   * @param roleId
   * @param query
   * @returns ResponseDTOPageDTOUserDTO OK
   * @throws ApiError
   */
  public static allocatedUserList(
    roleId: number,
    query: AllocatedRoleQuery,
  ): CancelablePromise<ResponseDTOPageDTOUserDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/role/{roleId}/allocated/list',
      path: {
        roleId: roleId,
      },
      query: {
        query: query,
      },
    });
  }
  /**
   * 职位列表导出
   * @param query
   * @returns any OK
   * @throws ApiError
   */
  public static exportPost(query: PostQuery): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/post/excel',
      query: {
        query: query,
      },
    });
  }
  /**
   * 菜单列表（树级）
   * 菜单树级下拉框
   * @returns ResponseDTOListTreeLong OK
   * @throws ApiError
   */
  public static dropdownMenuList(): CancelablePromise<ResponseDTOListTreeLong> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/menu/dropdown',
    });
  }
  /**
   * 部门列表
   * @param deptId
   * @param parentId
   * @param orderColumn 排序字段
   * @param orderDirection 排序方向
   * @param timeRangeColumn 时间范围字段名
   * @param beginTime 开始时间
   * @param endTime 结束时间
   * @returns ResponseDTOListDeptDTO OK
   * @throws ApiError
   */
  public static listDept(
    deptId?: number,
    parentId?: number,
    orderColumn?: string,
    orderDirection?: string,
    timeRangeColumn?: string,
    beginTime?: string,
    endTime?: string,
  ): CancelablePromise<ResponseDTOListDeptDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/dept/list',
      query: {
        deptId: deptId,
        parentId: parentId,
        orderColumn: orderColumn,
        orderDirection: orderDirection,
        timeRangeColumn: timeRangeColumn,
        beginTime: beginTime,
        endTime: endTime,
      },
    });
  }
  /**
   * 获取部门树级结构
   * @returns ResponseDTOListTreeLong OK
   * @throws ApiError
   */
  public static dropdownDeptList(): CancelablePromise<ResponseDTOListTreeLong> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/dept/dropdown',
    });
  }
  /**
   * 报修列表
   * @param query
   * @returns ResponseDTOListRepairDTO OK
   * @throws ApiError
   */
  public static list(
    query: RepairQuery,
  ): CancelablePromise<ResponseDTOListRepairDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/repairs',
      query: {
        query: query,
      },
    });
  }
  /**
   * 登录日志列表
   * @param ipAddress
   * @param status
   * @param username
   * @param pageNum
   * @param pageSize
   * @param orderColumn 排序字段
   * @param orderDirection 排序方向
   * @param timeRangeColumn 时间范围字段名
   * @param beginTime 开始时间
   * @param endTime 结束时间
   * @returns ResponseDTOPageDTOLoginLogDTO OK
   * @throws ApiError
   */
  public static getPagedLoginInfo(
    ipAddress?: string,
    status?: string,
    username?: string,
    pageNum?: number,
    pageSize?: number,
    orderColumn?: string,
    orderDirection?: string,
    timeRangeColumn?: string,
    beginTime?: string,
    endTime?: string,
  ): CancelablePromise<ResponseDTOPageDTOLoginLogDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/logs/page',
      query: {
        ipAddress: ipAddress,
        status: status,
        username: username,
        pageNum: pageNum,
        pageSize: pageSize,
        orderColumn: orderColumn,
        orderDirection: orderDirection,
        timeRangeColumn: timeRangeColumn,
        beginTime: beginTime,
        endTime: endTime,
      },
    });
  }
  /**
   * 操作日志列表
   * @param query
   * @returns ResponseDTOPageDTOOperationLogDTO OK
   * @throws ApiError
   */
  public static operationLogs(
    query: OperationLogQuery,
  ): CancelablePromise<ResponseDTOPageDTOOperationLogDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/logs/operationLogs',
      query: {
        query: query,
      },
    });
  }
  /**
   * 删除操作日志
   * @param operationIds
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static removeOperationLogs(
    operationIds: Array<number>,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/logs/operationLogs',
      query: {
        operationIds: operationIds,
      },
    });
  }
  /**
   * 获取用户对应的菜单路由
   * 用于动态生成路由
   * @returns ResponseDTOListRouterDTO OK
   * @throws ApiError
   */
  public static getRouters(): CancelablePromise<ResponseDTOListRouterDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/getRouters',
    });
  }
  /**
   * 获取当前登录用户信息
   * @returns ResponseDTOCurrentLoginUserDTO OK
   * @throws ApiError
   */
  public static getLoginUserInfo(): CancelablePromise<ResponseDTOCurrentLoginUserDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/getLoginUserInfo',
    });
  }
  /**
   * 删除用户
   * @param userIds
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static removeUser(
    userIds: Array<number>,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/system/user/{userIds}',
      path: {
        userIds: userIds,
      },
    });
  }
  /**
   * 批量解除角色和用户的关联
   * @param userIds
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static deleteRoleOfUserByBulk(
    userIds: Array<number>,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/system/role/users/{userIds}/grant/bulk',
      path: {
        userIds: userIds,
      },
    });
  }
  /**
   * 删除登录日志
   * @param ids
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static removeLoginInfos(
    ids: Array<number>,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/logs/loginLogs',
      query: {
        ids: ids,
      },
    });
  }
}
