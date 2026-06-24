/// <reference types="vitest" />
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      include: ['src'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.stories.ts'],
      bundleTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(root, 'src'),
      '@components': resolve(root, 'src/components'),
      '@utils': resolve(root, 'src/utils'),
      '@styles': resolve(root, 'src/styles'),
      '@stories': resolve(root, 'src/stories'),
      '@tests': resolve(root, 'tests'),
    },
  },
  build: {
    lib: {
      entry: resolve(root, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'ui-kit.[ext]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
  },
});
