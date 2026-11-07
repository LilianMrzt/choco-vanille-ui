import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { Calendar } from '@components/forms/calendar'

describe('Calendar', () => {
    describe('caption navigation labels', () => {
        it('uses default previous/next month labels in day view', () => {
            render(<Calendar mode={'single'} />)
            expect(screen.getByRole('button', { name: 'Previous month' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Next month' })).toBeTruthy()
        })

        it('allows caption labels to be customized for i18n', () => {
            render(
                <Calendar
                    mode={'single'}
                    captionLabels={{
                        previousMonth: 'Mois précédent',
                        nextMonth: 'Mois suivant',
                    }}
                />,
            )
            expect(screen.getByRole('button', { name: 'Mois précédent' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Mois suivant' })).toBeTruthy()
        })

        it('switches to year labels in year view', async () => {
            render(
                <Calendar
                    mode={'single'}
                    captionLabels={{
                        previousYears: 'Années précédentes',
                        nextYears: 'Années suivantes',
                    }}
                />,
            )
            const monthButton = screen.getByRole('button', { name: /^[^\d,]+ \d{4}$/ })
            await userEvent.click(monthButton)
            expect(screen.getByRole('button', { name: 'Années précédentes' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Années suivantes' })).toBeTruthy()
        })
    })

    describe('month/year picker accessibility', () => {
        it('marks the selected month with aria-pressed in month view', async () => {
            render(<Calendar mode={'single'} defaultMonth={new Date(2025, 5, 1)} />)
            // Day view -> year view -> month view
            const monthButton = screen.getByRole('button', { name: /^[^\d,]+ 2025$/ })
            await userEvent.click(monthButton)
            await userEvent.click(screen.getByRole('button', { name: '2025' }))
            await waitFor(() => {
                const selected = screen.getAllByRole('button').find(
                    (el) => el.getAttribute('aria-pressed') === 'true',
                )
                expect(selected).toBeTruthy()
            })

        })
    })

    describe('date selection', () => {
        it('selects and clears a single date in uncontrolled mode', async () => {
            const onSelect = vi.fn()
            render(<Calendar mode={'single'} locale={'en-US'} defaultMonth={new Date(2024, 0, 1)} onSelect={onSelect} />)
            const day = screen.getByRole('button', { name: 'Monday, January 15, 2024' })
            await userEvent.click(day)
            expect(onSelect).toHaveBeenLastCalledWith(new Date(2024, 0, 15))
            expect(day.parentElement?.getAttribute('aria-selected')).toBe('true')
            await userEvent.click(day)
            expect(onSelect).toHaveBeenLastCalledWith(undefined)
            expect(day.parentElement?.getAttribute('aria-selected')).toBe('false')
        })

        it('supports multiple and range selection', async () => {
            const onSelect = vi.fn()
            const { rerender } = render(<Calendar mode={'multiple'} locale={'en-US'} defaultMonth={new Date(2024, 0, 1)} onSelect={onSelect} />)
            await userEvent.click(screen.getByRole('button', { name: 'Monday, January 15, 2024' }))
            await userEvent.click(screen.getByRole('button', { name: 'Wednesday, January 17, 2024' }))
            expect(onSelect).toHaveBeenLastCalledWith([new Date(2024, 0, 15), new Date(2024, 0, 17)])
            rerender(<Calendar key={'range'} mode={'range'} locale={'en-US'} defaultMonth={new Date(2024, 0, 1)} onSelect={onSelect} />)
            await userEvent.click(screen.getByRole('button', { name: 'Wednesday, January 17, 2024' }))
            await userEvent.click(screen.getByRole('button', { name: 'Monday, January 15, 2024' }))
            expect(onSelect).toHaveBeenLastCalledWith({ from: new Date(2024, 0, 15), to: new Date(2024, 0, 17) })
            expect(screen.getByRole('button', { name: 'Tuesday, January 16, 2024' }).parentElement?.getAttribute('aria-selected')).toBe('true')
        })

        it('respects disabled matchers and controlled selection', async () => {
            const onSelect = vi.fn()
            const { rerender } = render(<Calendar mode={'single'} selected={undefined} onSelect={onSelect} locale={'en-US'} defaultMonth={new Date(2024, 0, 1)} disabled={[{ dayOfWeek: [0] }, { before: new Date(2024, 0, 10, 23) }]} />)
            const disabled = screen.getByRole('button', { name: 'Sunday, January 14, 2024' })
            expect(disabled.getAttribute('aria-disabled')).toBe('true')
            await userEvent.click(disabled)
            expect(onSelect).not.toHaveBeenCalled()
            const enabled = screen.getByRole('button', { name: 'Wednesday, January 10, 2024' })
            await userEvent.click(enabled)
            expect(onSelect).toHaveBeenCalledWith(new Date(2024, 0, 10))
            expect(enabled.parentElement?.getAttribute('aria-selected')).toBe('false')
            rerender(<Calendar mode={'single'} selected={new Date(2024, 0, 10)} onSelect={onSelect} locale={'en-US'} defaultMonth={new Date(2024, 0, 1)} />)
            expect(enabled.parentElement?.getAttribute('aria-selected')).toBe('true')
        })

        it('navigates across months with arrow keys and localizes the grid', async () => {
            const user = userEvent.setup()
            render(<Calendar mode={'single'} locale={'fr-FR'} defaultMonth={new Date(2024, 0, 1)} />)
            const first = screen.getByRole('button', { name: 'lundi 1 janvier 2024' })
            first.focus()
            await user.keyboard('{ArrowLeft}')
            await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('dimanche 31 décembre 2023'))
            expect(screen.getByRole('grid', { name: 'décembre 2023' })).toBeTruthy()
            await user.keyboard('{PageDown}')
            await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('mercredi 31 janvier 2024'))
        })

        it('initializes to the selected month and its selected day is the grid tab stop', () => {
            render(<Calendar mode={'single'} locale={'en-US'} defaultSelected={new Date(2024, 0, 15)} />)
            const day = screen.getByRole('button', { name: 'Monday, January 15, 2024' })
            expect(day.tabIndex).toBe(0)
            expect(day.parentElement?.getAttribute('aria-selected')).toBe('true')
        })

        it('uses the closest enabled day to today as the tab stop in the displayed month', () => {
            const today = new Date()
            const first = new Date(today.getFullYear(), today.getMonth(), 1)
            const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
            const expected = tomorrow.getMonth() === today.getMonth()
                ? tomorrow
                : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
            const label = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', calendar: 'gregory' }).format(expected)
            render(<Calendar mode={'single'} locale={'en-US'} defaultMonth={first} disabled={today} />)
            expect(screen.getByRole<HTMLButtonElement>('button', { name: label }).tabIndex).toBe(0)
        })

        it('keeps focus on the current day until a controlled month change is accepted', async () => {
            const user = userEvent.setup()
            const onMonthChange = vi.fn()
            const { rerender } = render(<Calendar mode={'single'} locale={'en-US'} month={new Date(2024, 0, 1)} onMonthChange={onMonthChange} />)
            const current = screen.getByRole<HTMLButtonElement>('button', { name: 'Wednesday, January 31, 2024' })
            current.focus()
            await user.keyboard('{ArrowRight}')
            expect(onMonthChange).toHaveBeenLastCalledWith(new Date(2024, 1, 1))
            expect(document.activeElement).toBe(current)
            expect(current.tabIndex).toBe(0)

            rerender(<Calendar mode={'single'} locale={'en-US'} month={new Date(2024, 1, 1)} onMonthChange={onMonthChange} />)
            await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Thursday, February 1, 2024'))
        })

        it('supports week, month and year keyboard navigation with day clamping', async () => {
            const user = userEvent.setup()
            render(<Calendar mode={'single'} locale={'en-US'} defaultSelected={new Date(2024, 0, 31)} />)
            screen.getByRole<HTMLButtonElement>('button', { name: 'Wednesday, January 31, 2024' }).focus()
            await user.keyboard('{PageDown}')
            expect(document.activeElement?.getAttribute('aria-label')).toBe('Thursday, February 29, 2024')
            await user.keyboard('{Shift>}{PageDown}{/Shift}')
            expect(document.activeElement?.getAttribute('aria-label')).toBe('Friday, February 28, 2025')
            await user.keyboard('{Home}')
            expect(document.activeElement?.getAttribute('aria-label')).toBe('Monday, February 24, 2025')
            await user.keyboard('{End}')
            expect(document.activeElement?.getAttribute('aria-label')).toBe('Sunday, March 2, 2025')
        })

        it('uses a visible multiple or range selection as the day tab stop', () => {
            const { rerender } = render(<Calendar mode={'multiple'} locale={'en-US'} month={new Date(2024, 1, 1)} selected={[new Date(2024, 0, 15), new Date(2024, 1, 12)]} />)
            expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Monday, February 12, 2024' }).tabIndex).toBe(0)
            rerender(<Calendar key={'range'} mode={'range'} locale={'en-US'} month={new Date(2024, 1, 1)} selected={{ from: new Date(2024, 0, 15), to: new Date(2024, 2, 1) }} />)
            expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Thursday, February 1, 2024' }).tabIndex).toBe(0)
        })

        it('returns focus to the day grid after keyboard year and month selection', async () => {
            const user = userEvent.setup()
            render(<Calendar mode={'single'} locale={'en-US'} defaultSelected={new Date(2024, 0, 15)} />)
            await user.click(screen.getByRole('button', { name: 'January 2024' }))
            await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('button', { name: '2024' })))
            await user.keyboard('{ArrowRight}{Enter}')
            await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('button', { name: 'January' })))
            await user.keyboard('{ArrowRight}{Enter}')
            const grid = screen.getByRole('grid', { name: 'February 2025' })
            const focused = grid.querySelector<HTMLButtonElement>('button[tabindex="0"]')
            expect(focused).not.toBeNull()
            await waitFor(() => expect(document.activeElement).toBe(focused))
        })

        it('navigates to an adjacent month when an outside day is selected', async () => {
            const onMonthChange = vi.fn()
            const onSelect = vi.fn()
            render(<Calendar mode={'single'} locale={'en-US'} defaultMonth={new Date(2024, 0, 1)} onMonthChange={onMonthChange} onSelect={onSelect} />)
            await userEvent.click(screen.getByRole('button', { name: 'Thursday, February 1, 2024' }))
            expect(onMonthChange).toHaveBeenCalledWith(new Date(2024, 1, 1))
            expect(onSelect).toHaveBeenCalledWith(new Date(2024, 1, 1))
            expect(screen.getByRole('grid', { name: 'February 2024' })).toBeTruthy()
            await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Thursday, February 1, 2024'))
        })

        it('clamps the initial month and arrow navigation to the permitted months', async () => {
            const user = userEvent.setup()
            render(<Calendar mode={'single'} locale={'en-US'} defaultMonth={new Date(2024, 0, 1)} startMonth={new Date(2024, 2, 1)} endMonth={new Date(2024, 4, 1)} />)
            expect(screen.getByRole('grid', { name: 'March 2024' })).toBeTruthy()
            const first = screen.getByRole('button', { name: 'Friday, March 1, 2024' })
            first.focus()
            await user.keyboard('{ArrowLeft}')
            expect(document.activeElement).toBe(first)
            expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Previous month' }).disabled).toBe(true)
        })

        it('preserves local years below 100 when selecting dates', async () => {
            const date = new Date(0)
            date.setHours(0, 0, 0, 0)
            date.setFullYear(75, 0, 15)
            const onSelect = vi.fn()
            render(<Calendar mode={'single'} locale={'en-US'} startYear={1} endYear={99} defaultSelected={date} onSelect={onSelect} />)
            const button = screen.getByRole('button', { name: /January 15, 75$/ })
            expect(button.parentElement?.getAttribute('aria-selected')).toBe('true')
            await userEvent.click(screen.getByRole('button', { name: /January 16, 75$/ }))
            expect(onSelect.mock.lastCall?.[0].getFullYear()).toBe(75)
        })

        it('rejects invalid or reversed navigation bounds', () => {
            expect(() => render(<Calendar mode={'single'} startYear={2025} endYear={2024} />)).toThrow(RangeError)
            expect(() => render(<Calendar mode={'single'} startMonth={new Date(Number.NaN)} />)).toThrow(RangeError)
        })

        it('never submits the surrounding form when navigating or selecting dates', async () => {
            const user = userEvent.setup()
            const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
            render(<form onSubmit={onSubmit}><Calendar mode={'single'} locale={'en-US'} defaultMonth={new Date(2024, 0, 1)} /></form>)
            await user.click(screen.getByRole('button', { name: 'Next month' }))
            await user.click(screen.getByRole('button', { name: 'February 2024' }))
            await user.click(screen.getByRole('button', { name: '2024' }))
            await user.click(screen.getByRole('button', { name: 'March' }))
            await user.click(screen.getByRole('button', { name: 'Friday, March 15, 2024' }))
            expect(onSubmit).not.toHaveBeenCalled()
        })
    })

    it('marks the selected year with aria-pressed in year view', async () => {
        render(<Calendar mode={'single'} defaultMonth={new Date(2025, 5, 1)} />)
        const monthButton = screen.getByRole('button', { name: /^[^\d,]+ 2025$/ })
        await userEvent.click(monthButton)
        const selected = screen.getByRole('button', { name: '2025' })
        expect(selected.getAttribute('aria-pressed')).toBe('true')
        expect(selected.textContent).toBe('2025')
    })

    it('hydrates a deterministic calendar in StrictMode', async () => {
        const element = <StrictMode><Calendar mode={'single'} locale={'en-US'} defaultSelected={new Date(2024, 0, 15)} /></StrictMode>
        const container = document.createElement('div')
        container.innerHTML = renderToString(element)
        document.body.appendChild(container)
        const onRecoverableError = vi.fn()
        let root: ReturnType<typeof hydrateRoot> | undefined
        try {
            await act(async () => { root = hydrateRoot(container, element, { onRecoverableError }) })
            expect(screen.getByRole('button', { name: 'Monday, January 15, 2024' }).parentElement?.getAttribute('aria-selected')).toBe('true')
            expect(onRecoverableError).not.toHaveBeenCalled()
        } finally {
            await act(async () => { root?.unmount() })
            container.remove()
        }
    })
})
