import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { fn } from 'storybook/test'

import {
    NumberField,
    type NumberFieldSize,
    type NumberFieldProps,
} from '@components/forms/number-field'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'

const SIZES: NumberFieldSize[] = ['sm', 'md', 'lg']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
**Accessibility**

| Prop / Attribute                 | Required    | Type     | Notes                                                              |
| -------------------------------- | ----------- | -------- | ------------------------------------------------------------------ |
| \`label\`                          | Recommended | \`string\` | Visible label linked to the numeric input.                         |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Use when \`label\` is omitted.                                       |
| \`error\`                          | No          | \`string\` | Sets \`aria-invalid="true"\` and describes the input with the error. |
| \`min\` / \`max\`                    | No          | \`number\` | Native range validation and bounded stepper behavior.              |

The input is a native numeric control enhanced with keyboard and button increments.
`

const NumberFieldDocsPage = () => (
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
    title: 'Forms/NumberField',
    tags: ['autodocs'],
    component: NumberField,
    parameters: {
        layout: 'centered',
        docs: {
            page: NumberFieldDocsPage,
            source: { type: 'dynamic', transform: createControlledSource<NumberFieldProps>({ component: 'NumberField', stateProp: 'value', eventProp: 'onValueChange', stateType: 'number | null', handler: 'setValue' }) },
            description: {
                component: md /* language=markdown */ `
A numeric field with min/max constraints, keyboard and button increments, and TextField-compatible helper and error messaging.
        `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        size: { control: 'select', options: SIZES },
        min: { control: 'number' },
        max: { control: 'number' },
        step: { control: 'number' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        readOnly: { control: 'boolean' },
        value: { control: 'number' },
        defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        onValueChange: { control: false },
        onValueCommitted: { control: false },
    },
    args: {
        label: 'Quantity',
        value: 2,
        onValueChange: fn(),
        onValueCommitted: fn(),
        min: 0,
        max: 10,
        step: 1,
        size: 'md',
    },
} satisfies Meta<typeof NumberField>

export default meta

type Story = StoryObj<typeof meta>;

/**
 * Keeps the numeric value and callback synchronized with Storybook args.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled numeric field.
 * @example
 * <ControlledNumberField label="Quantity" />
 */
const ControlledNumberField = (_args: NumberFieldProps) => {
    const [args, updateArgs] = useArgs<NumberFieldProps>()
    const handleValueChange: NonNullable<NumberFieldProps['onValueChange']> = (value, details) => {
        args.onValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <NumberField
            {...args}
            onValueChange={handleValueChange}
        />
    )
}

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground for numeric values and validation constraints.',
            },
        },
    },
    render: ControlledNumberField,
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<NumberField label="Small" size="sm" />
<NumberField label="Medium" size="md" />
<NumberField label="Large" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <NumberField
                label={'Small'}
                size={'sm'}
                defaultValue={1}
            />
            <NumberField
                label={'Medium'}
                size={'md'}
                defaultValue={1}
            />
            <NumberField
                label={'Large'}
                size={'lg'}
                defaultValue={1}
            />
        </div>
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(`
<NumberField label="Disabled" disabled defaultValue={4} />
<NumberField label="Invalid" error="Choose a value from 0 to 10" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <NumberField
                label={'Disabled'}
                disabled
                defaultValue={4}
            />
            <NumberField
                label={'Invalid'}
                error={'Choose a value from 0 to 10'}
            />
        </div>
    ),
}
