import { md } from '@stories/_shared/utils/markdown'
import consumerSource1 from '@stories/forms/radio-group/sources/RadioGroupUsage1.source.txt?raw'
import { type RadioGroupPlaygroundArgs } from '@stories/forms/radio-group/types'
import { fn } from 'storybook/test'

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` / \`aria-label\` / \`aria-labelledby\` on \`RadioGroup\` | Yes | \`string\` | Announces the group purpose. |
| \`helperText\` / \`error\` | No | \`string\` | Supporting text associated with the group or an item. |
| \`label\` on \`RadioGroup.Item\` | Conditional | \`string\` | Visible label for the option; auto-associated via a generated \`id\`. |
| \`aria-label\` on \`RadioGroup.Item\` | Conditional | \`string\` | Required when \`label\` is omitted to give each option an accessible name. |
| \`disabled\` (item) | No | \`boolean\` | Marks a single option as unavailable; skipped by keyboard navigation. |
| \`disabled\` (group) | No | \`boolean\` | Disables every child item at once. |
| \`orientation\` | No | \`'horizontal' \\| 'vertical'\` | Informs assistive technology of layout; affects expected arrow-key direction. (Set \`aria-orientation\` yourself; Base UI RadioGroup does not expose an orientation prop.) |

- Keyboard navigation is handled automatically: **Arrow keys** move between options; **Space** selects the focused option.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`RadioGroup\` | Root context provider that manages the single-selection state. |
| \`RadioGroup.Item\` | A single radio option with an optional visible label. |
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<RadioGroupPlaygroundArgs> = {
    label: { control: 'text', table: { category: 'RadioGroup' },
        description: 'Sets the public label prop.'
    },
    helperText: { control: 'text', table: { category: 'RadioGroup' },
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text', table: { category: 'RadioGroup' },
        description: 'Sets the public error prop.'
    },
    disabled: {
        control: 'boolean',
        table: { category: 'RadioGroup' },
        description: 'Sets the public disabled prop.'
    },
    required: {
        control: 'boolean',
        table: { category: 'RadioGroup' },
        description: 'Sets the public required prop.'
    },
    labelOne: {
        control: 'text',
        table: { category: 'Compound: Item' },
        description: 'Sets the public labelOne prop.'
    },
    labelTwo: {
        control: 'text',
        table: { category: 'Compound: Item' },
        description: 'Sets the public labelTwo prop.'
    },
    labelThree: {
        control: 'text',
        table: { category: 'Compound: Item' },
        description: 'Sets the public labelThree prop.'
    },
    value: { control: 'select', options: ['light', 'dark', 'system'], table: { category: 'RadioGroup' },
        description: 'Sets the public value prop.'
    },
    defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    onValueChange: { control: false, table: { category: 'RadioGroup' },
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    'name': { control: 'text', description: 'Editable name forwarded to the rendered public component.' },
    'form': { control: 'text', description: 'Editable form forwarded to the rendered public component.' },
    'className': { control: false, description: 'State-dependent presentation or React composition must be supplied in consumer code.' },
    'style': { control: false, description: 'State-dependent presentation or React composition must be supplied in consumer code.' },
    'render': { control: false, description: 'Render-function composition must be supplied in consumer code.' },
    'ref': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' },
    'onBlur': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' }
}
export const DEFAULT_ARGS = {
    label: 'Theme preference',
    helperText: 'Choose one option.',
    value: 'system',
    onValueChange: fn(),
    disabled: false,
    required: false,
    labelOne: 'Light',
    labelTwo: 'Dark',
    labelThree: 'System',
} satisfies Partial<RadioGroupPlaygroundArgs>
export const DESCRIPTION = md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A group of mutually exclusive radio options built on top of \`@base-ui/react/radio-group\` and \`@base-ui/react/radio\`.
Compose \`RadioGroup\` with one or more \`RadioGroup.Item\` children. Each item renders a radio control with an optional visible label.

\`\`\`tsx
${consumerSource1}
\`\`\`
                `
