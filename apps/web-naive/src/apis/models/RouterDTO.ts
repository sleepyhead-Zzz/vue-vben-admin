/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetaDTO } from './MetaDTO';
export type RouterDTO = {
  name?: string;
  path?: string;
  redirect?: string;
  component?: string;
  rank?: number;
  meta?: MetaDTO;
  children?: Array<RouterDTO>;
};
