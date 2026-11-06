import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'

import { Slider, type SliderColor, type SliderProps, type SliderSize } from '@components/forms/slider'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'

const SIZES: SliderSize[] = ['sm', 'md', 'lg']
const COLORS: SliderColor[] = ['primary', 'secondary', 'destructive']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Conditional | \`string\` | Visible accessible name for the slider. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`error\` | No | \`string\` | Marks the slider invalid and connects the error text. |
| \`helperText\` | No | \`string\` | Describes the slider when no error is present. |

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
    tags: ['autodocs'],
    component: Slider,
    parameters: {
        layout: 'centered',
        docs: {
            page: SliderDocsPage,
            source: { type: 'dynamic', transform: createControlledSource<SliderProps>({ component: 'Slider', stateProp: 'value', eventProp: 'onValueChange', stateType: 'number | readonly [number, number]', handler: 'setValue' }) },
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
        value: { control: 'number', description: 'Controlled single value. See Range for a two-thumb example.' },
        defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        onValueChange: { control: false },
        onValueCommitted: { control: false },
    },
    args: {
        label: 'Volume',
        value: 40,
        onValueChange: fn(),
        onValueCommitted: fn(),
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

/**
 * Synchronizes the slider value and callback with Storybook Controls.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled slider.
 * @example
 * <ControlledSlider label="Volume" />
 */
const ControlledSlider = (_args: SliderProps) => {
    const [args, updateArgs] = useArgs<SliderProps>()
    const handleValueChange: NonNullable<SliderProps['onValueChange']> = (value, details) => {
        args.onValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <Slider
            {...args}
            onValueChange={handleValueChange}
        />
    )
}

export const Playground: Story = {
    render: ControlledSlider,
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
    parameters: { docs: { ...storySource(`<Slider label="Small" size="sm" defaultValue={40} />
<Slider label="Medium" size="md" defaultValue={40} />
<Slider label="Large" size="lg" defaultValue={40} />`) } },
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
    parameters: { docs: { ...storySource(`<Slider label="Primary" color="primary" defaultValue={40} />
<Slider label="Secondary" color="secondary" defaultValue={40} />
<Slider label="Destructive" color="destructive" defaultValue={40} />`) } },
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
    parameters: { docs: { ...storySource(`<Slider label="Disabled" disabled defaultValue={40} />
<Slider label="With helper" helperText="Choose a value" defaultValue={40} />
<Slider label="With error" error="Value is invalid" defaultValue={40} />`) } },
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
