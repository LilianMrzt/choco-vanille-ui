import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Accordion } from '@components/surfaces/accordion'
import { IconRegistry } from '@constants/icons'
import { md } from '@stories/utils/markdown'

type AccordionPlaygroundArgs = ComponentProps<typeof Accordion> & {
  firstDisabled?: boolean;
  firstStartIcon?: string;
  firstEndIcon?: string;
};

const meta: Meta<AccordionPlaygroundArgs> = {
    title: 'Surfaces/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled accordion built on top of \`@base-ui/react/accordion\`.
Use it to vertically stack sections of content that can be expanded or collapsed.
Compose \`Accordion\`, \`Accordion.Item\`, \`Accordion.Trigger\`, and \`Accordion.Content\`.

**Usage**

~~~tsx
<Accordion defaultValue={['item-1']}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger label="Is it styled?" />
    <Accordion.Content>
      Yes. It uses the same design tokens as the rest of the kit.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
~~~

**Accessibility**

| Prop / Attribute               | Required    | Type       | Notes                                                       |
| ------------------------------ | ----------- | ---------- | ----------------------------------------------------------- |
| \`value\`                        | Conditional | \`string[]\` | Controlled expanded item values; pair with \`onValueChange\`. |
| \`defaultValue\`                 | Conditional | \`string[]\` | Uncontrolled initial expanded item values.                  |
| \`multiple\`                     | No          | \`boolean\`  | Allows multiple items to be open at once. @default false    |
| \`disabled\` on \`Accordion.Item\` | No          | \`boolean\`  | Prevents the item from being toggled.                       |
| \`startIcon\` / \`endIcon\`        | No          | \`string\`   | Iconify icon name rendered before/after the trigger label.  |

- Keyboard: \`Enter\` or \`Space\` toggles the focused panel; \`Home\` / \`End\` jump to first / last trigger.
- Open state is exposed to assistive technology via Base UI's built-in ARIA semantics.

**Sub-components**

| Sub-component       | Description                                             |
| ------------------- | ------------------------------------------------------- |
| \`Accordion\`         | Root context provider that manages expanded item state. |
| \`Accordion.Item\`    | Groups a trigger with its corresponding panel.          |
| \`Accordion.Trigger\` | Button that expands or collapses the associated panel.  |
| \`Accordion.Content\` | Panel shown when its item is expanded.                  |
        `,
            },
        },
    },
    argTypes: {
        defaultValue: { control: 'object' },
        value: { control: 'object' },
        multiple: { control: 'boolean' },
        disabled: { control: 'boolean' },
        firstDisabled: {
            control: 'boolean',
            table: { category: 'Accordion.Item' },
        },
        firstStartIcon: {
            control: 'text',
            table: { category: 'Accordion.Trigger' },
        },
        firstEndIcon: {
            control: 'text',
            table: { category: 'Accordion.Trigger' },
        },
    },
    args: {
        defaultValue: ['item-1'],
        multiple: false,
        disabled: false,
        firstDisabled: false,
        firstStartIcon: IconRegistry.info,
        firstEndIcon: '',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
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
          'Interactive playground — use the Controls panel to experiment with single or multiple expansion, disabled state, and trigger icons.',
            },
        },
    },
    render: ({ firstDisabled, firstStartIcon, firstEndIcon, ...args }) => {
        const [value, setValue] = useState<string[]>(args.defaultValue as string[])

        return (
            <Accordion
                {...args}
                value={value}
                onValueChange={setValue}
            >
                <Accordion.Item
                    value={'item-1'}
                    disabled={firstDisabled}
                >
                    <Accordion.Trigger
                        label={'Is it accessible?'}
                        startIcon={firstStartIcon || undefined}
                        endIcon={firstEndIcon || undefined}
                    />
                    <Accordion.Content>
                        Yes. It adheres to the WAI-ARIA Accordion design pattern.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value={'item-2'}>
                    <Accordion.Trigger>Is it styled?</Accordion.Trigger>
                    <Accordion.Content>
                        Yes. It uses the same design tokens and Vanilla Extract patterns as
                        the rest of the kit.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value={'item-3'}>
                    <Accordion.Trigger>Can I use custom content?</Accordion.Trigger>
                    <Accordion.Content>
                        Yes. The trigger accepts either custom children or a convenient
                        `label` prop with optional icons.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const firstTrigger = canvas.getByRole('button', {
            name: 'Is it accessible?',
        })
        const secondTrigger = canvas.getByRole('button', { name: 'Is it styled?' })

        await expect(firstTrigger).toBeInTheDocument()
        await expect(firstTrigger).toHaveAttribute('data-panel-open')
        await expect(secondTrigger).not.toHaveAttribute('data-panel-open')

        await userEvent.click(secondTrigger)
        await expect(secondTrigger).toHaveAttribute('data-panel-open')
        await expect(
            canvas.getByText(
                'Yes. It uses the same design tokens and Vanilla Extract patterns as the rest of the kit.',
            ),
        ).toBeInTheDocument()

        await userEvent.click(firstTrigger)
        await expect(firstTrigger).not.toHaveAttribute('data-panel-open')
    },
}
