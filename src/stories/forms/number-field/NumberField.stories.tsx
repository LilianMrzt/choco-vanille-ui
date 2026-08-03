import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'

import {
    NumberField,
    type NumberFieldSize,
} from '@components/forms/number-field'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

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
    component: NumberField,
    parameters: {
        layout: 'centered',
        docs: {
            page: NumberFieldDocsPage,
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
    },
    args: {
        label: 'Quantity',
        defaultValue: 2,
        min: 0,
        max: 10,
        step: 1,
        size: 'md',
    },
} satisfies Meta<typeof NumberField>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            ...storySource('<NumberField />'),
            description: {
                story:
          'Interactive playground for numeric values and validation constraints.',
            },
        },
    },
    render: (args) => {
        const [value, setValue] = useState<number | null>(
            args.defaultValue ?? null,
        )
        return (
            <NumberField
                {...args}
                value={value}
                onValueChange={(nextValue) => setValue(nextValue)}
            />
        )
    },
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
