/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetaDTO } from './MetaDTO';
export type UpdateMenuCommand = {
  parentId?: number;
  menuName: string;
  routerName?: string;
  path?: string;
  status?: number;
  menuType?: number;
  isButton?: boolean;
  permission?: string;
  meta?: MetaDTO;
  menuId: number;
};
