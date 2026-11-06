import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'

import { SelectField, type SelectFieldProps } from '@components/forms/select'
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
    tags: ['autodocs'],
    component: SelectField,
    parameters: {
        layout: 'centered',
        docs: {

            page: SelectDocsPage,
            source: { type: 'dynamic', transform: createControlledSource<SelectFieldProps>({ component: 'SelectField', stateProp: 'value', eventProp: 'onValueChange', handler: 'setValue', openState: true, icon: { prop: 'startIcon', name: 'SearchIcon' } }) },
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
        startIcon: { control: 'select', options: ['none', 'search'], mapping: { none: undefined, search: SearchIcon }, table: { category: 'SelectField' } },
        disabled: { control: 'boolean', table: { category: 'SelectField' } },
        required: { control: 'boolean', table: { category: 'SelectField' } },
        listboxAriaLabel: { control: 'text', table: { category: 'SelectField' } },
        options: { control: 'object', table: { category: 'SelectField' } },
        value: { control: 'text', table: { category: 'SelectField' } },
        defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        onValueChange: { control: false, table: { category: 'SelectField' } },
        onOpenChange: { control: false, table: { category: 'SelectField' } },
        open: { control: 'boolean', description: 'Controlled popup state.', table: { category: 'SelectField' } },
        defaultOpen: { control: false, description: 'Initial popup state for uncontrolled usage.', table: { category: 'SelectField' } },
    },
    args: {
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
        width: '300px',
    },
} satisfies Meta<typeof SelectField>

export default meta

type Story = StoryObj<typeof meta>;

/**
 * Synchronizes selection with Controls and forwards the consumer callback.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled select field.
 * @example
 * <ControlledSelect label="Fruit" options={[]} />
 */
const ControlledSelect = (_args: SelectFieldProps) => {
    const [args, updateArgs] = useArgs<SelectFieldProps>()
    const handleValueChange: NonNullable<SelectFieldProps['onValueChange']> = (value) => {
        args.onValueChange?.(value)
        updateArgs({ value })
    }
    const handleOpenChange: NonNullable<SelectFieldProps['onOpenChange']> = (open) => {
        args.onOpenChange?.(open)
        if (args.open !== undefined) {
            updateArgs({ open })
        }
    }

    return (
        <SelectField
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
    render: ControlledSelect,
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('combobox')
        await expect(trigger).toBeInTheDocument()
        await expect(trigger).toHaveTextContent(args.placeholder ?? '')
        await userEvent.click(trigger)
        const listbox = await screen.findByRole('listbox')
        await expect(listbox).toBeInTheDocument()
        // Close the listbox so the a11y audit runs against a stable, valid DOM
        // The popup is portaled outside the story canvas.
        await userEvent.keyboard('{Escape}')
        await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
    },
}

export const GroupedOptions: Story = {
    args: { options: GROUPED_OPTIONS },
    render: ControlledSelect,
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<SelectField label="Small" size="sm" options={${JSON.stringify(FRUIT_OPTIONS)}} />
<SelectField label="Medium" size="md" options={${JSON.stringify(FRUIT_OPTIONS)}} />
<SelectField label="Large" size="lg" options={${JSON.stringify(FRUIT_OPTIONS)}} />`),
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

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(`<SelectField label="Disabled" disabled options={${JSON.stringify(FRUIT_OPTIONS)}} />
<SelectField label="Fruit" helperText="Choose a fruit." options={${JSON.stringify(FRUIT_OPTIONS)}} />
<SelectField label="Invalid fruit" error="Choose a fruit." options={${JSON.stringify(FRUIT_OPTIONS)}} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SelectField
                label={'Disabled'}
                disabled
                options={FRUIT_OPTIONS}
            />
            <SelectField
                label={'Fruit'}
                helperText={'Choose a fruit.'}
                options={FRUIT_OPTIONS}
            />
            <SelectField
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
            ...storySource(`<SelectField label="Fruit" startIcon={SearchIcon} options={${JSON.stringify(FRUIT_OPTIONS)}} />`),
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
