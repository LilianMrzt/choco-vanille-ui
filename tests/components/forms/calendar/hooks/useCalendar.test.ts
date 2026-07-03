import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useCalendar } from '@components/forms/calendar/hooks/useCalendar.hook.ts'
import { DEFAULT_END_YEAR, DEFAULT_START_YEAR } from '@components/forms/calendar/constants'

describe('useCalendar', () => {
    it('initializes with the current month when no month is provided', () => {
        const before = new Date()
        const { result } = renderHook(() => useCalendar({}))
        const after = new Date()

        expect(result.current.view).toBe('day')
        expect(result.current.currentMonth.getTime()).toBeGreaterThanOrEqual(before.getTime())
        expect(result.current.currentMonth.getTime()).toBeLessThanOrEqual(after.getTime())
    })

    it('uses the controlled month when provided', () => {
        const controlledMonth = new Date(2025, 5, 15)
        const { result } = renderHook(() => useCalendar({ month: controlledMonth }))

        expect(result.current.currentMonth).toBe(controlledMonth)
    })

    it('uses the default month when no controlled month is provided', () => {
        const defaultMonth = new Date(2024, 3, 10)
        const { result } = renderHook(() => useCalendar({ defaultMonth }))

        expect(result.current.currentMonth).toBe(defaultMonth)
    })

    it('updates the internal month and calls onMonthChange', () => {
        const onMonthChange = vi.fn()
        const { result } = renderHook(() => useCalendar({ onMonthChange }))

        const newMonth = new Date(2023, 7, 1)
        act(() => {
            result.current.setCurrentMonth(newMonth)
        })

        expect(result.current.currentMonth).toBe(newMonth)
        expect(onMonthChange).toHaveBeenCalledWith(newMonth)
    })

    it('allows switching the view', () => {
        const { result } = renderHook(() => useCalendar({}))

        act(() => {
            result.current.setView('month')
        })

        expect(result.current.view).toBe('month')

        act(() => {
            result.current.setView('year')
        })

        expect(result.current.view).toBe('year')
    })

    it('resolves default start and end years', () => {
        const { result } = renderHook(() => useCalendar({}))

        expect(result.current.resolvedStartYear).toBe(DEFAULT_START_YEAR)
        expect(result.current.resolvedEndYear).toBe(DEFAULT_END_YEAR)
    })

    it('resolves provided start and end years', () => {
        const { result } = renderHook(() => useCalendar({ startYear: 1900, endYear: 2050 }))

        expect(result.current.resolvedStartYear).toBe(1900)
        expect(result.current.resolvedEndYear).toBe(2050)
    })

    it('resolves start and end months from provided years when not explicitly set', () => {
        const { result } = renderHook(() => useCalendar({ startYear: 2000, endYear: 2030 }))

        expect(result.current.resolvedStartMonth).toEqual(new Date(2000, 0, 1))
        expect(result.current.resolvedEndMonth).toEqual(new Date(2030, 11, 31))
    })

    it('uses explicit start and end months when provided', () => {
        const startMonth = new Date(2020, 2, 1)
        const endMonth = new Date(2025, 8, 30)
        const { result } = renderHook(() => useCalendar({ startMonth, endMonth }))

        expect(result.current.resolvedStartMonth).toBe(startMonth)
        expect(result.current.resolvedEndMonth).toBe(endMonth)
    })
})
