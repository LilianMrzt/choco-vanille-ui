import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
      '@components': path.resolve(dirname, 'src/components'),
      '@theme': path.resolve(dirname, 'src/theme'),
      '@constants': path.resolve(dirname, 'src/constants'),
      '@utils': path.resolve(dirname, 'src/utils'),
      '@hooks': path.resolve(dirname, 'src/hooks'),
      '@stories': path.resolve(dirname, 'src/stories'),
      '@tests': path.resolve(dirname, 'tests'),
      '@scripts': path.resolve(dirname, 'scripts'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    maxWorkers: 4,
  },
});
