import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { DatePicker } from '@components/forms/date-picker'
import type { TextFieldSize } from '@components/forms/text-field'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const SIZES: TextFieldSize[] = [
    'sm',
    'md',
    'lg',
]

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Recommended | \`string\` | Visible label, linked to the date field group. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables every segment and the calendar trigger. |
| \`error\` | No | \`string\` | Marks the field \`aria-invalid\` and is linked via \`aria-describedby\`. |
| \`calendarAriaLabel\` | No | \`string\` | Accessible name for the calendar dialog. |

- Each day, month and year is a \`role="spinbutton"\` (React Aria), announced with the locale date format.
- Keyboard: type digits to fill a segment, \`Tab\` / \`Shift+Tab\` to move between segments, \`ArrowUp\` / \`ArrowDown\` to step a value.
- The calendar button is an \`IconButton\` with an \`aria-label\`, reachable with \`Tab\` after the segments.
`

const DatePickerDocsPage = () => (
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
    title: 'Forms/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered',
        docs: {

            page: DatePickerDocsPage,            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A date picker built on React Aria's \`DateField\`. The input is a segmented day / month / year field on every device, so it keeps segment-by-segment keyboard entry and screen-reader semantics, and the browser or OS date picker never takes over on mobile.

- **Direct input** — type each segment, or step it with the arrow keys.
- **Calendar selection** — click the calendar button to open the popover and pick a day.
- **Value** — \`value\` / \`onChange\` (controlled) or \`defaultValue\` (uncontrolled), as \`Date\` objects.

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
        label: { control: 'text', table: { category: 'DatePicker' } },
        helperText: { control: 'text', table: { category: 'DatePicker' } },
        error: { control: 'text', table: { category: 'DatePicker' } },
        width: { control: 'text', table: { category: 'DatePicker' } },
        size: {
            control: 'select',
            options: SIZES,
            table: { category: 'DatePicker' },
        },
        disabled: { control: 'boolean', table: { category: 'DatePicker' } },
        required: { control: 'boolean', table: { category: 'DatePicker' } },
        calendarAriaLabel: { control: 'text', table: { category: 'DatePicker' } },
    },
    args: {
        label: 'Pick a date',
        size: 'md',
        disabled: false,
        required: false,
        calendarAriaLabel: 'Calendar',
        width: '300px',
    },
} satisfies Meta<ComponentProps<typeof DatePicker> & { width?: string }>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: { ...storySource(`<DatePicker />`),
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    render: (args) => {
        const [date, setDate] = useState<Date | undefined>()
        return (
            <DatePicker
                {...args}
                value={date}
                onChange={setDate}
            />
        )
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const label = args.label as string | undefined
        if (label) {
            await expect(canvas.getByRole('group', { name: label })).toBeInTheDocument()
        }
        await expect(canvas.getAllByRole('spinbutton').length).toBeGreaterThan(0)
    },
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<DatePicker label="Small" size="sm" />
<DatePicker label="Medium" size="md" />
<DatePicker label="Large" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
        </div>
    ),
}

export const States: Story = {
    parameters: { docs: { ...storySource(`<DatePicker label="Disabled" disabled />`) } },
    render: () => (
        <DatePicker
            label={'Disabled'}
            disabled
        />
    ),
}
