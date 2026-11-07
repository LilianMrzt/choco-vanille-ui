import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import remarkGfm from 'remark-gfm';
import svgr from 'vite-plugin-svgr';

const root = fileURLToPath(new URL('..', import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },

  viteFinal: async (viteConfig) => {
    viteConfig.plugins = [
      ...(viteConfig.plugins ?? []),
      vanillaExtractPlugin(),
      svgr(),
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
        '@resources': resolve(root, 'src/resources'),
        '@stories': resolve(root, 'src/stories'),
        '@tests': resolve(root, 'tests'),
        '@scripts': resolve(root, 'scripts'),
      },
    };

    return viteConfig;
  },
};

export default config;
