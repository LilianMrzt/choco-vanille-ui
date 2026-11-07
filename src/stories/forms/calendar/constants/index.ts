import { md } from '@stories/_shared/utils/markdown'
import consumerSource1 from '@stories/forms/calendar/sources/CalendarUsage1.source.txt?raw'
import { type CalendarArgs } from '@stories/forms/calendar/types'
import { fn } from 'storybook/test'

export const MODES = ['single', 'multiple', 'range'] as const
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`mode\` | Yes | \`'single' \\| 'multiple' \\| 'range'\` | Determines selection behaviour and ARIA semantics. |
| \`aria-label\` | No | \`string\` | Accessible name for the calendar region. |
| \`disabled\` | No | \`Date \\| Date[] \\| matcher\` | Prevents selection of matching dates. |
| \`showOutsideDays\` | No | \`boolean\` | Shows days from adjacent months (default \`true\`). |

- Day grid cells are native buttons and are keyboard operable.
- Selected days are exposed using \`aria-selected\`. The day tab stop is the visible selection or the enabled day in the displayed month closest to today.
- Arrow keys move by day or week; Home and End move to the start or end of the week. Page Up/Down changes month, and Shift + Page Up/Down changes year.
- Enter or Space selects the focused day. Disabled days remain focusable and are announced but cannot be selected. After choosing a year and month, focus returns to the day grid.
- Supply \`locale\` and \`captionLabels\` to localize dates and navigation. Disabled days cannot be selected as endpoints, but may be included inside a range.
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<CalendarArgs> = {
    mode: { control: 'select', options: MODES },
    showOutsideDays: { control: 'boolean' },
    weekStartsOn: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
    startYear: { control: 'number' },
    endYear: { control: 'number' },
    captionLabels: { control: 'object', description: 'Accessible labels forwarded to the calendar caption navigation.' },
    className: { control: 'text', description: 'Class applied to the calendar root.' },
    disabled: { control: false, description: 'Supply Date matchers in code to disable days; matcher functions are not serializable.' },
    selected: { control: false, description: 'Controlled Date, Date[] or date range, synchronized by selecting days. Date values are not edited as JSON; Reset restores the initial empty selection.' },
    onSelect: { control: false, description: 'Receives the selection. The playground forwards it before updating Controls.' },
    month: { control: false, description: 'Controlled displayed month as a Date; supply it with onMonthChange in consumer code.' },
    defaultMonth: { control: false, description: 'Initial displayed month as a Date; initial-only changes require a remount.' },
    onMonthChange: { control: false, description: 'Receives the requested displayed month as a Date.' },
    startMonth: { control: false, description: 'Earliest displayed month as a Date; construct it in consumer code.' },
    endMonth: { control: false, description: 'Latest displayed month as a Date; construct it in consumer code.' },
    locale: { control: 'text', description: 'BCP 47 locale used for dates and weekday names.' },
}
export const DEFAULT_ARGS = {
    mode: 'single',
    showOutsideDays: true,
    weekStartsOn: 1,
    onSelect: fn(),
} satisfies Partial<CalendarArgs>
export const DESCRIPTION = md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A calendar for choosing local dates.

Supports **single**, **multiple**, and **range** selection modes.

The header provides month and year selection as well as navigation between periods.

\`\`\`tsx
${consumerSource1}
\`\`\`
                `
