import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, userEvent, within, waitFor } from 'storybook/test'

import { Popover, type PopoverContentProps } from '@/components/overlay/popover'
import { Button } from '@/components/actions/button'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type PopoverPlaygroundArgs = ComponentProps<typeof Popover> & {
  triggerLabel?: string;
  contentWidth?: string;
  contentPadding?: PopoverContentProps['padding'];
  itemLabel?: string;
  itemDisabled?: boolean;
  itemDestructive?: boolean;
};

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute            | Required | Type      | Notes                                                                                                             |
| --------------------------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| Trigger (focusable element) | ✅ Yes   | —         | Pass your own \`Button\` or \`IconButton\` as \`children\` of \`Popover.Trigger\`.                                        |
| \`open\`                      | No       | \`boolean\` | Controlled open state; pair with \`onOpenChange\`.                                                                  |
| \`defaultOpen\`               | No       | \`boolean\` | Uncontrolled initial open state.                                                                                  |
| \`modal\`                     | No       | \`boolean\` | @default \`true\`. When \`true\`, interaction outside the popover is blocked and the rest of the page is aria-hidden. |
| \`closeOnClick\` on \`Popover.Item\` | No       | \`boolean\` | @default \`true\`. Closes the surrounding popover after activation. |

- The popover renders with \`role="dialog"\` and traps focus when modal.
- Keyboard navigation: **Enter** / **Space** to open, **Escape** to close, **Tab** cycles inside the content.

**Sub-components**

| Sub-component     | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| \`Popover\`         | Root context provider — wraps the entire popover.                                                        |
| \`Popover.Trigger\` | The element that opens the popover on click. Pass your own button as \`children\`.                         |
| \`Popover.Content\` | The floating panel containing the popover content. Handles positioning, animations and focus management. |
| \`Popover.Item\`    | An actionable item with optional icons, shortcut hint, and destructive styling.                         |
`

const PopoverDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<PopoverPlaygroundArgs> = {
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
Use it to display rich content, forms, or action items attached to a trigger element.

**Usage**

~~~tsx
<Popover>
  <Popover.Trigger>
    <Button label="Open popover" />
  </Popover.Trigger>

  <Popover.Content>
    <Popover.Item label="Edit" startIcon={SearchIcon} shortcut="⌘E" />
    <Popover.Item label="Delete" startIcon={TrashIcon} destructive />
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
        triggerLabel: {
            control: 'text',
            table: { category: 'Compound: Trigger' },
        },
        contentWidth: {
            control: 'text',
            table: { category: 'Compound: Content' },
        },
        contentPadding: {
            control: 'select',
            options: [
                'none',
                'px',
                'xxs',
                'xs',
                'xs2',
                'sm',
                'sm2',
                'md',
                'md2',
                'lg',
                'lg2',
                'xl',
                '2xl',
                '3xl',
                '4xl',
                '5xl',
            ],
            table: { category: 'Compound: Content' },
        },
        itemLabel: {
            control: 'text',
            table: { category: 'Compound: Item' },
        },
        itemDisabled: {
            control: 'boolean',
            table: { category: 'Compound: Item' },
        },
        itemDestructive: {
            control: 'boolean',
            table: { category: 'Compound: Item' },
        },
    },
    args: {
        modal: true,
        defaultOpen: false,
        triggerLabel: 'Open popover',
        contentWidth: '20rem',
        contentPadding: 'md',
        itemLabel: 'Edit',
        itemDisabled: false,
        itemDestructive: false,
    },
}

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to toggle open behaviour and configure the trigger, content width, and item state.',
            },
            ...storySource(/* language=tsx */ `
const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen} modal>
  <Popover.Trigger>
    <Button label="Open popover" />
  </Popover.Trigger>

  <Popover.Content width={'20rem'} padding={'md'}>
    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
      Popover title
    </h4>
    <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--color-surfaceMuted-foreground)' }}>
      You can put any content here: text, images, forms, or action buttons.
    </p>
    <Popover.Item label="Edit" startIcon={SearchIcon} shortcut="⌘E" />
    <Popover.Item label="Delete" startIcon={TrashIcon} destructive />
  </Popover.Content>
</Popover>`),
        },
    },
    render: ({
        triggerLabel,
        contentWidth,
        contentPadding,
        itemLabel,
        itemDisabled,
        itemDestructive,
        ...args
    }) => {
        const [open, setOpen] = useState(args.open ?? args.defaultOpen ?? false)
        return (
            <Popover
                {...args}
                open={open}
                onOpenChange={setOpen}
            >
                <Popover.Trigger>
                    <Button label={triggerLabel ?? 'Open popover'} />
                </Popover.Trigger>

                <Popover.Content
                    width={contentWidth || '20rem'}
                    padding={contentPadding}
                >
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                        Popover title
                    </h4>
                    <p
                        style={{
                            margin: '0.5rem 0 0',
                            fontSize: '0.875rem',
                            color: 'var(--color-surfaceMuted-foreground)',
                        }}
                    >
                        You can put any content here: text, images, forms, or action
                        buttons.
                    </p>
                    <Popover.Item
                        label={itemLabel ?? 'Edit'}
                        startIcon={SearchIcon}
                        shortcut={'⌘E'}
                        disabled={itemDisabled}
                        destructive={itemDestructive}
                    />
                    <Popover.Item
                        label={'Delete'}
                        startIcon={TrashIcon}
                        destructive
                    />
                </Popover.Content>
            </Popover>
        )
    },
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
