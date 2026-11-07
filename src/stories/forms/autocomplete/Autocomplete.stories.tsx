import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'
import { AutocompleteField } from '@components/forms/autocomplete'
import { storySource } from '@stories/_shared/utils/storySource'
import statesSource from '@stories/forms/autocomplete/sources/AutocompleteStates.source.txt?raw'
import iconsSource from '@stories/forms/autocomplete/sources/AutocompleteWithIcons.source.txt?raw'
import AutocompleteDocsPage from '@stories/forms/autocomplete/components/autocomplete-docs-page/AutocompleteDocsPage'
import ControlledAutocomplete from '@stories/forms/autocomplete/components/controlled-autocomplete/ControlledAutocomplete'
import { playAutocompletePlayground } from '@stories/forms/autocomplete/utils/playAutocompletePlayground.utils'
import AutocompleteStatesExample from '@stories/forms/autocomplete/components/autocomplete-states-example/AutocompleteStatesExample'
import AutocompleteWithIconsExample from '@stories/forms/autocomplete/components/autocomplete-with-icons-example/AutocompleteWithIconsExample'
import { GROUPED_OPTIONS, ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/autocomplete/constants'
import AutocompleteSizesExample from '@stories/forms/autocomplete/components/autocomplete-sizes-example/AutocompleteSizesExample'
import sizesSource from '@stories/forms/autocomplete/sources/AutocompleteSizes.source.txt?raw'
import { createAutocompleteSource } from '@stories/forms/autocomplete/utils/createAutocompleteSource.utils'

const meta = {
    title: 'Forms/Autocomplete',
    tags: ['autodocs'],
    component: AutocompleteField,
    parameters: {
        layout: 'padded',
        docs: {

            page: AutocompleteDocsPage,
            source: { type: 'dynamic', transform: createAutocompleteSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<typeof AutocompleteField>

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
    render: ControlledAutocomplete,
    play: playAutocompletePlayground,
}

export const GroupedOptions: Story = {
    args: { options: GROUPED_OPTIONS },
    render: ControlledAutocomplete,
}
export const States: Story = {
    parameters: {
        docs: {
            ...storySource(statesSource),
        },
    },
    render: AutocompleteStatesExample,
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(iconsSource),
        },
    },
    render: AutocompleteWithIconsExample,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare small, medium and large fields in the same bounded container.' } } },
    render: AutocompleteSizesExample,
}
