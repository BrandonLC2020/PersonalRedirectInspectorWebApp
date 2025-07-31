import path from 'path';

import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

import { defineConfig, loadEnv } from 'vite';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react(), svgr()],
      base: '/PersonalRedirectInspectorWebApp/',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
  });