import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CalendarMonthView } from '@components/forms/calendar/components/calendar-month-view'
import { MONTH_LABELS } from '@components/forms/calendar/components/calendar-month-view/constants'
import {
    CalendarContext,
    type CalendarContextValue,
} from '@components/forms/calendar/context/calendarContext'

const renderWithContext = (
    ui: ReactNode,
    overrides: Partial<CalendarContextValue> = {},
) => {
    const value: CalendarContextValue = {
        view: 'month',
        setView: vi.fn(),
        currentMonth: new Date(2025, 5, 1),
        setCurrentMonth: vi.fn(),
        startYear: 1900,
        endYear: 2100,
        ...overrides,
    }
    return render(<CalendarContext.Provider value={value}>{ui}</CalendarContext.Provider>)
}

describe('CalendarMonthView', () => {
    describe('rendering', () => {
        it('renders all twelve month buttons', () => {
            renderWithContext(<CalendarMonthView />)
            for (const label of MONTH_LABELS) {
                expect(screen.getByRole('button', { name: label })).toBeTruthy()
            }
        })

        it('marks the current month as selected', () => {
            renderWithContext(<CalendarMonthView />, { currentMonth: new Date(2025, 5, 1) })
            expect(screen.getByRole('button', { name: MONTH_LABELS[5] }).getAttribute('aria-pressed')).toBe('true')
        })
    })

    describe('interactions', () => {
        it('selects a month when clicked', async () => {
            const setCurrentMonth = vi.fn()
            const setView = vi.fn()
            renderWithContext(<CalendarMonthView />, {
                currentMonth: new Date(2025, 5, 1),
                setCurrentMonth,
                setView,
            })
            await userEvent.click(screen.getByRole('button', { name: MONTH_LABELS[2] }))
            expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2025, 2, 1))
            expect(setView).toHaveBeenCalledWith('day')
        })

        it('moves focus with arrow keys', async () => {
            renderWithContext(<CalendarMonthView />, { currentMonth: new Date(2025, 0, 1) })
            screen.getByRole('button', { name: MONTH_LABELS[0] }).focus()
            await userEvent.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(screen.getByRole('button', { name: MONTH_LABELS[1] }))
        })
    })

    describe('disabled state', () => {
        it('keeps months enabled when the current year is within range', () => {
            renderWithContext(<CalendarMonthView />, {
                currentMonth: new Date(2025, 5, 1),
                startYear: 1900,
                endYear: 2100,
            })
            for (const label of MONTH_LABELS) {
                expect((screen.getByRole('button', { name: label }) as HTMLButtonElement).disabled).toBe(false)
            }
        })
    })

    describe('displayName', () => {
        it('is set to "CalendarMonthView"', () => {
            expect(CalendarMonthView.displayName).toBe('CalendarMonthView')
        })
    })
})
