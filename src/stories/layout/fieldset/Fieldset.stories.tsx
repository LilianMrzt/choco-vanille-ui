import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { Checkbox } from '@/components/forms/checkbox'
import { Fieldset } from '@/components/layout/fieldset'
import { Legend } from '@/components/layout/legend'
import { RadioGroup } from '@/components/forms/radio-group'
import { Flex } from '@/components/layout/flex'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type FieldsetPlaygroundArgs = ComponentProps<typeof Fieldset> & {
  legend?: string;
  disabled?: boolean;
};

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`Legend\` | Yes | \`ReactNode\` | Provides the accessible name for the group. |
| \`disabled\` | No | \`boolean\` | Disables all controls inside the fieldset. |
`

const FieldsetDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<FieldsetPlaygroundArgs> = {
    title: 'Layout/Fieldset',
    component: Fieldset,
    parameters: {
        layout: 'centered',
        docs: {
            page: FieldsetDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A thin, unstyled wrapper around the native \`<fieldset>\` element, paired with \`Legend\` for the group label.

**When to use**

Use \`Fieldset\` + \`Legend\` whenever several form controls belong to a single question or category. The legend is announced by screen readers whenever the user focuses a control inside the fieldset, so the group purpose is never lost.

- **Radio groups** — every set of radios that answers one question should live in a fieldset with a legend (e.g. "Choose a plan").
- **Checkbox groups** — multiple checkboxes that share a theme, such as "Notification preferences".
- **Sub-sections of long forms** — group related fields like "Billing address" or "Payment method".
- **Disabled groups** — set \`disabled\` on the fieldset to disable every control inside it at once.

**How to use**

~~~tsx
<Fieldset>
  <Legend>Choose a plan</Legend>
  <RadioGroup defaultValue="starter">
    <RadioGroup.Item value="starter" label="Starter" />
    <RadioGroup.Item value="pro" label="Pro" />
  </RadioGroup>
</Fieldset>

<Fieldset disabled>
  <Legend>Notification preferences</Legend>
  <Checkbox label="Email" />
  <Checkbox label="Push" />
</Fieldset>
~~~

        `,
            },
        },
    },
    argTypes: {
        legend: {
            control: 'text',
            table: { category: 'Fieldset' },
        },
        disabled: {
            control: 'boolean',
            table: { category: 'Fieldset' },
        },
    },
    args: {
        legend: 'Choose a plan',
        disabled: false,
    },
    decorators: [
        (Story) => (
            <div style={{ width: '320px' }}>
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
          'Interactive playground — toggle the legend text and the disabled state from the Controls panel.',
            },
            ...storySource(/* language=tsx */ `
<Fieldset>
    <Legend>Choose a plan</Legend>
    <RadioGroup value="starter" aria-label="Choose a plan">
        <RadioGroup.Item value="starter" label="Starter" />
        <RadioGroup.Item value="pro" label="Pro" />
        <RadioGroup.Item value="enterprise" label="Enterprise" />
    </RadioGroup>
</Fieldset>`),
        },
    },
    render: ({ legend, disabled }) => {
        const [plan, setPlan] = useState('starter')

        return (
            <Fieldset disabled={disabled}>
                <Legend>{legend}</Legend>
                <RadioGroup
                    value={plan}
                    onValueChange={setPlan}
                    aria-label={legend}
                >
                    <RadioGroup.Item
                        value={'starter'}
                        label={'Starter'}
                    />
                    <RadioGroup.Item
                        value={'pro'}
                        label={'Pro'}
                    />
                    <RadioGroup.Item
                        value={'enterprise'}
                        label={'Enterprise'}
                    />
                </RadioGroup>
            </Fieldset>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const group = canvas.getByRole('group')
        const radios = canvas.getAllByRole('radio')

        await expect(group).toBeInTheDocument()
        await expect(radios).toHaveLength(3)
        await expect(canvas.getByRole('radio', { name: 'Starter' })).toBeChecked()
    },
}

export const CheckboxGroup: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'A checkbox group inside a fieldset. The legend describes the whole set of options.',
            },
            ...storySource(/* language=tsx */ `
<Fieldset>
    <Legend>Notification preferences</Legend>
    <Flex flexDirection="column" gap="sm" alignItems="start">
        <Checkbox label="Email" checked />
        <Checkbox label="Push" />
        <Checkbox label="SMS" />
    </Flex>
</Fieldset>`),
        },
    },
    render: () => {
        const [values, setValues] = useState<string[]>(['email'])

        const toggle = (value: string) => {
            setValues((prev) =>
                prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value],
            )
        }

        return (
            <Fieldset>
                <Legend>Notification preferences</Legend>
                <Flex
                    flexDirection={'column'}
                    gap={'sm'}
                    alignItems={'start'}
                >
                    <Checkbox
                        label={'Email'}
                        checked={values.includes('email')}
                        onCheckedChange={() => toggle('email')}
                    />
                    <Checkbox
                        label={'Push'}
                        checked={values.includes('push')}
                        onCheckedChange={() => toggle('push')}
                    />
                    <Checkbox
                        label={'SMS'}
                        checked={values.includes('sms')}
                        onCheckedChange={() => toggle('sms')}
                    />
                </Flex>
            </Fieldset>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const checkboxes = canvas.getAllByRole('checkbox')

        await expect(canvas.getByRole('group')).toBeInTheDocument()
        await expect(checkboxes).toHaveLength(3)
        await expect(canvas.getByRole('checkbox', { name: 'Email' })).toBeChecked()
    },
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Fieldset>
    <Legend>Enabled group</Legend>
    <Checkbox label="Email" />
</Fieldset>
<Fieldset disabled>
    <Legend>Disabled group</Legend>
    <Checkbox label="Push" />
</Fieldset>`),
        },
    },
    render: () => (
        <Flex
            flexDirection={'column'}
            gap={'md'}
        >
            <Fieldset>
                <Legend>Enabled group</Legend>
                <Checkbox label={'Email'} />
            </Fieldset>
            <Fieldset disabled>
                <Legend>Disabled group</Legend>
                <Checkbox label={'Push'} />
            </Fieldset>
        </Flex>
    ),
}
