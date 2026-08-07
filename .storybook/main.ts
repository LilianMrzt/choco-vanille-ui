import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const root = fileURLToPath(new URL('..', import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async (viteConfig) => {
    viteConfig.plugins = [
      ...(viteConfig.plugins ?? []),
      vanillaExtractPlugin(),
    ];

    viteConfig.server = {
      ...viteConfig.server,
      warmup: {
        clientFiles: [
          resolve(root, 'src/stories/overview/introduction/Introduction.mdx'),
        ],
      },
    };

    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: {
        ...(viteConfig.resolve?.alias ?? {}),
        '@': resolve(root, 'src'),
        '@components': resolve(root, 'src/components'),
        '@theme': resolve(root, 'src/theme'),
        '@constants': resolve(root, 'src/constants'),
        '@utils': resolve(root, 'src/utils'),
        '@hooks': resolve(root, 'src/hooks'),
        '@stories': resolve(root, 'src/stories'),
        '@tests': resolve(root, 'tests'),
      },
    };

    return viteConfig;
  },
};

export default config;
