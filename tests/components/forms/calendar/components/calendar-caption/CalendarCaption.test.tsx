import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CalendarCaption } from '@components/forms/calendar/components/calendar-caption'
import {
    CalendarContext,
    type CalendarContextValue,
    type CalendarView,
} from '@components/forms/calendar/context/calendarContext'
import { getDecadeStart } from '@components/forms/calendar/utils/decadeStart.utils'
import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'

const formatMonthYear = (date: Date): string => {
    const month = new Intl.DateTimeFormat(undefined, { month: 'long' }).format(date)
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${date.getFullYear()}`
}

const renderWithContext = (
    ui: ReactNode,
    overrides: Partial<CalendarContextValue> & { view?: CalendarView } = {},
) => {
    const value: CalendarContextValue = {
        view: 'day',
        setView: vi.fn(),
        currentMonth: new Date(2025, 5, 1),
        setCurrentMonth: vi.fn(),
        startYear: 1900,
        endYear: 2100,
        ...overrides,
    }
    return render(<CalendarContext.Provider value={value}>{ui}</CalendarContext.Provider>)
}

describe('CalendarCaption', () => {
    describe('rendering', () => {
        it('renders previous and next navigation buttons', () => {
            renderWithContext(<CalendarCaption />)
            expect(screen.getByRole('button', { name: 'Previous month' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Next month' })).toBeTruthy()
        })

        it('renders the month/year button in day view', () => {
            renderWithContext(<CalendarCaption />, { currentMonth: new Date(2025, 5, 1) })
            expect(screen.getByRole('button', { name: formatMonthYear(new Date(2025, 5, 1)) })).toBeTruthy()
        })

        it('renders the year label in month view', () => {
            renderWithContext(<CalendarCaption />, {
                view: 'month',
                currentMonth: new Date(2025, 5, 1),
            })
            expect(screen.getByText('2025')).toBeTruthy()
        })

        it('renders the decade range in year view', () => {
            renderWithContext(<CalendarCaption />, {
                view: 'year',
                currentMonth: new Date(2025, 5, 1),
            })
            const decadeStart = getDecadeStart(2025)
            const decadeEnd = decadeStart + YEARS_PER_PAGE - 1
            expect(screen.getByText(`${decadeStart} -${decadeEnd}`)).toBeTruthy()
        })
    })

    describe('labels', () => {
        it('uses custom caption labels', () => {
            renderWithContext(
                <CalendarCaption labels={{ previousMonth: 'Prev', nextMonth: 'Next' }} />,
            )
            expect(screen.getByRole('button', { name: 'Prev' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Next' })).toBeTruthy()
        })

        it('uses year labels in month view', () => {
            renderWithContext(<CalendarCaption labels={{ previousYear: 'Prev year', nextYear: 'Next year' }} />, {
                view: 'month',
            })
            expect(screen.getByRole('button', { name: 'Prev year' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Next year' })).toBeTruthy()
        })

        it('uses decade labels in year view', () => {
            renderWithContext(
                <CalendarCaption labels={{ previousYears: 'Prev years', nextYears: 'Next years' }} />,
                { view: 'year' },
            )
            expect(screen.getByRole('button', { name: 'Prev years' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Next years' })).toBeTruthy()
        })
    })

    describe('interactions', () => {
        it('calls setCurrentMonth when previous button is clicked', async () => {
            const setCurrentMonth = vi.fn()
            renderWithContext(<CalendarCaption />, {
                currentMonth: new Date(2025, 5, 1),
                setCurrentMonth,
            })
            await userEvent.click(screen.getByRole('button', { name: 'Previous month' }))
            expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2025, 4, 1))
        })

        it('calls setCurrentMonth when next button is clicked', async () => {
            const setCurrentMonth = vi.fn()
            renderWithContext(<CalendarCaption />, {
                currentMonth: new Date(2025, 5, 1),
                setCurrentMonth,
            })
            await userEvent.click(screen.getByRole('button', { name: 'Next month' }))
            expect(setCurrentMonth).toHaveBeenCalledWith(new Date(2025, 6, 1))
        })

        it('switches to year view when the caption label is clicked in day view', async () => {
            const setView = vi.fn()
            renderWithContext(<CalendarCaption />, {
                currentMonth: new Date(2025, 5, 1),
                setView,
            })
            await userEvent.click(screen.getByRole('button', { name: formatMonthYear(new Date(2025, 5, 1)) }))
            expect(setView).toHaveBeenCalledWith('year')
        })
    })

    describe('boundary states', () => {
        it('disables the previous button at the start boundary', () => {
            renderWithContext(<CalendarCaption />, {
                currentMonth: new Date(1900, 0, 1),
                startYear: 1900,
            })
            expect((screen.getByRole('button', { name: 'Previous month' }) as HTMLButtonElement).disabled).toBe(true)
        })

        it('disables the next button at the end boundary', () => {
            renderWithContext(<CalendarCaption />, {
                currentMonth: new Date(2100, 11, 1),
                endYear: 2100,
            })
            expect((screen.getByRole('button', { name: 'Next month' }) as HTMLButtonElement).disabled).toBe(true)
        })
    })

    describe('displayName', () => {
        it('is set to "CalendarCaption"', () => {
            expect(CalendarCaption.displayName).toBe('CalendarCaption')
        })
    })
})
