import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useDatePicker } from '@components/forms/date-picker/hooks/useDatePicker.hook.ts'
import { formatDateToString } from '@components/forms/date-picker/utils/datePicker.utils.ts'

describe('useDatePicker', () => {
    it('initializes uncontrolled state from defaultValue', () => {
        const defaultValue = new Date(2025, 5, 15)
        const { result } = renderHook(() => useDatePicker({ defaultValue }))

        expect(result.current.selectedDate).toBe(defaultValue)
        expect(result.current.inputValue).toBe(formatDateToString(defaultValue))
        expect(result.current.open).toBe(false)
    })

    it('uses the provided id over the generated one', () => {
        const { result } = renderHook(() => useDatePicker({ id: 'custom-id' }))

        expect(result.current.inputId).toBe('custom-id')
    })

    it('generates an id when none is provided', () => {
        const { result } = renderHook(() => useDatePicker({}))

        expect(result.current.inputId).toBeTruthy()
    })

    it('updates input value and selected date on valid input change', () => {
        const onChange = vi.fn()
        const { result } = renderHook(() => useDatePicker({ onChange }))

        const event = {
            target: { value: '2025-06-15' },
        } as React.ChangeEvent<HTMLInputElement>

        act(() => {
            result.current.handleInputChange(event)
        })

        expect(result.current.inputValue).toBe('2025-06-15')
        expect(result.current.selectedDate).toEqual(new Date(2025, 5, 15))
        expect(onChange).toHaveBeenCalledWith(new Date(2025, 5, 15))
    })

    it('clears the date when the input is emptied', () => {
        const onChange = vi.fn()
        const defaultValue = new Date(2025, 5, 15)
        const { result } = renderHook(() => useDatePicker({ defaultValue, onChange }))

        const event = {
            target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>

        act(() => {
            result.current.handleInputChange(event)
        })

        expect(result.current.inputValue).toBe('')
        expect(result.current.selectedDate).toBeUndefined()
        expect(onChange).toHaveBeenCalledWith(undefined)
    })

    it('does not call onChange when the parsed date matches the current date', () => {
        const defaultValue = new Date(2025, 5, 15)
        const onChange = vi.fn()
        const { result } = renderHook(() => useDatePicker({ defaultValue, onChange }))

        const event = {
            target: { value: '2025-06-15' },
        } as React.ChangeEvent<HTMLInputElement>

        act(() => {
            result.current.handleInputChange(event)
        })

        expect(onChange).not.toHaveBeenCalled()
    })

    it('ignores invalid date strings', () => {
        const onChange = vi.fn()
        const { result } = renderHook(() => useDatePicker({ onChange }))

        const event = {
            target: { value: 'not-a-date' },
        } as React.ChangeEvent<HTMLInputElement>

        act(() => {
            result.current.handleInputChange(event)
        })

        expect(result.current.inputValue).toBe('not-a-date')
        expect(result.current.selectedDate).toBeUndefined()
        expect(onChange).not.toHaveBeenCalled()
    })

    it('opens the calendar on space key down', () => {
        const { result } = renderHook(() => useDatePicker({}))

        const event = {
            key: ' ',
            altKey: false,
            preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>

        act(() => {
            result.current.handleInputKeyDown(event)
        })

        expect(event.preventDefault).toHaveBeenCalled()
        expect(result.current.open).toBe(true)
    })

    it('opens the calendar on alt + ArrowDown', () => {
        const { result } = renderHook(() => useDatePicker({}))

        const event = {
            key: 'ArrowDown',
            altKey: true,
            preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>

        act(() => {
            result.current.handleInputKeyDown(event)
        })

        expect(event.preventDefault).toHaveBeenCalled()
        expect(result.current.open).toBe(true)
    })

    it('does not open the calendar for other keys', () => {
        const { result } = renderHook(() => useDatePicker({}))

        const event = {
            key: 'Enter',
            altKey: false,
            preventDefault: vi.fn(),
        } as unknown as React.KeyboardEvent<HTMLInputElement>

        act(() => {
            result.current.handleInputKeyDown(event)
        })

        expect(event.preventDefault).not.toHaveBeenCalled()
        expect(result.current.open).toBe(false)
    })

    it('selects a date from the calendar and closes the popover', () => {
        const onChange = vi.fn()
        const { result } = renderHook(() => useDatePicker({ onChange }))

        const date = new Date(2025, 5, 15)
        act(() => {
            result.current.handleCalendarSelect(date)
        })

        expect(result.current.selectedDate).toBe(date)
        expect(result.current.inputValue).toBe(formatDateToString(date))
        expect(result.current.open).toBe(false)
        expect(onChange).toHaveBeenCalledWith(date)
    })

    it('follows controlled value updates', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDatePicker({ value }),
            { initialProps: { value: new Date(2025, 0, 1) } },
        )

        expect(result.current.selectedDate).toEqual(new Date(2025, 0, 1))

        rerender({ value: new Date(2025, 5, 15) })

        expect(result.current.selectedDate).toEqual(new Date(2025, 5, 15))
        expect(result.current.inputValue).toBe('2025-06-15')
    })

    it('does not update internal state in controlled mode', () => {
        const onChange = vi.fn()
        const { result } = renderHook(() => useDatePicker({ value: new Date(2025, 0, 1), onChange }))

        const event = {
            target: { value: '2025-06-15' },
        } as React.ChangeEvent<HTMLInputElement>

        act(() => {
            result.current.handleInputChange(event)
        })

        expect(result.current.selectedDate).toEqual(new Date(2025, 0, 1))
        expect(onChange).toHaveBeenCalledWith(new Date(2025, 5, 15))
    })

    it('toggles open state via setOpen', () => {
        const { result } = renderHook(() => useDatePicker({}))

        act(() => {
            result.current.setOpen(true)
        })

        expect(result.current.open).toBe(true)

        act(() => {
            result.current.setOpen(false)
        })

        expect(result.current.open).toBe(false)
    })
})
