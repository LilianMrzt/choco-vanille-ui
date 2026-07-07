import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'node:path';
import remarkGfm from 'remark-gfm';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        // Enable GitHub Flavored Markdown so MDX tables, strikethrough, etc. render.
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
    options: {},
  },
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), vanillaExtractPlugin()];

    // Force Vite to bundle the ESM build of reselect. @base-ui/utils imports
    // reselect from CommonJS-flavored .mjs files, and without this alias the
    // production build can drop the import, causing `createSelectorCreator is
    // not defined` at runtime.
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(typeof viteConfig.resolve.alias === 'object' ? viteConfig.resolve.alias : {}),
      reselect: resolve('node_modules/reselect/dist/reselect.mjs'),
    };
    viteConfig.optimizeDeps = viteConfig.optimizeDeps ?? {};
    viteConfig.optimizeDeps.include = [...(viteConfig.optimizeDeps.include ?? []), 'reselect'];

    return viteConfig;
  },
};

export default config;
