import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker } from '@components/forms/date-picker'

const dateLabel = (date: Date): string =>
    new Intl.DateTimeFormat('en-US', { dateStyle: 'full', calendar: 'gregory' }).format(date)

describe('DatePicker', () => {
    it('displays the default date in DD/MM/YYYY independently of the runtime locale', () => {
        render(<DatePicker label={'Date'} defaultValue={new Date(2027, 1, 16, 23)} />)
        expect(screen.getByRole('button', { name: 'Date 16/02/2027' })).toBeTruthy()
    })

    it('updates the displayed date when the locale changes without changing the submitted value', () => {
        const date = new Date(2024, 0, 5, 23)
        const { rerender, container } = render(<form><DatePicker label={'Date'} name={'date'} value={date} locale={'fr-FR'} /></form>)
        const form = container.querySelector('form')
        if (!form) {throw new Error('Form missing')}
        expect(screen.getByRole('button', { name: 'Date 05/01/2024' })).toBeTruthy()
        expect(new FormData(form).get('date')).toBe('2024-01-05')

        rerender(<form><DatePicker label={'Date'} name={'date'} value={date} locale={'en-US'} /></form>)
        expect(screen.getByRole('button', { name: 'Date 01/05/2024' })).toBeTruthy()
        expect(new FormData(form).get('date')).toBe('2024-01-05')

        rerender(<form><DatePicker label={'Date'} name={'date'} value={date} locale={'de-DE'} /></form>)
        expect(screen.getByRole('button', { name: 'Date 05.01.2024' })).toBeTruthy()
        expect(new FormData(form).get('date')).toBe('2024-01-05')
    })

    it('uses the locale numbering system and pads years below 100', () => {
        const date = new Date(0)
        date.setHours(0, 0, 0, 0)
        date.setFullYear(75, 0, 5)
        const { rerender } = render(<DatePicker label={'Date'} value={date} />)
        expect(screen.getByRole('button', { name: 'Date 05/01/0075' })).toBeTruthy()
        rerender(<DatePicker label={'Date'} value={date} locale={'ar-EG-u-nu-arab'} />)
        const trigger = screen.getByRole('button', { name: /Date/ })
        expect(trigger.textContent).toContain('٠٠٧٥')
        date.setFullYear(0)
        rerender(<DatePicker label={'Date'} value={date} />)
        expect(screen.getByRole('button', { name: 'Date 05/01/0000' })).toBeTruthy()
    })

    it('opens on the selected day, navigates across months, selects and restores focus', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<DatePicker label={'Date'} locale={'en-US'} defaultValue={new Date(2024, 0, 31)} onChange={onChange} />)
        await user.tab()
        const trigger = screen.getByRole('button', { name: 'Date 01/31/2024' })
        expect(document.activeElement).toBe(trigger)
        await user.keyboard('{Enter}')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Wednesday, January 31, 2024'))
        await user.keyboard('{ArrowRight}')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Thursday, February 1, 2024'))
        await user.keyboard('{Enter}')
        expect(onChange).toHaveBeenLastCalledWith(new Date(2024, 1, 1))
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
        await waitFor(() => expect(document.activeElement).toBe(trigger))
    })

    it('opens an empty picker on today or the nearest available day across months', async () => {
        const user = userEvent.setup()
        const today = new Date()
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        render(<DatePicker label={'Date'} locale={'en-US'} calendarProps={{ disabled: { before: nextMonth } }} />)
        await user.tab()
        await user.keyboard('{Enter}')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe(dateLabel(nextMonth)))
        expect(screen.getByRole('grid', { name: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', calendar: 'gregory' }).format(nextMonth) })).toBeTruthy()
    })

    it('opens on today when it is available and no value is selected', async () => {
        const user = userEvent.setup()
        const today = new Date()
        render(<DatePicker label={'Date'} locale={'en-US'} value={undefined} />)
        await user.tab()
        await user.keyboard('{Enter}')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe(dateLabel(today)))
    })

    it.each(['month', 'defaultMonth'] as const)('respects an explicit %s for the initial focus', async (monthProp) => {
        const user = userEvent.setup()
        const today = new Date()
        const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const lastDay = new Date(today.getFullYear(), today.getMonth(), 0)
        render(<DatePicker label={'Date'} locale={'en-US'} calendarProps={{ [monthProp]: previousMonth }} />)
        await user.tab()
        await user.keyboard('{Enter}')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe(dateLabel(lastDay)))
    })

    it('uses the closest day within minimum and maximum bounds', async () => {
        const user = userEvent.setup()
        const today = new Date()
        const minimum = new Date(today.getFullYear(), today.getMonth() + 2, 10)
        const nearest = new Date(today.getFullYear(), today.getMonth() + 2, 11)
        const maximum = new Date(today.getFullYear(), today.getMonth() + 2, 20)
        render(<DatePicker label={'Date'} locale={'en-US'} minDate={minimum} maxDate={maximum} calendarProps={{ disabled: minimum }} />)
        await user.tab()
        await user.keyboard(' ')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe(dateLabel(nearest)))
    })

    it('keeps unavailable days focusable without selecting them', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<DatePicker label={'Date'} locale={'en-US'} defaultValue={new Date(2024, 0, 15)} calendarProps={{ disabled: new Date(2024, 0, 16) }} onChange={onChange} />)
        await user.tab()
        await user.keyboard('{Enter}')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Monday, January 15, 2024'))
        await user.keyboard('{ArrowRight}')
        const unavailable = screen.getByRole('button', { name: 'Tuesday, January 16, 2024' })
        expect(document.activeElement).toBe(unavailable)
        expect(unavailable.getAttribute('aria-disabled')).toBe('true')
        await user.keyboard('{Enter}')
        expect(onChange).not.toHaveBeenCalled()
        expect(screen.getByRole('dialog')).toBeTruthy()
        await user.keyboard('{ArrowRight} ')
        expect(onChange).toHaveBeenCalledWith(new Date(2024, 0, 17))
    })

    it('retains a disabled day as the focus target when no day is selectable', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<DatePicker label={'Date'} locale={'en-US'} calendarProps={{ disabled: true }} onChange={onChange} />)
        await user.tab()
        await user.keyboard('{Enter}')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-disabled')).toBe('true'))
        await user.keyboard(' ')
        expect(onChange).not.toHaveBeenCalled()
        expect(screen.getByRole('dialog')).toBeTruthy()
    })

    it('closes on Escape without changing the value and restores keyboard focus', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<DatePicker label={'Date'} locale={'en-US'} defaultValue={new Date(2024, 0, 15)} onChange={onChange} />)
        await user.tab()
        const trigger = screen.getByRole('button', { name: 'Date 01/15/2024' })
        await user.keyboard('{Enter}')
        await waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Monday, January 15, 2024'))
        await user.keyboard('{ArrowDown}{Escape}')
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
        await waitFor(() => expect(document.activeElement).toBe(trigger))
        expect(onChange).not.toHaveBeenCalled()
    })

    it('opens the calendar with the labelled button and selects a date', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<DatePicker label={'Start date'} locale={'en-US'} defaultValue={new Date(2024, 0, 5)} onChange={onChange} />)

        const trigger = screen.getByRole('button', { name: 'Start date 01/05/2024' })
        await user.click(trigger)
        const dialog = await screen.findByRole('dialog', { name: 'Calendar' })
        await user.click(within(dialog).getByRole('button', { name: 'Monday, January 15, 2024' }))

        expect(onChange).toHaveBeenLastCalledWith(new Date(2024, 0, 15))
        expect(screen.getByRole('button', { name: 'Start date 01/15/2024' })).toBeTruthy()
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    })

    it('supports a controlled empty value and updates only when the parent changes it', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        const { rerender } = render(<DatePicker label={'Date'} locale={'en-US'} value={undefined} onChange={onChange} calendarProps={{ defaultMonth: new Date(2024, 0, 1) }} />)
        await user.click(screen.getByRole('button', { name: /Date.*Select a date/ }))
        await user.click(within(await screen.findByRole('dialog')).getByRole('button', { name: 'Monday, January 15, 2024' }))
        expect(onChange).toHaveBeenCalledWith(new Date(2024, 0, 15))
        expect(screen.getByRole('button', { name: /Date.*Select a date/ })).toBeTruthy()

        rerender(<DatePicker label={'Date'} locale={'en-US'} value={new Date(2024, 0, 15)} onChange={onChange} />)
        expect(screen.getByRole('button', { name: 'Date 01/15/2024' })).toBeTruthy()
    })

    it('combines minimum, maximum and calendar disabled dates', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<DatePicker label={'Date'} locale={'en-US'} minDate={new Date(2024, 0, 10, 15)} maxDate={new Date(2024, 0, 20)} calendarProps={{ defaultMonth: new Date(2024, 0, 1), disabled: new Date(2024, 0, 12) }} onChange={onChange} />)
        await user.click(screen.getByRole('button', { name: /Date/ }))
        const dialog = within(await screen.findByRole('dialog'))
        for (const name of ['Tuesday, January 9, 2024', 'Friday, January 12, 2024', 'Sunday, January 21, 2024']) {
            const button = dialog.getByRole('button', { name })
            expect(button.getAttribute('aria-disabled')).toBe('true')
            await user.click(button)
        }
        expect(onChange).not.toHaveBeenCalled()
        await user.click(dialog.getByRole('button', { name: 'Wednesday, January 10, 2024' }))
        expect(onChange).toHaveBeenCalledWith(new Date(2024, 0, 10))
    })

    it('rejects invalid or reversed bounds while allowing different times on the same day', () => {
        expect(() => render(<DatePicker label={'Date'} minDate={new Date(Number.NaN)} />)).toThrow(RangeError)
        expect(() => render(<DatePicker label={'Date'} minDate={new Date(2024, 0, 2)} maxDate={new Date(2024, 0, 1)} />)).toThrow(RangeError)
        expect(() => render(<DatePicker label={'Date'} minDate={new Date(2024, 0, 1, 23)} maxDate={new Date(2024, 0, 1, 1)} />)).not.toThrow()
    })

    it('submits a local ISO date, and omits disabled fields', () => {
        const { rerender, container } = render(<form><DatePicker label={'Date'} name={'start'} defaultValue={new Date(2024, 0, 5, 23)} /></form>)
        const form = container.querySelector('form')
        if (!form) {throw new Error('Form missing')}
        expect(new FormData(form).get('start')).toBe('2024-01-05')
        rerender(<form><DatePicker label={'Date'} name={'start'} disabled defaultValue={new Date(2024, 0, 5)} /></form>)
        expect(new FormData(form).has('start')).toBe(false)
        expect(screen.getByRole<HTMLButtonElement>('button', { name: /Date/ }).disabled).toBe(true)
    })

    it('resets the uncontrolled date when its form is reset', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<form><DatePicker label={'Date'} name={'date'} locale={'en-US'} defaultValue={new Date(2024, 0, 5)} onChange={onChange} /><button type={'reset'}>Reset</button></form>)
        await user.click(screen.getByRole('button', { name: 'Date 01/05/2024' }))
        await user.click(within(await screen.findByRole('dialog')).getByRole('button', { name: 'Monday, January 15, 2024' }))
        await user.click(screen.getByRole('button', { name: 'Reset' }))
        expect(screen.getByRole('button', { name: 'Date 01/05/2024' })).toBeTruthy()
        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('provides localizable required and value descriptions without native validation', () => {
        const { container } = render(<form><DatePicker aria-label={'Date'} name={'date'} required requiredText={'Obligatoire'} locale={'fr-FR'} defaultValue={new Date(2024, 0, 5)} /></form>)
        const trigger = screen.getByRole('button', { name: 'Date' })
        const descriptions = trigger.getAttribute('aria-describedby')?.split(' ') ?? []
        expect(descriptions).toContain(screen.getByText('Obligatoire').id)
        expect(descriptions).toContain(screen.getByText('05/01/2024').id)
        expect(container.querySelector('form')?.checkValidity()).toBe(true)
    })

    it('associates descriptions and restores focus after Escape', async () => {
        const user = userEvent.setup()
        render(<><span id={'external'}>External</span><DatePicker label={'Date'} error={'Choose a date'} aria-describedby={'external'} calendarAriaLabel={'Calendrier'} /></>)
        const trigger = screen.getByRole('button', { name: /Date/ })
        expect(trigger.getAttribute('aria-describedby')?.split(' ')).toEqual(['external', screen.getByText('Choose a date').id])
        await user.click(trigger)
        expect(await screen.findByRole('dialog', { name: 'Calendrier' })).toBeTruthy()
        await user.keyboard('{Escape}')
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
        await waitFor(() => expect(document.activeElement).toBe(trigger))
    })

    it('hydrates a closed picker with stable labels and descriptions in StrictMode', async () => {
        const element = <StrictMode><DatePicker label={'Date'} locale={'en-US'} defaultValue={new Date(2024, 0, 5)} helperText={'Choose a date'} /></StrictMode>
        const container = document.createElement('div')
        container.innerHTML = renderToString(element)
        document.body.appendChild(container)
        const onRecoverableError = vi.fn()
        let root: ReturnType<typeof hydrateRoot> | undefined
        try {
            await act(async () => { root = hydrateRoot(container, element, { onRecoverableError }) })
            const trigger = within(container).getByRole('button', { name: 'Date 01/05/2024' })
            expect(trigger.getAttribute('aria-describedby')).toBe(within(container).getByText('Choose a date').id)
            expect(onRecoverableError).not.toHaveBeenCalled()
        } finally {
            await act(async () => { root?.unmount() })
            container.remove()
        }
    })
})
