import type { CalendarProps } from '@components/forms/calendar/types'
import type { CalendarView } from '@components/forms/calendar/context/calendarContext.ts'

export type UseCalendarProps = Pick<
    CalendarProps,
    'month' | 'defaultMonth' | 'onMonthChange' | 'startMonth' | 'endMonth' | 'startYear' | 'endYear'
>

export type UseCalendarResult = {
    view: CalendarView
    setView: (view: CalendarView) => void
    currentMonth: Date
    setCurrentMonth: (date: Date) => void
    resolvedStartYear: number
    resolvedEndYear: number
    resolvedStartMonth: Date
    resolvedEndMonth: Date
}
