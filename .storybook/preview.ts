import type { Preview } from '@storybook/react-vite';
import '../src/theme';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Overview', ['Introduction', 'Customization'], 'Guidelines', 'Docs', ['Theme', 'Tokens', 'CSS Variables'], 'Foundation', 'Layout', 'Actions', 'Forms', 'Overlay'],
      },
    },
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#ffffff' },
        dark: { name: 'Dark', value: '#141414' },
      },
    },
    a11y: {
      test: 'error',
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
};

export default preview;
