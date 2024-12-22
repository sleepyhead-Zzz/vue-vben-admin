/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 角色列表
 */
export type RoleDTO = {
  /**
   * 角色ID
   */
  roleId?: number;
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 角色标识
   */
  roleKey?: string;
  /**
   * 角色排序
   */
  roleSort?: number;
  /**
   * 角色状态
   */
  status?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 数据范围
   */
  dataScope?: number;
  selectedMenuList?: Array<number>;
  selectedDeptList?: Array<number>;
};
