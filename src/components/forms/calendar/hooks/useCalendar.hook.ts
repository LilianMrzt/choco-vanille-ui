import { useCallback, useState } from 'react'

import {
    DEFAULT_END_YEAR,
    DEFAULT_START_YEAR,
} from '@components/forms/calendar/constants'
import type { CalendarView } from '@components/forms/calendar/context/calendarContext.ts'
import type { UseCalendarProps, UseCalendarResult } from '@components/forms/calendar/hooks/types'

export const useCalendar = ({
    month: controlledMonth,
    defaultMonth,
    onMonthChange,
    startMonth,
    endMonth,
    startYear,
    endYear,
}: UseCalendarProps): UseCalendarResult => {
    const resolvedStartYear = startYear ?? DEFAULT_START_YEAR
    const resolvedEndYear = endYear ?? DEFAULT_END_YEAR

    const [view, setView] = useState<CalendarView>('day')
    const [internalMonth, setInternalMonth] = useState<Date>(
        controlledMonth ?? defaultMonth ?? new Date(),
    )

    const currentMonth = controlledMonth ?? internalMonth

    const setCurrentMonth = useCallback(
        (date: Date) => {
            setInternalMonth(date)
            onMonthChange?.(date)
        },
        [onMonthChange],
    )

    const resolvedStartMonth = startMonth ?? new Date(resolvedStartYear, 0, 1)
    const resolvedEndMonth = endMonth ?? new Date(resolvedEndYear, 11, 31)

    return {
        view,
        setView,
        currentMonth,
        setCurrentMonth,
        resolvedStartYear,
        resolvedEndYear,
        resolvedStartMonth,
        resolvedEndMonth,
    }
}
