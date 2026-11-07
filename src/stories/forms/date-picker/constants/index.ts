import { type ComponentProps } from 'react'
import { DatePicker } from '@components/forms/date-picker'
import { md } from '@stories/_shared/utils/markdown'
import consumerSource1 from '@stories/forms/date-picker/sources/DatePickerUsage1.source.txt?raw'
import { fn } from 'storybook/test'
import type { TextFieldSize } from '@components/forms/text-field'

export const SIZES: TextFieldSize[] = [
    'sm',
    'md',
    'lg',
]
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Recommended | \`string\` | Visible label, linked to the date selection button. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables the selection button. |
| \`error\` | No | \`string\` | Linked to the button via \`aria-describedby\`. |
| \`calendarAriaLabel\` | No | \`string\` | Accessible name for the calendar dialog. |

- The button opens a calendar dialog with Enter or Space. Focus moves to the selected day, or to the available day closest to today within the navigation and date bounds. If no day is available, a disabled day remains focusable.
- An explicit calendar month keeps the initial focus within the displayed month. On touch, the popover retains its default focus behavior.
- Arrow keys navigate by day or week, Home/End by week, Page Up/Down by month, and Shift + Page Up/Down by year. Disabled days remain focusable but cannot be selected.
- Enter or Space selects a day and closes the dialog. Escape closes it without changing the value; focus returns to the date selection button.
- Required validation is performed by the application, not by the browser.
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<ComponentProps<typeof DatePicker> & { width?: string }> = {
    label: { control: 'text', table: { category: 'DatePicker' },
        description: 'Sets the public label prop.'
    },
    helperText: { control: 'text', table: { category: 'DatePicker' },
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text', table: { category: 'DatePicker' },
        description: 'Sets the public error prop.'
    },
    width: { control: 'text', table: { category: 'DatePicker' },
        description: 'Sets the public width prop.'
    },
    size: {
        control: 'select',
        options: SIZES,
        table: { category: 'DatePicker' },
        description: 'Sets the public size prop.'
    },
    disabled: { control: 'boolean', table: { category: 'DatePicker' },
        description: 'Sets the public disabled prop.'
    },
    required: { control: 'boolean', table: { category: 'DatePicker' },
        description: 'Sets the public required prop.'
    },
    calendarAriaLabel: { control: 'text', table: { category: 'DatePicker' },
        description: 'Sets the public calendarAriaLabel prop.'
    },
    locale: { control: 'text', description: 'BCP 47 locale for the numeric date and calendar. The date defaults to fr-FR (DD/MM/YYYY); the calendar defaults to the runtime locale.' },
    placeholder: { control: 'text', description: 'Text displayed when no date is selected.' },
    requiredText: { control: 'text', description: 'Accessible required-state description.' },
    showRequiredIndicator: { control: 'boolean', table: { category: 'DatePicker' },
        description: 'Sets the public showRequiredIndicator prop.'
    },
    value: { control: false, description: 'Date object for controlled usage; not editable in this uncontrolled playground.' },
    defaultValue: { control: false, description: 'Initial Date; changes require a remount.' },
    minDate: { control: false, description: 'Earliest selectable Date; construct the Date object in consumer code rather than a JSON control.' },
    maxDate: { control: false, description: 'Latest selectable Date; construct the Date object in consumer code rather than a JSON control.' },
    calendarProps: { control: false, description: 'Advanced calendar props can contain Date matchers and render functions; supply them in consumer code.' },
    onChange: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    'id': { control: 'text', description: 'Editable id forwarded to the rendered public component.' },
    'aria-label': { control: 'text', description: 'Editable aria-label forwarded to the rendered public component.' },
    'aria-labelledby': { control: 'text', description: 'Editable aria-labelledby forwarded to the rendered public component.' },
    'aria-describedby': { control: 'text', description: 'Editable aria-describedby forwarded to the rendered public component.' }
}
export const DEFAULT_ARGS = {
    label: 'Pick a date',
    size: 'md',
    disabled: false,
    required: false,
    calendarAriaLabel: 'Calendar',
    width: 'min(100%, 24rem)',
    onChange: fn(),
} satisfies Partial<ComponentProps<typeof DatePicker> & { width?: string }>
export const DESCRIPTION = md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A date selection button with a calendar popover.

- **Calendar selection** — click the calendar button to open the popover and pick a day.
- **Value** — \`value\` / \`onChange\` (controlled) or \`defaultValue\` (uncontrolled), as \`Date\` objects.
- **Display** — numeric \`DD/MM/YYYY\` by default. Set \`locale\`, for example \`en-US\`, to adapt the date format and the calendar's month and weekday names.
- **Form submission** — \`name\` submits a local \`YYYY-MM-DD\` value. Required validation is the application's responsibility.
- The calendar uses a document portal and does not inherit a locally scoped theme.

\`\`\`tsx
${consumerSource1}
\`\`\`
                `
