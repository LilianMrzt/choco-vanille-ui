import { type ComponentProps } from 'react'
import { TimePicker } from '@components/forms/time-picker'
import { md } from '@stories/_shared/utils/markdown'
import consumerSource1 from '@stories/forms/time-picker/sources/TimePickerUsage1.source.txt?raw'
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
| \`label\` | Recommended | \`string\` | Visible label linked to the input. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables the input and the popover trigger. |
| \`error\` | No | \`string\` | Sets \`aria-invalid\` on the input. |
| \`triggerAriaLabel\` | No | \`string\` | Accessible name for the trigger button. |
| \`panelAriaLabel\` | No | \`string\` | Accessible name for the popover dialog. |
| \`hoursAriaLabel\` / \`minutesAriaLabel\` | No | \`string\` | Accessible names for the two lists. |

- The trigger is an \`IconButton\` with an \`aria-label\`; the popover content is a \`role="dialog"\`.
- Hours and minutes are lists of buttons exposing \`aria-pressed\` for the selected value.
- Native time inputs provide built-in keyboard and screen-reader support.
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<ComponentProps<typeof TimePicker> & { width?: string }> = {
    label: { control: 'text', table: { category: 'TimePicker' },
        description: 'Sets the public label prop.'
    },
    helperText: { control: 'text', table: { category: 'TimePicker' },
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text', table: { category: 'TimePicker' },
        description: 'Sets the public error prop.'
    },
    width: { control: 'text', table: { category: 'TimePicker' },
        description: 'Sets the public width prop.'
    },
    size: {
        control: 'select',
        options: SIZES,
        table: { category: 'TimePicker' },
        description: 'Sets the public size prop.'
    },
    minuteStep: { control: 'number', table: { category: 'TimePicker' },
        description: 'Sets the public minuteStep prop.'
    },
    hourStep: { control: 'number', table: { category: 'TimePicker' },
        description: 'Sets the public hourStep prop.'
    },
    defaultPanelTime: { control: 'text', table: { category: 'TimePicker' },
        description: 'Sets the public defaultPanelTime prop.'
    },
    minTime: { control: 'text', table: { category: 'TimePicker' },
        description: 'Sets the public minTime prop.'
    },
    maxTime: { control: 'text', table: { category: 'TimePicker' },
        description: 'Sets the public maxTime prop.'
    },
    showNowButton: { control: 'boolean', table: { category: 'TimePicker' },
        description: 'Sets the public showNowButton prop.'
    },
    clearable: { control: 'boolean', table: { category: 'TimePicker' },
        description: 'Sets the public clearable prop.'
    },
    disabled: { control: 'boolean', table: { category: 'TimePicker' },
        description: 'Sets the public disabled prop.'
    },
    required: { control: 'boolean', table: { category: 'TimePicker' },
        description: 'Sets the public required prop.'
    },
    value: { control: false, description: 'Controlled time; use the uncontrolled playground or a controlled example.' },
    defaultValue: { control: 'text', description: 'Initial time in HH:mm format; changing it remounts the playground.' },
    onChange: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    nowLabel: { control: 'text',
        description: 'Sets the public nowLabel prop.'
    },
    clearLabel: { control: 'text',
        description: 'Sets the public clearLabel prop.'
    },
    panelAriaLabel: { control: 'text',
        description: 'Sets the public panelAriaLabel prop.'
    },
    hoursAriaLabel: { control: 'text',
        description: 'Sets the public hoursAriaLabel prop.'
    },
    minutesAriaLabel: { control: 'text',
        description: 'Sets the public minutesAriaLabel prop.'
    },
    triggerAriaLabel: { control: 'text',
        description: 'Sets the public triggerAriaLabel prop.'
    },
    'id': { control: 'text', description: 'Editable id forwarded to the rendered public component.' },
    'name': { control: 'text', description: 'Editable name forwarded to the rendered public component.' },
    'form': { control: 'text', description: 'Editable form forwarded to the rendered public component.' },
    'showRequiredIndicator': { control: 'boolean', description: 'Editable showRequiredIndicator forwarded to the rendered public component.' },
    'readOnly': { control: 'boolean', description: 'Editable readOnly forwarded to the rendered public component.' },
    'onBlur': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'onFocus': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'ref': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' }
}
export const DEFAULT_ARGS = {
    label: 'Start time',
    size: 'md',
    minuteStep: 5,
    disabled: false,
    required: false,
    width: 'min(100%, 24rem)',
    onChange: fn(),
} satisfies Partial<ComponentProps<typeof TimePicker> & { width?: string }>
export const DESCRIPTION = md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A time picker that combines a native \`type="time"\` text field with a popover listing hours and minutes.

- **Direct input** — type a time in 24-hour \`HH:mm\` format.
- **Popover selection** — click the clock button, choose an hour, then a minute.
- **Accessible** — the input keeps its native time semantics and is annotated with \`aria-haspopup="dialog"\`.

\`\`\`tsx
${consumerSource1}
\`\`\`
                `
