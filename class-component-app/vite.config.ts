import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Class-components-task/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      context: path.resolve(__dirname, './src/context'),
      app: path.resolve(__dirname, 'src/app'),
      features: path.resolve(__dirname, 'src/features'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
