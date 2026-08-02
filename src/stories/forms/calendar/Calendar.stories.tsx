import { type ComponentType, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'
import type { DateRange } from 'react-day-picker'

import { Calendar } from '@/components/forms/calendar'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const MODES = ['single', 'multiple', 'range'] as const

type CalendarArgs = {
    mode?: (typeof MODES)[number]
    showOutsideDays?: boolean
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    startYear?: number
    endYear?: number
    compoundCaption?: string
    compoundMonthButton?: string
    compoundMonthView?: string
    compoundYearButton?: string
    compoundYearView?: string
}

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`mode\` | âœ… Yes | \`'single' \\| 'multiple' \\| 'range'\` | Determines selection behaviour and ARIA semantics. |
| \`aria-label\` | No | \`string\` | Accessible name for the calendar region. |
| \`disabled\` | No | \`Date \\| Date[] \\| matcher\` | Prevents selection of matching dates. |
| \`showOutsideDays\` | No | \`boolean\` | Shows days from adjacent months (default \`true\`). |

- Day grid cells are native buttons and are keyboard operable.
- Selected days are exposed via \`aria-pressed\` / \`aria-selected\` by react-day-picker.
`

const CalendarDocsPage = () => (
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
    title: 'Forms/Calendar',
    component: Calendar as ComponentType<CalendarArgs>,
    parameters: {
        layout: 'centered',
        docs: {

            page: CalendarDocsPage,            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A date-picker calendar built on top of \`react-day-picker\`.

Supports **single**, **multiple**, and **range** selection modes.

The header shows **[â† Month Year â†’]** in day view. Clicking **Month** opens a 3Ã—4 month picker; clicking **Year** opens a 3Ã—4 year picker with decade pagination â€” no scrolling required.

**Usage**

\`\`\`tsx
// Single date
const [date, setDate] = useState<Date>()
<Calendar mode="single" selected={date} onSelect={setDate} />

// Date range
const [range, setRange] = useState<DateRange>()
<Calendar mode="range" selected={range} onSelect={setRange} />
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        mode: { control: 'select', options: MODES },
        showOutsideDays: { control: 'boolean' },
        weekStartsOn: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
        startYear: { control: 'number' },
        endYear: { control: 'number' },
        compoundCaption: { control: 'text', table: { category: 'Compound: Caption' } },
        compoundMonthButton: { control: 'text', table: { category: 'Compound: MonthButton' } },
        compoundMonthView: { control: 'text', table: { category: 'Compound: MonthView' } },
        compoundYearButton: { control: 'text', table: { category: 'Compound: YearButton' } },
        compoundYearView: { control: 'text', table: { category: 'Compound: YearView' } },
    },
    args: {
        mode: 'single',
        showOutsideDays: true,
        weekStartsOn: 1,
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<CalendarArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: { ...storySource(`<Calendar />`),
            description: {
                story:
          'Interactive playground â€” use the Controls panel to switch selection mode, toggle outside days, and adjust the year range.',
            },
        },
    },
    render: ({ mode, ...args }: CalendarArgs) => {
        const [single, setSingle] = useState<Date | undefined>()
        const [multiple, setMultiple] = useState<Date[] | undefined>()
        const [range, setRange] = useState<DateRange | undefined>()

        if (mode === 'range') {
            return (
                <Calendar
                    {...args}
                    mode={'range'}
                    selected={range}
                    onSelect={setRange}
                />
            )
        }

        if (mode === 'multiple') {
            return (
                <Calendar
                    {...args}
                    mode={'multiple'}
                    selected={multiple}
                    onSelect={setMultiple}
                />
            )
        }

        return (
            <Calendar
                {...args}
                mode={'single'}
                selected={single}
                onSelect={setSingle}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('grid')).toBeInTheDocument()
    },
}

export const States: Story = {
    parameters: { docs: { ...storySource(`<Calendar mode="single" />`) } },
    render: () => <Calendar mode={'single'} />,
}
