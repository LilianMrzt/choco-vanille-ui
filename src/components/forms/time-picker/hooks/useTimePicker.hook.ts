import { useCallback, useEffect, useId, useState } from 'react'

import { KEYS_THAT_OPEN_NATIVE_PICKER } from '@components/forms/time-picker/constants'
import type { UseTimePickerOptions, UseTimePickerReturn } from '@components/forms/time-picker/types'
import { clampTime, getCurrentTime, isValidTime, joinTime, splitTime } from '@components/forms/time-picker/utils/timePicker.utils.ts'

/**
 * Manages state and interactions for the TimePicker component.
 *
 * Supports both controlled and uncontrolled modes, keeps the native time input
 * in sync with the popover selection, and only commits valid `HH:mm` values to
 * `onChange`.
 */
export const useTimePicker = ({
    value,
    defaultValue,
    onChange,
    id,
    defaultPanelTime,
    minTime,
    maxTime,
}: UseTimePickerOptions): UseTimePickerReturn => {
    const isControlled = value !== undefined
    const generatedId = useId()
    const inputId = id ?? generatedId

    const [selectedTime, setSelectedTime] = useState<string | undefined>(
        isValidTime(defaultValue) ? defaultValue : undefined,
    )
    const [inputValue, setInputValue] = useState(
        isValidTime(defaultValue) ? defaultValue : '',
    )
    const [open, setOpen] = useState(false)

    const resolvedTime = isControlled ? (isValidTime(value) ? value : undefined) : selectedTime

    useEffect(() => {
        if (isControlled) {
            setSelectedTime(isValidTime(value) ? value : undefined)
            setInputValue(isValidTime(value) ? value : '')
        }
    }, [isControlled, value])

    const updateTime = useCallback(
        (time: string | undefined) => {
            if (!isControlled) {
                setSelectedTime(time)
                setInputValue(time ?? '')
            }
            onChange?.(time)
        },
        [isControlled, onChange],
    )

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value
            setInputValue(newValue)

            if (newValue === '') {
                if (resolvedTime !== undefined) {
                    updateTime(undefined)
                }
                return
            }

            if (isValidTime(newValue) && newValue !== resolvedTime) {
                updateTime(newValue)
            }
        },
        [resolvedTime, updateTime],
    )

    const handleHourSelect = useCallback(
        (hour: string) => {
            const minute = splitTime(resolvedTime)?.minute
                ?? splitTime(defaultPanelTime)?.minute
                ?? '00'
            updateTime(clampTime(joinTime(hour, minute), minTime, maxTime))
        },
        [resolvedTime, defaultPanelTime, minTime, maxTime, updateTime],
    )

    const handleMinuteSelect = useCallback(
        (minute: string) => {
            const hour = splitTime(resolvedTime)?.hour
                ?? splitTime(defaultPanelTime)?.hour
                ?? '00'
            updateTime(clampTime(joinTime(hour, minute), minTime, maxTime))
            setOpen(false)
        },
        [resolvedTime, defaultPanelTime, minTime, maxTime, updateTime],
    )

    const handleNowSelect = useCallback(() => {
        updateTime(clampTime(getCurrentTime(), minTime, maxTime))
        setOpen(false)
    }, [minTime, maxTime, updateTime])

    const handleClear = useCallback(() => {
        updateTime(undefined)
        setOpen(false)
    }, [updateTime])
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
        selectedTime: resolvedTime,
        inputValue,
        open,
        inputId,
        handleInputChange,
        handleInputKeyDown,
        handleHourSelect,
        handleMinuteSelect,
        handleNowSelect,
        handleClear,
        setOpen,
    }
}
