import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, fn, within } from 'storybook/test'

import { TextField, type TextFieldProps, type TextFieldSize } from '@components/forms/text-field'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'

const SIZES: TextFieldSize[] = ['sm', 'md', 'lg']
const TYPES = ['text', 'email', 'password', 'number', 'search', 'url'] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                                      |
| -------------------------------- | ----------- | --------- | -------------------------------------------------------------------------- |
| \`label\`                          | Recommended | \`string\`  | Visible label linked to the input via \`aria-labelledby\`.                  |
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
    tags: ['autodocs'],
    component: TextField,
    parameters: {
        layout: 'centered',
        docs: {
            page: TextFieldDocsPage,
            source: { type: 'dynamic', transform: createControlledSource<TextFieldProps>({ component: 'TextField', stateProp: 'value', eventProp: 'onChange', handler: '(event) => setValue(event.target.value)', icon: { prop: 'startIcon', name: 'SearchIcon' } }) },
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled text input built with a native \`<input>\` and selectable label text connected with \`aria-labelledby\`.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional label, start icon, end action, helper text, inline error, password toggle and custom width.

**Usage**

~~~tsx
// With start icon
<TextField label="Email" startIcon={SearchIcon} placeholder="you@example.com" />

// Password field with a visibility toggle
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
        startIcon: { control: 'select', options: ['none', 'search'], mapping: { none: undefined, search: SearchIcon } },
        endAction: { control: false, description: 'React node; use composition to provide a custom action.' },
        onChange: { control: false },
        value: { control: 'text' },
        defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        width: { control: 'text' },
        size: { control: 'select', options: SIZES },
        type: { control: 'select', options: TYPES },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        showRequiredIndicator: { control: 'boolean' },
    },
    args: {
        label: 'Email address',
        placeholder: 'you@example.com',
        size: 'md',
        type: 'text',
        width: '300px',
        required: true,
        showRequiredIndicator: true,
        value: '',
        onChange: fn(),
    },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>;

/**
 * Keeps the input value and callback synchronized with Storybook args.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled text field.
 * @example
 * <ControlledTextField label="Email" />
 */
const ControlledTextField = (_args: TextFieldProps) => {
    const [args, updateArgs] = useArgs<TextFieldProps>()
    const handleChange: NonNullable<TextFieldProps['onChange']> = (event) => {
        args.onChange?.(event)
        updateArgs({ value: event.currentTarget.value })
    }

    return (
        <TextField
            {...args}
            onChange={handleChange}
        />
    )
}

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Use the Controls panel to experiment with the field props.',
            },
        },
    },
    render: ControlledTextField,
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

export const States: Story = {
    parameters: {
        docs: { ...storySource(`<TextField label="Disabled" disabled />
<TextField label="Email" helperText="Use your work email." />
<TextField label="Invalid email" error="Enter a valid email address." />`) },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
                label={'Disabled'}
                disabled
            />
            <TextField
                label={'Email'}
                helperText={'Use your work email.'}
            />
            <TextField
                label={'Invalid email'}
                error={'Enter a valid email address.'}
            />
        </div>
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(`<TextField label="Search" startIcon={SearchIcon} />`),
        },
    },
    render: () => (
        <TextField
            label={'Search'}
            startIcon={SearchIcon}
        />
    ),
}
