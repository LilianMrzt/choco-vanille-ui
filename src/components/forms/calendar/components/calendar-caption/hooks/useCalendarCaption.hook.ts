import { useCalendarContext } from '@components/forms/calendar/context/calendarContext.ts'
import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'
import { getDecadeStart } from '@components/forms/calendar/utils/decadeStart.utils.ts'
import { capitalizeMonth } from '@components/forms/calendar/components/calendar-caption/utils/capitalizeMonth.utils.ts'

export const useCalendarCaption = () => {
    const { view, setView, currentMonth, setCurrentMonth, startYear, endYear } = useCalendarContext()

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const decadeStart = getDecadeStart(year)
    const decadeEnd = decadeStart + YEARS_PER_PAGE - 1
    const label = `${capitalizeMonth(new Intl.DateTimeFormat(undefined, { month: 'long' }).format(currentMonth))} ${year}`

    const handlePrev = () => {
        if (view === 'day') {
            setCurrentMonth(new Date(year, month - 1, 1))
            return
        }

        if (view === 'month') {
            setCurrentMonth(new Date(year - 1, month, 1))
            return
        }

        setCurrentMonth(new Date(year - YEARS_PER_PAGE, month, 1))
    }

    const handleNext = () => {
        if (view === 'day') {
            setCurrentMonth(new Date(year, month + 1, 1))
            return
        }

        if (view === 'month') {
            setCurrentMonth(new Date(year + 1, month, 1))
            return
        }

        setCurrentMonth(new Date(year + YEARS_PER_PAGE, month, 1))
    }

    const isPrevDisabled =
        view === 'day' ? new Date(year, month - 1, 1) < new Date(startYear, 0, 1)
            : view === 'month' ? year - 1 < startYear
                : decadeStart <= startYear

    const isNextDisabled =
        view === 'day' ? new Date(year, month + 1, 1) > new Date(endYear, 11, 1)
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
