import type { ReactElement } from 'react'

import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'
import { CALENDAR_YEAR_VIEW_STYLES } from '@components/forms/calendar/components/calendar-year-view/CalendarYearView.css.ts'
import { useCalendarYearView } from '@components/forms/calendar/components/calendar-year-view/hooks/useCalendarYearView.hook.ts'
import Grid from '@components/layout/grid/Grid.tsx'
import { cn } from '@utils/cn.ts'

/**
 * Year picker: 3×4 grid of years for the current decade page.
 * Clicking a year navigates to that year and opens the month picker.
 * Supports keyboard arrow navigation (roving tabindex).
 */
const CalendarYearView = (): ReactElement => {
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
            gap={'xs'}
        >
            {Array.from({ length: YEARS_PER_PAGE }, (_, i) => {
                const y = decadeStart + i
                const isSelected = year === y

                return (
                    <button
                        key={y}
                        ref={el => { buttonRefs.current[i] = el }}
                        tabIndex={i === focusedIndex ? 0 : -1}
                        disabled={isDisabled(y)}
                        aria-pressed={isSelected}
                        className={cn(
                            CALENDAR_YEAR_VIEW_STYLES.item,
                            isToday(y) && !isSelected && CALENDAR_YEAR_VIEW_STYLES.itemToday,
                            isSelected && CALENDAR_YEAR_VIEW_STYLES.itemSelected,
                        )}
                        onClick={() => handleSelect(y)}
                        onKeyDown={e => handleKeyDown(e, i)}
                    >
                        {y}
                    </button>
                )
            })}
        </Grid>
    )
}

CalendarYearView.displayName = 'CalendarYearView'

export default CalendarYearView
