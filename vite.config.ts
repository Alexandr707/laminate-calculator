import react from '@vitejs/plugin-react';
import path from 'path';
import * as url from 'url';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log('[dirname]:  ', __dirname);

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const vitePWA = VitePWA({
    registerType: 'autoUpdate',
    outDir: 'dist',
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /\.(png|svg|jpg|jpeg|webp)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 60, // <== 60 days
            },
            cacheableResponse: {
              statuses: [0, 200, 304],
            },
          },
        },
        {
          urlPattern: /\.(css|js|ttf|woff|woff2|json)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'main',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 60, // <== 60 days
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
        {
          urlPattern: /^https:*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'fetch',
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

  return defineConfig({
    plugins: [react(), vitePWA],
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
