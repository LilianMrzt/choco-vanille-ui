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
  // Pre-bundle these deps so Vite does not re-optimise them mid-test, which
  // would cause a server reload and make browser (Storybook) tests fail in CLI.
  optimizeDeps: {
    include: [
      '@vanilla-extract/recipes',
      '@vanilla-extract/recipes/createRuntimeFn',
      '@storybook/addon-docs > react-dom/client',
      '@storybook/react-dom-shim',
    ],
  },
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
          // Pre-create the Storybook coverage cache directory before the
          // addon-vitest preset hook runs. Without this, the hook calls
          // mkdir() without { recursive: true } and crashes with ENOENT when
          // the parent path does not yet exist (e.g. on a clean checkout or
          // after clearing node_modules/.cache).
          // See: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon#what-happens-if-vitest-itself-has-an-error
          globalSetup: ['./tests/globalSetup.storybook.ts'],
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
