import { useState, type ComponentProps, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { AutocompleteField } from '@components/forms/autocomplete'
import type { TextFieldInputRecipeVariants } from '@components/forms/text-field/TextField.css.ts'
import { md } from '@stories/utils/markdown'

const SIZES: NonNullable<TextFieldInputRecipeVariants['size']>[] = [
    'sm',
    'md',
    'lg',
]

const FRUIT_OPTIONS = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
]

const GROUPED_OPTIONS = [
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

type AutocompletePlaygroundArgs = Omit<ComponentProps<typeof AutocompleteField>, 'options'> & {
    options?: ComponentProps<typeof AutocompleteField>['options']
    optionsType?: 'flat' | 'grouped'
}

const meta = {
    title: 'Forms/Autocomplete',
    component: AutocompleteField as ComponentType<AutocompletePlaygroundArgs>,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A styled autocomplete control built on top of \`@base-ui/react/autocomplete\`.

Use it to let users search and select one option from a collapsible, filterable
list. It provides a field-style wrapper (\`AutocompleteField\`) for common forms
use cases, and a full compound API (\`Autocomplete.Input\`,
\`Autocomplete.Content\`, \`Autocomplete.Item\`, etc.) for advanced composition.
The input is styled to match \`TextField\`, and the listbox popup follows the
same visual language as \`Select\` and \`DropdownMenu\`.

**Usage**

\`\`\`tsx
// Field wrapper
const [value, setValue] = useState('')

<AutocompleteField
  label="Fruit"
  placeholder="Search a fruit"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ]}
  value={value}
  onValueChange={setValue}
/>
\`\`\`

\`\`\`tsx
// Compound API
<Autocomplete>
  <Autocomplete.Input placeholder="Search a fruit" />
  <Autocomplete.Content>
    <Autocomplete.List>
      <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
      <Autocomplete.Item value="banana">Banana</Autocomplete.Item>
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete>
\`\`\`

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
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text', table: { category: 'AutocompleteField' } },
        placeholder: { control: 'text', table: { category: 'AutocompleteField' } },
        helperText: { control: 'text', table: { category: 'AutocompleteField' } },
        error: { control: 'text', table: { category: 'AutocompleteField' } },
        width: { control: 'text', table: { category: 'AutocompleteField' } },
        size: {
            control: 'select',
            options: SIZES,
            table: { category: 'AutocompleteField' },
        },
        startIcon: { control: 'text', table: { category: 'AutocompleteField' } },
        disabled: { control: 'boolean', table: { category: 'AutocompleteField' } },
        required: { control: 'boolean', table: { category: 'AutocompleteField' } },
        listboxAriaLabel: { control: 'text', table: { category: 'AutocompleteField' } },
        emptyText: { control: 'text', table: { category: 'AutocompleteField' } },
        optionsType: {
            control: 'select',
            options: ['flat', 'grouped'],
            table: { category: 'AutocompleteField' },
        },
    },
    args: {
        label: 'Fruit',
        placeholder: 'Search a fruit',
        size: 'md',
        disabled: false,
        required: false,
        listboxAriaLabel: 'Fruits',
        emptyText: 'No results found.',
        optionsType: 'flat',
        width: '300px',
    },
} satisfies Meta<AutocompletePlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    render: (args) => {
        const [value, setValue] = useState<string>('')
        const options = args.optionsType === 'grouped' ? GROUPED_OPTIONS : FRUIT_OPTIONS
        return (
            <AutocompleteField
                {...args}
                options={options}
                value={value}
                onValueChange={setValue}
            />
        )
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByRole('combobox')
        await expect(input).toBeInTheDocument()
        await expect(input).toHaveAttribute('placeholder', args.placeholder ?? '')
        await userEvent.click(input)
        const listbox = await screen.findByRole('listbox')
        await expect(listbox).toBeInTheDocument()
        // Close the listbox so the a11y audit runs against a stable, valid DOM.
        await userEvent.keyboard('{Escape}')
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
    },
}
