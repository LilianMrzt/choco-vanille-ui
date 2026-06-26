import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from '@/components/forms/checkbox'
import { Flex } from '@/components/layout/flex'

const meta = {
    title: 'Forms/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A styled checkbox control built on top of [\`@radix-ui/react-checkbox\`](https://www.radix-ui.com/docs/primitives/components/checkbox).
Supports both **controlled** (\`checked\` + \`onCheckedChange\`) and **uncontrolled** (\`defaultChecked\`) modes, and renders an optional accessible inline label.

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
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted (e.g. a "select row" checkbox) to maintain an accessible name. |
| \`disabled\` | No | \`boolean\` | Keeps the checkbox visible and announced; do not hide unavailable options. |
| \`required\` | No | \`boolean\` | Marks the field as required for native form validation. |
| \`name\` / \`value\` | No | \`string\` | For native form submission integration. |
| \`checked\` | No | \`boolean \| 'indeterminate'\` | Controlled checked state; pair with \`onCheckedChange\`. |
| \`defaultChecked\` | No | \`boolean\` | Uncontrolled initial checked state. |
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Accept terms and conditions',
    },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default story renders an unchecked checkbox with an associated label. Use the Controls panel to toggle `checked`, `disabled`, and edit the label text.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('checkbox')).toBeInTheDocument()
    },
}

// Without label

export const WithoutLabel: Story = {
    args: { label: undefined },
    parameters: {
        docs: {
            description: {
                story: 'When no visible label is needed (e.g. a "select row" checkbox inside a table), omit the `label` prop and pass an `aria-label` or `aria-labelledby` directly to maintain accessibility.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('checkbox')).toBeInTheDocument()
    },
}

// Checked

export const Checked: Story = {
    args: { checked: true },
    parameters: {
        docs: {
            description: {
                story: 'Pre-checked state useful for static previews. In a live application use the `defaultChecked` prop for uncontrolled mode, or `checked` + `onCheckedChange` for controlled mode.',
            },
        },
    },
}

// Disabled unchecked

export const Disabled: Story = {
    args: { disabled: true },
    parameters: {
        docs: {
            description: {
                story: 'A disabled, unchecked checkbox. The option is visible and announced by screen readers, communicating that it exists but cannot be interacted with. Avoid completely hiding unavailable options.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('checkbox')).toBeDisabled()
    },
}

// Disabled checked

export const DisabledChecked: Story = {
    args: { disabled: true, checked: true },
    parameters: {
        docs: {
            description: {
                story: 'A read-only pre-selected option. Useful for displaying a fixed or system-enforced setting that the user cannot change.',
            },
        },
    },
}

// All states

export const AllStates: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'All four visual states at a glance: unchecked, checked, disabled, and disabled + checked.',
            },
        },
    },
    render: () => (
        <Flex direction={'column'} align={'stretch'} gap={'lg'} p={'lg'}>
            <Checkbox label={'Unchecked'} />
            <Checkbox
                label={'Checked'}
                defaultChecked
            />
            <Checkbox
                label={'Disabled'}
                disabled
            />
            <Checkbox
                label={'Disabled + checked'}
                disabled
                defaultChecked
            />
        </Flex>
    ),
}

// Controlled

export const Controlled: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Fully controlled example: the parent component owns the state via `checked` + `onCheckedChange`. The interaction test below automatically clicks the checkbox and asserts the state transitions.',
            },
        },
    },
    render: () => {
        const [checked, setChecked] = useState(false)
        return (
            <Flex direction={'column'} align={'start'} gap={'md'}>
                <Checkbox
                    label={checked ? 'Checked ✓' : 'Unchecked'}
                    checked={checked}
                    onCheckedChange={(val) => setChecked(val === true)}
                />
                <span style={{ fontSize: '0.75rem', color: '#666' }}>
                    State: {String(checked)}
                </span>
            </Flex>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const checkbox = canvas.getByRole('checkbox')
        await expect(checkbox).not.toBeChecked()
        await userEvent.click(checkbox)
        await expect(checkbox).toBeChecked()
        await userEvent.click(checkbox)
        await expect(checkbox).not.toBeChecked()
    },
}
