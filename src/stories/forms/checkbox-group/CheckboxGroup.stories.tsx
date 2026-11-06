import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, fn, within } from 'storybook/test'

import { CheckboxGroup, type CheckboxGroupProps } from '@/components/forms/checkbox-group'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-label\` / \`aria-labelledby\` on \`CheckboxGroup\` | Yes when no visible group label | \`string\` | Announces the purpose of the group. |
| \`label\` on \`CheckboxGroup.Item\` | Conditional | \`string\` | Associates a visible label with its checkbox. |
| \`aria-label\` on \`CheckboxGroup.Item\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables the group or an individual item. |

Keyboard interaction is provided by the native checkbox semantics.
`

const CheckboxGroupDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

type CheckboxGroupStoryArgs = CheckboxGroupProps & {
    headerLabel: string
    labelOne: string
    labelTwo: string
    labelThree: string
}

const meta: Meta<CheckboxGroupStoryArgs> = {
    title: 'Forms/CheckboxGroup',
    tags: ['autodocs'],
    component: CheckboxGroup,
    parameters: {
        layout: 'centered',
        docs: {
            page: CheckboxGroupDocsPage,
            source: {
                type: 'dynamic',
                transform: createControlledSource<CheckboxGroupStoryArgs>({
                    component: 'CheckboxGroup',
                    stateProp: 'value',
                    eventProp: 'onValueChange',
                    stateType: 'string[]',
                    handler: 'setValue',
                    omitted: ['headerLabel', 'labelOne', 'labelTwo', 'labelThree'],
                    children: (args) => [
                        `        <CheckboxGroup.Header label={${JSON.stringify(args.headerLabel)}} />`,
                        `        <CheckboxGroup.Item value="email" label={${JSON.stringify(args.labelOne)}} />`,
                        `        <CheckboxGroup.Item value="sms" label={${JSON.stringify(args.labelTwo)}} />`,
                        `        <CheckboxGroup.Item value="push" label={${JSON.stringify(args.labelThree)}} />`,
                    ].join('\n'),
                }),
            },
            description: {
                component: md /* language=markdown */ `
A group of independently selectable checkboxes built on top of \`@base-ui/react/checkbox-group\`.
Compose \`CheckboxGroup\` with \`CheckboxGroup.Item\` children.
                `,
            },
        },
    },
    argTypes: {
        disabled: { control: 'boolean', table: { category: 'CheckboxGroup' } },
        label: { control: 'text', table: { category: 'CheckboxGroup' } },
        helperText: { control: 'text', table: { category: 'CheckboxGroup' } },
        error: { control: 'text', table: { category: 'CheckboxGroup' } },
        value: { control: 'object', table: { category: 'CheckboxGroup' } },
        defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        onValueChange: { control: false, table: { category: 'CheckboxGroup' } },
        headerLabel: { control: 'text', table: { category: 'Compound: Header' } },
        labelOne: { control: 'text', table: { category: 'Compound: Item' } },
        labelTwo: { control: 'text', table: { category: 'Compound: Item' } },
        labelThree: { control: 'text', table: { category: 'Compound: Item' } },
    },
    args: {
        disabled: false,
        label: 'Notification preferences',
        helperText: 'Select all that apply.',
        value: [],
        onValueChange: fn(),
        headerLabel: 'All notifications',
        labelOne: 'Email',
        labelTwo: 'SMS',
        labelThree: 'Push notifications',
    },
}

export default meta

type Story = StoryObj<typeof meta>

/**
 * Synchronizes group selection and forwards the change callback.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled group and its demo items.
 * @example
 * <ControlledCheckboxGroup headerLabel="All" labelOne="Email" labelTwo="SMS" labelThree="Push" />
 */
const ControlledCheckboxGroup = (_args: CheckboxGroupStoryArgs) => {
    const [args, updateArgs] = useArgs<CheckboxGroupStoryArgs>()
    const { headerLabel, labelOne, labelTwo, labelThree, ...groupProps } = args
    const handleValueChange: NonNullable<CheckboxGroupProps['onValueChange']> = (value, details) => {
        groupProps.onValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <CheckboxGroup
            {...groupProps}
            onValueChange={handleValueChange}
        >
            <CheckboxGroup.Header label={headerLabel} />
            <CheckboxGroup.Item
                value={'email'}
                label={labelOne}
            />
            <CheckboxGroup.Item
                value={'sms'}
                label={labelTwo}
            />
            <CheckboxGroup.Item
                value={'push'}
                label={labelThree}
            />
        </CheckboxGroup>
    )
}

export const Playground: Story = {
    parameters: {
        docs: {
            description: { story: 'Interactive playground for the group and its checkbox items.' },
        },
    },
    render: ControlledCheckboxGroup,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getAllByRole('checkbox')).toHaveLength(4)
    },
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(`
<CheckboxGroup disabled aria-label="Notifications">
    <CheckboxGroup.Header label="All notifications" />
    <CheckboxGroup.Item value="email" label="Email" />
</CheckboxGroup>`),
        },
    },
    render: () => (
        <CheckboxGroup
            disabled
            aria-label={'Notifications'}
        >
            <CheckboxGroup.Header label={'All notifications'} />
            <CheckboxGroup.Item
                value={'email'}
                label={'Email'}
            />
        </CheckboxGroup>
    ),
}
