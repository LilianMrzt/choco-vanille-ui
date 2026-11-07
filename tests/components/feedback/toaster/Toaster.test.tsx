import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { act, render, renderHook, screen, within, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { toast } from 'sonner'
import userEvent from '@testing-library/user-event'

import { Toaster } from '@components/feedback/toaster'
import { ThemeProvider } from '@theme'
import { useNotification, useToast } from '@hooks'

afterEach(() => { toast.dismiss() })

describe('Toaster', () => {
    it('renders independent toast and notification channels', async () => {
        render(<Toaster />)
        const { result } = renderHook(() => ({ transient: useToast(), persistent: useNotification() }))

        act(() => {
            result.current.transient.showInfo({ title: 'Toast message' })
            result.current.persistent.show({ title: 'Notification message' })
        })

        const toasts = screen.getByLabelText(/^Toasts/)
        const notifications = screen.getByLabelText(/^Notifications/)
        await within(toasts).findByText('Toast message')
        await within(notifications).findByText('Notification message')

        expect(toasts.contains(notifications)).toBe(false)
        expect(toasts.querySelector('ol')?.getAttribute('data-y-position')).toBe('bottom')
        expect(notifications.querySelector('ol')?.getAttribute('data-y-position')).toBe('top')
    })

    it('limits each channel to three visible messages and keeps the others in Sonner', async () => {
        render(<Toaster />)
        const { result } = renderHook(() => ({ transient: useToast(), persistent: useNotification() }))
        act(() => {
            for (let index = 0; index < 5; index++) {
                result.current.transient.showInfo({ title: `Toast ${index}` })
                result.current.persistent.show({ title: `Notification ${index}` })
            }
        })

        for (const channel of [screen.getByLabelText(/^Toasts/), screen.getByLabelText(/^Notifications/)]) {
            await waitFor(() => {
                expect(channel.querySelectorAll('[data-sonner-toast]')).toHaveLength(5)
                expect(channel.querySelectorAll('[data-sonner-toast][data-visible="true"]')).toHaveLength(3)
                expect(channel.querySelectorAll('[data-sonner-toast][data-visible="false"]')).toHaveLength(2)
            })
            expect(channel.querySelector('[data-sonner-toast][data-front="true"]')?.getAttribute('data-expanded')).toBe('false')
        }
        const notifications = screen.getByLabelText(/^Notifications/)
        const queued = notifications.querySelector('[data-sonner-toast][data-visible="false"]')
        const front = notifications.querySelector('[data-sonner-toast][data-front="true"]')
        expect(queued).not.toBeNull()
        if (!(front instanceof HTMLElement)) {
            throw new Error('Missing front notification')
        }
        await userEvent.click(within(front).getByRole('button', { name: 'Close notification' }))
        await waitFor(() => {
            expect(notifications.querySelectorAll('[data-sonner-toast]')).toHaveLength(4)
            expect(queued?.getAttribute('data-visible')).toBe('true')
            expect(notifications.querySelectorAll('[data-visible="true"]')).toHaveLength(3)
        })
        expect(screen.getByLabelText(/^Toasts/).querySelectorAll('[data-sonner-toast]')).toHaveLength(5)
    })

    it('expands each stack on hover with an eight-pixel gap and collapses it on leave', async () => {
        const user = userEvent.setup()
        render(<Toaster />)
        const { result } = renderHook(() => ({ transient: useToast(), persistent: useNotification() }))

        act(() => {
            for (let index = 0; index < 3; index++) {
                result.current.transient.showInfo({ title: `Toast ${index}` })
                result.current.persistent.show({ title: `Notification ${index}` })
            }
        })

        await screen.findByText('Toast 2')
        await screen.findByText('Notification 2')

        for (const channel of [screen.getByLabelText(/^Toasts/), screen.getByLabelText(/^Notifications/)]) {
            const viewport = channel.querySelector('ol')
            if (!(viewport instanceof HTMLElement)) {
                throw new Error('Missing notification viewport')
            }
            expect(viewport.style.getPropertyValue('--gap')).toBe('8px')
            await user.hover(viewport)
            await waitFor(() => expect(viewport.querySelectorAll('[data-expanded="true"]')).toHaveLength(3))
            await user.unhover(viewport)
            await waitFor(() => expect(viewport.querySelectorAll('[data-expanded="false"]')).toHaveLength(3))
        }
    })

    it('forwards positions, accessible names and viewport overrides', async () => {
        render(
            <Toaster
                className={'custom-toaster'}
                notificationLabel={'Inbox'}
                notificationPosition={'top-left'}
                style={{ zIndex: 1500 }}
                toastLabel={'Updates'}
                toastPosition={'bottom-center'}
            />,
        )
        const { result } = renderHook(() => ({ transient: useToast(), persistent: useNotification() }))

        act(() => {
            result.current.transient.showInfo({ title: 'Toast message' })
            result.current.persistent.show({ title: 'Notification message' })
        })

        const toastRegion = screen.getByLabelText(/^Updates/)
        const notificationRegion = screen.getByLabelText(/^Inbox/)
        await within(toastRegion).findByText('Toast message')
        await within(notificationRegion).findByText('Notification message')
        const toasts = toastRegion.querySelector('ol')
        const notifications = notificationRegion.querySelector('ol')

        expect(toasts?.getAttribute('data-x-position')).toBe('center')
        expect(toasts?.getAttribute('data-y-position')).toBe('bottom')
        expect(notifications?.getAttribute('data-x-position')).toBe('left')
        expect(notifications?.getAttribute('data-y-position')).toBe('top')
        expect(toasts?.className).toContain('custom-toaster')
        expect(toasts?.style.zIndex).toBe('1500')
        expect(toasts?.style.getPropertyValue('--width')).toBe('24rem')
    })

    it('preserves subtree theme scope without a body portal', () => {
        render(
            <ThemeProvider
                data-testid={'local-theme'}
                scope={'subtree'}
                theme={'dark'}
            >
                <Toaster />
            </ThemeProvider>,
        )

        const scope = screen.getByTestId('local-theme')
        expect(scope.getAttribute('data-theme')).toBe('dark')
        expect(scope.contains(screen.getByLabelText(/^Toasts/))).toBe(true)
        expect(scope.contains(screen.getByLabelText(/^Notifications/))).toBe(true)
    })

    it('gives each viewport an independent keyboard shortcut', async () => {
        const user = userEvent.setup()
        render(<Toaster />)
        const { result } = renderHook(() => ({ transient: useToast(), persistent: useNotification() }))

        act(() => {
            result.current.transient.showInfo({ title: 'Toast message' })
            result.current.persistent.show({ title: 'Notification message' })
        })

        const toasts = screen.getByLabelText(/^Toasts/)
        const notifications = screen.getByLabelText(/^Notifications/)
        await within(toasts).findByText('Toast message')
        await within(notifications).findByText('Notification message')

        await user.keyboard('{Alt>}t{/Alt}')
        expect(document.activeElement).toBe(toasts.querySelector('ol'))
        await user.keyboard('{Alt>}n{/Alt}')
        expect(document.activeElement).toBe(notifications.querySelector('ol'))
    })

    it('renders safely on the server and mounts under StrictMode', () => {
        expect(() => renderToString(<Toaster />)).not.toThrow()
        render(<StrictMode><Toaster /></StrictMode>)
        expect(screen.getAllByLabelText(/^Toasts/)).toHaveLength(1)
        expect(screen.getAllByLabelText(/^Notifications/)).toHaveLength(1)
    })
})
