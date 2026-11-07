import { type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from '@components/forms/date-picker'
import { storySource } from '@stories/_shared/utils/storySource'
import consumerSource2 from '@stories/forms/date-picker/sources/DatePickerExample2.source.txt?raw'
import DatePickerDocsPage from '@stories/forms/date-picker/components/date-picker-docs-page/DatePickerDocsPage'
import { playDatePickerPlayground } from '@stories/forms/date-picker/utils/playDatePickerPlayground.utils'
import DatePickerStatesExample from '@stories/forms/date-picker/components/date-picker-states-example/DatePickerStatesExample'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/date-picker/constants'
import DatePickerSizesExample from '@stories/forms/date-picker/components/date-picker-sizes-example/DatePickerSizesExample'
import sizesSource from '@stories/forms/date-picker/sources/DatePickerSizes.source.txt?raw'
import { createDatePickerSource } from '@stories/forms/date-picker/utils/createDatePickerSource.utils'
import DatePickerPlayground from '@stories/forms/date-picker/components/date-picker-playground/DatePickerPlayground'
import { DatePickerFrame } from '@stories/forms/date-picker/utils/DatePickerFrame.utils'

const meta = {
    title: 'Forms/DatePicker',
    tags: ['autodocs'],
    component: DatePicker,
    parameters: {
        layout: 'padded',
        docs: {

            page: DatePickerDocsPage,
            source: { type: 'dynamic', transform: createDatePickerSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [DatePickerFrame],
} satisfies Meta<ComponentProps<typeof DatePicker> & { width?: string }>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    render: DatePickerPlayground,
    parameters: {
        docs: {
            description: {
                story:
          'Uncontrolled playground. Use the Controls table for serializable props; Date values and calendar props are documented but not editable here.',
            },
        },
    },
    play: playDatePickerPlayground,
}
export const States: Story = {
    parameters: { docs: { ...storySource(consumerSource2) } },
    render: DatePickerStatesExample,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare small, medium and large fields in the same bounded container. Date segments remain accessible through internal scrolling on narrow screens.' } } },
    render: DatePickerSizesExample,
}
