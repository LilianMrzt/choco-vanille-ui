import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'
import { useCalendarContext } from '@components/forms/calendar/context/calendarContext.ts'
import { GRID_COLS } from '@components/forms/calendar/components/calendar-year-view/constants'
import { getDecadeStart } from '@components/forms/calendar/utils/decadeStart.utils.ts'
import { createLocalDate } from '@components/forms/calendar/utils/calendarDates.utils.ts'

export const useCalendarYearView = () => {
    const { currentMonth, setCurrentMonth, setView, startYear, endYear, startMonth, endMonth } = useCalendarContext()

    const today = new Date()
    const year = currentMonth.getFullYear()
    const decadeStart = getDecadeStart(year)
    const minimumIndex = Math.max(0, startYear - decadeStart)
    const maximumIndex = Math.min(YEARS_PER_PAGE - 1, endYear - decadeStart)

    const [focusedIndex, setFocusedIndex] = useState(Math.min(maximumIndex, Math.max(minimumIndex, year - decadeStart)))
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

    useEffect(() => {
        buttonRefs.current[focusedIndex]?.focus()
    }, [focusedIndex])

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
            let next: number
            if (event.key === 'ArrowRight') {next = Math.min(index + 1, YEARS_PER_PAGE - 1)}
            else if (event.key === 'ArrowLeft') {next = Math.max(index - 1, 0)}
            else if (event.key === 'ArrowDown') {next = Math.min(index + GRID_COLS, YEARS_PER_PAGE - 1)}
            else if (event.key === 'ArrowUp') {next = Math.max(index - GRID_COLS, 0)}
            else {return}

            event.preventDefault()
            setFocusedIndex(Math.min(maximumIndex, Math.max(minimumIndex, next)))
        },
        [minimumIndex, maximumIndex],
    )

    const handleSelect = useCallback(
        (selectedYear: number) => {
            let month = currentMonth.getMonth()
            if (selectedYear === startYear) {month = Math.max(month, startMonth?.getMonth() ?? 0)}
            if (selectedYear === endYear) {month = Math.min(month, endMonth?.getMonth() ?? 11)}
            setCurrentMonth(createLocalDate(selectedYear, month, 1))
            setView('month')
        },
        [currentMonth, setCurrentMonth, setView, startYear, endYear, startMonth, endMonth],
    )

    const isDisabled = useCallback(
        (selectedYear: number) => selectedYear < startYear || selectedYear > endYear,
        [startYear, endYear],
    )

    const isToday = useCallback(
        (selectedYear: number) => today.getFullYear() === selectedYear,
        [today],
    )

    return {
        year,
        decadeStart,
        focusedIndex,
        buttonRefs,
        handleKeyDown,
        handleSelect,
        isDisabled,
        isToday,
    }
}
