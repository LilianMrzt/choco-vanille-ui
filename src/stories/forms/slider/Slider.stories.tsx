import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

import { Slider, type SliderColor, type SliderSize } from '@components/forms/slider'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const SIZES: SliderSize[] = ['sm', 'md', 'lg']
const COLORS: SliderColor[] = ['primary', 'secondary', 'destructive']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Conditional | Visible accessible name for the slider. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | Required when \`label\` is omitted. |
| \`error\` | No | Marks the slider invalid and connects the error text. |

The underlying thumbs are keyboard-operable range inputs supplied by Base UI.
`

const SliderDocsPage = () => (
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
    title: 'Forms/Slider',
    component: Slider,
    parameters: {
        layout: 'centered',
        docs: {
            page: SliderDocsPage,
            description: {
                component: md /* language=markdown */ `
A keyboard-accessible single-value slider and range slider for form controls such as volume, price and filters.

~~~tsx
<Slider label="Volume" defaultValue={40} />
<Slider label="Price" defaultValue={[20, 80]} />
~~~
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        min: { control: 'number' },
        max: { control: 'number' },
        step: { control: 'number' },
        size: { control: 'select', options: SIZES },
        color: { control: 'select', options: COLORS },
        showValue: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'text' },
        helperText: { control: 'text' },
    },
    args: {
        label: 'Volume',
        defaultValue: 40,
        min: 0,
        max: 100,
        step: 1,
        size: 'md',
        color: 'primary',
        showValue: true,
    },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: { docs: { ...storySource('<Slider />') } },
}

export const Range: Story = {
    parameters: { docs: { ...storySource('<Slider label="Price" defaultValue={[20, 80]} showValue />') } },
    render: () => (
        <Slider
            label={'Price'}
            defaultValue={[20, 80]}
            showValue
        />
    ),
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource('<Slider label="Small" size="sm" defaultValue={40} />') } },
    render: () => (
        <div style={{ display: 'grid', gap: '1rem', width: '20rem' }}>
            <Slider
                label={'Small'}
                size={'sm'}
                defaultValue={40}
            />
            <Slider
                label={'Medium'}
                size={'md'}
                defaultValue={40}
            />
            <Slider
                label={'Large'}
                size={'lg'}
                defaultValue={40}
            />
        </div>
    ),
}

export const Colors: Story = {
    parameters: { docs: { ...storySource('<Slider label="Primary" color="primary" defaultValue={40} />') } },
    render: () => (
        <div style={{ display: 'grid', gap: '1rem', width: '20rem' }}>
            <Slider
                label={'Primary'}
                color={'primary'}
                defaultValue={40}
            />
            <Slider
                label={'Secondary'}
                color={'secondary'}
                defaultValue={40}
            />
            <Slider
                label={'Destructive'}
                color={'destructive'}
                defaultValue={40}
            />
        </div>
    ),
}

export const States: Story = {
    parameters: { docs: { ...storySource('<Slider label="Disabled" disabled defaultValue={40} />') } },
    render: () => (
        <div style={{ display: 'grid', gap: '1rem', width: '20rem' }}>
            <Slider
                label={'Disabled'}
                disabled
                defaultValue={40}
            />
            <Slider
                label={'With helper'}
                helperText={'Choose a value'}
                defaultValue={40}
            />
            <Slider
                label={'With error'}
                error={'Value is invalid'}
                defaultValue={40}
            />
        </div>
    ),
}
