import { memo, type ReactElement } from 'react'

import { useCalendarContext } from '@components/forms/calendar/context/calendarContext.ts'
import { capitalizeMonth } from '@components/forms/calendar/components/calendar-caption/utils/capitalizeMonth.utils.ts'
import { useCalendarMonthView } from '@components/forms/calendar/components/calendar-month-view/hooks/useCalendarMonthView.hook.ts'
import Grid from '@components/layout/grid/Grid.tsx'
import CalendarMonthButton
    from '@components/forms/calendar/components/calendar-month-view/components/calendar-month-button/CalendarMonthButton.tsx'

/**
 * Month picker: 3×4 grid of months for the currently viewed year.
 * Clicking a month switches the calendar to that month and closes the picker.
 * Supports keyboard arrow navigation (roving tabindex).
 */
const CalendarMonthView = memo((): ReactElement => {
    const {
        selectedMonth,
        focusedIndex,
        buttonRefs,
        handleKeyDown,
        handleSelect,
        isDisabled,
        isToday,
    } = useCalendarMonthView()
    const { locale } = useCalendarContext()
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long', calendar: 'gregory' })
    const monthLabels = Array.from({ length: 12 }, (_, index) => capitalizeMonth(formatter.format(new Date(2000, index, 1))))

    return (
        <Grid
            columns={3}
            gap={4}
        >
            {monthLabels.map((label, i) => (
                <CalendarMonthButton
                    key={i}
                    index={i}
                    label={label}
                    isSelected={selectedMonth === i}
                    isFocused={i === focusedIndex}
                    buttonRefs={buttonRefs}
                    isDisabled={isDisabled}
                    isToday={isToday}
                    handleSelect={handleSelect}
                    handleKeyDown={handleKeyDown}
                />
            ))}
        </Grid>
    )
})

CalendarMonthView.displayName = 'CalendarMonthView'

export default CalendarMonthView
