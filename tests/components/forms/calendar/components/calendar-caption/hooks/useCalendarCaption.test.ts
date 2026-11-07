import { createElement } from 'react'

import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { CalendarContext, type CalendarContextValue } from '@components/forms/calendar/context/calendarContext.ts'
import { useCalendarCaption } from '@components/forms/calendar/components/calendar-caption/hooks/useCalendarCaption.hook.ts'
import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'

const createWrapper = (initial: Partial<CalendarContextValue> & { currentMonth?: Date } = {}) => {
    const value: CalendarContextValue = {
        view: 'day',
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

describe('useCalendarCaption', () => {
    it('formats the label for the current month', () => {
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15) }),
        })

        expect(result.current.label).toMatch(/2025/)
        expect(result.current.label).toMatch(/[A-Z][a-z]+/)
        expect(result.current.year).toBe(2025)
    })

    it('computes decade bounds in year view', () => {
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15), view: 'year' }),
        })

        const decadeStart = Math.floor(2025 / YEARS_PER_PAGE) * YEARS_PER_PAGE
        expect(result.current.decadeStart).toBe(decadeStart)
        expect(result.current.decadeEnd).toBe(decadeStart + YEARS_PER_PAGE - 1)
    })

    it('navigates to the previous month in day view', () => {
        const setCurrentMonth = vi.fn()
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15), setCurrentMonth }),
        })

        act(() => {
            result.current.handlePrev()
        })

        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2025, 4, 1))
    })

    it('navigates to the previous year in month view', () => {
        const setCurrentMonth = vi.fn()
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15), view: 'month', setCurrentMonth }),
        })

        act(() => {
            result.current.handlePrev()
        })

        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2024, 5, 1))
    })

    it('navigates to the previous decade in year view', () => {
        const setCurrentMonth = vi.fn()
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15), view: 'year', setCurrentMonth, endYear: 2050 }),
        })

        act(() => {
            result.current.handlePrev()
        })

        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2025 - YEARS_PER_PAGE, 5, 1))
    })

    it('navigates to the next month in day view', () => {
        const setCurrentMonth = vi.fn()
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15), setCurrentMonth }),
        })

        act(() => {
            result.current.handleNext()
        })

        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2025, 6, 1))
    })

    it('navigates to the next year in month view', () => {
        const setCurrentMonth = vi.fn()
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15), view: 'month', setCurrentMonth }),
        })

        act(() => {
            result.current.handleNext()
        })

        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2026, 5, 1))
    })

    it('navigates to the next decade in year view', () => {
        const setCurrentMonth = vi.fn()
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15), view: 'year', setCurrentMonth, endYear: 2050 }),
        })

        act(() => {
            result.current.handleNext()
        })

        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2025 + YEARS_PER_PAGE, 5, 1))
    })

    it('clamps a year-page jump to the end boundary', () => {
        const setCurrentMonth = vi.fn()
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2025, 5, 15), view: 'year', setCurrentMonth }),
        })

        act(() => { result.current.handleNext() })
        expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2030, 5, 1))
    })

    it('disables previous navigation at the start boundary', () => {
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2000, 0, 15), startYear: 2000 }),
        })

        expect(result.current.isPrevDisabled).toBe(true)
    })

    it('disables next navigation at the end boundary', () => {
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ currentMonth: new Date(2030, 11, 15), endYear: 2030 }),
        })

        expect(result.current.isNextDisabled).toBe(true)
    })

    it('exposes setView from context', () => {
        const setView = vi.fn()
        const { result } = renderHook(() => useCalendarCaption(), {
            wrapper: createWrapper({ setView }),
        })

        expect(result.current.setView).toBe(setView)
    })
})
