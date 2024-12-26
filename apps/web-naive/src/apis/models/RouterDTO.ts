/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RouterMeta } from './RouterMeta';
export type RouterDTO = {
  name?: string;
  path?: string;
  redirect?: string;
  component?: string;
  meta?: RouterMeta;
  children?: Array<RouterDTO>;
};
