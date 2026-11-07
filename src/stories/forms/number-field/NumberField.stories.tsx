import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'
import {
    NumberField,
} from '@components/forms/number-field'
import { storySource } from '@stories/_shared/utils/storySource'
import consumerSource1 from '@stories/forms/number-field/sources/NumberFieldExample1.source.txt?raw'
import NumberFieldDocsPage from '@stories/forms/number-field/components/number-field-docs-page/NumberFieldDocsPage'
import ControlledNumberField from '@stories/forms/number-field/components/controlled-number-field/ControlledNumberField'
import NumberFieldStatesExample from '@stories/forms/number-field/components/number-field-states-example/NumberFieldStatesExample'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/number-field/constants'
import NumberFieldSizesExample from '@stories/forms/number-field/components/number-field-sizes-example/NumberFieldSizesExample'
import sizesSource from '@stories/forms/number-field/sources/NumberFieldSizes.source.txt?raw'
import { createNumberFieldSource } from '@stories/forms/number-field/utils/createNumberFieldSource.utils'

const meta = {
    title: 'Forms/NumberField',
    tags: ['autodocs'],
    component: NumberField,
    parameters: {
        layout: 'padded',
        docs: {
            page: NumberFieldDocsPage,
            source: { type: 'dynamic', transform: createNumberFieldSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<typeof NumberField>

export default meta

type Story = StoryObj<typeof meta>;
export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground for numeric values and validation constraints.',
            },
        },
    },
    render: ControlledNumberField,
}
export const States: Story = {
    parameters: {
        docs: {
            ...storySource(consumerSource1),
        },
    },
    render: NumberFieldStatesExample,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare small, medium and large fields in the same bounded container.' } } },
    render: NumberFieldSizesExample,
}
