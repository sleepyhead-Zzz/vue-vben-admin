/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RoleQuery = {
  orderColumn?: string;
  orderDirection?: string;
  timeRangeColumn?: string;
  beginTime?: string;
  endTime?: string;
  pageNum?: number;
  pageSize?: number;
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 角色权限字符串
   */
  roleKey?: string;
  /**
   * 角色状态
   */
  status?: string;
};
