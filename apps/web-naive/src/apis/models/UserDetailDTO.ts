/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostDTO } from './PostDTO';
import type { RoleDTO } from './RoleDTO';
import type { UserDTO } from './UserDTO';
export type UserDetailDTO = {
  user?: UserDTO;
  roleOptions?: Array<RoleDTO>;
  postOptions?: Array<PostDTO>;
  postId?: number;
  roleId?: number;
  permissions?: Array<string>;
};
