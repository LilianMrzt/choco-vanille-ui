import { memo, useCallback } from 'react'
import { CALENDAR_YEAR_VIEW_STYLES } from '@components'
import { cn } from '@utils/cn.ts'
import type {
    CalendarYearButtonProps
} from '@components/forms/calendar/components/calendar-year-view/components/calendar-year-button/types/CalendarYearButton.props.ts'

const CalendarYearButton = memo(({
    year,
    index,
    isSelected,
    isFocused,
    buttonRefs,
    isDisabled,
    isToday,
    handleSelect,
    handleKeyDown,
}: CalendarYearButtonProps) => {
    const handleClick = useCallback(
        () => handleSelect(year),
        [handleSelect, year],
    )
    const handleKeyDownForIndex = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => handleKeyDown(e, index),
        [handleKeyDown, index],
    )

    return (
        <button
            key={year}
            type={'button'}
            ref={el => { buttonRefs.current[index] = el }}
            tabIndex={isFocused ? 0 : -1}
            disabled={isDisabled(year)}
            aria-pressed={isSelected}
            className={cn(
                CALENDAR_YEAR_VIEW_STYLES.item,
                isToday(year) && !isSelected && CALENDAR_YEAR_VIEW_STYLES.itemToday,
                isSelected && CALENDAR_YEAR_VIEW_STYLES.itemSelected,
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDownForIndex}
        >
            {year}
        </button>
    )
})

CalendarYearButton.displayName = 'CalendarYearButton'

export default CalendarYearButton
