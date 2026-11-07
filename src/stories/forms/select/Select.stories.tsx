import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'
import { SelectField } from '@components/forms/select'
import { storySource } from '@stories/_shared/utils/storySource'
import statesSource from '@stories/forms/select/sources/SelectStates.source.txt?raw'
import iconsSource from '@stories/forms/select/sources/SelectWithIcons.source.txt?raw'
import SelectDocsPage from '@stories/forms/select/components/select-docs-page/SelectDocsPage'
import ControlledSelect from '@stories/forms/select/components/controlled-select/ControlledSelect'
import { playSelectPlayground } from '@stories/forms/select/utils/playSelectPlayground.utils'
import SelectStatesExample from '@stories/forms/select/components/select-states-example/SelectStatesExample'
import SelectWithIconsExample from '@stories/forms/select/components/select-with-icons-example/SelectWithIconsExample'
import { GROUPED_OPTIONS, ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/select/constants'
import SelectSizesExample from '@stories/forms/select/components/select-sizes-example/SelectSizesExample'
import sizesSource from '@stories/forms/select/sources/SelectSizes.source.txt?raw'
import { createSelectSource } from '@stories/forms/select/utils/createSelectSource.utils'

const meta = {
    title: 'Forms/Select',
    tags: ['autodocs'],
    component: SelectField,
    parameters: {
        layout: 'padded',
        docs: {

            page: SelectDocsPage,
            source: { type: 'dynamic', transform: createSelectSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<typeof SelectField>

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
    render: ControlledSelect,
    play: playSelectPlayground,
}

export const GroupedOptions: Story = {
    args: { options: GROUPED_OPTIONS },
    render: ControlledSelect,
}
export const States: Story = {
    parameters: {
        docs: {
            ...storySource(statesSource),
        },
    },
    render: SelectStatesExample,
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(iconsSource),
        },
    },
    render: SelectWithIconsExample,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare small, medium and large fields in the same bounded container.' } } },
    render: SelectSizesExample,
}
