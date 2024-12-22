import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from '@vben/vite-config';

// eslint-disable-next-line n/no-extraneous-import
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

export default defineConfig(async () => {
  return {
    application: {},
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
      },
    },
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://172.17.0.1:8080/',
            ws: true,
          },
        },
      },
    },
  };
});
