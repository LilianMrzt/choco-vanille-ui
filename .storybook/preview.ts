import type { Preview } from '@storybook/react-vite';
import { addIcon } from '@iconify/react';

// Register the design tokens (`:root` CSS variables) and global base styles.
import '../src/theme';

// Pre-load all icons used in stories so Iconify renders them synchronously
// without making network requests (important for browser-based test runners).
addIcon('lucide:home', {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></g>',
    width: 24,
    height: 24,
});
addIcon('lucide:info', {
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></g>',
    width: 24,
    height: 24,
});
addIcon('mdi:alert-outline', {
    body: '<path d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2"/>',
    width: 24,
    height: 24,
});
addIcon('mdi:circle', {
    body: '<circle cx="12" cy="12" r="10"/>',
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
