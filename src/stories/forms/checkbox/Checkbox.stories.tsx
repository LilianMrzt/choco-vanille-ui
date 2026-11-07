import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/forms/checkbox'
import { storySource } from '@stories/_shared/utils/storySource'
import GroupDisabledExample from '@stories/forms/checkbox/components/group-disabled/GroupDisabled'
import type { CheckboxProps } from '@components/forms/checkbox'
import consumerSource2 from '@stories/forms/checkbox/sources/CheckboxExample2.source.txt?raw'
import consumerSource3 from '@stories/forms/checkbox/sources/CheckboxExample3.source.txt?raw'
import CheckboxDocsPage from '@stories/forms/checkbox/components/checkbox-docs-page/CheckboxDocsPage'
import { playCheckboxPlayground } from '@stories/forms/checkbox/utils/playCheckboxPlayground.utils'
import CheckboxStatesExample from '@stories/forms/checkbox/components/checkbox-states-example/CheckboxStatesExample'
import { CheckboxFrame } from '@stories/forms/checkbox/utils/CheckboxFrame.utils'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/checkbox/constants'
import { RenderCheckboxPlayground } from '@stories/forms/checkbox/utils/RenderCheckboxPlayground.utils'
import { createCheckboxPlaygroundSource } from '@stories/forms/checkbox/utils/createCheckboxPlaygroundSource.utils'
const meta = {
    title: 'Forms/Checkbox',
    tags: ['autodocs'],
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {

            page: CheckboxDocsPage,
            description: {
                component: DESCRIPTION,
            },
            source: { type: 'dynamic', transform: createCheckboxPlaygroundSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [
        CheckboxFrame,
    ],
} satisfies Meta<CheckboxProps>

export default meta

type Story = StoryObj<typeof meta>;
export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Use the Controls table to experiment with the checkbox props.',
            },
        },
    },
    render: RenderCheckboxPlayground,
    play: playCheckboxPlayground,
}
export const GroupDisabled: Story = {
    parameters: {
        docs: {
            ...storySource(consumerSource3),
        },
    },
    render: GroupDisabledExample,
}

export const States: Story = {
    parameters: { docs: { ...storySource(consumerSource2) } },
    render: CheckboxStatesExample,
}
