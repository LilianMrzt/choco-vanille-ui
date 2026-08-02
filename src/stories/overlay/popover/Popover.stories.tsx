import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Canvas,
  Controls,
  Description,
  Markdown,
  Stories,
  Title,
} from '@storybook/addon-docs/blocks';
import { expect, userEvent, within, waitFor } from 'storybook/test';

import { Popover } from '@/components/overlay/popover';
import { Button } from '@/components/actions/button';
import { md } from '@stories/utils/markdown';
import { storySource } from '@stories/utils/storySource';

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute            | Required | Type      | Notes                                                                                                             |
| --------------------------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| Trigger (focusable element) | ✅ Yes   | —         | Pass your own \`Button\` or \`IconButton\` as \`children\` of \`Popover.Trigger\`.                                        |
| \`open\`                      | No       | \`boolean\` | Controlled open state; pair with \`onOpenChange\`.                                                                  |
| \`defaultOpen\`               | No       | \`boolean\` | Uncontrolled initial open state.                                                                                  |
| \`modal\`                     | No       | \`boolean\` | @default \`true\`. When \`true\`, interaction outside the popover is blocked and the rest of the page is aria-hidden. |

- The popover renders with \`role="dialog"\` and traps focus when modal.
- Keyboard navigation: **Enter** / **Space** to open, **Escape** to close, **Tab** cycles inside the content.

**Sub-components**

| Sub-component     | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| \`Popover\`         | Root context provider — wraps the entire popover.                                                        |
| \`Popover.Trigger\` | The element that opens the popover on click. Pass your own button as \`children\`.                         |
| \`Popover.Content\` | The floating panel containing the popover content. Handles positioning, animations and focus management. |
`;

const PopoverDocsPage = () => (
  <>
    <Title />
    <Description />
    <Canvas />
    <Controls />
    <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
    <Stories includePrimary={false} />
  </>
);

const meta = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      page: PopoverDocsPage,
      description: {
        component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A composable popover overlay built on top of \`@base-ui/react/popover\`.
Use it to display rich content, forms, or actions attached to a trigger element.

**Usage**

~~~tsx
<Popover>
  <Popover.Trigger>
    <Button label="Open popover" />
  </Popover.Trigger>

  <Popover.Content>
    <p>Place any content here: text, forms, or buttons.</p>
  </Popover.Content>
</Popover>
~~~

        `,
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
  },
  args: {
    modal: true,
    defaultOpen: false,
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground — use the Controls panel to toggle controlled, default-open, and modal behaviour.',
      },
      ...storySource(/* language=tsx */ `
const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen} modal>
  <Popover.Trigger>
    <Button label="Open popover" />
  </Popover.Trigger>

  <Popover.Content style={{ width: '20rem' }}>
    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
      Popover title
    </h4>
    <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>
      You can put any content here: text, images, forms, or action buttons.
    </p>
  </Popover.Content>
</Popover>`),
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open ?? args.defaultOpen ?? false);
    return (
      <Popover {...args} open={open} onOpenChange={setOpen}>
        <Popover.Trigger>
          <Button label={'Open popover'} />
        </Popover.Trigger>

        <Popover.Content style={{ width: '20rem' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
            Popover title
          </h4>
          <p
            style={{
              margin: '0.5rem 0 0',
              fontSize: '0.875rem',
              color: 'var(--color-muted-foreground)',
            }}
          >
            You can put any content here: text, images, forms, or action
            buttons.
          </p>
        </Popover.Content>
      </Popover>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Open popover' });
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(document.querySelector('[role="dialog"]')).toBeTruthy(),
    );
  },
};
