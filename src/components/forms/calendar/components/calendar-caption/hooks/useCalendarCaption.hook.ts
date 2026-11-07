import { useCallback } from 'react'

import { useCalendarContext } from '@components/forms/calendar/context/calendarContext.ts'
import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'
import { getDecadeStart } from '@components/forms/calendar/utils/decadeStart.utils.ts'
import { capitalizeMonth } from '@components/forms/calendar/components/calendar-caption/utils/capitalizeMonth.utils.ts'
import { createLocalDate } from '@components/forms/calendar/utils/calendarDates.utils.ts'

export const useCalendarCaption = () => {
    const { view, setView, currentMonth, setCurrentMonth, startYear, endYear, startMonth, endMonth, locale } = useCalendarContext()

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const decadeStart = getDecadeStart(year)
    const decadeEnd = decadeStart + YEARS_PER_PAGE - 1
    const label = `${capitalizeMonth(new Intl.DateTimeFormat(locale, { month: 'long', calendar: 'gregory' }).format(currentMonth))} ${year}`

    const handlePrev = useCallback(() => {
        if (view === 'day') {
            setCurrentMonth(createLocalDate(year, month - 1, 1))
            return
        }

        if (view === 'month') {
            setCurrentMonth(createLocalDate(year - 1, month, 1))
            return
        }

        setCurrentMonth(createLocalDate(Math.max(year - YEARS_PER_PAGE, startYear), month, 1))
    }, [view, year, month, setCurrentMonth, startYear])

    const handleNext = useCallback(() => {
        if (view === 'day') {
            setCurrentMonth(createLocalDate(year, month + 1, 1))
            return
        }

        if (view === 'month') {
            setCurrentMonth(createLocalDate(year + 1, month, 1))
            return
        }

        setCurrentMonth(createLocalDate(Math.min(year + YEARS_PER_PAGE, endYear), month, 1))
    }, [view, year, month, setCurrentMonth, endYear])

    const isPrevDisabled =
        view === 'day' ? createLocalDate(year, month - 1, 1) < createLocalDate(startYear, startMonth?.getMonth() ?? 0, 1)
            : view === 'month' ? year - 1 < startYear
                : decadeStart <= startYear

    const isNextDisabled =
        view === 'day' ? createLocalDate(year, month + 1, 1) > createLocalDate(endYear, endMonth?.getMonth() ?? 11, 1)
            : view === 'month' ? year + 1 > endYear
                : decadeEnd >= endYear

    return {
        view,
        setView,
        year,
        decadeStart,
        decadeEnd,
        label,
        handlePrev,
        handleNext,
        isPrevDisabled,
        isNextDisabled,
    }
}
