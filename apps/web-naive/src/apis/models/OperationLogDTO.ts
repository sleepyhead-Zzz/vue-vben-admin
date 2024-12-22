/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 操作日志
 */
export type OperationLogDTO = {
  /**
   * ID
   */
  operationId?: number;
  businessType?: number;
  /**
   * 操作类型
   */
  businessTypeStr?: string;
  /**
   * 操作类型
   */
  requestMethod?: string;
  /**
   * 操作类型
   */
  requestModule?: string;
  /**
   * 操作类型
   */
  requestUrl?: string;
  /**
   * 操作类型
   */
  calledMethod?: string;
  operatorType?: number;
  /**
   * 操作人类型
   */
  operatorTypeStr?: string;
  /**
   * 用户ID
   */
  userId?: number;
  /**
   * 用户名
   */
  username?: string;
  /**
   * ip地址
   */
  operatorIp?: string;
  /**
   * ip地点
   */
  operatorLocation?: string;
  /**
   * 部门ID
   */
  deptId?: number;
  /**
   * 部门
   */
  deptName?: string;
  /**
   * 操作参数
   */
  operationParam?: string;
  /**
   * 操作结果
   */
  operationResult?: string;
  status?: number;
  /**
   * 状态
   */
  statusStr?: string;
  /**
   * 错误堆栈
   */
  errorStack?: string;
  /**
   * 操作时间
   */
  operationTime?: string;
};
