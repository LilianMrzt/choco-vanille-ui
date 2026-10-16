import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker } from '@components/forms/date-picker'

describe('DatePicker', () => {
    describe('segmented field', () => {
        it('renders one spinbutton per date segment inside a labelled group', () => {
            render(<DatePicker label={'Start date'} />)

            expect(screen.getByRole('group', { name: 'Start date' })).toBeTruthy()
            expect(screen.getAllByRole('spinbutton')).toHaveLength(3)
        })

        it('shows the controlled value in the segments', () => {
            render(<DatePicker label={'Start date'} value={new Date(2024, 0, 5)} />)

            expect(screen.getByRole('spinbutton', { name: /year/i }).textContent).toBe('2024')
        })

        it('calls onChange with a Date when all segments are typed', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<DatePicker label={'Start date'} onChange={onChange} />)

            await user.click(screen.getByRole('spinbutton', { name: /month/i }))
            await user.keyboard('03')
            await user.click(screen.getByRole('spinbutton', { name: /day/i }))
            await user.keyboard('15')
            await user.click(screen.getByRole('spinbutton', { name: /year/i }))
            await user.keyboard('2024')

            await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(new Date(2024, 2, 15)))
        })

        it('does not call onChange while the date is incomplete', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<DatePicker label={'Start date'} onChange={onChange} />)

            await user.click(screen.getByRole('spinbutton', { name: /month/i }))
            await user.keyboard('03')

            expect(onChange).not.toHaveBeenCalled()
        })

        it('keeps the typed text when the date is incomplete', async () => {
            const user = userEvent.setup()
            render(<DatePicker label={'Start date'} />)

            await user.click(screen.getByRole('spinbutton', { name: /month/i }))
            await user.keyboard('03')

            expect(screen.getByRole('spinbutton', { name: /month/i }).textContent).toBe('3')
        })
    })

    describe('calendar', () => {
        it('opens the calendar from the calendar button', async () => {
            const user = userEvent.setup()
            render(<DatePicker label={'Start date'} calendarAriaLabel={'Calendrier'} />)

            await user.click(screen.getByRole('button', { name: 'Open calendar' }))

            expect(await screen.findByRole('dialog', { name: 'Calendrier' })).toBeTruthy()
        })
    })

    describe('states and accessibility', () => {
        it('disables every segment and the calendar button', () => {
            render(<DatePicker label={'Start date'} disabled />)

            expect(screen.getByRole('button', { name: 'Open calendar' }).hasAttribute('disabled')).toBe(true)
            screen.getAllByRole('spinbutton').forEach((segment) => {
                expect(segment.getAttribute('aria-disabled')).toBe('true')
            })
        })

        it('shows the error message', () => {
            render(<DatePicker label={'Start date'} error={'Date is required'} />)

            expect(screen.getByText('Date is required')).toBeTruthy()
        })

        it('shows the helper text', () => {
            render(<DatePicker label={'Start date'} helperText={'Format: DD/MM/YYYY'} />)

            expect(screen.getByText('Format: DD/MM/YYYY')).toBeTruthy()
        })
    })
})
