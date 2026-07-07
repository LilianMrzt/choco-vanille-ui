import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Collapsible } from '@components/surfaces/collapsible'
import { IconRegistry } from '@constants/icons'
import { md } from '@stories/utils/markdown'

type CollapsiblePlaygroundArgs = ComponentProps<typeof Collapsible> & {
    triggerLabel?: string
    triggerWidth?: string
    triggerStartIcon?: string
    triggerEndIcon?: string
    panelPadding?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
}

const meta: Meta<CollapsiblePlaygroundArgs> = {
    title: 'Surfaces/Collapsible',
    component: Collapsible,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
A styled standalone collapsible panel built on top of \`@base-ui/react/collapsible\`.
Use it to show or hide a single block of content with a toggle trigger.
Compose \`Collapsible\`, \`Collapsible.Trigger\`, and \`Collapsible.Panel\`.

**Usage**

~~~tsx
<Collapsible defaultOpen>
    <Collapsible.Trigger label="Toggle content" />
    <Collapsible.Panel>Hidden content</Collapsible.Panel>
</Collapsible>
~~~

**Accessibility**

| Prop / Attribute   | Required    | Type        | Notes                                                      |
| ------------------ | ----------- | ----------- | ---------------------------------------------------------- |
| \`open\`             | Conditional | \`boolean\`  | Controlled open state; pair with \`onOpenChange\`.          |
| \`defaultOpen\`      | Conditional | \`boolean\`  | Uncontrolled initial open state.                           |
| \`disabled\`         | No          | \`boolean\`  | Prevents the panel from being toggled.                     |
| \`width\`            | No          | \`string\`   | Overrides the default full-width trigger.                  |
| \`padding\`          | No          | \`Space\`    | Bottom padding of the panel.                               |
| \`startIcon\` / \`endIcon\` | No   | \`string\`   | Iconify icon name rendered before/after the trigger label. |

- Keyboard: \`Enter\` or \`Space\` toggles the panel.
- Open state is exposed to assistive technology via Base UI's built-in ARIA semantics.

**Sub-components**

| Sub-component       | Description                                            |
| ------------------- | ------------------------------------------------------ |
| \`Collapsible\`       | Root context provider that manages the panel state.    |
| \`Collapsible.Trigger\`| Button that expands or collapses the associated panel. |
| \`Collapsible.Panel\`  | Panel shown when the collapsible is open.              |
                `,
            },
        },
    },
    argTypes: {
        open: { control: 'boolean' },
        defaultOpen: { control: 'boolean' },
        disabled: { control: 'boolean' },
        triggerLabel: {
            control: 'text',
            table: { category: 'Collapsible.Trigger' },
        },
        triggerStartIcon: {
            control: 'text',
            table: { category: 'Collapsible.Trigger' },
        },
        triggerEndIcon: {
            control: 'text',
            table: { category: 'Collapsible.Trigger' },
        },
        panelPadding: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg'],
            table: { category: 'Collapsible.Panel' },
        },
    },
    args: {
        defaultOpen: false,
        disabled: false,
        triggerLabel: 'Toggle content',
        triggerStartIcon: IconRegistry.info,
        triggerEndIcon: '',
        panelPadding: 'md',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use the Controls panel to experiment with open state, trigger width and icons, and panel padding.',
            },
        },
    },
    render: ({
        triggerLabel,
        triggerStartIcon,
        triggerEndIcon,
        panelPadding,
        ...args
    }) => {
        const [open, setOpen] = useState(args.defaultOpen as boolean)

        return (
            <Collapsible
                {...args}
                open={open}
                onOpenChange={setOpen}
            >
                <Collapsible.Trigger
                    label={triggerLabel}
                    startIcon={triggerStartIcon || undefined}
                    endIcon={triggerEndIcon || undefined}
                />
                <Collapsible.Panel padding={panelPadding}>
                    This content can be shown or hidden by clicking the trigger above.
                </Collapsible.Panel>
            </Collapsible>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: 'Toggle content' })

        await expect(trigger).toBeInTheDocument()
        await expect(trigger).not.toHaveAttribute('data-panel-open')

        await userEvent.click(trigger)
        await expect(trigger).toHaveAttribute('data-panel-open')
        await expect(
            canvas.getByText('This content can be shown or hidden by clicking the trigger above.'),
        ).toBeInTheDocument()

        await userEvent.click(trigger)
        await expect(trigger).not.toHaveAttribute('data-panel-open')
    },
}
