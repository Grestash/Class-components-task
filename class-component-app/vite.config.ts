import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Class-components-task/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      context: path.resolve(__dirname, './src/context'),
    },
  },
});