import { useCallback, useMemo, useState } from 'react'
import type { DateValue } from '@internationalized/date'

import { toCalendarDate, toJsDate } from '@components/forms/date-picker/utils/datePicker.utils.ts'
import type { UseDatePickerOptions, UseDatePickerReturn } from '@components/forms/date-picker/types'

/**
 * Manages the selected date for the DatePicker. Typing is handled by React Aria's
 * date field, while the calendar popover writes through the same value.
 *
 * Supports controlled (`value`) and uncontrolled (`defaultValue`) modes. The
 * internal date is always mirrored, so switching back to uncontrolled keeps the
 * last known date.
 */
export const useDatePicker = ({
    value,
    defaultValue,
    onChange,
}: UseDatePickerOptions): UseDatePickerReturn => {
    const isControlled = value !== undefined
    const [uncontrolledDate, setUncontrolledDate] = useState<Date | undefined>(defaultValue)
    const [open, setOpen] = useState(false)

    const selectedDate = isControlled ? value : uncontrolledDate
    const selectedTime = selectedDate?.getTime()

    const calendarValue = useMemo(
        () => toCalendarDate(selectedTime === undefined ? undefined : new Date(selectedTime)),
        [selectedTime],
    )

    const updateDate = useCallback(
        (date: Date | undefined) => {
            setUncontrolledDate(date)
            onChange?.(date)
        },
        [onChange],
    )

    const handleFieldChange = useCallback(
        (next: DateValue | null) => {
            const date = toJsDate(next)
            if (date?.getTime() === selectedTime) {return}

            updateDate(date)
        },
        [selectedTime, updateDate],
    )

    const handleCalendarSelect = useCallback(
        (date: Date | undefined) => {
            setOpen(false)
            updateDate(date)
        },
        [updateDate],
    )

    return {
        selectedDate,
        calendarValue,
        open,
        setOpen,
        handleFieldChange,
        handleCalendarSelect,
    }
}
