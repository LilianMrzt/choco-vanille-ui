import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DateRange } from 'react-day-picker'

import { Calendar } from '@/components/forms/calendar'
import { Flex } from '@/components/layout/flex'
import { Typography } from '@/components/foundation/typography'

const meta = {
    title: 'Forms/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A date-picker calendar built on top of [\`react-day-picker\`](https://daypicker.dev).

Supports **single**, **multiple**, and **range** selection modes.

The header shows **[← Month Year →]** in day view. Clicking **Month** opens a 3×4 month picker; clicking **Year** opens a 3×4 year picker with decade pagination — no scrolling required.

**Usage**
\`\`\`tsx
// Single date
const [date, setDate] = useState<Date>()
<Calendar mode="single" selected={date} onSelect={setDate} />

// Date range
const [range, setRange] = useState<DateRange>()
<Calendar mode="range" selected={range} onSelect={setRange} />
\`\`\`

**Props**

| Prop | Notes |
|---|---|
| \`mode\` | \`"single"\` \| \`"multiple"\` \| \`"range"\`. Determines selection behaviour. |
| \`startYear\` | Earliest year in the year picker. Defaults to 100 years before today. |
| \`endYear\` | Latest year in the year picker. Defaults to 10 years after today. |
| \`disabled\` | Accepts a \`Date\`, array of dates, or a matcher function. |
| \`showOutsideDays\` | Shows days from adjacent months (enabled by default). |
`,
            },
        },
    },
    argTypes: {
        mode: {
            control: 'select',
            options: ['single', 'multiple', 'range'],
        },
    },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

// Default — single selection

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Single-date selection mode. Click a day to select it; click again to deselect.',
            },
        },
    },
    render: () => {
        const [date, setDate] = useState<Date | undefined>()
        return (
            <Flex
                direction={'column'}
                align={'center'}
                gap={'md'}
            >
                <Calendar
                    mode={'single'}
                    selected={date}
                    onSelect={setDate}
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

// Multiple selection

export const MultipleSelection: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Multiple-date selection mode. Click days to toggle their selection.',
            },
        },
    },
    render: () => {
        const [dates, setDates] = useState<Date[] | undefined>()
        return (
            <Flex
                direction={'column'}
                align={'center'}
                gap={'md'}
            >
                <Calendar
                    mode={'multiple'}
                    selected={dates}
                    onSelect={setDates}
                />
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'mutedForeground'}
                >
                    {dates && dates.length > 0
                        ? `${dates.length} date(s) selected`
                        : 'No dates selected'}
                </Typography>
            </Flex>
        )
    },
}

// Range selection

export const RangeSelection: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Range selection mode. Click a start date, then an end date to select a span.',
            },
        },
    },
    render: () => {
        const [range, setRange] = useState<DateRange | undefined>()
        return (
            <Flex
                direction={'column'}
                align={'center'}
                gap={'md'}
            >
                <Calendar
                    mode={'range'}
                    selected={range}
                    onSelect={setRange}
                />
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'mutedForeground'}
                >
                    {range?.from && range?.to
                        ? `${range.from.toLocaleDateString()} → ${range.to.toLocaleDateString()}`
                        : range?.from
                            ? `From: ${range.from.toLocaleDateString()}`
                            : 'No range selected'}
                </Typography>
            </Flex>
        )
    },
}

// With disabled dates

export const WithDisabledDates: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Dates before today and weekends are disabled. Pass a matcher function or array to `disabled`.',
            },
        },
    },
    render: () => {
        const [date, setDate] = useState<Date | undefined>()
        const today = new Date()
        return (
            <Calendar
                mode={'single'}
                selected={date}
                onSelect={setDate}
                disabled={[
                    { before: today },
                    { dayOfWeek: [0, 6] },
                ]}
            />
        )
    },
}

// Without outside days

export const WithoutOutsideDays: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Outside days (days from adjacent months) are hidden by setting `showOutsideDays={false}`.',
            },
        },
    },
    render: () => (
        <Calendar
            mode={'single'}
            showOutsideDays={false}
        />
    ),
}

// Date of birth picker — extended year range

export const DateOfBirth: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Date-of-birth use case: `startYear={1900}` gives a century of years in the picker, all paginated in 12-year grids. Future dates are disabled.',
            },
        },
    },
    render: () => {
        const [date, setDate] = useState<Date | undefined>()
        return (
            <Flex
                direction={'column'}
                align={'center'}
                gap={'md'}
            >
                <Calendar
                    mode={'single'}
                    startYear={1900}
                    endYear={new Date().getFullYear()}
                    disabled={{ after: new Date() }}
                    selected={date}
                    onSelect={setDate}
                />
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'mutedForeground'}
                >
                    {date ? `Date of birth: ${date.toLocaleDateString()}` : 'Select your date of birth'}
                </Typography>
            </Flex>
        )
    },
}
