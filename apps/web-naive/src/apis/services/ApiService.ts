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
import type { DeptQuery } from '../models/DeptQuery';
import type { LoginCommand } from '../models/LoginCommand';
import type { LoginLogQuery } from '../models/LoginLogQuery';
import type { MenuQuery } from '../models/MenuQuery';
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
      url: '/system/users/{userId}',
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
  public static edit(
    userId: number,
    requestBody: UpdateUserCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/users/{userId}',
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
  public static changeStatus(
    userId: number,
    requestBody: ChangeStatusCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/users/{userId}/status',
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
      url: '/system/users/{userId}/password',
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
   * 修改角色
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static edit1(
    requestBody: UpdateRoleCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/role',
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
  public static add1(
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
   * 修改角色状态
   * @param roleId
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static changeStatus1(
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
   * 修改职位
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static edit2(
    requestBody: UpdatePostCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/post',
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
  public static add2(
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
  public static remove2(
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
      url: '/system/menus/{menuId}',
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
  public static edit3(
    menuId: number,
    requestBody: UpdateMenuCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/system/menus/{menuId}',
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
  public static remove3(menuId: number): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/system/menus/{menuId}',
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
  public static getInfo2(
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
  public static edit4(
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
  public static remove4(deptId: number): CancelablePromise<ResponseDTOVoid> {
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
  public static getInfo3(
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
  public static edit5(
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
  public static remove5(repairId: number): CancelablePromise<ResponseDTOVoid> {
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
  public static add(
    requestBody: AddUserCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/users',
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
  public static userList(
    requestBody: SearchUserQuerySearchUserDO,
  ): CancelablePromise<ResponseDTOPageDTOUserDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/users/query',
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
   * 菜单列表
   * @param menuQuery
   * @returns ResponseDTOListMenuDTO OK
   * @throws ApiError
   */
  public static menuList(
    menuQuery: MenuQuery,
  ): CancelablePromise<ResponseDTOListMenuDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/menus',
      query: {
        menuQuery: menuQuery,
      },
    });
  }
  /**
   * 添加菜单
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static add3(
    requestBody: AddMenuCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/menus',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 新增部门
   * @param requestBody
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static add4(
    requestBody: AddDeptCommand,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/system/dept',
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
  public static add5(
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
   * 角色详情
   * @param roleId
   * @returns ResponseDTORoleDTO OK
   * @throws ApiError
   */
  public static getInfo(roleId: number): CancelablePromise<ResponseDTORoleDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/role/{roleId}',
      path: {
        roleId: roleId,
      },
    });
  }
  /**
   * 删除角色
   * @param roleId
   * @returns ResponseDTOVoid OK
   * @throws ApiError
   */
  public static remove1(
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
   * 角色列表
   * @param query
   * @returns ResponseDTOPageDTORoleDTO OK
   * @throws ApiError
   */
  public static list(
    query: RoleQuery,
  ): CancelablePromise<ResponseDTOPageDTORoleDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/role/list',
      query: {
        query: query,
      },
    });
  }
  /**
   * 职位详情
   * @param postId
   * @returns ResponseDTOPostDTO OK
   * @throws ApiError
   */
  public static getInfo1(
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
   * 职位列表
   * @param query
   * @returns ResponseDTOPageDTOPostDTO OK
   * @throws ApiError
   */
  public static list1(
    query: PostQuery,
  ): CancelablePromise<ResponseDTOPageDTOPostDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/post/list',
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
  public static export(query: PostQuery): CancelablePromise<any> {
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
  public static dropdownList(): CancelablePromise<ResponseDTOListTreeLong> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/menus/dropdown',
    });
  }
  /**
   * 部门列表
   * @param query
   * @returns ResponseDTOListDeptDTO OK
   * @throws ApiError
   */
  public static list2(
    query: DeptQuery,
  ): CancelablePromise<ResponseDTOListDeptDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/depts',
      query: {
        query: query,
      },
    });
  }
  /**
   * 获取部门树级结构
   * @returns ResponseDTOListTreeLong OK
   * @throws ApiError
   */
  public static dropdownList1(): CancelablePromise<ResponseDTOListTreeLong> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/system/depts/dropdown',
    });
  }
  /**
   * 报修列表
   * @param query
   * @returns ResponseDTOListRepairDTO OK
   * @throws ApiError
   */
  public static list3(
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
   * 登录日志列表
   * @param query
   * @returns ResponseDTOPageDTOLoginLogDTO OK
   * @throws ApiError
   */
  public static loginInfoList(
    query: LoginLogQuery,
  ): CancelablePromise<ResponseDTOPageDTOLoginLogDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/logs/loginLogs',
      query: {
        query: query,
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
  public static remove(
    userIds: Array<number>,
  ): CancelablePromise<ResponseDTOVoid> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/system/users/{userIds}',
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
}
