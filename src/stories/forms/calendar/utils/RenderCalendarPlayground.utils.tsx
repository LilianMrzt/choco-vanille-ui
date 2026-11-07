import { useArgs } from 'storybook/preview-api'
import type { ReactElement } from 'react'

import CalendarPlayground from '@stories/forms/calendar/components/calendar-playground/CalendarPlayground'
import type { CalendarArgs } from '@stories/forms/calendar/types'

/**
 * Runs preview hooks in the actual story function and passes state to pure components.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments; current values come from useArgs.
 * @returns The controlled calendar example.
 * @example
 * render: RenderCalendarPlayground
 */
export const RenderCalendarPlayground = (_args: CalendarArgs): ReactElement => {
    const [args, updateArgs] = useArgs<CalendarArgs>()
    const handleSelect: NonNullable<CalendarArgs['onSelect']> = (...selectionArgs) => {
        args.onSelect?.(...selectionArgs)
        updateArgs({ selected: selectionArgs[0] })
    }

    return (
        <CalendarPlayground
            {...args}
            onSelect={handleSelect}
        />
    )
}
