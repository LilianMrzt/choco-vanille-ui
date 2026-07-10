import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

import { useCalendarContext } from '@components/forms/calendar/context/calendarContext.ts'
import { GRID_COLS } from '@components/forms/calendar/components/calendar-month-view/constants'

export const useCalendarMonthView = () => {
    const { currentMonth, setCurrentMonth, setView, startYear, endYear } = useCalendarContext()

    const today = new Date()
    const year = currentMonth.getFullYear()
    const selectedMonth = currentMonth.getMonth()

    const [focusedIndex, setFocusedIndex] = useState(selectedMonth)
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

    useEffect(() => {
        buttonRefs.current[focusedIndex]?.focus()
    }, [focusedIndex])

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
            let next: number
            if (event.key === 'ArrowRight') {next = Math.min(index + 1, 11)}
            else if (event.key === 'ArrowLeft') {next = Math.max(index - 1, 0)}
            else if (event.key === 'ArrowDown') {next = Math.min(index + GRID_COLS, 11)}
            else if (event.key === 'ArrowUp') {next = Math.max(index - GRID_COLS, 0)}
            else {return}

            event.preventDefault()
            setFocusedIndex(next)
        },
        [],
    )

    const handleSelect = useCallback(
        (monthIndex: number) => {
            setCurrentMonth(new Date(year, monthIndex, 1))
            setView('day')
        },
        [year, setCurrentMonth, setView],
    )

    const isDisabled = useCallback(
        (monthIndex: number) =>
            (year === startYear && monthIndex < 0) || (year === endYear && monthIndex > 11),
        [year, startYear, endYear],
    )

    const isToday = useCallback(
        (monthIndex: number) =>
            today.getFullYear() === year && today.getMonth() === monthIndex,
        [year, today],
    )

    return {
        year,
        selectedMonth,
        focusedIndex,
        buttonRefs,
        handleKeyDown,
        handleSelect,
        isDisabled,
        isToday,
    }
}
