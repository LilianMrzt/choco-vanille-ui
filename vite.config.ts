import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const root = fileURLToPath(new URL('.', import.meta.url));

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));
const externalDeps = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
];

const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const assetFileNames = 'ui-kit[extname]';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      include: ['src'],
      exclude: ['src/stories', 'src/**/*.stories.tsx', 'src/**/*.stories.ts'],
      bundleTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(root, 'src'),
      '@components': resolve(root, 'src/components'),
      '@theme': resolve(root, 'src/theme'),
      '@constants': resolve(root, 'src/constants'),
      '@utils': resolve(root, 'src/utils'),
      '@hooks': resolve(root, 'src/hooks'),
      '@stories': resolve(root, 'src/stories'),
      '@tests': resolve(root, 'tests'),
    },
  },
  build: {
    lib: {
      entry: resolve(root, 'src/index.ts'),
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: isExternal,
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          assetFileNames,
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          assetFileNames,
          entryFileNames: '[name].cjs',
        },
      ],
    },
    sourcemap: true,
  },
});
