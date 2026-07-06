import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { TextArea } from '@components/forms/text-area'
import type { TextAreaRecipeVariants } from '@components/forms/text-area/TextArea.css.ts'
import { md } from '@stories/utils/markdown'

const SIZES: NonNullable<TextAreaRecipeVariants['size']>[] = ['sm', 'md', 'lg']

const meta = {
    title: 'Forms/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled textarea built with a native \`<textarea>\` and \`<label>\` for accessible label binding.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional label, start icon, end action, helper text, inline error, custom width and native \`rows\`.

**Usage**

~~~tsx
// Basic
<TextArea label="Description" placeholder="Tell us more…" rows={4} />

// With start icon
<TextArea label="Comment" startIcon="lucide:message-square" />

// Custom end action
<TextArea
    label="Bio"
    endAction={
        <IconButton icon="lucide:x" aria-label="Clear" variant="ghost" color="primary" />
    }
/>
~~~

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                                      |
| -------------------------------- | ----------- | --------- | -------------------------------------------------------------------------- |
| \`label\`                          | Recommended | \`string\`  | Visible label linked to the textarea via \`htmlFor\`.                        |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\`  | Required when \`label\` is omitted.                                          |
| \`error\`                          | No          | \`string\`  | Sets \`aria-invalid="true"\` and replaces helper text in \`aria-describedby\`. |
| \`helperText\`                     | No          | \`string\`  | Described by the textarea when no error is present.                        |
| \`disabled\`                       | No          | \`boolean\` | Native disabled state, announced by screen readers.                        |
| \`required\`                       | No          | \`boolean\` | Native required state for form validation.                                 |

- The underlying element is a native \`<textarea>\`, so it is fully keyboard operable.
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
        rows: { control: 'number' },
        minRows: { control: 'number' },
        maxRows: { control: 'number' },
        size: { control: 'select', options: SIZES },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Description',
        placeholder: 'Tell us more…',
        size: 'md',
        rows: 4,
        minRows: 2,
        maxRows: 6,
        width: '300px',
    },
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>

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
            <TextArea
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