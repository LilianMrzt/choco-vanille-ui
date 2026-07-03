import { createElement } from 'react'

import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { CalendarContext, type CalendarContextValue } from '@components/forms/calendar/context/calendarContext.ts'
import { useCalendarMonthView } from '@components/forms/calendar/components/calendar-month-view/hooks/useCalendarMonthView.hook.ts'
import { GRID_COLS } from '@components/forms/calendar/components/calendar-month-view/constants'

const createWrapper = (initial: Partial<CalendarContextValue> & { currentMonth?: Date } = {}) => {
    const value: CalendarContextValue = {
        view: 'month',
        setView: vi.fn(),
        currentMonth: new Date(2025, 5, 15),
        setCurrentMonth: vi.fn(),
        startYear: 2000,
        endYear: 2030,
        ...initial,
    }

    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(CalendarContext.Provider, { value }, children)
    }
}

describe('useCalendarMonthView', () => {
    it('derives year and selected month from context', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15) }),
        })

        expect(result.current.year).toBe(2025)
        expect(result.current.selectedMonth).toBe(5)
    })

    it('initializes focused index to the selected month', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 8, 1) }),
        })

        expect(result.current.focusedIndex).toBe(8)
    })

    it('moves focus right with ArrowRight', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowRight' }) as unknown as React.KeyboardEvent<HTMLButtonElement>
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

        act(() => {
            result.current.handleKeyDown(event, 5)
        })

        expect(preventDefaultSpy).toHaveBeenCalled()
        expect(result.current.focusedIndex).toBe(6)
    })

    it('stops at the last month when moving right', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 11, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowRight' }) as unknown as React.KeyboardEvent<HTMLButtonElement>

        act(() => {
            result.current.handleKeyDown(event, 11)
        })

        expect(result.current.focusedIndex).toBe(11)
    })

    it('moves focus left with ArrowLeft', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' }) as unknown as React.KeyboardEvent<HTMLButtonElement>

        act(() => {
            result.current.handleKeyDown(event, 5)
        })

        expect(result.current.focusedIndex).toBe(4)
    })

    it('moves focus down by GRID_COLS with ArrowDown', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 0, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' }) as unknown as React.KeyboardEvent<HTMLButtonElement>

        act(() => {
            result.current.handleKeyDown(event, 0)
        })

        expect(result.current.focusedIndex).toBe(GRID_COLS)
    })

    it('moves focus up by GRID_COLS with ArrowUp', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 0, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' }) as unknown as React.KeyboardEvent<HTMLButtonElement>

        act(() => {
            result.current.handleKeyDown(event, GRID_COLS)
        })

        expect(result.current.focusedIndex).toBe(0)
    })

    it('does nothing for unhandled keys', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'Enter' }) as unknown as React.KeyboardEvent<HTMLButtonElement>
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

        act(() => {
            result.current.handleKeyDown(event, 5)
        })

        expect(preventDefaultSpy).not.toHaveBeenCalled()
        expect(result.current.focusedIndex).toBe(5)
    })

    it('selects a month and switches back to day view', () => {
        const setCurrentMonth = vi.fn()
        const setView = vi.fn()
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1), setCurrentMonth, setView }),
        })

        act(() => {
            result.current.handleSelect(8)
        })

        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2025, 8, 1))
        expect(setView).toHaveBeenCalledWith('day')
    })

    it('identifies the current month as today', () => {
        const today = new Date()
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(today.getFullYear(), today.getMonth(), 1) }),
        })

        expect(result.current.isToday(today.getMonth())).toBe(true)
        expect(result.current.isToday((today.getMonth() + 1) % 12)).toBe(false)
    })

    it('disables months outside the year boundaries', () => {
        const { result } = renderHook(() => useCalendarMonthView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1), startYear: 2025, endYear: 2025 }),
        })

        expect(result.current.isDisabled(0)).toBe(false)
        expect(result.current.isDisabled(11)).toBe(false)
    })
})
