import type { Preview } from '@storybook/react-vite';

// Register the design tokens (`:root` CSS variables) and global base styles.
import '../src/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    // Run axe-core accessibility checks on every story and surface any
    // violation as an error in the Accessibility panel / test runner.
    a11y: {
      test: 'error',
    },
  },
};

export default preview;
