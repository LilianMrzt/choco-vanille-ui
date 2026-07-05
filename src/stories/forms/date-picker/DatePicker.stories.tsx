import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { DatePicker } from '@components/forms/date-picker'
import type { TextFieldInputRecipeVariants } from '@components/forms/text-field/TextField.css.ts'
import { md } from '@stories/utils/markdown'

const SIZES: NonNullable<TextFieldInputRecipeVariants['size']>[] = [
    'sm',
    'md',
    'lg',
]

const meta = {
    title: 'Forms/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A date picker that combines a native \`type="date"\` text field with a calendar popover.

- **Direct input** — type a date in \`YYYY-MM-DD\` format.
- **Calendar selection** — click the calendar button to open the popover and pick a day.
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
        docs: {
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
            await expect(canvas.getByLabelText(label)).toBeInTheDocument()
        } else {
            await expect(canvas.getByRole('textbox')).toBeInTheDocument()
        }
    },
}