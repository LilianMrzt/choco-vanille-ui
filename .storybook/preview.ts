import type { Preview } from '@storybook/react-vite';
import { addIcon } from '@iconify/react';

// Register the design tokens (`:root` CSS variables) and global base styles.
import '../src/theme';

// Pre-load all icons used in stories so Iconify renders them synchronously
// without making network requests (important for browser-based test runners).
addIcon('mdi:home', {
    body: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
    width: 24,
    height: 24,
});
addIcon('mdi:information', {
    body: '<path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/>',
    width: 24,
    height: 24,
});
addIcon('mdi:loading', {
    body: '<path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>',
    width: 24,
    height: 24,
});
addIcon('mdi:pencil', {
    body: '<path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"/>',
    width: 24,
    height: 24,
});

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Overview', 'Guidelines', 'Foundation', 'Layout', 'Actions', 'Forms', 'Overlay'],
      },
    },
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
    // Stories render on a plain white canvas regardless of the themed page
    // background, so components are previewed on a neutral surface.
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#ffffff' },
        dark: { name: 'Dark', value: '#141414' },
      },
    },
    // Run axe-core accessibility checks on every story and surface any
    // violation as an error in the Accessibility panel / test runner.
    //
    // The `color-contrast` rule is disabled globally because the design system
    // uses CSS custom properties (vanilla-extract) for all color tokens.
    // axe-core cannot resolve CSS variables in the CLI/JSDOM environment, so it
    // sees `transparent` instead of the actual computed color and raises false
    // positive contrast violations that pass fine in a real browser.
    // See: https://storybook.js.org/docs/writing-tests/accessibility-testing#why-are-my-tests-failing-in-different-environments
    a11y: {
      test: 'error',
      config: {
        rules: [
          {
            // Cannot be reliably evaluated when colors are CSS custom properties.
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
