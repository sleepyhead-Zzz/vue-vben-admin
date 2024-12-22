/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetaDTO } from './MetaDTO';
export type MenuDetailDTO = {
  id?: number;
  parentId?: number;
  menuName?: string;
  routerName?: string;
  path?: string;
  rank?: number;
  menuType?: number;
  menuTypeStr?: string;
  isButton?: boolean;
  status?: number;
  statusStr?: string;
  createTime?: string;
  icon?: string;
  permission?: string;
  meta?: MetaDTO;
};
