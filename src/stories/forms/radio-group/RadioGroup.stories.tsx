import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { RadioGroup } from '@/components/forms/radio-group'
import { md } from '@stories/utils/markdown'

type RadioGroupPlaygroundArgs = ComponentProps<typeof RadioGroup> & {
  labelOne?: string;
  labelTwo?: string;
  labelThree?: string;
};

const meta: Meta<RadioGroupPlaygroundArgs> = {
    title: 'Forms/RadioGroup',
    component: RadioGroup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A group of mutually exclusive radio options built on top of \`@radix-ui/react-radio-group\`.
Compose \`RadioGroup\` with one or more \`RadioGroup.Item\` children. Each item renders a radio control with an optional visible label.

**Usage**

\`\`\`tsx
// Uncontrolled
<RadioGroup defaultValue="system">
  <RadioGroup.Item value="light" label="Light" />
  <RadioGroup.Item value="dark" label="Dark" />
  <RadioGroup.Item value="system" label="System" />
</RadioGroup>

// Controlled
const [theme, setTheme] = useState('system')
<RadioGroup value={theme} onValueChange={setTheme}>
  <RadioGroup.Item value="light" label="Light" />
  <RadioGroup.Item value="dark" label="Dark" />
  <RadioGroup.Item value="system" label="System" />
</RadioGroup>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-label\` / \`aria-labelledby\` on \`RadioGroup\` | ✅ Yes | \`string\` | Announces the group purpose when no visible group label is present. |
| \`label\` on \`RadioGroup.Item\` | Conditional | \`string\` | Visible label for the option; auto-associated via a generated \`id\`. |
| \`aria-label\` on \`RadioGroup.Item\` | Conditional | \`string\` | Required when \`label\` is omitted to give each option an accessible name. |
| \`disabled\` (item) | No | \`boolean\` | Marks a single option as unavailable; skipped by keyboard navigation. |
| \`disabled\` (group) | No | \`boolean\` | Disables every child item at once. |
| \`orientation\` | No | \`'horizontal' \\| 'vertical'\` | Informs assistive technology of layout; affects expected arrow-key direction. |

- Keyboard navigation is handled automatically: **Arrow keys** move between options; **Space** selects the focused option.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`RadioGroup\` | Root context provider that manages the single-selection state. |
| \`RadioGroup.Item\` | A single radio option with an optional visible label. |
                `,
            },
        },
    },
    argTypes: {
        orientation: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            table: { category: 'RadioGroup' },
        },
        disabled: {
            control: 'boolean',
            table: { category: 'RadioGroup' },
        },
        required: {
            control: 'boolean',
            table: { category: 'RadioGroup' },
        },
        labelOne: {
            control: 'text',
            table: { category: 'RadioGroup.Item' },
        },
        labelTwo: {
            control: 'text',
            table: { category: 'RadioGroup.Item' },
        },
        labelThree: {
            control: 'text',
            table: { category: 'RadioGroup.Item' },
        },
    },
    args: {
        defaultValue: 'system',
        orientation: 'vertical',
        disabled: false,
        required: false,
        labelOne: 'Light',
        labelTwo: 'Dark',
        labelThree: 'System',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — every prop for the group and its items is exposed in the Controls panel, grouped by component.',
            },
        },
    },
    render: ({
        orientation,
        disabled,
        required,
        labelOne,
        labelTwo,
        labelThree,
        ...args
    }) => {
        const [value, setValue] = useState(args.defaultValue as string)
        return (
            <RadioGroup
                {...args}
                value={value}
                onValueChange={setValue}
                orientation={orientation}
                disabled={disabled}
                required={required}
                aria-label={'Theme preference'}
            >
                <RadioGroup.Item
                    value={'light'}
                    label={labelOne}
                />
                <RadioGroup.Item
                    value={'dark'}
                    label={labelTwo}
                />
                <RadioGroup.Item
                    value={'system'}
                    label={labelThree}
                />
            </RadioGroup>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const radios = canvas.getAllByRole('radio')
        await expect(radios).toHaveLength(3)
        await expect(canvas.getByRole('radio', { name: 'System' })).toBeChecked()
    },
}