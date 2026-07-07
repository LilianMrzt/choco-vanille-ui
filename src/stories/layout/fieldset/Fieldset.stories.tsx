import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Checkbox } from '@/components/forms/checkbox'
import { Fieldset } from '@/components/layout/fieldset'
import { Legend } from '@/components/layout/legend'
import { RadioGroup } from '@/components/forms/radio-group'
import { Flex } from '@/components/layout/flex'
import { md } from '@stories/utils/markdown'

type FieldsetPlaygroundArgs = ComponentProps<typeof Fieldset> & {
  legend?: string;
  disabled?: boolean;
};

const meta: Meta<FieldsetPlaygroundArgs> = {
    title: 'Layout/Fieldset',
    component: Fieldset,
    parameters: {
        layout: 'centered',
        docs: {
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

**Accessibility**

| Prop / Attribute   | Required | Type        | Notes                                                                                  |
| ------------------ | -------- | ----------- | -------------------------------------------------------------------------------------- |
| \`Legend\`           | ✅ Yes   | \`ReactNode\` | Provides the accessible name for the group. Place it as the first child of \`Fieldset\`. |
| \`disabled\`         | No       | \`boolean\`   | Disables all form controls inside the fieldset.                                        |
| \`aria-describedby\` | No       | \`string\`    | Can point to extra instructions for the whole group.                                   |

- Do not use a heading alone as the group label; use \`Legend\` so the relationship is exposed to assistive technology.
- When a visible legend is not desired, you can visually hide \`Legend\` while keeping it accessible.
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
