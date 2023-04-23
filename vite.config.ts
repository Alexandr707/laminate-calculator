import react from '@vitejs/plugin-react';
import path from 'path';
import * as url from 'url';
import { defineConfig } from 'vite';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log('[dirname]:  ', __dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
