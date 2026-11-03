import { useState, type ComponentProps, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, screen, userEvent, waitFor, within } from 'storybook/test'

import { AutocompleteField } from '@components/forms/autocomplete'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import type { TextFieldSize } from '@components/forms/text-field'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

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

type AutocompletePlaygroundArgs = Omit<ComponentProps<typeof AutocompleteField>, 'options'> & {
    options?: ComponentProps<typeof AutocompleteField>['options']
    optionsType?: 'flat' | 'grouped'
}

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
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
`

const AutocompleteDocsPage = () => (
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
    title: 'Forms/Autocomplete',
    component: AutocompleteField as ComponentType<AutocompletePlaygroundArgs>,
    parameters: {
        layout: 'centered',
        docs: {

            page: AutocompleteDocsPage,            description: {
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
        fontSize: { control: 'select', options: FONT_SIZES, table: { category: 'AutocompleteField' } },
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
        fontSize: 16,
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
        docs: { ...storySource(`<AutocompleteField />`),
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

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<AutocompleteField label="Small" size="sm" options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="Medium" size="md" options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="Large" size="lg" options={[{ value: "apple", label: "Apple" }]} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AutocompleteField
                label={'Small'}
                size={'sm'}
                options={FRUIT_OPTIONS}
            />
            <AutocompleteField
                label={'Medium'}
                size={'md'}
                options={FRUIT_OPTIONS}
            />
            <AutocompleteField
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
<AutocompleteField label="10" fontSize={10} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="12" fontSize={12} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="14" fontSize={14} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="16" fontSize={16} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="18" fontSize={18} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="20" fontSize={20} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="24" fontSize={24} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="30" fontSize={30} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="36" fontSize={36} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="48" fontSize={48} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="60" fontSize={60} options={[{ value: "apple", label: "Apple" }]} />
<AutocompleteField label="72" fontSize={72} options={[{ value: "apple", label: "Apple" }]} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FONT_SIZES.map((fontSize) => (
                <AutocompleteField
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
            ...storySource(`<AutocompleteField label="Disabled" disabled options={[{ value: "apple", label: "Apple" }]} />`),
        },
    },
    render: () => (
        <AutocompleteField
            label={'Disabled'}
            disabled
            options={FRUIT_OPTIONS}
        />
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(`<AutocompleteField label="Search" startIcon={SearchIcon} options={[{ value: "apple", label: "Apple" }]} />`),
        },
    },
    render: () => (
        <AutocompleteField
            label={'Search'}
            startIcon={SearchIcon}
            options={FRUIT_OPTIONS}
        />
    ),
}
