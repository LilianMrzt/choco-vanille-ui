import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, fn, within } from 'storybook/test'

import { Checkbox, type CheckboxProps } from '@/components/forms/checkbox'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'
import CompoundPlayground from '@stories/forms/checkbox/components/compound-playground/CompoundPlayground'
import GroupPlayground from '@stories/forms/checkbox/components/group-playground/GroupPlayground'
import GroupDisabledExample from '@stories/forms/checkbox/components/group-disabled/GroupDisabled'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'
import { createCompoundSource } from '@stories/forms/checkbox/utils/create-compound-source/createCompoundSource.utils'
import { createGroupSource } from '@stories/forms/checkbox/utils/create-group-source/createGroupSource.utils'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
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
`

const CheckboxDocsPage = () => (
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
    title: 'Forms/Checkbox',
    tags: ['autodocs'],
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {

            page: CheckboxDocsPage,
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A checkbox with controlled and uncontrolled modes and optional supporting text.
\`CheckboxGroup.Item\` is the same component. Compose \`Checkbox.Root\` and \`Checkbox.Indicator\` for custom content.
For a group parent, provide \`allValues\`; disabled selections and values outside its scope are preserved.

**Usage**

\`\`\`tsx
// Uncontrolled
<Checkbox label="Accept terms and conditions" defaultChecked />

// Controlled
const [accepted, setAccepted] = useState(false)
<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onCheckedChange={(val) => setAccepted(val === true)}
/>
\`\`\`
                `,
            },
            source: { type: 'dynamic', transform: createControlledSource<CheckboxStoryArgs>({ component: 'Checkbox', stateProp: 'checked', eventProp: 'onCheckedChange', handler: 'setValue', omitted: ['compoundLabel', 'indicatorText', 'indicatorKeepMounted', 'groupLabel', 'groupHelperText', 'groupError', 'groupDisabled', 'groupValue', 'groupOnValueChange', 'groupHeaderLabel', 'groupLabelOne', 'groupLabelTwo', 'groupLabelThree'] }) },
        },
    },
    argTypes: {
        label: { control: 'text' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        checked: { control: 'boolean' },
        defaultChecked: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        indeterminate: { control: 'boolean' },
        onCheckedChange: { control: false },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
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
    },
    args: {
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
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<CheckboxStoryArgs>

export default meta

type Story = StoryObj<typeof meta>;

/**
 * Keeps the checked control and callback synchronized with Storybook args.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled checkbox.
 * @example
 * <ControlledCheckbox label="Accept" />
 */
const ControlledCheckbox = (_args: CheckboxStoryArgs) => {
    const [args, updateArgs] = useArgs<CheckboxStoryArgs>()
    const {
        compoundLabel: _compoundLabel, indicatorText: _indicatorText, indicatorKeepMounted: _indicatorKeepMounted,
        groupLabel: _groupLabel, groupHelperText: _groupHelperText, groupError: _groupError,
        groupDisabled: _groupDisabled, groupValue: _groupValue, groupOnValueChange: _groupOnValueChange,
        groupHeaderLabel: _groupHeaderLabel, groupLabelOne: _groupLabelOne,
        groupLabelTwo: _groupLabelTwo, groupLabelThree: _groupLabelThree, ...checkboxProps
    } = args
    const handleCheckedChange: NonNullable<CheckboxProps['onCheckedChange']> = (checked, details) => {
        args.onCheckedChange?.(checked, details)
        if (!details.isCanceled) {
            updateArgs({ checked })
        }
    }

    return (
        <Checkbox
            {...checkboxProps}
            onCheckedChange={handleCheckedChange}
        />
    )
}

export const Playground: Story = {
    parameters: {
        controls: { include: ['label', 'helperText', 'error', 'checked', 'defaultChecked', 'indeterminate', 'onCheckedChange', 'disabled', 'required'] },
        docs: {
            description: {
                story:
          'Use the Controls panel to experiment with the checkbox props.',
            },
        },
    },
    render: ControlledCheckbox,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const checkbox = canvas.getByRole('checkbox')
        await expect(checkbox).toBeInTheDocument()
    },
}

export const Compound: Story = {
    parameters: {
        controls: { include: ['checked', 'indeterminate', 'onCheckedChange', 'disabled', 'required', 'compoundLabel', 'indicatorText', 'indicatorKeepMounted'] },
        docs: {
            description: { story: 'Compose the root and indicator independently; the indicator content and mounting behavior are controlled by their slot controls.' },
            source: { type: 'dynamic', transform: createCompoundSource },
        },
    },
    render: CompoundPlayground,
}

export const Group: Story = {
    parameters: {
        controls: { include: ['groupLabel', 'groupHelperText', 'groupError', 'groupDisabled', 'groupValue', 'groupOnValueChange', 'groupHeaderLabel', 'groupLabelOne', 'groupLabelTwo', 'groupLabelThree'] },
        docs: {
            description: { story: 'A controlled group with a parent checkbox. The group controls affect only the group and its slots.' },
            source: { type: 'dynamic', transform: createGroupSource },
        },
    },
    render: GroupPlayground,
    play: async ({ canvasElement }) => {
        await expect(within(canvasElement).getAllByRole('checkbox')).toHaveLength(4)
    },
}

export const GroupDisabled: Story = {
    parameters: {
        controls: { disable: true },
        docs: {
            ...storySource(`
<CheckboxGroup disabled aria-label="Notifications" allValues={['email']}>
    <CheckboxGroup.Header label="All notifications" />
    <CheckboxGroup.Item value="email" label="Email" />
</CheckboxGroup>`),
        },
    },
    render: GroupDisabledExample,
}

export const States: Story = {
    parameters: { controls: { disable: true }, docs: { ...storySource(`<Checkbox label="Disabled" disabled />
<Checkbox label="Updates" helperText="Receive occasional updates." />
<Checkbox label="Consent" error="Consent is required." />`) } },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Checkbox
                label={'Disabled'}
                disabled
            />
            <Checkbox
                label={'Updates'}
                helperText={'Receive occasional updates.'}
            />
            <Checkbox
                label={'Consent'}
                error={'Consent is required.'}
            />
        </div>
    ),
}
