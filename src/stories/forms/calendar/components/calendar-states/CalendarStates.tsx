import { Calendar } from '@components/forms/calendar'
import type { ReactElement } from 'react'

/**
 * Shows unavailable days without removing their calendar context.
 * @internal Not part of the public package API.
 * @returns A calendar with disabled date selection.
 * @example
 * <CalendarStates />
 */
const CalendarStates = (): ReactElement => (
    <Calendar
        aria-label={'Unavailable dates'}
        defaultMonth={new Date(2026, 10, 1)}
        disabled
        mode={'single'}
    />
)

export default CalendarStates
