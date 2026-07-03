import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, waitFor } from 'storybook/test'

import { DatePicker } from '@components/forms/date-picker'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'

const meta = {
    title: 'Forms/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A date picker that combines a native \`type="date"\` text field with a calendar popover.

- **Direct input** — type a date in \`YYYY-MM-DD\` format.
- **Calendar selection** — click the input to open the popover and pick a day.
- **Accessible** — the input keeps its native date semantics and is annotated with \`aria-haspopup\` and \`aria-expanded\`.

**Usage**
\`\`\`tsx
const [date, setDate] = useState<Date | undefined>()

<DatePicker
  label="Pick a date"
  value={date}
  onChange={setDate}
/>
\`\`\`
`,
            },
        },
    },
    argTypes: {
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        placeholder: { control: 'text' },
        helperText: { control: 'text' },
        error: { control: 'text' },
    },
    args: {
        label: 'Pick a date',
        size: 'md',
    },
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

// Default

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Uncontrolled date picker. Type a date or open the calendar popover to select one.',
            },
        },
    },
    render: (args) => {
        const [date, setDate] = useState<Date | undefined>()
        return (
            <Flex
                direction={'column'}
                align={'center'}
                gap={'md'}
            >
                <DatePicker
                    {...args}
                    value={date}
                    onChange={setDate}
                />
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'mutedForeground'}
                >
                    {date ? `Selected: ${date.toLocaleDateString()}` : 'No date selected'}
                </Typography>
            </Flex>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByLabelText('Pick a date')
        await expect(input).toHaveAttribute('type', 'date')
        await userEvent.click(input)
        await waitFor(() =>
            expect(document.querySelector('[role="dialog"]')).toBeTruthy(),
        )
    },
}

// Controlled

export const Controlled: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Fully controlled example. The parent owns the date state.',
            },
        },
    },
    render: () => {
        const [date, setDate] = useState<Date | undefined>(new Date(2026, 6, 3))
        return (
            <Flex
                direction={'column'}
                align={'center'}
                gap={'md'}
            >
                <DatePicker
                    label={'Controlled date'}
                    value={date}
                    onChange={setDate}
                />
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'mutedForeground'}
                >
                    {date ? `Selected: ${date.toLocaleDateString()}` : 'No date selected'}
                </Typography>
            </Flex>
        )
    },
}

// With disabled dates

export const WithDisabledDates: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Dates before today are disabled by passing matchers through `calendarProps`.',
            },
        },
    },
    render: () => {
        const [date, setDate] = useState<Date | undefined>()
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        return (
            <DatePicker
                label={'Future date'}
                value={date}
                onChange={setDate}
                calendarProps={{
                    disabled: { before: today },
                }}
            />
        )
    },
}

// Disabled

export const Disabled: Story = {
    args: {
        label: 'Disabled date picker',
        disabled: true,
        value: new Date(2026, 6, 3),
    },
    parameters: {
        docs: {
            description: {
                story: 'The input is disabled and the popover cannot be opened.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByLabelText('Disabled date picker')
        await expect(input).toBeDisabled()
    },
}

// Sizes

export const Sizes: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Date picker inherits the three TextField sizes: `sm`, `md`, and `lg`.',
            },
        },
    },
    render: () => (
        <Flex
            direction={'column'}
            gap={'md'}
            style={{ width: '20rem' }}
        >
            <DatePicker
                label={'Small'}
                size={'sm'}
            />
            <DatePicker
                label={'Medium'}
                size={'md'}
            />
            <DatePicker
                label={'Large'}
                size={'lg'}
            />
        </Flex>
    ),
}
