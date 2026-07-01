import { type KeyboardEvent, useEffect, useRef, useState } from 'react'

import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'
import { useCalendarContext } from '@components/forms/calendar/context/calendarContext.ts'
import { GRID_COLS } from '@components/forms/calendar/components/calendar-year-view/constants'
import { getDecadeStart } from '@components/forms/calendar/utils/decadeStart.utils.ts'

export const useCalendarYearView = () => {
    const { currentMonth, setCurrentMonth, setView, startYear, endYear } = useCalendarContext()

    const today = new Date()
    const year = currentMonth.getFullYear()
    const decadeStart = getDecadeStart(year)

    const [focusedIndex, setFocusedIndex] = useState(year - decadeStart)
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

    useEffect(() => {
        buttonRefs.current[focusedIndex]?.focus()
    }, [focusedIndex])

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let next: number
        if (event.key === 'ArrowRight') {next = Math.min(index + 1, YEARS_PER_PAGE - 1)}
        else if (event.key === 'ArrowLeft') {next = Math.max(index - 1, 0)}
        else if (event.key === 'ArrowDown') {next = Math.min(index + GRID_COLS, YEARS_PER_PAGE - 1)}
        else if (event.key === 'ArrowUp') {next = Math.max(index - GRID_COLS, 0)}
        else {return}

        event.preventDefault()
        setFocusedIndex(next)
    }

    const handleSelect = (selectedYear: number) => {
        setCurrentMonth(new Date(selectedYear, currentMonth.getMonth(), 1))
        setView('month')
    }

    const isDisabled = (selectedYear: number) => selectedYear < startYear || selectedYear > endYear
    const isToday = (selectedYear: number) => today.getFullYear() === selectedYear

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
