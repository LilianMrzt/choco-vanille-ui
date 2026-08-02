import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { DatePicker } from '@components/forms/date-picker'
import type { TextFieldSize } from '@components/forms/text-field'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

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
| \`label\` | Recommended | \`string\` | Visible label linked to the input. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables the input and the calendar trigger. |
| \`error\` | No | \`string\` | Sets \`aria-invalid\` on the input. |
| \`calendarAriaLabel\` | No | \`string\` | Accessible name for the calendar dialog. |

- The calendar trigger is an \`IconButton\` with an \`aria-label\`; the popover content is a \`role="dialog"\`.
- Native date inputs provide built-in keyboard and screen-reader support.
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
A date picker that combines a native \`type="date"\` text field with a calendar popover.

- **Direct input** â€” type a date in \`YYYY-MM-DD\` format.
- **Calendar selection** â€” click the calendar button to open the popover and pick a day.
- **Accessible** â€” the input keeps its native date semantics and is annotated with \`aria-haspopup="dialog"\` to signal the calendar popover.

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
        placeholder: { control: 'text', table: { category: 'DatePicker' } },
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
          'Interactive playground â€” use the Controls panel to experiment with every available prop.',
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
