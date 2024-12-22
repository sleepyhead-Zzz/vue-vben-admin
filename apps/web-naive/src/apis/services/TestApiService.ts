/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestApiService {
  /**
   * @returns string OK
   * @throws ApiError
   */
  public static redis(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/redis',
    });
  }
  /**
   * @returns string OK
   * @throws ApiError
   */
  public static jjwt(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/jjwt',
    });
  }
  /**
   * @returns string OK
   * @throws ApiError
   */
  public static getConfig(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/',
    });
  }
}
