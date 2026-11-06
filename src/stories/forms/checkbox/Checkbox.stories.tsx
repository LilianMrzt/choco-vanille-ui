import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, fn, within } from 'storybook/test'

import { Checkbox, type CheckboxProps } from '@/components/forms/checkbox'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

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

            page: CheckboxDocsPage,            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A styled checkbox control built on top of \`@base-ui/react/checkbox\`.
Supports both controlled (\`checked\` + \`onCheckedChange\`) and uncontrolled (\`defaultChecked\`) modes, and renders an optional accessible inline label.

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
            source: { type: 'dynamic', transform: createControlledSource<CheckboxProps>({ component: 'Checkbox', stateProp: 'checked', eventProp: 'onCheckedChange', handler: 'setValue' }) },
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
    },
    args: {
        label: 'Accept terms and conditions',
        checked: false,
        onCheckedChange: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Checkbox>

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
const ControlledCheckbox = (_args: CheckboxProps) => {
    const [args, updateArgs] = useArgs<CheckboxProps>()
    const handleCheckedChange: NonNullable<CheckboxProps['onCheckedChange']> = (checked, details) => {
        args.onCheckedChange?.(checked, details)
        if (!details.isCanceled) {
            updateArgs({ checked })
        }
    }

    return (
        <Checkbox
            {...args}
            onCheckedChange={handleCheckedChange}
        />
    )
}

export const Playground: Story = {
    parameters: {
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

export const States: Story = {
    parameters: { docs: { ...storySource(`<Checkbox label="Disabled" disabled />
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
