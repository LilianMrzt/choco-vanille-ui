import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const root = fileURLToPath(new URL('.', import.meta.url));

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));
const externalDeps = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
];

const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

const assetFileNames = 'ui-kit[extname]';

const aggregateStylesheet = (): Plugin => ({
  name: 'aggregate-stylesheet',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const styles = Object.values(bundle)
      .filter(
        (output): output is Extract<typeof output, { type: 'asset' }> =>
          output.type === 'asset' && output.fileName.endsWith('.css'),
      )
      .map((asset) => asset.source.toString())
      .join('\n');

    this.emitFile({
      type: 'asset',
      fileName: 'styles.css',
      source: styles,
    });
  },
});

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    libInjectCss(),
    aggregateStylesheet(),
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
      '@scripts': resolve(root, 'scripts'),
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
