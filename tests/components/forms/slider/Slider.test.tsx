import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Slider } from '@components/forms/slider'

describe('Slider', () => {
    it('renders an accessible slider with a visible label', () => {
        render(<Slider label={'Volume'} defaultValue={40} />)

        expect((screen.getByRole('slider', { name: 'Volume' }) as HTMLInputElement).value).toBe('40')
    })

    it('forwards value changes with Base UI event details', async () => {
        const onValueChange = vi.fn()
        render(<Slider aria-label={'Volume'} defaultValue={20} onValueChange={onValueChange} />)

        screen.getByRole('slider').focus()
        await userEvent.keyboard('{ArrowRight}')

        expect(onValueChange).toHaveBeenCalledWith(expect.any(Number), expect.anything())
    })

    it('renders two thumbs for a range', () => {
        render(<Slider aria-label={'Price range'} defaultValue={[20, 80]} />)

        expect(screen.getAllByRole('slider')).toHaveLength(2)
        expect((screen.getAllByRole('slider')[0] as HTMLInputElement).value).toBe('20')
        expect((screen.getAllByRole('slider')[1] as HTMLInputElement).value).toBe('80')
    })

    it('connects error text to the control', () => {
        render(<Slider aria-label={'Volume'} error={'Volume is unavailable'} />)

        const slider = screen.getByRole('slider')
        expect(slider.getAttribute('aria-invalid')).toBe('true')
        expect(slider.getAttribute('aria-describedby')).toBeTruthy()
        expect(screen.getByText('Volume is unavailable')).toBeTruthy()
    })
})
