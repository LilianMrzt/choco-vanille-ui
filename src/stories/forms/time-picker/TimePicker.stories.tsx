import { type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'
import { TimePicker } from '@components/forms/time-picker'
import { storySource } from '@stories/_shared/utils/storySource'
import consumerSource2 from '@stories/forms/time-picker/sources/TimePickerExample2.source.txt?raw'
import consumerSource3 from '@stories/forms/time-picker/sources/TimePickerExample3.source.txt?raw'
import consumerSource4 from '@stories/forms/time-picker/sources/TimePickerExample4.source.txt?raw'
import consumerSource5 from '@stories/forms/time-picker/sources/TimePickerExample5.source.txt?raw'
import consumerSource6 from '@stories/forms/time-picker/sources/TimePickerExample6.source.txt?raw'
import TimePickerDocsPage from '@stories/forms/time-picker/components/time-picker-docs-page/TimePickerDocsPage'
import TimePickerPlaygroundExample from '@stories/forms/time-picker/components/time-picker-playground-example/TimePickerPlaygroundExample'
import { playTimePickerPlayground } from '@stories/forms/time-picker/utils/playTimePickerPlayground.utils'
import TimePickerDefaultPanelTimeExample from '@stories/forms/time-picker/components/time-picker-default-panel-time-example/TimePickerDefaultPanelTimeExample'
import TimePickerRangeExample from '@stories/forms/time-picker/components/time-picker-range-example/TimePickerRangeExample'
import TimePickerStepsExample from '@stories/forms/time-picker/components/time-picker-steps-example/TimePickerStepsExample'
import TimePickerActionsExample from '@stories/forms/time-picker/components/time-picker-actions-example/TimePickerActionsExample'
import TimePickerStatesExample from '@stories/forms/time-picker/components/time-picker-states-example/TimePickerStatesExample'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/time-picker/constants'
import TimePickerSizesExample from '@stories/forms/time-picker/components/time-picker-sizes-example/TimePickerSizesExample'
import sizesSource from '@stories/forms/time-picker/sources/TimePickerSizes.source.txt?raw'
import { createTimePickerSource } from '@stories/forms/time-picker/utils/createTimePickerSource.utils'

const meta = {
    title: 'Forms/TimePicker',
    tags: ['autodocs'],
    component: TimePicker,
    parameters: {
        layout: 'padded',
        docs: {
            page: TimePickerDocsPage,
            source: { type: 'dynamic', transform: createTimePickerSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<ComponentProps<typeof TimePicker> & { width?: string }>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground = {
    parameters: {
        docs: {
            description: {
                story:
          'Uncontrolled playground. Changing defaultValue remounts the field with the new initial time.',
            },
        },
    },
    render: TimePickerPlaygroundExample,
    play: playTimePickerPlayground,
} satisfies Story
export const DefaultPanelTime: Story = {
    parameters: {
        docs: {
            ...storySource(consumerSource6),
            description: {
                story: 'The popover opens on defaultPanelTime while no time is selected. The value stays empty until the user picks one.',
            },
        },
    },
    render: TimePickerDefaultPanelTimeExample,
}

export const Range: Story = {
    parameters: {
        docs: {
            ...storySource(consumerSource5),
            description: { story: 'Options outside minTime and maxTime are disabled.' },
        },
    },
    render: TimePickerRangeExample,
}

export const Steps: Story = {
    parameters: {
        docs: {
            ...storySource(consumerSource4),
        },
    },
    render: TimePickerStepsExample,
}

export const Actions: Story = {
    parameters: {
        docs: {
            ...storySource(consumerSource3),
            description: { story: 'showNowButton and clearable add a footer to the popover.' },
        },
    },
    render: TimePickerActionsExample,
}

export const States: Story = {
    parameters: { docs: { ...storySource(consumerSource2) } },
    render: TimePickerStatesExample,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare small, medium and large fields in the same bounded container.' } } },
    render: TimePickerSizesExample,
}
