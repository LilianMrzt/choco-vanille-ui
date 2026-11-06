import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, userEvent, within } from 'storybook/test'

import { Switch, type SwitchSize } from '@components/forms/switch'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const SIZES: SwitchSize[] = ['sm', 'md', 'lg']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Conditional | \`string\` | Provides the accessible name when no ARIA name is supplied. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables the switch. |
| \`required\` | No | \`boolean\` | Marks the switch as required for form validation. |
| \`checked\` | No | \`boolean\` | Controlled checked state; pair with \`onCheckedChange\`. |
| \`defaultChecked\` | No | \`boolean\` | Uncontrolled initial checked state. |

- Keyboard: \`Space\` toggles the switch when focused.
`

const SwitchDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Forms/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
        docs: {

            page: SwitchDocsPage,            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled switch control built on top of \`@base-ui/react/switch\`.
Supports both controlled (\`checked\` + \`onCheckedChange\`) and uncontrolled (\`defaultChecked\`) modes, and renders an optional accessible inline label.

**Usage**

~~~tsx
// Uncontrolled
<Switch label="Airplane mode" defaultChecked />

// Controlled
const [enabled, setEnabled] = useState(false)
<Switch
  label="Airplane mode"
  checked={enabled}
  onCheckedChange={setEnabled}
/>
~~~

        `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        size: { control: 'select', options: SIZES },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Airplane mode',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: { ...storySource(`<Switch />`),
            description: {
                story:
          'Interactive playground â€” use the Controls panel to experiment with every available prop.',
            },
        },
    },
    render: (args) => {
        const [checked, setChecked] = useState(args.checked ?? false)

        useEffect(() => {
            setChecked(args.checked ?? false)
        }, [args.checked])

        return (
            <Switch
                {...args}
                checked={checked}
                onCheckedChange={setChecked}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const switchControl = canvas.getByRole('switch')
        await expect(switchControl).toBeInTheDocument()
        await expect(switchControl).not.toBeChecked()
        await userEvent.click(switchControl)
        await expect(switchControl).toBeChecked()
    },
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<Switch label="Small" size="sm" />
<Switch label="Medium" size="md" />
<Switch label="Large" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Switch
                label={'Small'}
                size={'sm'}
            />
            <Switch
                label={'Medium'}
                size={'md'}
            />
            <Switch
                label={'Large'}
                size={'lg'}
            />
        </div>
    ),
}

export const States: Story = {
    parameters: { docs: { ...storySource(`<Switch label="Disabled" disabled />`) } },
    render: () => (
        <Switch
            label={'Disabled'}
            disabled
        />
    ),
}
