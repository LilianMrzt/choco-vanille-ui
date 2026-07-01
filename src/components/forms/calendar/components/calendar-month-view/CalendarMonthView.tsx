import type { ReactElement } from 'react'

import { CALENDAR_MONTH_VIEW_STYLES } from '@components/forms/calendar/components/calendar-month-view/CalendarMonthView.css.ts'
import { MONTH_LABELS } from '@components/forms/calendar/components/calendar-month-view/constants'
import { useCalendarMonthView } from '@components/forms/calendar/components/calendar-month-view/hooks/useCalendarMonthView.hook.ts'
import Grid from '@components/layout/grid/Grid.tsx'
import { cn } from '@utils/cn.ts'

/**
 * Month picker: 3×4 grid of months for the currently viewed year.
 * Clicking a month switches the calendar to that month and closes the picker.
 * Supports keyboard arrow navigation (roving tabindex).
 */
const CalendarMonthView = (): ReactElement => {
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
            gap={'xs'}
        >
            {MONTH_LABELS.map((label, i) => {
                const isSelected = selectedMonth === i

                return (
                    <button
                        key={i}
                        ref={el => { buttonRefs.current[i] = el }}
                        tabIndex={i === focusedIndex ? 0 : -1}
                        disabled={isDisabled(i)}
                        className={cn(
                            CALENDAR_MONTH_VIEW_STYLES.item,
                            isToday(i) && !isSelected && CALENDAR_MONTH_VIEW_STYLES.itemToday,
                            isSelected && CALENDAR_MONTH_VIEW_STYLES.itemSelected,
                        )}
                        onClick={() => handleSelect(i)}
                        onKeyDown={e => handleKeyDown(e, i)}
                    >
                        {label}
                    </button>
                )
            })}
        </Grid>
    )
}

CalendarMonthView.displayName = 'CalendarMonthView'

export default CalendarMonthView
