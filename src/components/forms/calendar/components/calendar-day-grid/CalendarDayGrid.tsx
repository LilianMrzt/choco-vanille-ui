import { useEffect, useRef, useState, type KeyboardEvent, type ReactElement } from 'react'

import { CALENDAR_GRID_STYLES } from '@components/forms/calendar/styles/calendarGrid.css.ts'
import { CALENDAR_DAY_BUTTON_STYLES } from '@components/forms/calendar/styles/calendarDayButton.css.ts'
import { compareDays, createLocalDate, findClosestEnabledDay, isInRange, matchesDate } from '@components/forms/calendar/utils/calendarDates.utils.ts'
import type { CalendarMatcher, CalendarRange } from '@components/forms/calendar/types'
import { cn } from '@utils/cn.ts'

type Props = Readonly<{
    month: Date
    onMonthChange: (month: Date) => void
    startMonth: Date
    endMonth: Date
    selected?: Date | Date[] | CalendarRange
    onSelect: (date: Date) => void
    disabled?: CalendarMatcher | readonly CalendarMatcher[]
    weekStartsOn: number
    showOutsideDays: boolean
    locale?: string
    focusOnMount?: boolean
}>

/** Renders a local-date grid with roving keyboard focus and accessible day labels. */
const CalendarDayGrid = ({
    month, onMonthChange, startMonth, endMonth, selected, onSelect,
    disabled, weekStartsOn, showOutsideDays, locale, focusOnMount = false,
}: Props): ReactElement => {
    const first = createLocalDate(month.getFullYear(), month.getMonth(), 1)
    const last = createLocalDate(month.getFullYear(), month.getMonth() + 1, 0)
    const offset = (first.getDay() - weekStartsOn + 7) % 7
    const count = Math.ceil((offset + last.getDate()) / 7) * 7
    const days = Array.from({ length: count }, (_, index) =>
        createLocalDate(first.getFullYear(), first.getMonth(), index - offset + 1))
    const isInMonth = (date: Date): boolean =>
        date.getFullYear() === first.getFullYear() && date.getMonth() === first.getMonth()
    const initialSelection = selected instanceof Date ? selected
        : Array.isArray(selected) ? selected.find(isInMonth)
            : selected && compareDays(selected.from, last) <= 0 && compareDays(selected.to ?? selected.from, first) >= 0
                ? (compareDays(selected.from, first) < 0 ? first : selected.from)
                : undefined
    const today = new Date()
    const initialFocus = initialSelection &&
        initialSelection.getFullYear() === first.getFullYear() &&
        initialSelection.getMonth() === first.getMonth()
        ? createLocalDate(initialSelection.getFullYear(), initialSelection.getMonth(), initialSelection.getDate())
        : findClosestEnabledDay(today, first, last, disabled) ?? first
    const [focusedDate, setFocusedDate] = useState(initialFocus)
    const pendingFocus = useRef<Date | undefined>(undefined)
    const buttons = useRef(new Map<number, HTMLButtonElement>())
    const mountFocus = useRef(focusOnMount ? initialFocus.getTime() : undefined)
    const monthTime = first.getTime()
    const focusInMonth = focusedDate.getFullYear() === first.getFullYear() && focusedDate.getMonth() === first.getMonth()
        ? focusedDate : initialFocus
    const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short', calendar: 'gregory' })
    const fullWeekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', calendar: 'gregory' })
    const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'full', calendar: 'gregory' })
    const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', calendar: 'gregory' })
    const numberFormatter = new Intl.NumberFormat(locale, { useGrouping: false })

    useEffect(() => {
        if (mountFocus.current !== undefined) {buttons.current.get(mountFocus.current)?.focus()}
    }, [])

    useEffect(() => {
        const pending = pendingFocus.current
        if (!pending) {return}
        pendingFocus.current = undefined
        if (createLocalDate(pending.getFullYear(), pending.getMonth(), 1).getTime() === monthTime) {
            buttons.current.get(pending.getTime())?.focus()
        }
    }, [monthTime])

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date): void => {
        const next = new Date(date)
        if (event.key === 'ArrowLeft') {next.setDate(next.getDate() - 1)}
        else if (event.key === 'ArrowRight') {next.setDate(next.getDate() + 1)}
        else if (event.key === 'ArrowUp') {next.setDate(next.getDate() - 7)}
        else if (event.key === 'ArrowDown') {next.setDate(next.getDate() + 7)}
        else if (event.key === 'Home') {next.setDate(next.getDate() - (next.getDay() - weekStartsOn + 7) % 7)}
        else if (event.key === 'End') {next.setDate(next.getDate() + 6 - (next.getDay() - weekStartsOn + 7) % 7)}
        else if (event.key === 'PageUp' || event.key === 'PageDown') {
            const change = (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1)
            const day = next.getDate()
            next.setDate(1)
            next.setMonth(next.getMonth() + change)
            next.setDate(Math.min(day, createLocalDate(next.getFullYear(), next.getMonth() + 1, 0).getDate()))
        } else {return}
        event.preventDefault()
        const nextMonth = createLocalDate(next.getFullYear(), next.getMonth(), 1)
        const minimum = createLocalDate(startMonth.getFullYear(), startMonth.getMonth(), 1)
        const maximum = createLocalDate(endMonth.getFullYear(), endMonth.getMonth(), 1)
        if (nextMonth < minimum || nextMonth > maximum) {return}
        if (nextMonth.getTime() !== first.getTime()) {
            pendingFocus.current = next
            onMonthChange(nextMonth)
        } else {
            pendingFocus.current = undefined
            buttons.current.get(next.getTime())?.focus()
        }
    }

    const isSelected = (date: Date): boolean => {
        if (selected instanceof Date) {return compareDays(date, selected) === 0}
        if (Array.isArray(selected)) {return selected.some((item) => compareDays(date, item) === 0)}
        return isInRange(date, selected)
    }

    const range = selected && !(selected instanceof Date) && !Array.isArray(selected) ? selected : undefined
    return (
        <table
            className={CALENDAR_GRID_STYLES.month_grid}
            role={'grid'}
            aria-label={monthFormatter.format(first)}
        >
            <thead>
                <tr className={CALENDAR_GRID_STYLES.weekdays}>
                    {Array.from({ length: 7 }, (_, index) => {
                        const weekday = new Date(2023, 0, 1 + (weekStartsOn + index) % 7)
                        return (
                            <th
                                key={index}
                                scope={'col'}
                                className={CALENDAR_GRID_STYLES.weekday}
                                abbr={fullWeekdayFormatter.format(weekday)}
                            >
                                {weekdayFormatter.format(weekday)}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: count / 7 }, (_, week) => (
                    <tr
                        key={week}
                        className={CALENDAR_GRID_STYLES.week}
                    >
                        {days.slice(week * 7, week * 7 + 7).map((date) => {
                            const outside = date.getMonth() !== first.getMonth()
                            const isDisabled = matchesDate(date, disabled) ||
                                createLocalDate(date.getFullYear(), date.getMonth(), 1) < createLocalDate(startMonth.getFullYear(), startMonth.getMonth(), 1) ||
                                createLocalDate(date.getFullYear(), date.getMonth(), 1) > createLocalDate(endMonth.getFullYear(), endMonth.getMonth(), 1)
                            const selectedDay = isSelected(date)
                            return (
                                <td
                                    key={date.getTime()}
                                    role={'gridcell'}
                                    aria-selected={selectedDay}
                                    className={cn(
                                        CALENDAR_GRID_STYLES.day,
                                        selectedDay && CALENDAR_DAY_BUTTON_STYLES.selected,
                                        compareDays(date, today) === 0 && CALENDAR_DAY_BUTTON_STYLES.today,
                                        outside && CALENDAR_DAY_BUTTON_STYLES.outside,
                                        isDisabled && CALENDAR_DAY_BUTTON_STYLES.disabled,
                                        range && compareDays(date, range.from) === 0 && range.to && CALENDAR_DAY_BUTTON_STYLES.range_start,
                                        range?.to && compareDays(date, range.to) === 0 && CALENDAR_DAY_BUTTON_STYLES.range_end,
                                        range?.to && compareDays(date, range.from) > 0 && compareDays(date, range.to) < 0 && CALENDAR_DAY_BUTTON_STYLES.range_middle,
                                    )}
                                >
                                    {(!outside || showOutsideDays) && (
                                        <button
                                            ref={(element) => { if (element) {buttons.current.set(date.getTime(), element)} else {buttons.current.delete(date.getTime())} }}
                                            type={'button'}
                                            className={CALENDAR_DAY_BUTTON_STYLES.day_button}
                                            aria-label={dateFormatter.format(date)}
                                            aria-disabled={isDisabled || undefined}
                                            aria-current={compareDays(date, today) === 0 ? 'date' : undefined}
                                            tabIndex={compareDays(date, focusInMonth) === 0 ? 0 : -1}
                                            onFocus={() => setFocusedDate(date)}
                                            onKeyDown={(event) => handleKeyDown(event, date)}
                                            onClick={() => {
                                                if (isDisabled) {return}
                                                if (outside) {
                                                    pendingFocus.current = date
                                                    onMonthChange(createLocalDate(date.getFullYear(), date.getMonth(), 1))
                                                }
                                                onSelect(date)
                                            }}
                                        >{numberFormatter.format(date.getDate())}</button>
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default CalendarDayGrid
