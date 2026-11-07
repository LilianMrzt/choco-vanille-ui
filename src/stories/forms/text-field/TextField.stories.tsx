import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'

import { TextField } from '@components/forms/text-field'
import { storySource } from '@stories/_shared/utils/storySource'
import consumerSource2 from '@stories/forms/text-field/sources/TextFieldExample2.source.txt?raw'
import consumerSource3 from '@stories/forms/text-field/sources/TextFieldExample3.source.txt?raw'
import TextFieldDocsPage from '@stories/forms/text-field/components/text-field-docs-page/TextFieldDocsPage'
import ControlledTextField from '@stories/forms/text-field/components/controlled-text-field/ControlledTextField'
import { playTextFieldPlayground } from '@stories/forms/text-field/utils/playTextFieldPlayground.utils'
import TextFieldStatesExample from '@stories/forms/text-field/components/text-field-states-example/TextFieldStatesExample'
import TextFieldWithIconsExample from '@stories/forms/text-field/components/text-field-with-icons-example/TextFieldWithIconsExample'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/text-field/constants'
import TextFieldSizesExample from '@stories/forms/text-field/components/text-field-sizes-example/TextFieldSizesExample'
import sizesSource from '@stories/forms/text-field/sources/TextFieldSizes.source.txt?raw'
import { createTextFieldSource } from '@stories/forms/text-field/utils/createTextFieldSource.utils'

const meta = {
    title: 'Forms/TextField',
    tags: ['autodocs'],
    component: TextField,
    parameters: {
        layout: 'padded',
        docs: {
            page: TextFieldDocsPage,
            source: { type: 'dynamic', transform: createTextFieldSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>;
export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Use the Controls table to experiment with the field props.',
            },
        },
    },
    render: ControlledTextField,
    play: playTextFieldPlayground,
}
export const States: Story = {
    parameters: {
        docs: { ...storySource(consumerSource3) },
    },
    render: TextFieldStatesExample,
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(consumerSource2),
        },
    },
    render: TextFieldWithIconsExample,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare small, medium and large fields in the same bounded container.' } } },
    render: TextFieldSizesExample,
}
