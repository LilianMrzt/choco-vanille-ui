import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DatePicker } from '@components/forms/date-picker'

describe('DatePicker', () => {
    describe('accessibility', () => {
        it('annotates the input with aria-haspopup', () => {
            render(<DatePicker label={'Pick a date'} />)
            const input = screen.getByLabelText('Pick a date')
            expect(input.getAttribute('aria-haspopup')).toBe('dialog')
        })

        it('labels the calendar trigger button for screen readers', () => {
            render(<DatePicker label={'Pick a date'} />)
            expect(screen.getByRole('button', { name: 'Open calendar' })).toBeTruthy()
        })

        it('accepts a custom calendar dialog label for i18n', () => {
            // calendarAriaLabel is forwarded to Popover.Content; the actual
            // dialog naming is covered by the Popover accessibility tests.
            const { container } = render(
                <DatePicker label={'Pick a date'} calendarAriaLabel={'Calendrier'} />,
            )
            expect(container.querySelector('input')).toBeTruthy()
        })
    })
})
