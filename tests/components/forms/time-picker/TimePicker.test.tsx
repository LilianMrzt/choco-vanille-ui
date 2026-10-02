import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TimePicker } from '@components/forms/time-picker'

describe('TimePicker', () => {
    it('renders a time input annotated with aria-haspopup', () => {
        const { container } = render(<TimePicker label={'Start time'} />)
        const input = container.querySelector('input') as HTMLInputElement

        expect(input.type).toBe('time')
        expect(input.getAttribute('aria-haspopup')).toBe('dialog')
    })

    it('labels the trigger button for screen readers', () => {
        render(<TimePicker label={'Start time'} triggerAriaLabel={'Choisir une heure'} />)

        expect(screen.getByRole('button', { name: 'Choisir une heure' })).toBeTruthy()
    })

    it('shows the default value', () => {
        const { container } = render(
            <TimePicker label={'Start time'} defaultValue={'09:30'} />,
        )

        expect((container.querySelector('input') as HTMLInputElement).value).toBe('09:30')
    })

    it('calls onChange with a valid typed time and undefined when cleared', () => {
        const onChange = vi.fn()
        const { container } = render(
            <TimePicker label={'Start time'} onChange={onChange} />,
        )
        const input = container.querySelector('input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '14:05' } })
        expect(onChange).toHaveBeenLastCalledWith('14:05')

        fireEvent.change(input, { target: { value: '' } })
        expect(onChange).toHaveBeenLastCalledWith(undefined)
    })

    it('selects an hour and a minute from the popover', () => {
        const onChange = vi.fn()
        render(<TimePicker label={'Start time'} onChange={onChange} />)

        fireEvent.click(screen.getByRole('button', { name: 'Open time picker' }))
        fireEvent.click(screen.getByRole('button', { name: '11' }))
        expect(onChange).toHaveBeenLastCalledWith('11:00')

        fireEvent.click(screen.getByRole('button', { name: '30' }))
        expect(onChange).toHaveBeenLastCalledWith('11:30')
    })

    it('builds the value from the default panel time when none is selected', () => {
        const onChange = vi.fn()
        render(
            <TimePicker
                label={'Start time'}
                defaultPanelTime={'09:30'}
                onChange={onChange}
            />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Open time picker' }))
        fireEvent.click(screen.getByRole('button', { name: '14' }))

        expect(onChange).toHaveBeenLastCalledWith('14:30')
    })

    it('lists only the options within minTime and maxTime', () => {
        render(<TimePicker label={'Start time'} minTime={'09:00'} maxTime={'17:00'} />)

        fireEvent.click(screen.getByRole('button', { name: 'Open time picker' }))

        expect(screen.queryByRole('button', { name: '08' })).toBeNull()
        expect(screen.getByRole('button', { name: '09' })).toBeTruthy()
        expect(screen.getByRole('button', { name: '17' })).toBeTruthy()
        expect(screen.queryByRole('button', { name: '18' })).toBeNull()
    })

    it('lists hours by hourStep', () => {
        render(<TimePicker label={'Start time'} hourStep={6} />)

        fireEvent.click(screen.getByRole('button', { name: 'Open time picker' }))

        expect(screen.queryByRole('button', { name: '07' })).toBeNull()
        expect(screen.getByRole('button', { name: '06' })).toBeTruthy()
    })

    it('clears the value with the clear button', () => {
        const onChange = vi.fn()
        render(
            <TimePicker
                label={'Start time'}
                defaultValue={'10:00'}
                clearable
                onChange={onChange}
            />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Open time picker' }))
        fireEvent.click(screen.getByRole('button', { name: 'Clear' }))

        expect(onChange).toHaveBeenLastCalledWith(undefined)
    })

    it('selects the current time with the now button', () => {
        const onChange = vi.fn()
        render(<TimePicker label={'Start time'} showNowButton onChange={onChange} />)

        fireEvent.click(screen.getByRole('button', { name: 'Open time picker' }))
        fireEvent.click(screen.getByRole('button', { name: 'Now' }))

        expect(onChange).toHaveBeenCalledWith(expect.stringMatching(/^\d{2}:\d{2}$/))
    })
})