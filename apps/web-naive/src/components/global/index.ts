import type { App } from 'vue';

import { GhostButton } from './button';

/**
 * 全局组件注册
 */
export function setupGlobalComponent(app: App) {
  // 注册 GhostButton 作为全局组件
  app.component('GhostButton', GhostButton);
}
