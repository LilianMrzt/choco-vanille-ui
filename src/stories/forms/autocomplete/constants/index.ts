import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { AutocompleteField } from '@components/forms/autocomplete'
import { md } from '@stories/_shared/utils/markdown'
import usageSource from '@stories/forms/autocomplete/sources/AutocompleteUsage.source.txt?raw'
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
| \`label\` on \`AutocompleteField\` | Recommended | \`string\` | Visible label linked to the input. |
| \`aria-label\` / \`aria-labelledby\` on \`Autocomplete.Input\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables the input and all items. |
| \`error\` on \`AutocompleteField\` | No | \`string\` | Sets \`aria-invalid\` on the input. |
| \`listboxAriaLabel\` on \`Autocomplete.Content\` | No | \`string\` | Accessible name for the listbox popup. |

- Keyboard: typing filters the list; arrow keys navigate; \`Enter\` selects; \`Esc\` closes.
- The input is a \`<input>\` with \`aria-autocomplete="list"\` and \`aria-expanded\`.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Autocomplete\` | Coordinates the input and popup. |
| \`Autocomplete.Input\` | Text input used to filter options. |
| \`Autocomplete.InputGroup\` | Groups the input with related controls. |
| \`Autocomplete.Trigger\` | Opens the popup. |
| \`Autocomplete.Icon\` | Displays a decorative icon. |
| \`Autocomplete.Clear\` | Clears the input value. |
| \`Autocomplete.Content\` | Floating popup. |
| \`Autocomplete.List\` | List of matching items. |
| \`Autocomplete.Group\` | Groups related items. |
| \`Autocomplete.Label\` | Labels a group. |
| \`Autocomplete.Item\` | A selectable option. |
| \`Autocomplete.Empty\` | Content shown when there are no matches. |
| \`Autocomplete.Separator\` | Divides groups of items. |
| \`Autocomplete.Status\` | Announces the current status. |
| \`Autocomplete.Collection\` | Renders a collection of items. |
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<import('react').ComponentProps<typeof AutocompleteField>> = {
    label: { control: 'text', table: { category: 'AutocompleteField' },
        description: 'Sets the public label prop.'
    },
    placeholder: { control: 'text',
        table: { category: 'Compound: Input' },
        description: 'The convenience field forwards this control to its Input slot.'
    },
    helperText: { control: 'text', table: { category: 'AutocompleteField' },
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text', table: { category: 'AutocompleteField' },
        description: 'Sets the public error prop.'
    },
    width: { control: 'text', table: { category: 'AutocompleteField' },
        description: 'Sets the public width prop.'
    },
    size: {
        control: 'select',
        options: SIZES,
        table: { category: 'Compound: Input' },
        description: 'The convenience field forwards this control to its Input slot.'
    },
    startIcon: { control: 'select', options: ['none', 'search'], mapping: { none: undefined, search: SearchIcon },
        table: { category: 'Compound: Input' },
        description: 'The convenience field forwards this control to its Input slot.'
    },
    disabled: { control: 'boolean', table: { category: 'AutocompleteField' },
        description: 'Sets the public disabled prop.'
    },
    required: { control: 'boolean', table: { category: 'AutocompleteField' },
        description: 'Sets the public required prop.'
    },
    listboxAriaLabel: { control: 'text',
        table: { category: 'Compound: Content' },
        description: 'The convenience field forwards this control to its Content slot.'
    },
    emptyText: { control: 'text',
        table: { category: 'Compound: Empty' },
        description: 'The convenience field forwards this control to its Empty slot.'
    },
    options: { control: 'object',
        table: { category: 'Compound: Item / Group / Separator' },
        description: 'The convenience field forwards this control to its Item / Group / Separator slot.'
    },
    value: { control: 'text', table: { category: 'AutocompleteField' },
        description: 'Sets the public value prop.'
    },
    defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    onValueChange: { control: false, table: { category: 'AutocompleteField' },
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    onOpenChange: { control: false, table: { category: 'AutocompleteField' },
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    open: { control: 'boolean', description: 'Controlled popup state.', table: { category: 'AutocompleteField' } },
    defaultOpen: { control: false, description: 'Initial popup state for uncontrolled usage.', table: { category: 'AutocompleteField' } },
    'name': { control: 'text', description: 'Editable name forwarded to the rendered public component.' },
    'className': { control: 'text', description: 'Editable className forwarded to the rendered public component.' }
}
export const DEFAULT_ARGS = {
    label: 'Fruit',
    placeholder: 'Search a fruit',
    size: 'md',
    disabled: false,
    required: false,
    listboxAriaLabel: 'Fruits',
    emptyText: 'No results found.',
    options: FRUIT_OPTIONS,
    value: '',
    onValueChange: fn(),
    onOpenChange: fn(),
    width: 'min(100%, 24rem)',
} satisfies Partial<import('react').ComponentProps<typeof AutocompleteField>>
export const DESCRIPTION = md /* language=markdown */ `
Search a list of options with the convenient \`AutocompleteField\` or compose
the \`Autocomplete\` slots for more control.

~~~tsx
${usageSource}
~~~
                `
