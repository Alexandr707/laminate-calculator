import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import path from 'path';
import * as url from 'url';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log('[dirname]:  ', __dirname);

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const vitePWA = VitePWA({
    registerType: 'autoUpdate',
    outDir: 'dist',
    devOptions: { enabled: false }, // { enabled: process.env.NODE_ENV === 'development' }, //{ enabled: false },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,ttf,woff,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /\.(png|svg|jpg|jpeg|webp)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 60 * 60 * 24 * 60, // <== 60 days
            },
            cacheableResponse: {
              statuses: [0, 200, 304],
            },
          },
        },
        {
          urlPattern: /https:\/\/core-renderer-tiles\.maps\.yandex\.net*/i,
          handler: 'NetworkOnly',
          options: {
            cacheName: 'map',
            expiration: {
              maxEntries: 0,
              maxAgeSeconds: 60 * 60,
            },
            cacheableResponse: {
              statuses: [0, 200, 304],
            },
          },
        },
        {
          urlPattern: /https:\/\/api-maps\.yandex\.ru*/i,
          handler: 'NetworkOnly',
          options: {
            cacheName: 'map',
            expiration: {
              maxEntries: 0,
              maxAgeSeconds: 60 * 60,
            },
            cacheableResponse: {
              statuses: [0, 200, 304],
            },
          },
        },
        {
          urlPattern: /https:\/\/moscow\.fargospc\.ru\/test\/json\//i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'json-data',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 60, // <== 60 days
            },
            cacheableResponse: {
              statuses: [0, 200, 304],
            },
          },
        },
      ],
    },
  });

  const replaceOptions = { __DATE__: new Date().toISOString() };

  return defineConfig({
    plugins: [react(), vitePWA, replace(replaceOptions)], //vitePWA    vitePWA, replace(replaceOptions)
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        components: `${path.resolve(__dirname, './src/components/')}`,
        utils: `${path.resolve(__dirname, './src/utils')}`,
        public: `${path.resolve(__dirname, './public/')}`,
        pages: path.resolve(__dirname, './src/pages'),
        types: `${path.resolve(__dirname, './src/@types')}`,
        styles: `${path.resolve(__dirname, './src/styles/')}`,
      },
    },
  });
};
