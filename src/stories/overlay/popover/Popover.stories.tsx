import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, waitFor } from 'storybook/test'

import { Popover } from '@/components/overlay/popover'
import { Button } from '@/components/actions/button'
import type { PopoverPosition } from '@components/overlay/popover'
import { Flex } from '@/components/layout/flex'

const POSITIONS: PopoverPosition[] = [
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'left-start',
    'left',
    'left-end',
]

const meta = {
    title: 'Overlay/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A composable popover overlay built on top of [\`@radix-ui/react-popover\`](https://www.radix-ui.com/docs/primitives/components/popover).
Use it to display rich content, forms, or actions attached to a trigger element.

**Composition**
\`\`\`tsx
<Popover>
  <Popover.Trigger asChild>
    <Button label="Open popover" />
  </Popover.Trigger>

  <Popover.Content>
    <p>Place any content here: text, forms, or buttons.</p>
  </Popover.Content>
</Popover>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| Trigger (focusable element) | ✅ Yes | — | Use \`asChild\` on \`Popover.Trigger\` to forward the ref to your own \`Button\` or \`IconButton\`. |
| \`open\` | No | \`boolean\` | Controlled open state; pair with \`onOpenChange\`. |
| \`modal\` | No | \`boolean\` | @default \`true\`. When \`true\`, interaction outside the popover is blocked and the rest of the page is aria-hidden. |
| \`position\` | No | \`PopoverPosition\` | Shorthand combining \`side\` + \`align\`. Takes precedence when set. |

- The popover renders with \`role="dialog"\` and traps focus when modal.
- Keyboard navigation: **Enter** / **Space** to open, **Escape** to close, **Tab** cycles inside the content.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Popover\` | Root context provider — wraps the entire popover. |
| \`Popover.Trigger\` | The element that opens the popover on click. Use \`asChild\` to delegate to your own button. |
| \`Popover.Content\` | The floating panel containing the popover content. Handles positioning, animations and focus management. |
| \`Popover.Anchor\` | Optional element used to position the content. Defaults to the trigger. |
                `,
            },
        },
    },
    argTypes: {
        open: { control: 'boolean' },
        defaultOpen: { control: 'boolean' },
        modal: { control: 'boolean' },
    },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>;

// Default

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Default popover appearing below its trigger. Click the button to open the panel and view the content.',
            },
        },
    },
    render: () => (
        <Popover>
            <Popover.Trigger asChild>
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
                    You can put any content here: text, images, forms, or action buttons.
                </p>
            </Popover.Content>
        </Popover>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: 'Open popover' })
        await expect(trigger).toBeInTheDocument()
        await userEvent.click(trigger)
        await waitFor(() =>
            expect(document.querySelector('[role="dialog"]')).toBeTruthy(),
        )
    },
}

// All positions

export const AllPositions: Story = {
    parameters: {
        controls: { disable: true },
        layout: 'padded',
        docs: {
            description: {
                story:
          'All 12 available positions (`top-start`, `top`, `top-end`, `right-start`, `right`, `right-end`, `bottom-start`, `bottom`, `bottom-end`, `left-start`, `left`, `left-end`). Use the `position` prop as a shorthand for combining `side` and `align`.',
            },
        },
    },
    render: () => (
        <Flex
            wrap={'wrap'}
            align={'center'}
            justify={'center'}
            gap={'xl'}
            p={'4xl'}
        >
            {POSITIONS.map((position) => (
                <Popover key={position}>
                    <Popover.Trigger asChild>
                        <Button
                            variant={'outlined'}
                            label={position}
                        />
                    </Popover.Trigger>

                    <Popover.Content
                        position={position}
                        style={{ width: '12rem' }}
                    >
                        <p style={{ margin: 0, fontSize: '0.875rem' }}>
                            Position: <strong>{position}</strong>
                        </p>
                    </Popover.Content>
                </Popover>
            ))}
        </Flex>
    ),
}

// Controlled open

export const AlwaysOpen: Story = {
    args: { open: true },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story:
          'Controlled open state via the `open` prop. Pass `onOpenChange` alongside `open` to implement custom show/hide logic.',
            },
        },
    },
    render: () => (
        <Popover open>
            <Popover.Trigger asChild>
                <Button label={'Controlled trigger'} />
            </Popover.Trigger>

            <Popover.Content style={{ width: '18rem' }}>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    This popover is controlled and stays open for the story.
                </p>
            </Popover.Content>
        </Popover>
    ),
}

// Non-modal

export const NonModal: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'A non-modal popover allows interacting with the rest of the page while the popover is open.',
            },
        },
    },
    render: () => (
        <Popover modal={false}>
            <Popover.Trigger asChild>
                <Button label={'Open non-modal'} />
            </Popover.Trigger>

            <Popover.Content style={{ width: '18rem' }}>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    Focus is not trapped here — you can tab back to the page.
                </p>
            </Popover.Content>
        </Popover>
    ),
}
