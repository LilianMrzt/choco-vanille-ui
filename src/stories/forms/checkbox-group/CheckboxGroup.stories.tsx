import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { CheckboxGroup, type CheckboxGroupProps } from '@/components/forms/checkbox-group'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

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
    component: CheckboxGroup,
    parameters: {
        layout: 'centered',
        docs: {
            page: CheckboxGroupDocsPage,
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
        headerLabel: { control: 'text', table: { category: 'Compound: Header' } },
        labelOne: { control: 'text', table: { category: 'Compound: Item' } },
        labelTwo: { control: 'text', table: { category: 'Compound: Item' } },
        labelThree: { control: 'text', table: { category: 'Compound: Item' } },
    },
    args: {
        disabled: false,
        headerLabel: 'All notifications',
        labelOne: 'Email',
        labelTwo: 'SMS',
        labelThree: 'Push notifications',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            ...storySource(`<CheckboxGroup allValues={['email', 'sms', 'push']}><CheckboxGroup.Header label="All notifications" /><CheckboxGroup.Item value="email" label="Email" /><CheckboxGroup.Item value="sms" label="SMS" /><CheckboxGroup.Item value="push" label="Push notifications" /></CheckboxGroup>`),
            description: { story: 'Interactive playground for the group and its checkbox items.' },
        },
    },
    render: ({
        disabled,
        headerLabel,
        labelOne,
        labelTwo,
        labelThree,
    }: CheckboxGroupStoryArgs) => {
        const [value, setValue] = useState<string[]>([])

        return (
            <CheckboxGroup
                allValues={['email', 'sms', 'push']}
                value={value}
                onValueChange={setValue}
                disabled={disabled}
                aria-label={'Notification preferences'}
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
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getAllByRole('checkbox')).toHaveLength(4)
        await expect(canvas.getByRole('checkbox', { name: 'Email' })).not.toBeChecked()
        await expect(canvas.getByRole('checkbox', { name: 'All notifications' })).not.toBeChecked()
    },
}

export const States: Story = {
    parameters: {
        docs: { ...storySource(`<CheckboxGroup disabled aria-label="Notifications"><CheckboxGroup.Item value="email" label="Email" /></CheckboxGroup>`) },
    },
    render: () => (
        <CheckboxGroup
            allValues={['email']}
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
