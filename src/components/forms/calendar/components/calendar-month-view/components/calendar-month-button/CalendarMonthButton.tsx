import { memo, useCallback } from 'react'

import { CALENDAR_MONTH_VIEW_STYLES } from '@components'
import { cn } from '@utils/cn.ts'
import type {
    CalendarMonthButtonProps
} from '@components/forms/calendar/components/calendar-month-view/components/calendar-month-button/types/CalendarMonthButton.props.ts'

const CalendarMonthButton = memo(({
    index,
    label,
    isSelected,
    isFocused,
    buttonRefs,
    isDisabled,
    isToday,
    handleSelect,
    handleKeyDown,
}: CalendarMonthButtonProps) => {
    const handleClick = useCallback(
        () => handleSelect(index),
        [handleSelect, index],
    )
    const handleKeyDownForIndex = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => handleKeyDown(e, index),
        [handleKeyDown, index],
    )

    return (
        <button
            key={index}
            type={'button'}
            ref={el => { buttonRefs.current[index] = el }}
            tabIndex={isFocused ? 0 : -1}
            disabled={isDisabled(index)}
            aria-pressed={isSelected}
            className={cn(
                CALENDAR_MONTH_VIEW_STYLES.item,
                isToday(index) && !isSelected && CALENDAR_MONTH_VIEW_STYLES.itemToday,
                isSelected && CALENDAR_MONTH_VIEW_STYLES.itemSelected,
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDownForIndex}
        >
            {label}
        </button>
    )
})

CalendarMonthButton.displayName = 'CalendarMonthButton'

export default CalendarMonthButton
