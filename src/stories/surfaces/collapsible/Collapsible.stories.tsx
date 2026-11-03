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
import { expect, userEvent, within } from 'storybook/test'

import { Collapsible } from '@components/surfaces/collapsible'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import type { IconComponent } from '@components/foundation/icon'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type CollapsiblePlaygroundArgs = ComponentProps<typeof Collapsible> & {
  triggerLabel?: string;
  triggerWidth?: string;
  triggerStartIcon?: IconComponent;
  triggerEndIcon?: IconComponent;
  panelPadding?: ComponentProps<typeof Collapsible.Panel>['padding'];
};

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required    | Type      | Notes                                  |
| ---------------- | ----------- | --------- | -------------------------------------- |
| \`defaultOpen\`    | Conditional | \`boolean\` | Uncontrolled initial open state.       |
| \`disabled\`       | No          | \`boolean\` | Prevents the panel from being toggled. |
| \`padding\`        | No          | \`Space\`   | Bottom padding of the panel.           |

**Sub-components**

| Sub-component | Description |
| ------------- | ----------- |
| \`Collapsible\` | Root context provider. |
| \`Collapsible.Trigger\` | Expands or collapses the panel. |
| \`Collapsible.Panel\` | Panel shown when open. |
`

const CollapsibleDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<CollapsiblePlaygroundArgs> = {
    title: 'Surfaces/Collapsible',
    component: Collapsible,
    parameters: {
        layout: 'centered',
        docs: {
            page: CollapsibleDocsPage,
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
            options: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128],
            table: { category: 'Collapsible.Panel' },
        },
    },
    args: {
        defaultOpen: false,
        disabled: false,
        triggerLabel: 'Toggle content',
        triggerStartIcon: InfoIcon,
        triggerEndIcon: undefined,
        panelPadding: 12,
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

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with open state, trigger width and icons, and panel padding.',
            },
            ...storySource(/* language=tsx */ `
<Collapsible defaultOpen>
    <Collapsible.Trigger label="Toggle content" />
    <Collapsible.Panel>Hidden content</Collapsible.Panel>
</Collapsible>`),
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
            canvas.getByText(
                'This content can be shown or hidden by clicking the trigger above.',
            ),
        ).toBeInTheDocument()

        await userEvent.click(trigger)
        await expect(trigger).not.toHaveAttribute('data-panel-open')
    },
}

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Open, closed, and disabled collapsible panel states.',
            },
            ...storySource(/* language=tsx */ `
<Collapsible defaultOpen>
    <Collapsible.Trigger label="Open" />
    <Collapsible.Panel>Visible content.</Collapsible.Panel>
</Collapsible>
<Collapsible>
    <Collapsible.Trigger label="Closed" />
    <Collapsible.Panel>Hidden content.</Collapsible.Panel>
</Collapsible>
<Collapsible disabled>
    <Collapsible.Trigger label="Disabled" />
    <Collapsible.Panel>Unavailable content.</Collapsible.Panel>
</Collapsible>`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.75rem', width: '400px' }}>
            <Collapsible defaultOpen>
                <Collapsible.Trigger label={'Open'} />
                <Collapsible.Panel>Visible content.</Collapsible.Panel>
            </Collapsible>
            <Collapsible>
                <Collapsible.Trigger label={'Closed'} />
                <Collapsible.Panel>Hidden content.</Collapsible.Panel>
            </Collapsible>
            <Collapsible disabled>
                <Collapsible.Trigger label={'Disabled'} />
                <Collapsible.Panel>Unavailable content.</Collapsible.Panel>
            </Collapsible>
        </div>
    ),
}
