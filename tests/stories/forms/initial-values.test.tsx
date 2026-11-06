import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Uncontrolled } from '@stories/forms/switch/Switch.stories'
import { Playground } from '@stories/forms/time-picker/TimePicker.stories'

describe('Uncontrolled form stories', () => {
    it('remounts the switch when its initial state changes', async () => {
        const user = userEvent.setup()
        const { rerender } = render(Uncontrolled.render({ label: 'Airplane mode', defaultChecked: true }))
        const control = screen.getByRole('switch', { name: 'Airplane mode' })
        expect(control.getAttribute('aria-checked')).toBe('true')

        await user.click(control)
        expect(control.getAttribute('aria-checked')).toBe('false')

        rerender(Uncontrolled.render({ label: 'Airplane mode', defaultChecked: false }))
        rerender(Uncontrolled.render({ label: 'Airplane mode', defaultChecked: true }))
        expect(screen.getByRole('switch', { name: 'Airplane mode' }).getAttribute('aria-checked')).toBe('true')
    })

    it('remounts the time picker when its initial time changes', () => {
        const { rerender } = render(Playground.render({ label: 'Start time', defaultValue: '09:00' }))
        expect(screen.getByLabelText<HTMLInputElement>('Start time').value).toBe('09:00')

        rerender(Playground.render({ label: 'Start time', defaultValue: '13:30' }))
        expect(screen.getByLabelText<HTMLInputElement>('Start time').value).toBe('13:30')
    })
})
