import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { TextField } from '@components/forms/text-field'
import type { TextFieldInputRecipeVariants } from '@components/forms/text-field/TextField.css.ts'
import { md } from '@stories/utils/markdown'

const SIZES: NonNullable<TextFieldInputRecipeVariants['size']>[] = [
    'sm',
    'md',
    'lg',
]
const TYPES = ['text', 'email', 'password', 'number', 'search', 'url'] as const

const meta = {
    title: 'Forms/TextField',
    component: TextField,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A styled text input built with a native \`<input>\` and \`@radix-ui/react-label\` for accessible label binding.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional label, start icon, end action, helper text, inline error, password toggle and custom width.

**Usage**

\`\`\`tsx
// With start icon
<TextField label="Email" startIcon="mdi:email" placeholder="you@example.com" />

// Password field — toggle auto-injected
<TextField label="Password" type="password" />

// Custom end action
<TextField
  label="Search"
  endAction={
    <IconButton icon="mdi:magnify" aria-label="Search" variant="ghost" color="primary" />
  }
/>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Recommended | \`string\` | Visible label linked to the input via \`htmlFor\`. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`error\` | No | \`string\` | Sets \`aria-invalid="true"\` and replaces helper text in \`aria-describedby\`. |
| \`helperText\` | No | \`string\` | Described by the input when no error is present. |
| \`disabled\` | No | \`boolean\` | Native disabled state, announced by screen readers. |
| \`required\` | No | \`boolean\` | Native required state for form validation. |

- The underlying element is a native \`<input>\`, so it is fully keyboard operable.
- Do not rely on placeholder text alone as a label.
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        startIcon: { control: 'text' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        width: { control: 'text' },
        size: { control: 'select', options: SIZES },
        type: { control: 'select', options: TYPES },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Email address',
        placeholder: 'you@example.com',
        size: 'md',
        type: 'text',
    },
} satisfies Meta<typeof TextField>

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
        const [value, setValue] = useState('')
        return (
            <TextField
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const label = args.label as string | undefined
        if (label) {
            await expect(canvas.getByLabelText(label)).toBeInTheDocument()
        } else {
            await expect(canvas.getByRole('textbox')).toBeInTheDocument()
        }
    },
}