import type { Preview } from '@storybook/react-vite';
import {
  createElement,
  Fragment,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import '../src/theme';
import { ToastProvider } from '../src/components/feedback/toast';

const StorybookToastPortal = ({ story }: { story: ReactNode }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return createElement(
    Fragment,
    null,
    story,
    portalRoot
      ? createPortal(createElement(ToastProvider), portalRoot)
      : null,
  );
};

const preview: Preview = {
  decorators: [
    (Story) =>
      createElement(
        StorybookToastPortal,
        { story: createElement(Story) },
      ),
  ],
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Overview', 'Guidelines', 'Docs', ['Theme', 'Tokens', 'CSS Variables'], 'Foundation', 'Layout', 'Actions', 'Forms', 'Overlay'],
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
