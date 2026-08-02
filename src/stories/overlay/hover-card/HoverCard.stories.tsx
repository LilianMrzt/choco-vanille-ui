import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Canvas,
  Controls,
  Description,
  Markdown,
  Stories,
  Title,
} from '@storybook/addon-docs/blocks';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { screen } from '@testing-library/dom';

import { HoverCard } from '@/components/overlay/hover-card';
import { Button } from '@/components/actions/button';
import { md } from '@stories/utils/markdown';
import { storySource } from '@stories/utils/storySource';

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute            | Required | Type      | Notes                                                                      |
| --------------------------- | -------- | --------- | -------------------------------------------------------------------------- |
| Trigger (focusable element) | ✅ Yes   | —         | Pass your own \`Button\` or \`IconButton\` as children of \`HoverCard.Trigger\`. |
| \`open\`                      | No       | \`boolean\` | Controlled open state; pair with \`onOpenChange\`.                           |
| \`defaultOpen\`               | No       | \`boolean\` | Uncontrolled initial open state.                                           |
| \`openDelay\`                 | No       | \`number\`  | Delay in ms before opening. @default \`700\`.                                |
| \`closeDelay\`                | No       | \`number\`  | Delay in ms before closing. @default \`300\`.                                |

**Sub-components**

| Sub-component       | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| \`HoverCard\`         | Root context provider — wraps the entire hover card.                                             |
| \`HoverCard.Trigger\` | The element that opens the hover card on hover. Pass your own button as children.                |
| \`HoverCard.Content\` | The floating panel containing the hover card content. Handles positioning and viewport shifting. |
`;

const HoverCardDocsPage = () => (
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
  title: 'Overlay/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    docs: {
      page: HoverCardDocsPage,
      description: {
        component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A hover-activated overlay built on top of \`@base-ui/react/preview-card\`.
Use it to display rich content when the user hovers over a trigger element.
It reuses the popover visual styles for consistency.

**Usage**

~~~tsx
<HoverCard>
  <HoverCard.Trigger>
    <Button label="Open hover card" />
  </HoverCard.Trigger>

  <HoverCard.Content>
    <p>Place any content here: text, images, or actions.</p>
  </HoverCard.Content>
</HoverCard>
~~~

        `,
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
  args: {
    defaultOpen: false,
  },
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground — hover the button to reveal the panel.',
      },
      ...storySource(/* language=tsx */ `
<HoverCard>
  <HoverCard.Trigger>
    <Button label="Hover me" />
  </HoverCard.Trigger>

  <HoverCard.Content style={{ width: '20rem' }}>
    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
      Hover card title
    </h4>
    <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>
      This panel stays open while your cursor is over the trigger or this content.
    </p>
  </HoverCard.Content>
</HoverCard>`),
    },
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCard.Trigger>
        <Button label={'Hover me'} />
      </HoverCard.Trigger>

      <HoverCard.Content style={{ width: '20rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
          Hover card title
        </h4>
        <p
          style={{
            margin: '0.5rem 0 0',
            fontSize: '0.875rem',
            color: 'var(--color-muted-foreground)',
          }}
        >
          This panel stays open while your cursor is over the trigger or this
          content.
        </p>
      </HoverCard.Content>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Hover me' });
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    await waitFor(() =>
      expect(screen.getByText('Hover card title')).toBeInTheDocument(),
    );
  },
};
