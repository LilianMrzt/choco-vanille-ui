import type { Meta, StoryObj } from '@storybook/react-vite'
import CalendarPlayground from '@stories/forms/calendar/components/calendar-playground/CalendarPlayground'
import CalendarDocsPage from '@stories/forms/calendar/components/calendar-docs-page/CalendarDocsPage'
import { playCalendarPlayground } from '@stories/forms/calendar/utils/playCalendarPlayground.utils'
import { CalendarFrame } from '@stories/forms/calendar/utils/CalendarFrame.utils'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/calendar/constants'
import type { CalendarArgs } from '@stories/forms/calendar/types'
import { createCalendarSource } from '@stories/forms/calendar/utils/create-calendar-source/createCalendarSource.utils'
import CalendarStates from '@stories/forms/calendar/components/calendar-states/CalendarStates'
import statesSource from '@stories/forms/calendar/sources/CalendarStates.source.txt?raw'
import { storySource } from '@stories/_shared/utils/storySource'
import { RenderCalendarPlayground } from '@stories/forms/calendar/utils/RenderCalendarPlayground.utils'

const meta = {
    title: 'Forms/Calendar',
    tags: ['autodocs'],
    component: CalendarPlayground,
    parameters: {
        layout: 'centered',
        docs: {

            page: CalendarDocsPage,
            source: { type: 'dynamic', transform: createCalendarSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [
        CalendarFrame,
    ],
} satisfies Meta<CalendarArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    render: RenderCalendarPlayground,
    parameters: {
        docs: {
            description: {
                story:
          'Use the Controls table to change selection mode, outside days and the year range.',
            },
        },
    },
    play: playCalendarPlayground,
}

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource), description: { story: 'Disabled days remain visible while date selection is unavailable.' } } },
    render: CalendarStates,
}
