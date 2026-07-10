import { useCallback, useEffect, useId, useState } from 'react'

import { formatDateToString, parseStringToDate } from '@components/forms/date-picker/utils/datePicker.utils.ts'
import type { UseDatePickerOptions, UseDatePickerReturn } from '@components/forms/date-picker/types'
import { KEYS_THAT_OPEN_NATIVE_PICKER } from '@components/forms/date-picker/constants'

/**
 * Manages state and interactions for the DatePicker component.
 *
 * Supports both controlled and uncontrolled modes, keeps the native date input
 * in sync with the calendar selection, and only commits valid `YYYY-MM-DD`
 * values to `onChange`.
 */
export const useDatePicker = ({
    value,
    defaultValue,
    onChange,
    id,
}: UseDatePickerOptions): UseDatePickerReturn => {
    const isControlled = value !== undefined
    const generatedId = useId()
    const inputId = id ?? generatedId

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultValue)
    const [inputValue, setInputValue] = useState(formatDateToString(defaultValue))
    const [open, setOpen] = useState(false)

    const resolvedDate = isControlled ? value : selectedDate

    useEffect(() => {
        if (isControlled) {
            setSelectedDate(value)
            setInputValue(formatDateToString(value))
        }
    }, [isControlled, value])

    const updateDate = useCallback(
        (date: Date | undefined) => {
            if (!isControlled) {
                setSelectedDate(date)
                setInputValue(formatDateToString(date))
            }
            onChange?.(date)
        },
        [isControlled, onChange],
    )

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value
            setInputValue(newValue)

            if (newValue === '') {
                if (resolvedDate !== undefined) {
                    updateDate(undefined)
                }
                return
            }

            const parsed = parseStringToDate(newValue)
            if (parsed && parsed.getTime() !== resolvedDate?.getTime()) {
                updateDate(parsed)
            }
        },
        [resolvedDate, updateDate],
    )

    const handleCalendarSelect = useCallback(
        (date: Date | undefined) => {
            updateDate(date)
            setOpen(false)
        },
        [updateDate],
    )

    const handleInputKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            const isSpace = KEYS_THAT_OPEN_NATIVE_PICKER.has(event.key)
            const isAltArrowDown = event.key === 'ArrowDown' && event.altKey

            if (isSpace || isAltArrowDown) {
                event.preventDefault()
                setOpen(true)
            }
        },
        [],
    )

    return {
        selectedDate: resolvedDate,
        inputValue,
        open,
        inputId,
        handleInputChange,
        handleInputKeyDown,
        handleCalendarSelect,
        setOpen,
    }
}
