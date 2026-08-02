import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { RadioGroup } from '@/components/forms/radio-group'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type RadioGroupPlaygroundArgs = ComponentProps<typeof RadioGroup> & {
  labelOne?: string;
  labelTwo?: string;
  labelThree?: string;
  compoundRadioItem?: string;
};

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-label\` / \`aria-labelledby\` on \`RadioGroup\` | âœ… Yes | \`string\` | Announces the group purpose when no visible group label is present. |
| \`label\` on \`RadioGroup.Item\` | Conditional | \`string\` | Visible label for the option; auto-associated via a generated \`id\`. |
| \`aria-label\` on \`RadioGroup.Item\` | Conditional | \`string\` | Required when \`label\` is omitted to give each option an accessible name. |
| \`disabled\` (item) | No | \`boolean\` | Marks a single option as unavailable; skipped by keyboard navigation. |
| \`disabled\` (group) | No | \`boolean\` | Disables every child item at once. |
| \`orientation\` | No | \`'horizontal' \\| 'vertical'\` | Informs assistive technology of layout; affects expected arrow-key direction. (Set \`aria-orientation\` yourself; Base UI RadioGroup does not expose an orientation prop.) |

- Keyboard navigation is handled automatically: **Arrow keys** move between options; **Space** selects the focused option.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`RadioGroup\` | Root context provider that manages the single-selection state. |
| \`RadioGroup.Item\` | A single radio option with an optional visible label. |
`

const RadioGroupDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<RadioGroupPlaygroundArgs> = {
    title: 'Forms/RadioGroup',
    component: RadioGroup,
    parameters: {
        layout: 'centered',
        docs: {

            page: RadioGroupDocsPage,            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A group of mutually exclusive radio options built on top of \`@base-ui/react/radio-group\` and \`@base-ui/react/radio\`.
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
                `,
            },
        },
    },
    argTypes: {
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
        compoundRadioItem: { control: 'text', table: { category: 'Compound: RadioItem' } },
    },
    args: {
        defaultValue: 'system',
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
        docs: { ...storySource(`<RadioGroup />`),
            description: {
                story:
          'Interactive playground â€” every prop for the group and its items is exposed in the Controls panel, grouped by component.',
            },
        },
    },
    render: ({
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

export const Horizontal: Story = {
    parameters: { docs: { ...storySource(`<RadioGroup />`) } },
    render: ({
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
                disabled={disabled}
                required={required}
                aria-label={'Theme preference'}
            >
                <div style={{ display: 'flex', gap: '1rem' }}>
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
                </div>
            </RadioGroup>
        )
    },
}

export const States: Story = {
    parameters: { docs: { ...storySource(`<RadioGroup disabled aria-label="Theme"><RadioGroup.Item value="system" label="System" /></RadioGroup>`) } },
    render: () => (
        <RadioGroup
            disabled
            aria-label={'Theme'}
        >
            <RadioGroup.Item
                value={'system'}
                label={'System'}
            />
        </RadioGroup>
    ),
}
