import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'
import { Slider } from '@components/forms/slider'
import { storySource } from '@stories/_shared/utils/storySource'
import consumerSource2 from '@stories/forms/slider/sources/SliderExample2.source.txt?raw'
import consumerSource5 from '@stories/forms/slider/sources/SliderExample5.source.txt?raw'
import SliderDocsPage from '@stories/forms/slider/components/slider-docs-page/SliderDocsPage'
import ControlledSlider from '@stories/forms/slider/components/controlled-slider/ControlledSlider'
import SliderRangeExample from '@stories/forms/slider/components/slider-range-example/SliderRangeExample'
import SliderStatesExample from '@stories/forms/slider/components/slider-states-example/SliderStatesExample'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/slider/constants'
import SliderAppearance from '@stories/forms/slider/components/slider-appearance/SliderAppearance'
import { APPEARANCE_SOURCE } from '@stories/forms/slider/utils/create-appearance-source/createAppearanceSource.utils'
import { createSliderSource } from '@stories/forms/slider/utils/createSliderSource.utils'
import SliderSizesExample from '@stories/forms/slider/components/slider-sizes-example/SliderSizesExample'
import sizesSource from '@stories/forms/slider/sources/SliderSizes.source.txt?raw'

const meta = {
    title: 'Forms/Slider',
    tags: ['autodocs'],
    component: Slider,
    parameters: {
        layout: 'centered',
        docs: {
            page: SliderDocsPage,
            source: { type: 'dynamic', transform: createSliderSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>
export const Playground: Story = {
    render: ControlledSlider,
}

export const Range: Story = {
    parameters: { docs: { ...storySource(consumerSource5) } },
    render: SliderRangeExample,
}
export const States: Story = {
    parameters: { docs: { ...storySource(consumerSource2) } },
    render: SliderStatesExample,
}
export const Appearance: Story = {
    parameters: { docs: { ...storySource(APPEARANCE_SOURCE), description: { story: 'Compare all slider colors and both orientations. Sizes are demonstrated separately.' } } },
    render: SliderAppearance,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare small, medium and large sliders in the same bounded container.' } } },
    render: SliderSizesExample,
}
