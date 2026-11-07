import type { Meta, StoryObj } from '@storybook/react-vite'

import { Fieldset } from '@components/forms/primitives/fieldset'
import FieldsetCheckboxGroup from '@stories/forms/primitives/fieldset/components/fieldset-checkbox-group/FieldsetCheckboxGroup'
import FieldsetDocsPage from '@stories/forms/primitives/fieldset/components/fieldset-docs-page/FieldsetDocsPage'
import FieldsetPlayground from '@stories/forms/primitives/fieldset/components/fieldset-playground/FieldsetPlayground'
import FieldsetStates from '@stories/forms/primitives/fieldset/components/fieldset-states/FieldsetStates'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/forms/primitives/fieldset/constants'
import checkboxGroupSource from '@stories/forms/primitives/fieldset/sources/FieldsetCheckboxGroup.source.tsx.txt?raw'
import statesSource from '@stories/forms/primitives/fieldset/sources/FieldsetStates.source.tsx.txt?raw'
import type { FieldsetPlaygroundArgs } from '@stories/forms/primitives/fieldset/types'
import { createFieldsetSource } from '@stories/forms/primitives/fieldset/utils/create-fieldset-source/createFieldsetSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Forms/Primitives/Fieldset',
    component: Fieldset,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: FieldsetDocsPage,
            description: {
                component: 'Groups related form controls using a native fieldset. Pair it with a Legend to name the group.',
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    render: FieldsetPlayground,
} satisfies Meta<FieldsetPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            source: { type: 'dynamic', transform: createFieldsetSource },
        },
    },
}

export const CheckboxGroup: Story = {
    parameters: { docs: { ...storySource(checkboxGroupSource) } },
    render: FieldsetCheckboxGroup,
}

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: FieldsetStates,
}
