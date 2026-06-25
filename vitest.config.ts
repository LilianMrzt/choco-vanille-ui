import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
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
      '@stories': path.resolve(dirname, 'src/stories'),
      '@tests': path.resolve(dirname, 'tests'),
    },
  },
  test: {
    projects: [
      // Unit tests (jsdom, fast, no browser)
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./tests/setup.ts'],
          include: ['tests/**/*.test.{ts,tsx}'],
        },
      },
      // Storybook interaction / visual tests (real Chromium)
      {
        extends: true,
        plugins: [
          // The plugin transforms stories into Vitest tests
          // See options at: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
