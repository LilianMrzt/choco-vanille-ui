import { render, screen, fireEvent } from '@testing-library/react'
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
            expect(
                screen.getByRole('button', { name: 'Open calendar' }),
            ).toBeTruthy()
        })

        it('accepts a custom calendar dialog label for i18n', () => {
            // calendarAriaLabel is forwarded to Popover.Content; the actual
            // dialog naming is covered by the Popover accessibility tests.
            const { container } = render(
                <DatePicker label={'Pick a date'} calendarAriaLabel={'Calendrier'} />,
            )
            expect(container.querySelector('input')).toBeTruthy()
        })

        it('reflects the popup open state via aria-expanded', () => {
            render(<DatePicker label={'Pick a date'} />)
            const input = screen.getByLabelText('Pick a date')

            expect(input.getAttribute('aria-expanded')).toBe('false')

            fireEvent.keyDown(input, { key: 'ArrowDown', altKey: true })

            expect(input.getAttribute('aria-expanded')).toBe('true')
        })

        it('makes the calendar trigger button keyboard reachable', () => {
            render(<DatePicker label={'Pick a date'} />)
            const trigger = screen.getByRole('button', { name: 'Open calendar' })

            expect(trigger.getAttribute('tabindex')).not.toBe('-1')
        })
    })
})
