import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { NumberField } from '@components/forms/number-field'

describe('NumberField', () => {
    it('renders a labelled numeric input with stepper buttons', () => {
        render(<NumberField label={'Quantity'} defaultValue={2} />)

        expect(
            screen
                .getByRole('textbox', { name: 'Quantity' })
                .getAttribute('aria-roledescription'),
        ).toBe('Number field')
        expect(screen.getByRole('button', { name: 'Increase' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Decrease' })).toBeTruthy()
    })

    it('increments through the Base UI control', async () => {
        const onValueChange = vi.fn()
        render(
            <NumberField
                label={'Quantity'}
                defaultValue={2}
                onValueChange={onValueChange}
            />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Increase' }))

        expect(onValueChange).toHaveBeenCalledWith(
            3,
            expect.objectContaining({ reason: 'increment-press' }),
        )
    })

    it('applies min and max to the numeric input and disables the relevant steppers', () => {
        render(<NumberField label={'Quantity'} defaultValue={5} min={1} max={5} />)

        const input = screen.getByRole('textbox', { name: 'Quantity' })
        expect(input.getAttribute('aria-roledescription')).toBe('Number field')
        const hiddenInput = document.querySelector('input[type="number"]')
        expect(hiddenInput?.getAttribute('min')).toBe('1')
        expect(hiddenInput?.getAttribute('max')).toBe('5')
        expect(
            screen.getByRole('button', { name: 'Increase' }).getAttribute('disabled'),
        ).toBe('')
    })

    it('connects helper and error content like TextField', () => {
        render(<NumberField label={'Age'} error={'Must be an adult'} />)

        const input = screen.getByRole('textbox', { name: 'Age' })
        expect(input.getAttribute('aria-invalid')).toBe('true')
        expect(input.getAttribute('aria-describedby')).toBeTruthy()
        expect(screen.getByText('Must be an adult')).toBeTruthy()
    })

    it('forwards the ref to the numeric input', () => {
        const ref = createRef<HTMLInputElement>()
        render(<NumberField ref={ref} />)

        expect(ref.current).toBe(screen.getByRole('textbox'))
    })
})
