import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'mdi:account-settings-variant',
      title: $t('system.title'),
    },
    name: 'Menu',
    path: '/system/menu',
    redirect: '/system/menu/index',
    children: [
      {
        name: 'MenuIndex',
        path: '/system/menu/index',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          icon: 'mdi:menu',
          title: $t('system.menu.title'),
        },
      },
    ],
  },
];

export default routes;
