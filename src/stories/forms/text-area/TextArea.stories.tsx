import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'
import { TextArea } from '@components/forms/text-area'
import { storySource } from '@stories/_shared/utils/storySource'
import consumerSource2 from '@stories/forms/text-area/sources/TextAreaExample2.source.txt?raw'
import consumerSource3 from '@stories/forms/text-area/sources/TextAreaExample3.source.txt?raw'
import TextAreaDocsPage from '@stories/forms/text-area/components/text-area-docs-page/TextAreaDocsPage'
import ControlledTextArea from '@stories/forms/text-area/components/controlled-text-area/ControlledTextArea'
import { playTextAreaPlayground } from '@stories/forms/text-area/utils/playTextAreaPlayground.utils'
import TextAreaStatesExample from '@stories/forms/text-area/components/text-area-states-example/TextAreaStatesExample'
import TextAreaWithIconsExample from '@stories/forms/text-area/components/text-area-with-icons-example/TextAreaWithIconsExample'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/text-area/constants'
import TextAreaSizesExample from '@stories/forms/text-area/components/text-area-sizes-example/TextAreaSizesExample'
import sizesSource from '@stories/forms/text-area/sources/TextAreaSizes.source.txt?raw'
import { createTextAreaSource } from '@stories/forms/text-area/utils/createTextAreaSource.utils'

const meta = {
    title: 'Forms/TextArea',
    tags: ['autodocs'],
    component: TextArea,
    parameters: {
        layout: 'padded',
        docs: {
            page: TextAreaDocsPage,
            description: {
                component: DESCRIPTION,
            },
            source: { type: 'dynamic', transform: createTextAreaSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>
export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Use the Controls table to experiment with the field props.',
            },
        },
    },
    render: ControlledTextArea,
    play: playTextAreaPlayground,
}
export const States: Story = {
    parameters: {
        docs: { ...storySource(/* language=TEXT */ consumerSource3) },
    },
    render: TextAreaStatesExample,
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=TEXT */ consumerSource2),
        },
    },
    render: TextAreaWithIconsExample,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare small, medium and large fields in the same bounded container.' } } },
    render: TextAreaSizesExample,
}
