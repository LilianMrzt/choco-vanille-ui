import { useCallback, useState } from 'react'

import {
    DEFAULT_END_YEAR,
    DEFAULT_START_YEAR,
} from '@components/forms/calendar/constants'
import type { CalendarView } from '@components/forms/calendar/context/calendarContext.ts'
import type { UseCalendarProps, UseCalendarResult } from '@components/forms/calendar/hooks/types'
import { createLocalDate } from '@components/forms/calendar/utils/calendarDates.utils.ts'

export const useCalendar = ({
    month: controlledMonth,
    defaultMonth,
    onMonthChange,
    startMonth,
    endMonth,
    startYear,
    endYear,
}: UseCalendarProps): UseCalendarResult => {
    const resolvedStartYear = startMonth?.getFullYear() ?? startYear ?? DEFAULT_START_YEAR
    const resolvedEndYear = endMonth?.getFullYear() ?? endYear ?? DEFAULT_END_YEAR
    const resolvedStartMonth = startMonth ?? createLocalDate(resolvedStartYear, 0, 1)
    const resolvedEndMonth = endMonth ?? createLocalDate(resolvedEndYear, 11, 31)
    if (Number.isNaN(resolvedStartMonth.getTime()) || Number.isNaN(resolvedEndMonth.getTime())) {
        throw new RangeError('Calendar navigation bounds must be valid dates')
    }
    if (createLocalDate(resolvedStartYear, resolvedStartMonth.getMonth(), 1) >
        createLocalDate(resolvedEndYear, resolvedEndMonth.getMonth(), 1)) {
        throw new RangeError('Calendar start month must not be after its end month')
    }

    const [view, setView] = useState<CalendarView>('day')
    const [internalMonth, setInternalMonth] = useState<Date>(() => {
        const initial = defaultMonth ?? new Date()
        const monthStart = createLocalDate(initial.getFullYear(), initial.getMonth(), 1)
        const minimum = createLocalDate(resolvedStartMonth.getFullYear(), resolvedStartMonth.getMonth(), 1)
        const maximum = createLocalDate(resolvedEndMonth.getFullYear(), resolvedEndMonth.getMonth(), 1)
        if (monthStart < minimum) {return minimum}
        if (monthStart > maximum) {return maximum}
        return initial
    })

    const currentMonth = controlledMonth ?? internalMonth

    const setCurrentMonth = useCallback(
        (date: Date) => {
            setInternalMonth(date)
            onMonthChange?.(date)
        },
        [onMonthChange],
    )

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
