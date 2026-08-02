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
import { expect, userEvent, within } from 'storybook/test'

import { Accordion } from '@components/surfaces/accordion'
import { IconRegistry } from '@constants/icons'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type AccordionPlaygroundArgs = ComponentProps<typeof Accordion> & {
  firstDisabled?: boolean;
  firstStartIcon?: string;
  firstEndIcon?: string;
};

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required    | Type       | Notes                                      |
| ---------------- | ----------- | ---------- | ------------------------------------------ |
| \`defaultValue\`   | Conditional | \`string[]\` | Uncontrolled initial expanded item values. |
| \`multiple\`       | No          | \`boolean\`  | Allows multiple items to be open at once.  |
| \`disabled\`       | No          | \`boolean\`  | Prevents an item from being toggled.       |

**Sub-components**

| Sub-component | Description |
| ------------- | ----------- |
| \`Accordion\` | Root context provider. |
| \`Accordion.Item\` | Groups a trigger with its panel. |
| \`Accordion.Trigger\` | Expands or collapses a panel. |
| \`Accordion.Content\` | Panel shown when expanded. |
`

const AccordionDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<AccordionPlaygroundArgs> = {
    title: 'Surfaces/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
        docs: {
            page: AccordionDocsPage,
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
            ...storySource(/* language=tsx */ `
<Accordion defaultValue={['item-1']}>
    <Accordion.Item value="item-1">
        <Accordion.Trigger label="Is it accessible?" />
        <Accordion.Content>Yes. It follows the WAI-ARIA pattern.</Accordion.Content>
    </Accordion.Item>
</Accordion>`),
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
        await expect(firstTrigger).toHaveAttribute('data-panel-open')
    },
}

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Expanded, collapsed, and disabled accordion item states.',
            },
            ...storySource(/* language=tsx */ `
<Accordion defaultValue={['open']}>
    <Accordion.Item value="open">
        <Accordion.Trigger label="Expanded" />
        <Accordion.Content>Visible content.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="closed">
        <Accordion.Trigger label="Collapsed" />
        <Accordion.Content>Hidden content.</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="disabled" disabled>
        <Accordion.Trigger label="Disabled" />
        <Accordion.Content>Unavailable content.</Accordion.Content>
    </Accordion.Item>
</Accordion>`),
        },
    },
    render: () => (
        <Accordion defaultValue={['open']}>
            <Accordion.Item value={'open'}>
                <Accordion.Trigger label={'Expanded'} />
                <Accordion.Content>Visible content.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value={'closed'}>
                <Accordion.Trigger label={'Collapsed'} />
                <Accordion.Content>Hidden content.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
                value={'disabled'}
                disabled
            >
                <Accordion.Trigger label={'Disabled'} />
                <Accordion.Content>Unavailable content.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    ),
}
