import { useState, type ComponentProps, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { SelectField } from '@components/forms/select'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import type { TextFieldSize } from '@components/forms/text-field'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const SIZES: TextFieldSize[] = [
    'sm',
    'md',
    'lg',
]
const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72] as const

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

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
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

const SelectDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Forms/Select',
    component: SelectField as ComponentType<SelectPlaygroundArgs>,
    parameters: {
        layout: 'centered',
        docs: {

            page: SelectDocsPage,            description: {
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
        fontSize: { control: 'select', options: FONT_SIZES, table: { category: 'SelectField' } },
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
        fontSize: 16,
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
        docs: { ...storySource(`<SelectField />`),
            description: {
                story:
          'Interactive playground â€” use the Controls panel to experiment with every available prop.',
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

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<SelectField label="Small" size="sm" options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="Medium" size="md" options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="Large" size="lg" options={[{ value: "apple", label: "Apple" }]} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SelectField
                label={'Small'}
                size={'sm'}
                options={FRUIT_OPTIONS}
            />
            <SelectField
                label={'Medium'}
                size={'md'}
                options={FRUIT_OPTIONS}
            />
            <SelectField
                label={'Large'}
                size={'lg'}
                options={FRUIT_OPTIONS}
            />
        </div>
    ),
}

export const FontSizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<SelectField label="10" fontSize={10} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="12" fontSize={12} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="14" fontSize={14} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="16" fontSize={16} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="18" fontSize={18} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="20" fontSize={20} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="24" fontSize={24} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="30" fontSize={30} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="36" fontSize={36} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="48" fontSize={48} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="60" fontSize={60} options={[{ value: "apple", label: "Apple" }]} />
<SelectField label="72" fontSize={72} options={[{ value: "apple", label: "Apple" }]} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FONT_SIZES.map((fontSize) => (
                <SelectField
                    key={fontSize}
                    label={String(fontSize)}
                    fontSize={fontSize}
                    options={FRUIT_OPTIONS}
                />
            ))}
        </div>
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(`<SelectField label="Disabled" disabled options={[{ value: "apple", label: "Apple" }]} />`),
        },
    },
    render: () => (
        <SelectField
            label={'Disabled'}
            disabled
            options={FRUIT_OPTIONS}
        />
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(`<SelectField label="Fruit" startIcon={SearchIcon} options={[{ value: "apple", label: "Apple" }]} />`),
        },
    },
    render: () => (
        <SelectField
            label={'Fruit'}
            startIcon={SearchIcon}
            options={FRUIT_OPTIONS}
        />
    ),
}
