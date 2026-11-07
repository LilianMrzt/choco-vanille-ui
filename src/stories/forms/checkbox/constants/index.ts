import { md } from '@stories/_shared/utils/markdown'
import { type CheckboxStoryArgs } from '@stories/forms/checkbox/types'
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
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<CheckboxStoryArgs> = {
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
    compoundLabel: { control: 'text', description: 'Accessible name for the compound example.', table: { category: 'Compound: Root' } },
    indicatorText: { control: 'text', description: 'Custom indicator content for the compound example.', table: { category: 'Compound: Indicator' } },
    indicatorKeepMounted: { control: 'boolean', description: 'Keeps the indicator mounted while unchecked.', table: { category: 'Compound: Indicator' } },
    groupLabel: { control: 'text', description: 'Visible group name.', table: { category: 'Compound: Group' } },
    groupHelperText: { control: 'text', description: 'Group supporting text.', table: { category: 'Compound: Group' } },
    groupError: { control: 'text', description: 'Group error message.', table: { category: 'Compound: Group' } },
    groupDisabled: { control: 'boolean', description: 'Disables the group.', table: { category: 'Compound: Group' } },
    groupValue: { control: 'object', description: 'Controlled selected group values.', table: { category: 'Compound: Group' } },
    groupOnValueChange: { control: false, description: 'Receives selected values and change details.', table: { category: 'Compound: Group' } },
    groupHeaderLabel: { control: 'text', description: 'Parent checkbox label.', table: { category: 'Compound: Header' } },
    groupLabelOne: { control: 'text', description: 'First item label.', table: { category: 'Compound: Item' } },
    groupLabelTwo: { control: 'text', description: 'Second item label.', table: { category: 'Compound: Item' } },
    groupLabelThree: { control: 'text', description: 'Third item label.', table: { category: 'Compound: Item' } },
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
    compoundLabel: 'Accept terms',
    indicatorText: 'X',
    indicatorKeepMounted: false,
    groupLabel: 'Notification preferences',
    groupHelperText: 'Select all that apply.',
    groupDisabled: false,
    groupValue: [],
    groupOnValueChange: fn(),
    groupHeaderLabel: 'All notifications',
    groupLabelOne: 'Email',
    groupLabelTwo: 'SMS',
    groupLabelThree: 'Push notifications',
} satisfies Partial<CheckboxStoryArgs>
export const DESCRIPTION = md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A checkbox with controlled and uncontrolled modes and optional supporting text.
\`CheckboxGroup.Item\` is the same component. Compose \`Checkbox.Root\` and \`Checkbox.Indicator\` for custom content.
For a group parent, provide \`allValues\`; disabled selections and values outside its scope are preserved.

\`\`\`tsx
${consumerSource1}
\`\`\`
                `
