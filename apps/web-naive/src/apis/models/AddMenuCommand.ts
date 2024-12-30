/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RouterMeta } from './RouterMeta';
export type AddMenuCommand = {
  parentId?: number;
  menuName: string;
  menuType?: number;
  component?: string;
  path?: string;
  redirect?: string;
  meta?: RouterMeta;
  permission?: string;
  remark?: string;
  status?: boolean;
};
