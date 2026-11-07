import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from '@/components/forms/radio-group'
import { storySource } from '@stories/_shared/utils/storySource'
import consumerSource2 from '@stories/forms/radio-group/sources/RadioGroupExample2.source.txt?raw'
import consumerSource3 from '@stories/forms/radio-group/sources/RadioGroupExample3.source.txt?raw'
import consumerSource4 from '@stories/forms/radio-group/sources/RadioGroupExample4.source.txt?raw'
import RadioGroupDocsPage from '@stories/forms/radio-group/components/radio-group-docs-page/RadioGroupDocsPage'
import ControlledRadioGroup from '@stories/forms/radio-group/components/controlled-radio-group/ControlledRadioGroup'
import { playRadioGroupPlayground } from '@stories/forms/radio-group/utils/playRadioGroupPlayground.utils'
import RadioGroupItemHelpExample from '@stories/forms/radio-group/components/radio-group-item-help-example/RadioGroupItemHelpExample'
import RadioGroupHorizontalExample from '@stories/forms/radio-group/components/radio-group-horizontal-example/RadioGroupHorizontalExample'
import RadioGroupStatesExample from '@stories/forms/radio-group/components/radio-group-states-example/RadioGroupStatesExample'
import { RadioGroupFrame } from '@stories/forms/radio-group/utils/RadioGroupFrame.utils'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/radio-group/constants'
import type { RadioGroupPlaygroundArgs } from '@stories/forms/radio-group/types'
import { createRadioGroupSource } from '@stories/forms/radio-group/utils/createRadioGroupSource.utils'

const meta = {
    title: 'Forms/RadioGroup',
    tags: ['autodocs'],
    component: RadioGroup,
    parameters: {
        layout: 'centered',
        docs: {

            page: RadioGroupDocsPage,
            source: {
                type: 'dynamic',
                transform: createRadioGroupSource,
            },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [
        RadioGroupFrame,
    ],
} satisfies Meta<RadioGroupPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;
export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Use the Controls table to experiment with the group and its item labels.',
            },
        },
    },
    render: ControlledRadioGroup,
    play: playRadioGroupPlayground,
}

export const ItemHelp: Story = {
    parameters: {
        docs: {
            ...storySource(consumerSource4),
        },
    },
    render: RadioGroupItemHelpExample,
}

export const Horizontal: Story = {
    parameters: { docs: { ...storySource(consumerSource3) } },
    render: RadioGroupHorizontalExample,
}

export const States: Story = {
    parameters: { docs: { ...storySource(consumerSource2) } },
    render: RadioGroupStatesExample,
}
