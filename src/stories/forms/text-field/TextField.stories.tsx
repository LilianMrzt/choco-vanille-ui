import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { TextField } from '@components/forms/text-field'
import { IconButton } from '@components/actions/icon-button'
import { Flex } from '@components/layout/flex'

const meta = {
    title: 'Forms/TextField',
    component: TextField,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A styled text input built with a native \`<input>\` and [\`@radix-ui/react-label\`](https://www.radix-ui.com/docs/primitives/components/label) for accessible label binding.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional **label**, **startIcon**, **endAction**, **helper text**, **inline error**, **password toggle** and custom **width**.

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

// Fixed width
<TextField label="Amount" width="12rem" />
\`\`\`
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
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'url'] },
    },
    args: {
        label: 'Email address',
        placeholder: 'you@example.com',
        size: 'md',
    },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The default story renders a text field with a label and placeholder. Use the Controls panel to experiment with `size`, `disabled`, `error`, and `helperText`.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('textbox')).toBeInTheDocument()
    },
}

// Sizes

export const Sizes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Three available sizes: `sm` (36px), `md` (40px, default), and `lg` (44px).',
            },
        },
    },
    render: () => (
        <Flex
            direction={'column'}
            gap={'md'}
            style={{ width: '20rem' }}
        >
            <TextField
                label={'Small'}
                placeholder={'size="sm"'}
                size={'sm'}
            />
            <TextField
                label={'Medium'}
                placeholder={'size="md"'}
                size={'md'}
            />
            <TextField
                label={'Large'}
                placeholder={'size="lg"'}
                size={'lg'}
            />
        </Flex>
    ),
}

// With helper text

export const WithHelperText: Story = {
    args: {
        label: 'Username',
        placeholder: 'john_doe',
        helperText: 'Must be at least 3 characters, letters and underscores only.',
    },
    parameters: {
        docs: {
            description: {
                story: 'A helper text is displayed below the input and linked via `aria-describedby`. It disappears when an `error` message is provided.',
            },
        },
    },
}

// Error state

export const WithError: Story = {
    args: {
        label: 'Email address',
        placeholder: 'you@example.com',
        value: 'not-an-email',
        error: 'Please enter a valid email address.',
    },
    parameters: {
        docs: {
            description: {
                story: 'When `error` is set the border turns destructive red, `aria-invalid` is added to the input, and the message is rendered below linked via `aria-describedby`. The `helperText` is hidden.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByRole('textbox')
        await expect(input).toHaveAttribute('aria-invalid', 'true')
    },
}

// Disabled

export const Disabled: Story = {
    args: {
        label: 'Read-only field',
        value: 'Cannot be edited',
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'A disabled text field. The input is not-allowed and both the input and the label are dimmed. Screen readers still announce the field as disabled.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('textbox')).toBeDisabled()
    },
}

// Without label

export const WithoutLabel: Story = {
    args: {
        label: undefined,
        placeholder: 'Search…',
        'aria-label': 'Search',
    },
    parameters: {
        docs: {
            description: {
                story: 'When no visible label is needed, omit the `label` prop and pass an `aria-label` directly on the input to maintain an accessible name.',
            },
        },
    },
}

// Start icon

export const WithStartIcon: Story = {
    name: 'Start icon',
    args: {
        label: 'Email address',
        startIcon: 'mdi:email',
        placeholder: 'you@example.com',
    },
    parameters: {
        docs: {
            description: {
                story: 'Pass any Iconify icon name to `startIcon` to render a decorative icon inside the left of the input. The input padding adjusts automatically for all three sizes.',
            },
        },
    },
    render: (args) => (
        <Flex
            direction={'column'}
            gap={'md'}
            style={{ width: '20rem' }}
        >
            <TextField
                {...args}
                size={'sm'}
            />
            <TextField
                {...args}
                size={'md'}
            />
            <TextField
                {...args}
                size={'lg'}
            />
        </Flex>
    ),
}

// Password

export const Password: Story = {
    args: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
    },
    parameters: {
        docs: {
            description: {
                story: 'When `type="password"` the component automatically injects a ghost `IconButton` that toggles between `mdi:eye` and `mdi:eye-off` to reveal or hide the value. No extra props required.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByLabelText('Password')
        await expect(input).toHaveAttribute('type', 'password')
        const toggle = canvas.getByRole('button', { name: /show password/i })
        await userEvent.click(toggle)
        await expect(input).toHaveAttribute('type', 'text')
        await userEvent.click(canvas.getByRole('button', { name: /hide password/i }))
        await expect(input).toHaveAttribute('type', 'password')
    },
}

// End action

export const WithEndAction: Story = {
    name: 'End action',
    args: {
        label: 'Search',
        placeholder: 'Type to search…',
    },
    parameters: {
        docs: {
            description: {
                story: 'Pass any ReactNode to `endAction` to render a custom action on the right side of the input. A ghost `IconButton` is the recommended pattern.',
            },
        },
    },
    render: (args) => (
        <TextField
            {...args}
            style={{ width: '20rem' }}
            endAction={(
                <IconButton
                    icon={'mdi:magnify'}
                    aria-label={'Search'}
                    variant={'ghost'}
                    color={'primary'}
                    size={'sm'}
                    type={'button'}
                />
            )}
        />
    ),
}

// Width

export const FixedWidth: Story = {
    name: 'Fixed width',
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Use the `width` prop to override the default `100%` outer wrapper width. Accepts any valid CSS width value.',
            },
        },
    },
    render: () => (
        <Flex
            direction={'column'}
            gap={'md'}
        >
            <TextField
                label={'Full width (default)'}
                placeholder={'100%'}
            />
            <TextField
                label={'Fixed 20rem'}
                placeholder={'width="20rem"'}
                width={'20rem'}
            />
            <TextField
                label={'Fixed 12rem'}
                placeholder={'width="12rem"'}
                width={'12rem'}
            />
        </Flex>
    ),
}

// Controlled

const ControlledTextField = () => {
    const [value, setValue] = useState('')
    const error = value.trim() === '' ? 'This field is required.' : undefined

    return (
        <Flex
            direction={'column'}
            gap={'sm'}
            style={{ width: '20rem' }}
        >
            <TextField
                label={'Full name'}
                placeholder={'Jane Doe'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={error}
            />
        </Flex>
    )
}

export const Controlled: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Fully controlled example: the parent owns the value and derives the error message from it. The interaction test types in the input and asserts the error disappears once a value is entered.',
            },
        },
    },
    render: () => <ControlledTextField />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByRole('textbox')
        await expect(input).toHaveAttribute('aria-invalid', 'true')
        await userEvent.type(input, 'Jane Doe')
        await expect(input).not.toHaveAttribute('aria-invalid')
    },
}
