/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateRepairCommand = {
  deviceType?: string;
  /**
   * 报修人
   */
  reporter?: string;
  /**
   * 设备名称
   */
  deviceName?: string;
  /**
   * 问题描述
   */
  issueDescription?: string;
  /**
   * 位置
   */
  location?: string;
  deptId?: number;
  repairId?: number;
};
