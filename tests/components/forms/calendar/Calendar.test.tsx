import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

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
            const monthButton = screen.getByRole('button', { name: /\w+ \d{4}/ })
            await userEvent.click(monthButton)
            expect(screen.getByRole('button', { name: 'Années précédentes' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Années suivantes' })).toBeTruthy()
        })
    })

    describe('month/year picker accessibility', () => {
        it('marks the selected month with aria-pressed in month view', async () => {
            render(<Calendar mode={'single'} defaultMonth={new Date(2025, 5, 1)} />)
            // Day view -> year view -> month view
            const monthButton = screen.getByRole('button', { name: /\w+ 2025/ })
            await userEvent.click(monthButton)
            await userEvent.click(screen.getByRole('button', { name: '2025' }))
            await waitFor(() => {
                const selected = screen.getAllByRole('button').find(
                    (el) => el.getAttribute('aria-pressed') === 'true',
                )
                expect(selected).toBeTruthy()
            })
        })

        it('marks the selected year with aria-pressed in year view', async () => {
            render(<Calendar mode={'single'} defaultMonth={new Date(2025, 5, 1)} />)
            const monthButton = screen.getByRole('button', { name: /\w+ 2025/ })
            await userEvent.click(monthButton)
            const selected = screen.getByRole('button', { name: '2025' })
            expect(selected.getAttribute('aria-pressed')).toBe('true')
            expect(selected.textContent).toBe('2025')
        })
    })
})
