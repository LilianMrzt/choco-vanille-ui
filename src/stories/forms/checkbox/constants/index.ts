import { md } from '@stories/_shared/utils/markdown'
import type { CheckboxProps } from '@components/forms/checkbox'
import consumerSource1 from '@stories/forms/checkbox/sources/CheckboxUsage1.source.txt?raw'
import { fn } from 'storybook/test'
/** Values used by the controlled group example and its parent checkbox. */
export const GROUP_VALUES = ['email', 'sms', 'push']
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Conditional | \`string\` | When provided, auto-associates with the checkbox via a generated \`id\`. |
| \`helperText\` / \`error\` | No | \`string\` | Supporting text associated with the checkbox; errors replace help text. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted to maintain an accessible name. |
| \`disabled\` | No | \`boolean\` | Keeps the checkbox visible and announced; do not hide unavailable options. |
| \`required\` | No | \`boolean\` | Marks the field as required for native form validation. |
| \`checked\` | No | \`boolean\` | Controlled checked state; pair with \`onCheckedChange\`. |
| \`indeterminate\` | No | \`boolean\` | Whether the checkbox is in a mixed state. |
| \`defaultChecked\` | No | \`boolean\` | Uncontrolled initial checked state. |
| \`label\` or \`aria-label\` / \`aria-labelledby\` on \`CheckboxGroup\` | Yes | \`string\` | Names the group. |
| \`label\` or \`aria-label\` on each item | Yes | \`string\` | Names each checkbox. |

- Keyboard: \`Space\` toggles the checkbox when focused.
- The checked state is exposed to assistive technology by the checkbox control.


## Subcomponents

| Slot | Purpose |
| --- | --- |
| Checkbox.Root | Controlled checkbox root and hidden form input. |
| Checkbox.Indicator | Checked or mixed indicator; keepMounted controls its mounting behavior. |
| CheckboxGroup | Named group with controlled selected values and allValues scope. |
| CheckboxGroup.Header | Parent checkbox selecting the scoped items. |
| CheckboxGroup.Item | Individually labeled checkbox option. |
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<CheckboxProps> = {
    label: { control: 'text',
        description: 'Sets the public label prop.'
    },
    helperText: { control: 'text',
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text',
        description: 'Sets the public error prop.'
    },
    checked: { control: 'boolean',
        description: 'Sets the public checked prop.'
    },
    defaultChecked: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    indeterminate: { control: 'boolean',
        description: 'Sets the public indeterminate prop.'
    },
    onCheckedChange: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    disabled: { control: 'boolean',
        description: 'Sets the public disabled prop.'
    },
    required: { control: 'boolean',
        description: 'Sets the public required prop.'
    },
    'id': { control: 'text', description: 'Editable id forwarded to the rendered public component.' },
    'name': { control: 'text', description: 'Editable name forwarded to the rendered public component.' },
    'value': { control: 'text', description: 'Editable value forwarded to the rendered public component.' },
    'uncheckedValue': { control: 'text', description: 'Editable uncheckedValue forwarded to the rendered public component.' },
    'readOnly': { control: 'boolean', description: 'Editable readOnly forwarded to the rendered public component.' },
    'parent': { control: 'boolean', description: 'Editable parent forwarded to the rendered public component.' },
    'className': { control: false, description: 'State-dependent presentation or React composition must be supplied in consumer code.' },
    'style': { control: false, description: 'State-dependent presentation or React composition must be supplied in consumer code.' },
    'render': { control: false, description: 'Render-function composition must be supplied in consumer code.' },
    'ref': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' },
    'inputRef': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' }
}
export const DEFAULT_ARGS = {
    label: 'Accept terms and conditions',
    checked: false,
    onCheckedChange: fn(),
} satisfies Partial<CheckboxProps>
export const DESCRIPTION = md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A checkbox with controlled and uncontrolled modes and optional supporting text.
\`CheckboxGroup.Item\` is the same component. Compose \`Checkbox.Root\` and \`Checkbox.Indicator\` for custom content.
For a group parent, provide \`allValues\`; disabled selections and values outside its scope are preserved.

\`\`\`tsx
${consumerSource1}
\`\`\`
                `
