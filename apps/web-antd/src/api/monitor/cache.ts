// @ts-ignore
/* eslint-disable */
import request from "#/api/request";

/** Redis信息 GET /monitor/cache/cacheInfo */
export async function getRedisCacheInfo(options?: { [key: string]: any }) {
  return request<MonitorAPI.ResponseDTORedisCacheInfoDTO>(
    "/monitor/cache/cacheInfo",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
