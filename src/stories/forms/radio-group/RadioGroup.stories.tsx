import { type ComponentProps } from 'react'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, fn, within } from 'storybook/test'

import { RadioGroup } from '@/components/forms/radio-group'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'

type RadioGroupPlaygroundArgs = ComponentProps<typeof RadioGroup> & {
  labelOne?: string;
  labelTwo?: string;
  labelThree?: string;
};

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` / \`aria-label\` / \`aria-labelledby\` on \`RadioGroup\` | Yes | \`string\` | Announces the group purpose. |
| \`helperText\` / \`error\` | No | \`string\` | Supporting text associated with the group or an item. |
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
    tags: ['autodocs'],
    component: RadioGroup,
    parameters: {
        layout: 'centered',
        docs: {

            page: RadioGroupDocsPage,
            source: {
                type: 'dynamic',
                transform: createControlledSource<RadioGroupPlaygroundArgs>({
                    component: 'RadioGroup',
                    stateProp: 'value',
                    eventProp: 'onValueChange',
                    handler: 'setValue',
                    omitted: ['labelOne', 'labelTwo', 'labelThree'],
                    children: (args) => [
                        `        <RadioGroup.Item value="light" label={${JSON.stringify(args.labelOne)}} />`,
                        `        <RadioGroup.Item value="dark" label={${JSON.stringify(args.labelTwo)}} />`,
                        `        <RadioGroup.Item value="system" label={${JSON.stringify(args.labelThree)}} />`,
                    ].join('\n'),
                }),
            },
            description: {
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
        label: { control: 'text', table: { category: 'RadioGroup' } },
        helperText: { control: 'text', table: { category: 'RadioGroup' } },
        error: { control: 'text', table: { category: 'RadioGroup' } },
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
        value: { control: 'select', options: ['light', 'dark', 'system'], table: { category: 'RadioGroup' } },
        defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        onValueChange: { control: false, table: { category: 'RadioGroup' } },
    },
    args: {
        label: 'Theme preference',
        helperText: 'Choose one option.',
        value: 'system',
        onValueChange: fn(),
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

/**
 * Synchronizes radio selection and forwards the change callback.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled group and its demo items.
 * @example
 * <ControlledRadioGroup label="Theme" />
 */
const ControlledRadioGroup = (_args: RadioGroupPlaygroundArgs) => {
    const [args, updateArgs] = useArgs<RadioGroupPlaygroundArgs>()
    const { labelOne, labelTwo, labelThree, ...groupProps } = args
    const handleValueChange: NonNullable<ComponentProps<typeof RadioGroup>['onValueChange']> = (value, details) => {
        groupProps.onValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <RadioGroup
            {...groupProps}
            onValueChange={handleValueChange}
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
}

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Use the Controls panel to experiment with the group and its item labels.',
            },
        },
    },
    render: ControlledRadioGroup,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const radios = canvas.getAllByRole('radio')
        await expect(radios).toHaveLength(3)
    },
}

export const ItemHelp: Story = {
    parameters: {
        docs: {
            ...storySource(`<RadioGroup label="Theme">
    <RadioGroup.Item value="system" label="System" helperText="Follow your device settings." />
</RadioGroup>`),
        },
    },
    render: () => (
        <RadioGroup label={'Theme'}>
            <RadioGroup.Item
                value={'system'}
                label={'System'}
                helperText={'Follow your device settings.'}
            />
        </RadioGroup>
    ),
}

export const Horizontal: Story = {
    parameters: { docs: { ...storySource(`<RadioGroup label="Theme" defaultValue="system" aria-orientation="horizontal">
    <div style={{ display: 'flex', gap: '1rem' }}>
        <RadioGroup.Item value="light" label="Light" />
        <RadioGroup.Item value="dark" label="Dark" />
        <RadioGroup.Item value="system" label="System" />
    </div>
</RadioGroup>`) } },
    render: () => (
        <RadioGroup
            label={'Theme'}
            defaultValue={'system'}
            aria-orientation={'horizontal'}
        >
            <div style={{ display: 'flex', gap: '1rem' }}>
                <RadioGroup.Item
                    value={'light'}
                    label={'Light'}
                />
                <RadioGroup.Item
                    value={'dark'}
                    label={'Dark'}
                />
                <RadioGroup.Item
                    value={'system'}
                    label={'System'}
                />
            </div>
        </RadioGroup>
    ),
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
