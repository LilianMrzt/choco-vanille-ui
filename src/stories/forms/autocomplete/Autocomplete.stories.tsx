import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'

import { AutocompleteField, type AutocompleteFieldProps } from '@components/forms/autocomplete'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import type { TextFieldSize } from '@components/forms/text-field'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'

const SIZES: TextFieldSize[] = [
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
    tags: ['autodocs'],
    component: AutocompleteField,
    parameters: {
        layout: 'centered',
        docs: {

            page: AutocompleteDocsPage,
            source: { type: 'dynamic', transform: createControlledSource<AutocompleteFieldProps>({ component: 'AutocompleteField', stateProp: 'value', eventProp: 'onValueChange', handler: 'setValue', openState: true, icon: { prop: 'startIcon', name: 'SearchIcon' } }) },
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
        startIcon: { control: 'select', options: ['none', 'search'], mapping: { none: undefined, search: SearchIcon }, table: { category: 'AutocompleteField' } },
        disabled: { control: 'boolean', table: { category: 'AutocompleteField' } },
        required: { control: 'boolean', table: { category: 'AutocompleteField' } },
        listboxAriaLabel: { control: 'text', table: { category: 'AutocompleteField' } },
        emptyText: { control: 'text', table: { category: 'AutocompleteField' } },
        options: { control: 'object', table: { category: 'AutocompleteField' } },
        value: { control: 'text', table: { category: 'AutocompleteField' } },
        defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        onValueChange: { control: false, table: { category: 'AutocompleteField' } },
        onOpenChange: { control: false, table: { category: 'AutocompleteField' } },
        open: { control: 'boolean', description: 'Controlled popup state.', table: { category: 'AutocompleteField' } },
        defaultOpen: { control: false, description: 'Initial popup state for uncontrolled usage.', table: { category: 'AutocompleteField' } },
    },
    args: {
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
        width: '300px',
    },
} satisfies Meta<typeof AutocompleteField>

export default meta

type Story = StoryObj<typeof meta>;

/**
 * Synchronizes the input with Controls and forwards the consumer callback.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled autocomplete field.
 * @example
 * <ControlledAutocomplete label="Fruit" options={[]} />
 */
const ControlledAutocomplete = (_args: AutocompleteFieldProps) => {
    const [args, updateArgs] = useArgs<AutocompleteFieldProps>()
    const handleValueChange: NonNullable<AutocompleteFieldProps['onValueChange']> = (value) => {
        args.onValueChange?.(value)
        updateArgs({ value })
    }
    const handleOpenChange: NonNullable<AutocompleteFieldProps['onOpenChange']> = (open) => {
        args.onOpenChange?.(open)
        if (args.open !== undefined) {
            updateArgs({ open })
        }
    }

    return (
        <AutocompleteField
            {...args}
            onValueChange={handleValueChange}
            onOpenChange={handleOpenChange}
        />
    )
}

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Use the Controls panel to experiment with the field props.',
            },
        },
    },
    render: ControlledAutocomplete,
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

export const GroupedOptions: Story = {
    args: { options: GROUPED_OPTIONS },
    render: ControlledAutocomplete,
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<AutocompleteField label="Small" size="sm" options={${JSON.stringify(FRUIT_OPTIONS)}} />
<AutocompleteField label="Medium" size="md" options={${JSON.stringify(FRUIT_OPTIONS)}} />
<AutocompleteField label="Large" size="lg" options={${JSON.stringify(FRUIT_OPTIONS)}} />`),
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

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(`<AutocompleteField label="Disabled" disabled options={${JSON.stringify(FRUIT_OPTIONS)}} />
<AutocompleteField label="Fruit" helperText="Search for a fruit." options={${JSON.stringify(FRUIT_OPTIONS)}} />
<AutocompleteField label="Invalid fruit" error="Choose a fruit." options={${JSON.stringify(FRUIT_OPTIONS)}} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AutocompleteField
                label={'Disabled'}
                disabled
                options={FRUIT_OPTIONS}
            />
            <AutocompleteField
                label={'Fruit'}
                helperText={'Search for a fruit.'}
                options={FRUIT_OPTIONS}
            />
            <AutocompleteField
                label={'Invalid fruit'}
                error={'Choose a fruit.'}
                options={FRUIT_OPTIONS}
            />
        </div>
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(`<AutocompleteField label="Search" startIcon={SearchIcon} options={${JSON.stringify(FRUIT_OPTIONS)}} />`),
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
