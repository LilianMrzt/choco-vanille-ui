import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from '@/components/forms/checkbox'
import { md } from '@stories/utils/markdown'

const meta = {
    title: 'Forms/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A styled checkbox control built on top of \`@base-ui/react/checkbox\`.
Supports both controlled (\`checked\` + \`onCheckedChange\`) and uncontrolled (\`defaultChecked\`) modes, and renders an optional accessible inline label.

**Usage**

\`\`\`tsx
// Uncontrolled
<Checkbox label="Accept terms and conditions" defaultChecked />

// Controlled
const [accepted, setAccepted] = useState(false)
<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onCheckedChange={(val) => setAccepted(val === true)}
/>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Conditional | \`string\` | When provided, auto-associates with the checkbox via a generated \`id\`. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted to maintain an accessible name. |
| \`disabled\` | No | \`boolean\` | Keeps the checkbox visible and announced; do not hide unavailable options. |
| \`required\` | No | \`boolean\` | Marks the field as required for native form validation. |
| \`checked\` | No | \`boolean\` | Controlled checked state; pair with \`onCheckedChange\`. |
| \`indeterminate\` | No | \`boolean\` | Whether the checkbox is in a mixed state. |
| \`defaultChecked\` | No | \`boolean\` | Uncontrolled initial checked state. |

- Keyboard: \`Space\` toggles the checkbox when focused.
- The checked state is exposed to assistive technology via Radix's built-in ARIA semantics.
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Accept terms and conditions',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Checkbox>

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
        return (
            <Checkbox
                {...args}
                checked={checked}
                onCheckedChange={setChecked}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const checkbox = canvas.getByRole('checkbox')
        await expect(checkbox).toBeInTheDocument()
        await expect(checkbox).not.toBeChecked()
        await userEvent.click(checkbox)
        await expect(checkbox).toBeChecked()
    },
}