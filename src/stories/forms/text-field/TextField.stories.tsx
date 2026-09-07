import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { TextField, type TextFieldSize } from '@components/forms/text-field'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const SIZES: TextFieldSize[] = ['sm', 'md', 'lg']
const FONT_SIZES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const
const TYPES = ['text', 'email', 'password', 'number', 'search', 'url'] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                                      |
| -------------------------------- | ----------- | --------- | -------------------------------------------------------------------------- |
| \`label\`                          | Recommended | \`string\`  | Visible label linked to the input via \`htmlFor\`.                           |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\`  | Required when \`label\` is omitted.                                          |
| \`error\`                          | No          | \`string\`  | Sets \`aria-invalid="true"\` and replaces helper text in \`aria-describedby\`. |
| \`helperText\`                     | No          | \`string\`  | Described by the input when no error is present.                           |
| \`disabled\`                       | No          | \`boolean\` | Native disabled state, announced by screen readers.                        |
| \`required\`                       | No          | \`boolean\` | Native required state for form validation.                                 |

- The underlying element is a native \`<input>\`, so it is fully keyboard operable.
- Do not rely on placeholder text alone as a label.
`

const TextFieldDocsPage = () => (
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
    title: 'Forms/TextField',
    component: TextField,
    parameters: {
        layout: 'centered',
        docs: {
            page: TextFieldDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled text input built with a native \`<input>\` and selectable label text connected with \`aria-labelledby\`.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional label, start icon, end action, helper text, inline error, password toggle and custom width.

**Usage**

~~~tsx
// With start icon
<TextField label="Email" startIcon={SearchIcon} placeholder="you@example.com" />

// Password field â€” toggle auto-injected
<TextField label="Password" type="password" />

// Custom end action
<TextField
    label="Search"
    endAction={
        <IconButton icon={SearchIcon} aria-label="Search" variant="ghost" color="primary" />
    }
/>
~~~
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
        fontSize: { control: 'select', options: FONT_SIZES },
        type: { control: 'select', options: TYPES },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        showRequiredIndicator: { control: 'boolean' },
    },
    args: {
        label: 'Email address',
        placeholder: 'you@example.com',
        size: 'md',
        fontSize: 'md',
        type: 'text',
        width: '300px',
        required: true,
        showRequiredIndicator: true,
    },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            ...storySource(
                `<TextField label="Email address" placeholder="you@example.com" size="md" fontSize="md" type="text" width="300px" required showRequiredIndicator />`,
            ),
            description: {
                story:
          'Interactive playground â€” use the Controls panel to experiment with every available prop.',
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

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<TextField label="Small" size="sm" />
<TextField label="Medium" size="md" />
<TextField label="Large" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
                label={'Small'}
                size={'sm'}
            />
            <TextField
                label={'Medium'}
                size={'md'}
            />
            <TextField
                label={'Large'}
                size={'lg'}
            />
        </div>
    ),
}

export const FontSizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<TextField label="2xs" fontSize="2xs" />
<TextField label="xs" fontSize="xs" />
<TextField label="sm" fontSize="sm" />
<TextField label="md" fontSize="md" />
<TextField label="lg" fontSize="lg" />
<TextField label="xl" fontSize="xl" />
<TextField label="2xl" fontSize="2xl" />
<TextField label="3xl" fontSize="3xl" />
<TextField label="4xl" fontSize="4xl" />
<TextField label="5xl" fontSize="5xl" />
<TextField label="6xl" fontSize="6xl" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FONT_SIZES.map((fontSize) => (
                <TextField
                    key={fontSize}
                    label={fontSize}
                    fontSize={fontSize}
                />
            ))}
        </div>
    ),
}

export const States: Story = {
    parameters: {
        docs: { ...storySource(`<TextField label="Disabled" disabled />`) },
    },
    render: () => <TextField
        label={'Disabled'}
        disabled
                  />,
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(`<TextField label="Search" startIcon={SearchIcon} />`),
        },
    },
    render: () => <TextField
        label={'Search'}
        startIcon={SearchIcon}
                  />,
}
