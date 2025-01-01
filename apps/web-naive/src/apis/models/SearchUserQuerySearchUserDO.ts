/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SearchUserQuerySearchUserDO = {
  orderColumn?: string;
  orderDirection?: string;
  timeRangeColumn?: string;
  beginTime?: string;
  endTime?: string;
  pageNum?: number;
  pageSize?: number;
  /**
   * 用户ID
   */
  userId?: number;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 用户状态
   */
  status?: number;
  /**
   * 手机号
   */
  phoneNumber?: string;
  /**
   * 部门ID
   */
  deptId?: number;
};
