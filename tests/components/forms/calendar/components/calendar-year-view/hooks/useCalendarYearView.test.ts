import { createElement } from 'react'

import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { CalendarContext, type CalendarContextValue } from '@components/forms/calendar/context/calendarContext.ts'
import { useCalendarYearView } from '@components/forms/calendar/components/calendar-year-view/hooks/useCalendarYearView.hook.ts'
import { GRID_COLS } from '@components/forms/calendar/components/calendar-year-view/constants'
import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'
import { getDecadeStart } from '@components/forms/calendar/utils/decadeStart.utils.ts'

const createWrapper = (initial: Partial<CalendarContextValue> & { currentMonth?: Date } = {}) => {
    const value: CalendarContextValue = {
        view: 'year',
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

describe('useCalendarYearView', () => {
    it('derives year and decade start from context', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15) }),
        })

        expect(result.current.year).toBe(2025)
        expect(result.current.decadeStart).toBe(getDecadeStart(2025))
    })

    it('initializes focused index to the current year within the decade', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2027, 5, 1) }),
        })

        expect(result.current.focusedIndex).toBe(2027 - getDecadeStart(2027))
    })

    it('moves focus right with ArrowRight', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
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

    it('stops at the last year when moving right', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowRight' }) as unknown as React.KeyboardEvent<HTMLButtonElement>

        act(() => {
            result.current.handleKeyDown(event, YEARS_PER_PAGE - 1)
        })

        expect(result.current.focusedIndex).toBe(YEARS_PER_PAGE - 1)
    })

    it('moves focus left with ArrowLeft', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' }) as unknown as React.KeyboardEvent<HTMLButtonElement>

        act(() => {
            result.current.handleKeyDown(event, 5)
        })

        expect(result.current.focusedIndex).toBe(4)
    })

    it('moves focus down by GRID_COLS with ArrowDown', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' }) as unknown as React.KeyboardEvent<HTMLButtonElement>

        act(() => {
            result.current.handleKeyDown(event, 0)
        })

        expect(result.current.focusedIndex).toBe(GRID_COLS)
    })

    it('moves focus up by GRID_COLS with ArrowUp', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1) }),
        })

        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' }) as unknown as React.KeyboardEvent<HTMLButtonElement>

        act(() => {
            result.current.handleKeyDown(event, GRID_COLS)
        })

        expect(result.current.focusedIndex).toBe(0)
    })

    it('does nothing for unhandled keys', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1) }),
        })

        const initialFocusedIndex = result.current.focusedIndex
        const event = new KeyboardEvent('keydown', { key: 'Enter' }) as unknown as React.KeyboardEvent<HTMLButtonElement>
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

        act(() => {
            result.current.handleKeyDown(event, 5)
        })

        expect(preventDefaultSpy).not.toHaveBeenCalled()
        expect(result.current.focusedIndex).toBe(initialFocusedIndex)
    })

    it('selects a year and switches back to month view', () => {
        const setCurrentMonth = vi.fn()
        const setView = vi.fn()
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1), setCurrentMonth, setView }),
        })

        act(() => {
            result.current.handleSelect(2028)
        })

        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2028, 5, 1))
        expect(setView).toHaveBeenCalledWith('month')
    })

    it('identifies the current year as today', () => {
        const today = new Date()
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: today }),
        })

        expect(result.current.isToday(today.getFullYear())).toBe(true)
        expect(result.current.isToday(today.getFullYear() + 1)).toBe(false)
    })

    it('disables years outside the start and end boundaries', () => {
        const { result } = renderHook(() => useCalendarYearView(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 1), startYear: 2020, endYear: 2030 }),
        })

        expect(result.current.isDisabled(2019)).toBe(true)
        expect(result.current.isDisabled(2020)).toBe(false)
        expect(result.current.isDisabled(2030)).toBe(false)
        expect(result.current.isDisabled(2031)).toBe(true)
    })
})
