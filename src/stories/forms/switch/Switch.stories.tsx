import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Switch, type SwitchSize } from '@components/forms/switch'
import { md } from '@stories/utils/markdown'

const SIZES: SwitchSize[] = ['sm', 'md', 'lg']

const meta = {
    title: 'Forms/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
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

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                                    |
| -------------------------------- | ----------- | --------- | ------------------------------------------------------------------------ |
| \`label\`                          | Conditional | \`string\`  | When provided, auto-associates with the switch via a generated \`id\`.     |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\`  | Required when \`label\` is omitted to maintain an accessible name.         |
| \`disabled\`                       | No          | \`boolean\` | Keeps the switch visible and announced; do not hide unavailable options. |
| \`required\`                       | No          | \`boolean\` | Marks the field as required for native form validation.                  |
| \`checked\`                        | No          | \`boolean\` | Controlled checked state; pair with \`onCheckedChange\`.                   |
| \`defaultChecked\`                 | No          | \`boolean\` | Uncontrolled initial checked state.                                      |

- Keyboard: \`Space\` toggles the switch when focused.
- The checked state is exposed to assistive technology via Radix's built-in ARIA semantics (\`role="switch"\`, \`aria-checked\`).
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
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
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
