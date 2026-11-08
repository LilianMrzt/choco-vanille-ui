import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { SelectField } from '@components/forms/select'
import { md } from '@stories/_shared/utils/markdown'
import usageSource from '@stories/forms/select/sources/SelectUsage.source.txt?raw'
import { fn } from 'storybook/test'
import type { TextFieldSize } from '@components/forms/text-field'

export const SIZES: TextFieldSize[] = [
    'sm',
    'md',
    'lg',
]
export const FRUIT_OPTIONS = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
]
export const GROUPED_OPTIONS = [
    {
        type: 'group' as const,
        label: 'Citrus',
        options: [
            { value: 'lemon', label: 'Lemon' },
            { value: 'lime', label: 'Lime' },
            { value: 'orange', label: 'Orange' },
        ],
    },
    { type: 'separator' as const },
    {
        type: 'group' as const,
        label: 'Berries',
        options: [
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'raspberry', label: 'Raspberry', disabled: true },
            { value: 'blackberry', label: 'Blackberry' },
        ],
    },
]
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` on \`SelectField\` | Recommended | \`string\` | Visible label linked to the trigger. |
| \`aria-label\` / \`aria-labelledby\` on \`Select.Trigger\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables the trigger and all items. |
| \`error\` on \`SelectField\` | No | \`string\` | Sets \`aria-invalid\` on the trigger. |
| \`listboxAriaLabel\` on \`Select.Content\` | No | \`string\` | Accessible name for the listbox popup. |

- Keyboard: \`Space\` / \`Enter\` opens the listbox; arrow keys navigate; \`Enter\` selects; \`Esc\` closes.
- The trigger is a \`<button>\` with \`aria-haspopup="listbox"\` and \`aria-expanded\`.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Select\` | Root context provider. |
| \`Select.Trigger\` | Button that opens the listbox. |
| \`Select.Content\` | The floating listbox panel. |
| \`Select.List\` | Scrollable list of listbox items. |
| \`Select.Group\` | Semantic group of items. |
| \`Select.Label\` | Non-interactive section heading. |
| \`Select.Item\` | A single selectable option. |
| \`Select.Separator\` | Horizontal divider between groups. |
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<import('react').ComponentProps<typeof SelectField>> = {
    label: { control: 'text', table: { category: 'SelectField' } },
    placeholder: { control: 'text',
        table: { category: 'Compound: Trigger' },
        description: 'The convenience field forwards this control to its Trigger slot.'
    },
    helperText: { control: 'text', table: { category: 'SelectField' } },
    error: { control: 'text', table: { category: 'SelectField' } },
    width: { control: 'text', table: { category: 'SelectField' } },
    size: {
        control: 'select',
        options: SIZES,
        table: { category: 'Compound: Trigger' },
        description: 'The convenience field forwards this control to its Trigger slot.'
    },
    startIcon: { control: 'select', options: ['none', 'search'], mapping: { none: undefined, search: SearchIcon },
        table: { category: 'Compound: Trigger' },
        description: 'The convenience field forwards this control to its Trigger slot.'
    },
    disabled: { control: 'boolean', table: { category: 'SelectField' } },
    required: { control: 'boolean', table: { category: 'SelectField' } },
    listboxAriaLabel: { control: 'text',
        table: { category: 'Compound: Content' },
        description: 'The convenience field forwards this control to its Content slot.'
    },
    name: { control: 'text', description: 'Name submitted with the form.' },
    className: { control: 'text', description: 'Class applied to the field wrapper.' },
    collisionAvoidance: { control: 'object',
        table: { category: 'Compound: Content' },
        description: 'The convenience field forwards this control to its Content slot.'
    },
    options: { control: 'object',
        table: { category: 'Compound: Item / Group / Separator' },
        description: 'The convenience field forwards this control to its Item / Group / Separator slot.'
    },
    value: { control: 'text', table: { category: 'SelectField' } },
    defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    onValueChange: { control: false, table: { category: 'SelectField' },
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    onOpenChange: { control: false, table: { category: 'SelectField' },
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    open: { control: 'boolean', description: 'Controlled popup state.', table: { category: 'SelectField' } },
    defaultOpen: { control: false, description: 'Initial popup state for uncontrolled usage.', table: { category: 'SelectField' } },
}
export const DEFAULT_ARGS = {
    label: 'Fruit',
    placeholder: 'Pick a fruit',
    size: 'md',
    disabled: false,
    required: false,
    listboxAriaLabel: 'Fruits',
    options: FRUIT_OPTIONS,
    value: '',
    onValueChange: fn(),
    onOpenChange: fn(),
    width: 'min(100%, 24rem)',
} satisfies Partial<import('react').ComponentProps<typeof SelectField>>
export const DESCRIPTION = md /* language=markdown */ `
Choose one option from a list with the convenient \`SelectField\` or compose
the \`Select\` slots for more control.

~~~tsx
${usageSource}
~~~
                `
