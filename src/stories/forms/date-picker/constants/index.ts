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
| \`label\` | Recommended | \`string\` | Visible label, linked to the date field group. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables every segment and the calendar trigger. |
| \`error\` | No | \`string\` | Marks the field \`aria-invalid\` and is linked via \`aria-describedby\`. |
| \`calendarAriaLabel\` | No | \`string\` | Accessible name for the calendar dialog. |

- Each day, month and year is a \`role="spinbutton"\` (React Aria), announced with the locale date format.
- Keyboard: type digits to fill a segment, \`Tab\` / \`Shift+Tab\` to move between segments, \`ArrowUp\` / \`ArrowDown\` to step a value.
- The calendar button is an \`IconButton\` with an \`aria-label\`, reachable with \`Tab\` after the segments.
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
A date picker built on React Aria's \`DateField\`. The input is a segmented day / month / year field on every device, so it keeps segment-by-segment keyboard entry and screen-reader semantics, and the browser or OS date picker never takes over on mobile.

- **Direct input** — type each segment, or step it with the arrow keys.
- **Calendar selection** — click the calendar button to open the popover and pick a day.
- **Value** — \`value\` / \`onChange\` (controlled) or \`defaultValue\` (uncontrolled), as \`Date\` objects.

\`\`\`tsx
${consumerSource1}
\`\`\`
                `
