import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CalendarYearView } from '@components/forms/calendar/components/calendar-year-view'
import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'
import {
    CalendarContext,
    type CalendarContextValue,
} from '@components/forms/calendar/context/calendarContext'
import { getDecadeStart } from '@components/forms/calendar/utils/decadeStart.utils'

const renderWithContext = (
    ui: ReactNode,
    overrides: Partial<CalendarContextValue> = {},
) => {
    const value: CalendarContextValue = {
        view: 'year',
        setView: vi.fn(),
        currentMonth: new Date(2025, 5, 1),
        setCurrentMonth: vi.fn(),
        startYear: 1900,
        endYear: 2100,
        ...overrides,
    }
    return render(<CalendarContext.Provider value={value}>{ui}</CalendarContext.Provider>)
}

describe('CalendarYearView', () => {
    describe('rendering', () => {
        it('renders all years for the current decade page', () => {
            renderWithContext(<CalendarYearView />, { currentMonth: new Date(2025, 5, 1) })
            const decadeStart = getDecadeStart(2025)
            for (let i = 0; i < YEARS_PER_PAGE; i++) {
                expect(screen.getByRole('button', { name: String(decadeStart + i) })).toBeTruthy()
            }
        })

        it('marks the selected year as pressed', () => {
            renderWithContext(<CalendarYearView />, { currentMonth: new Date(2025, 5, 1) })
            expect(screen.getByRole('button', { name: '2025' }).getAttribute('aria-pressed')).toBe('true')
        })
    })

    describe('interactions', () => {
        it('selects a year when clicked', async () => {
            const setCurrentMonth = vi.fn()
            const setView = vi.fn()
            renderWithContext(<CalendarYearView />, {
                currentMonth: new Date(2025, 5, 1),
                setCurrentMonth,
                setView,
            })
            await userEvent.click(screen.getByRole('button', { name: '2026' }))
            expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2026, 5, 1))
            expect(setView).toHaveBeenCalledWith('month')
        })

        it('moves focus with arrow keys', async () => {
            renderWithContext(<CalendarYearView />, { currentMonth: new Date(2025, 5, 1) })
            screen.getByRole('button', { name: '2025' }).focus()
            await userEvent.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(screen.getByRole('button', { name: '2026' }))
        })
    })

    describe('disabled state', () => {
        it('disables years outside the selectable range', () => {
            renderWithContext(<CalendarYearView />, {
                currentMonth: new Date(2025, 5, 1),
                startYear: 2025,
                endYear: 2025,
            })
            expect((screen.getByRole('button', { name: '2025' }) as HTMLButtonElement).disabled).toBe(false)
            expect((screen.getByRole('button', { name: '2024' }) as HTMLButtonElement).disabled).toBe(true)
            expect((screen.getByRole('button', { name: '2026' }) as HTMLButtonElement).disabled).toBe(true)
        })
    })

    describe('displayName', () => {
        it('is set to "CalendarYearView"', () => {
            expect(CalendarYearView.displayName).toBe('CalendarYearView')
        })
    })
})
