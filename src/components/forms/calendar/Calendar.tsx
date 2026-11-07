import { useState, type FC } from 'react'

import Box from '@components/layout/box/Box.tsx'
import Flex from '@components/layout/flex/Flex.tsx'
import { cn } from '@utils/cn.ts'
import { CalendarContext, type CalendarView } from '@components/forms/calendar/context/calendarContext.ts'
import { CalendarCaption } from '@components/forms/calendar/components/calendar-caption/index.ts'
import CalendarDayGrid from '@components/forms/calendar/components/calendar-day-grid/CalendarDayGrid.tsx'
import { CalendarMonthView } from '@components/forms/calendar/components/calendar-month-view'
import { CalendarYearView } from '@components/forms/calendar/components/calendar-year-view'
import { CALENDAR_ROOT_STYLES } from '@components/forms/calendar/styles/calendarRoot.css.ts'
import { useCalendar } from '@components/forms/calendar/hooks/useCalendar.hook.ts'
import { compareDays, selectRange } from '@components/forms/calendar/utils/calendarDates.utils.ts'
import { getDecadeStart } from '@components/forms/calendar/utils/decadeStart.utils.ts'
import type { CalendarProps, CalendarRange } from '@components/forms/calendar/types'

/**
 * Calendar for selecting one date, multiple dates, or an inclusive date range.
 * Dates are interpreted in the local time zone. Set `locale` and `captionLabels`
 * to localize dates and navigation. The day grid supports arrows, Home, End and
 * Page Up/Down (Shift changes years). Supply `selected` and `onSelect` for a
 * controlled selection, or `defaultSelected` for an uncontrolled selection.
 * The initial month defaults to the selection, or today when it is empty.
 * The day tab stop is the selection when visible, otherwise the enabled day
 * in the displayed month closest to today. Disabled days remain focusable.
 * @throws {RangeError} If navigation bounds are invalid or reversed.
 * @param props - Selection mode, navigation and date constraints.
 * @returns A keyboard-operable calendar.
 * @example
 * <Calendar mode="single" defaultSelected={new Date()} />
 */
const Calendar: FC<CalendarProps> = (props) => {
    const {
        className, month, defaultMonth, onMonthChange, startMonth, endMonth,
        startYear, endYear, captionLabels, locale, weekStartsOn = 1,
        showOutsideDays = true, disabled, 'aria-label': ariaLabel,
    } = props
    const [internalSelection, setInternalSelection] = useState<Date | Date[] | CalendarRange | undefined>(props.defaultSelected)
    const selection = 'selected' in props ? props.selected : internalSelection
    const firstSelectedDate = selection instanceof Date ? selection
        : Array.isArray(selection) ? selection[0] : selection?.from
    const {
        view, setView, currentMonth, setCurrentMonth, resolvedStartYear,
        resolvedEndYear, resolvedStartMonth, resolvedEndMonth,
    } = useCalendar({ month, defaultMonth: defaultMonth ?? firstSelectedDate, onMonthChange, startMonth, endMonth, startYear, endYear })
    const [focusDayOnMount, setFocusDayOnMount] = useState(false)

    const handleViewChange = (nextView: CalendarView): void => {
        if (nextView === 'day' && view !== 'day') {setFocusDayOnMount(true)}
        setView(nextView)
    }

    const handleSelect = (date: Date): void => {
        if (props.mode === 'single') {
            const current = selection instanceof Date ? selection : undefined
            const next = current && compareDays(current, date) === 0 ? undefined : date
            setInternalSelection(next)
            props.onSelect?.(next)
        } else if (props.mode === 'multiple') {
            const current = Array.isArray(selection) ? selection : []
            const exists = current.some((item) => compareDays(item, date) === 0)
            const next = exists ? current.filter((item) => compareDays(item, date) !== 0) : [...current, date]
            const resolved = next.length ? next : undefined
            setInternalSelection(resolved)
            props.onSelect?.(resolved)
        } else {
            const current = selection && !(selection instanceof Date) && !Array.isArray(selection) ? selection : undefined
            const next = selectRange(date, current)
            setInternalSelection(next)
            props.onSelect?.(next)
        }
    }

    return (
        <CalendarContext.Provider value={{
            view, setView: handleViewChange, currentMonth, setCurrentMonth,
            startYear: resolvedStartYear, endYear: resolvedEndYear,
            startMonth: resolvedStartMonth, endMonth: resolvedEndMonth, locale,
        }}
        >
            <Box
                className={cn(CALENDAR_ROOT_STYLES.root, className)}
                aria-label={ariaLabel}
                role={ariaLabel ? 'region' : undefined}
            >
                <Flex
                    flexDirection={'column'}
                    gap={12}
                >
                    <CalendarCaption labels={captionLabels} />
                    <Box className={CALENDAR_ROOT_STYLES.calendarContent}>
                        {view === 'day' && (
                            <CalendarDayGrid
                                month={currentMonth}
                                onMonthChange={setCurrentMonth}
                                startMonth={resolvedStartMonth}
                                endMonth={resolvedEndMonth}
                                selected={selection}
                                onSelect={handleSelect}
                                disabled={disabled}
                                weekStartsOn={weekStartsOn}
                                showOutsideDays={showOutsideDays}
                                locale={locale}
                                focusOnMount={focusDayOnMount}
                            />
                        )}
                        {view === 'month' && <CalendarMonthView key={currentMonth.getFullYear()} />}
                        {view === 'year' && <CalendarYearView key={getDecadeStart(currentMonth.getFullYear())} />}
                    </Box>
                </Flex>
            </Box>
        </CalendarContext.Provider>
    )
}

export default Calendar
