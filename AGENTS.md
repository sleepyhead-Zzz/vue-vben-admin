# AGENTS

## 范围

- 默认只改 `apps/web-antd`
- 共享问题才进入 `packages/*` 或 `internal/*`
- 接口相关文件：`apps/web-antd/src/api/*`、`apps/web-antd/openapi2ts.config.ts`

## 关键规则

- 保持现有页面模式：`index.vue` + `data.ts(x)` + `*-drawer.vue` / `*-modal.vue`。
- 业务页面优先复用 `apps/web-antd/src/views` 同域已有实现，不另起一套风格。
- 涉及后端 contract 变化时，先改后端，再在 `apps/web-antd` 目录执行 `pnpm openapi`，不要手改生成的 API 文件。
- 非根因明确时，不改 `internal/*`、`turbo.json`、lint 配置。
- 只改任务相关目录，不动 `dist`、`node_modules`、`.turbo`。

## 最小验证

- UI/页面改动：`pnpm run dev:antd`
- TS / API 改动：`pnpm -F @vben/web-antd run typecheck`
- API contract 改动：在 `apps/web-antd` 目录执行 `pnpm openapi`
- 构建或共享层改动：`pnpm run build:antd`
