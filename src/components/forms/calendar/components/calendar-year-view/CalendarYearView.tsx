import { memo, type ReactElement } from 'react'

import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'
import { useCalendarYearView } from '@components/forms/calendar/components/calendar-year-view/hooks/useCalendarYearView.hook.ts'
import Grid from '@components/layout/grid/Grid.tsx'
import CalendarYearButton
    from '@components/forms/calendar/components/calendar-year-view/components/calendar-year-button/CalendarYearButton.tsx'

/**
 * Year picker: 3×4 grid of years for the current decade page.
 * Clicking a year navigates to that year and opens the month picker.
 * Supports keyboard arrow navigation (roving tabindex).
 */
const CalendarYearView = memo((): ReactElement => {
    const {
        year,
        decadeStart,
        focusedIndex,
        buttonRefs,
        handleKeyDown,
        handleSelect,
        isDisabled,
        isToday,
    } = useCalendarYearView()

    return (
        <Grid
            columns={3}
            gap={4}
        >
            {Array.from({ length: YEARS_PER_PAGE }, (_, i) => {
                const y = decadeStart + i

                return (
                    <CalendarYearButton
                        key={y}
                        year={y}
                        index={i}
                        isSelected={year === y}
                        isFocused={i === focusedIndex}
                        buttonRefs={buttonRefs}
                        isDisabled={isDisabled}
                        isToday={isToday}
                        handleSelect={handleSelect}
                        handleKeyDown={handleKeyDown}
                    />
                )
            })}
        </Grid>
    )
})

CalendarYearView.displayName = 'CalendarYearView'

export default CalendarYearView
