import { memo, type FC } from 'react'
import { DayPicker } from 'react-day-picker'

import Box from '@components/layout/box/Box.tsx'
import Flex from '@components/layout/flex/Flex.tsx'
import { cn } from '@utils/cn.ts'
import { CalendarContext } from '@components/forms/calendar/context/calendarContext.ts'
import { CalendarCaption } from '@components/forms/calendar/components/calendar-caption/index.ts'
import { CalendarMonthView } from '@components/forms/calendar/components/calendar-month-view'
import { CalendarYearView } from '@components/forms/calendar/components/calendar-year-view'
import { CALENDAR_ROOT_STYLES } from '@components/forms/calendar/styles/calendarRoot.css.ts'
import { CALENDAR_GRID_STYLES } from '@components/forms/calendar/styles/calendarGrid.css.ts'
import { CALENDAR_DAY_BUTTON_STYLES } from '@components/forms/calendar/styles/calendarDayButton.css.ts'
import { useCalendar } from '@components/forms/calendar/hooks/useCalendar.hook.ts'
import type { CalendarProps } from '@components/forms/calendar/types/Calendar.props.ts'

/**
 * A date-picker calendar built on top of `react-day-picker`.
 *
 * Supports `single`, `multiple`, and `range` selection modes.
 *
 * The header shows **[← Month Year →]** in day view. Clicking **Month** opens
 * a 3×4 month picker; clicking **Year** opens a 3×4 year picker with decade
 * pagination — no scrolling required.
 *
 * Use `startYear` / `endYear` to bound the year picker range
 * (defaults: 100 years back → 10 years ahead).
 *
 * @example
 * ```tsx
 * // Single date
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 *
 * // Date of birth — show last 120 years, no future dates
 * <Calendar mode="single" startYear={1900} endYear={currentYear} disabled={{ after: new Date() }} selected={dob} onSelect={setDob} />
 *
 * // Date range
 * <Calendar mode="range" selected={range} onSelect={setRange} />
 * ```
 */
const Calendar: FC<CalendarProps> = memo(({
    className,
    classNames,
    month: controlledMonth,
    defaultMonth,
    onMonthChange,
    startMonth,
    endMonth,
    startYear,
    endYear,
    weekStartsOn = 1,
    showOutsideDays = true,
    captionLabels,
    ...props
}) => {
    const {
        view,
        setView,
        currentMonth,
        setCurrentMonth,
        resolvedStartYear,
        resolvedEndYear,
        resolvedStartMonth,
        resolvedEndMonth,
    } = useCalendar({
        month: controlledMonth,
        defaultMonth,
        onMonthChange,
        startMonth,
        endMonth,
        startYear,
        endYear,
    })

    return (
        <CalendarContext.Provider
            value={{
                view,
                setView,
                currentMonth,
                setCurrentMonth,
                startYear: resolvedStartYear,
                endYear: resolvedEndYear,            }}
        >
            <Box className={cn(CALENDAR_ROOT_STYLES.root, className)}>
                <Flex
                    flexDirection={'column'}
                    gap={'md'}
                >
                    <CalendarCaption labels={captionLabels} />

                    <Box className={CALENDAR_ROOT_STYLES.calendarContent}>
                        {view === 'day' && (
                            <DayPicker
                                {...props}
                                weekStartsOn={weekStartsOn}
                                showOutsideDays={showOutsideDays}
                                month={currentMonth}
                                onMonthChange={setCurrentMonth}
                                startMonth={resolvedStartMonth}
                                endMonth={resolvedEndMonth}
                                hideNavigation
                                classNames={{
                                    months: CALENDAR_ROOT_STYLES.months,
                                    month: CALENDAR_ROOT_STYLES.month,
                                    month_caption: CALENDAR_ROOT_STYLES.hiddenCaption,
                                    month_grid: CALENDAR_GRID_STYLES.month_grid,
                                    weekdays: CALENDAR_GRID_STYLES.weekdays,
                                    weekday: CALENDAR_GRID_STYLES.weekday,
                                    week: CALENDAR_GRID_STYLES.week,
                                    day: CALENDAR_GRID_STYLES.day,
                                    day_button: CALENDAR_DAY_BUTTON_STYLES.day_button,
                                    selected: CALENDAR_DAY_BUTTON_STYLES.selected,
                                    today: CALENDAR_DAY_BUTTON_STYLES.today,
                                    outside: CALENDAR_DAY_BUTTON_STYLES.outside,
                                    disabled: CALENDAR_DAY_BUTTON_STYLES.disabled,
                                    range_start: CALENDAR_DAY_BUTTON_STYLES.range_start,
                                    range_end: CALENDAR_DAY_BUTTON_STYLES.range_end,
                                    range_middle: CALENDAR_DAY_BUTTON_STYLES.range_middle,
                                    ...classNames,
                                }}
                            />
                        )}

                        {view === 'month' && <CalendarMonthView />}
                        {view === 'year' && <CalendarYearView />}
                    </Box>
                </Flex>
            </Box>
        </CalendarContext.Provider>
    )
})

Calendar.displayName = 'Calendar'

export default Calendar
