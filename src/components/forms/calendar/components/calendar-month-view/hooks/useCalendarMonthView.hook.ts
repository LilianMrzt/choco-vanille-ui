import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

import { useCalendarContext } from '@components/forms/calendar/context/calendarContext.ts'
import { GRID_COLS } from '@components/forms/calendar/components/calendar-month-view/constants'
import { createLocalDate } from '@components/forms/calendar/utils/calendarDates.utils.ts'

export const useCalendarMonthView = () => {
    const { currentMonth, setCurrentMonth, setView, startYear, endYear, startMonth, endMonth } = useCalendarContext()

    const today = new Date()
    const year = currentMonth.getFullYear()
    const selectedMonth = currentMonth.getMonth()

    const minimumMonth = year === startYear ? startMonth?.getMonth() ?? 0 : 0
    const maximumMonth = year === endYear ? endMonth?.getMonth() ?? 11 : 11
    const [focusedIndex, setFocusedIndex] = useState(Math.min(maximumMonth, Math.max(minimumMonth, selectedMonth)))
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
            setFocusedIndex(Math.min(maximumMonth, Math.max(minimumMonth, next)))
        },
        [minimumMonth, maximumMonth],
    )

    const handleSelect = useCallback(
        (monthIndex: number) => {
            setCurrentMonth(createLocalDate(year, monthIndex, 1))
            setView('day')
        },
        [year, setCurrentMonth, setView],
    )

    const isDisabled = useCallback(
        (monthIndex: number) =>
            (year === startYear && monthIndex < (startMonth?.getMonth() ?? 0)) ||
            (year === endYear && monthIndex > (endMonth?.getMonth() ?? 11)),
        [year, startYear, endYear, startMonth, endMonth],
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
