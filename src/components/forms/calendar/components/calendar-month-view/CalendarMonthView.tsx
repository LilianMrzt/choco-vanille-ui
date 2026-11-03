import { memo, type ReactElement } from 'react'

import { MONTH_LABELS } from '@components/forms/calendar/components/calendar-month-view/constants'
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

    return (
        <Grid
            columns={3}
            gap={4}
        >
            {MONTH_LABELS.map((label, i) => (
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
