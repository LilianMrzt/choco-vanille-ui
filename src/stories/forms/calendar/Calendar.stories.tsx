import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { Calendar } from '@/components/forms/calendar'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import source from '@stories/forms/calendar/sources/Calendar.source.tsx.txt?raw'

const MODES = ['single', 'multiple', 'range'] as const

type CalendarArgs = {
    mode?: (typeof MODES)[number]
    showOutsideDays?: boolean
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    startYear?: number
    endYear?: number
}

/**
 * Renders an uncontrolled calendar for the selected demonstration mode.
 * Changing modes remounts it to avoid carrying an incompatible selection.
 * @internal Not part of the public package API.
 * @param props - Calendar demonstration controls.
 * @param props.mode - Selection mode.
 * @returns The calendar.
 * @example
 * <CalendarPlayground mode="single" />
 */
const CalendarPlayground = ({ mode = 'single', ...props }: CalendarArgs) => {
    if (mode === 'range') {
        return (
            <Calendar
                key={mode}
                {...props}
                mode={'range'}
            />
        )
    }
    if (mode === 'multiple') {
        return (
            <Calendar
                key={mode}
                {...props}
                mode={'multiple'}
            />
        )
    }
    return (
        <Calendar
            key={mode}
            {...props}
            mode={'single'}
        />
    )
}

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`mode\` | Yes | \`'single' \\| 'multiple' \\| 'range'\` | Determines selection behaviour and ARIA semantics. |
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
    tags: ['autodocs'],
    component: CalendarPlayground,
    parameters: {
        layout: 'centered',
        docs: {

            page: CalendarDocsPage,
            source: { type: 'dynamic', transform: createPrimitiveSource<CalendarArgs>(source) },
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A date-picker calendar built on top of \`react-day-picker\`.

Supports **single**, **multiple**, and **range** selection modes.

The header provides month and year selection as well as navigation between periods.

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
        docs: {
            description: {
                story:
          'Use the Controls panel to change selection mode, outside days and the year range.',
            },
        },
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
