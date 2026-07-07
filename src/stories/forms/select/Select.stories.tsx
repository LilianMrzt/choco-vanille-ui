import { useState, type ComponentProps, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { SelectField } from '@components/forms/select'
import type { TextFieldInputRecipeVariants } from '@components/forms/text-field/styles/TextField.css.ts'
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

type SelectPlaygroundArgs = Omit<ComponentProps<typeof SelectField>, 'options'> & {
    options?: ComponentProps<typeof SelectField>['options']
    optionsType?: 'flat' | 'grouped'
}

const meta = {
    title: 'Forms/Select',
    component: SelectField as ComponentType<SelectPlaygroundArgs>,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A styled select control built on top of \`@base-ui/react/select\`.

Use it to let users choose one option from a collapsible list. It provides a
field-style wrapper (\`SelectField\`) for common forms use cases, and a full
compound API (\`Select.Trigger\`, \`Select.Content\`, \`Select.Item\`, etc.) for
advanced composition. The trigger is styled to match \`TextField\`, and the
listbox popup follows the same visual language as \`DropdownMenu\`.

**Usage**

\`\`\`tsx
// Field wrapper
const [value, setValue] = useState('')

<SelectField
  label="Fruit"
  placeholder="Pick a fruit"
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
<Select value={value} onValueChange={setValue}>
  <Select.Trigger placeholder="Pick a fruit" />
  <Select.Content>
    <Select.List>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana">Banana</Select.Item>
    </Select.List>
  </Select.Content>
</Select>
\`\`\`

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
| \`Select.Value\` | Selected value text rendered inside the trigger. |
| \`Select.Icon\` | Chevron icon slot inside the trigger. |
| \`Select.Portal\` | Portal wrapper for the listbox popup. |
| \`Select.Content\` | The floating listbox panel. |
| \`Select.List\` | Scrollable list of listbox items. |
| \`Select.Group\` | Semantic group of items. |
| \`Select.Label\` | Non-interactive section heading. |
| \`Select.Item\` | A single selectable option. |
| \`Select.ItemText\` | Text label of an item. |
| \`Select.ItemIndicator\` | Checkmark shown in front of the selected item. |
| \`Select.Separator\` | Horizontal divider between groups. |
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text', table: { category: 'SelectField' } },
        placeholder: { control: 'text', table: { category: 'SelectField' } },
        helperText: { control: 'text', table: { category: 'SelectField' } },
        error: { control: 'text', table: { category: 'SelectField' } },
        width: { control: 'text', table: { category: 'SelectField' } },
        size: {
            control: 'select',
            options: SIZES,
            table: { category: 'SelectField' },
        },
        startIcon: { control: 'text', table: { category: 'SelectField' } },
        disabled: { control: 'boolean', table: { category: 'SelectField' } },
        required: { control: 'boolean', table: { category: 'SelectField' } },
        listboxAriaLabel: { control: 'text', table: { category: 'SelectField' } },
        optionsType: {
            control: 'select',
            options: ['flat', 'grouped'],
            table: { category: 'SelectField' },
        },
    },
    args: {
        label: 'Fruit',
        placeholder: 'Pick a fruit',
        size: 'md',
        disabled: false,
        required: false,
        listboxAriaLabel: 'Fruits',
        optionsType: 'flat',
        width: '300px',
    },
} satisfies Meta<SelectPlaygroundArgs>

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
            <SelectField
                {...args}
                options={options}
                value={value}
                onValueChange={setValue}
            />
        )
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('combobox')
        await expect(trigger).toBeInTheDocument()
        await expect(trigger).toHaveTextContent(args.placeholder ?? '')
        await userEvent.click(trigger)
        const listbox = await screen.findByRole('listbox')
        await expect(listbox).toBeInTheDocument()
        // Close the listbox so the a11y audit runs against a stable, valid DOM
        // (Radix marks the rest of the page `aria-hidden` while the Select is open).
        await userEvent.keyboard('{Escape}')
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
    },
}
