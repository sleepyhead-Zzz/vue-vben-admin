/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExtraIconDTO } from './ExtraIconDTO';
import type { TransitionDTO } from './TransitionDTO';
export type MetaDTO = {
  title?: string;
  icon?: string;
  showLink?: boolean;
  showParent?: boolean;
  roles?: Array<string>;
  auths?: Array<string>;
  frameSrc?: string;
  isFrameSrcInternal?: boolean;
  rank?: number;
  extraIcon?: ExtraIconDTO;
  keepAlive?: boolean;
  frameLoading?: boolean;
  transition?: TransitionDTO;
  hiddenTag?: boolean;
  dynamicLevel?: number;
};
