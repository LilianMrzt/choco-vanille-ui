import { act, render, renderHook, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { NotificationCard } from '@components/feedback/notification-card'
import { Toaster } from '@components/feedback/toaster'
import { useNotification, useToast } from '@hooks'
import { toast } from 'sonner'

afterEach(() => {
    toast.dismiss()
    vi.useRealTimers()
})

describe('useToast', () => {
    it('shows a transient toast without a close button in the bottom-right channel', async () => {
        render(<Toaster />)
        const { result } = renderHook(() => useToast())

        act(() => {
            result.current.showSuccess({
                title: 'Changes saved',
                description: 'Your profile has been updated.',
            })
        })

        const channel = screen.getByLabelText(/^Toasts/)
        expect(await within(channel).findByText('Changes saved')).toBeTruthy()
        expect(channel.querySelectorAll('svg')).toHaveLength(1)
        expect(within(channel).queryByRole('button')).toBeNull()
        expect(channel.querySelector('ol')?.getAttribute('data-y-position')).toBe('bottom')
        expect(channel.querySelector('[data-sonner-toast]')?.getAttribute('data-dismissible')).toBe('true')
    })

    it('dismisses the toast returned by show', () => {
        render(<Toaster />)
        const { result } = renderHook(() => useToast())
        let id: number | string = 0

        act(() => {
            id = result.current.showInfo({ title: 'A message' })
            result.current.dismiss(id)
        })

        expect(screen.queryByText('A message')).toBeNull()
    })

    it('composes actions without a close button or duplicate live region and supports dismissal by id', async () => {
        const onAction = vi.fn()
        render(<Toaster />)
        const { result } = renderHook(() => useToast())
        let id: number | string = 0

        act(() => {
            id = result.current.showWarning({
                title: 'Connection lost',
                description: 'Try again when you are online.',
                actions: <button onClick={onAction}>Retry</button>,
            })
        })

        const channel = screen.getByLabelText(/^Toasts/)
        expect(await within(channel).findByText('Connection lost')).toBeTruthy()
        expect(within(channel).queryByRole('status')).toBeNull()
        expect(within(channel).queryByRole('alert')).toBeNull()
        await userEvent.click(within(channel).getByRole('button', { name: 'Retry' }))
        expect(onAction).toHaveBeenCalledTimes(1)
        expect(within(channel).getAllByRole('button')).toHaveLength(1)
        act(() => { result.current.dismiss(id) })
        await waitFor(() => expect(screen.queryByText('Connection lost')).toBeNull())
    })

    it('auto-dismisses default toasts while default notifications remain visible', async () => {
        vi.useFakeTimers()
        render(<Toaster />)
        const { result: transient } = renderHook(() => useToast())
        const { result: persistent } = renderHook(() => useNotification())

        act(() => {
            transient.current.showInfo({ title: 'Transient' })
            persistent.current.show({ title: 'Persistent' })
        })
        await act(async () => { await vi.advanceTimersByTimeAsync(100) })
        expect(screen.getByText('Transient')).toBeTruthy()
        expect(screen.getByText('Persistent')).toBeTruthy()

        await act(async () => { await vi.advanceTimersByTimeAsync(4800) })
        expect(screen.getByText('Transient')).toBeTruthy()
        expect(screen.getByText('Persistent')).toBeTruthy()
        await act(async () => { await vi.advanceTimersByTimeAsync(1200) })
        expect(screen.queryByText('Transient')).toBeNull()
        expect(screen.getByText('Persistent')).toBeTruthy()
    })
})

describe('useNotification', () => {
    it('does not inject a status icon into custom compound content', async () => {
        render(<Toaster />)
        const { result } = renderHook(() => useNotification())
        act(() => {
            result.current.show({
                children: <NotificationCard.Header><NotificationCard.Title>Text-only update</NotificationCard.Title></NotificationCard.Header>,
            })
        })
        const channel = screen.getByLabelText(/^Notifications/)
        expect(await within(channel).findByText('Text-only update')).toBeTruthy()
        expect(channel.querySelectorAll('svg')).toHaveLength(1)
        expect(channel.querySelector('button svg')).toBeTruthy()
    })

    it('shows a persistent notification with a close button in the top-right channel', async () => {
        render(<Toaster />)
        const { result } = renderHook(() => useNotification())

        act(() => {
            result.current.show({ title: 'Update available' })
        })

        const channel = screen.getByLabelText(/^Notifications/)
        expect(await within(channel).findByText('Update available')).toBeTruthy()
        expect(within(channel).getByRole('button', { name: 'Close notification' })).toBeTruthy()
        expect(channel.querySelector('ol')?.getAttribute('data-y-position')).toBe('top')
    })

    it('keeps custom compound notifications dismissible without duplicate icons', async () => {
        render(<Toaster />)
        const { result } = renderHook(() => useNotification())

        act(() => {
            result.current.show({
                closeLabel: 'Dismiss update',
                children: (
                    <>
                        <NotificationCard.Header>
                            <NotificationCard.Icon />
                            <NotificationCard.Title>Custom update</NotificationCard.Title>
                        </NotificationCard.Header>
                        <NotificationCard.Body>
                            <NotificationCard.Description>Ready to install.</NotificationCard.Description>
                        </NotificationCard.Body>
                    </>
                ),
            })
        })

        const channel = screen.getByLabelText(/^Notifications/)
        expect(await within(channel).findByText('Custom update')).toBeTruthy()
        expect(channel.querySelectorAll('svg')).toHaveLength(2)
        await userEvent.click(within(channel).getByRole('button', { name: 'Dismiss update' }))
        await waitFor(() => expect(screen.queryByText('Custom update')).toBeNull())
    })

    it('honors a finite notification duration', async () => {
        vi.useFakeTimers()
        render(<Toaster />)
        const { result } = renderHook(() => useNotification())

        act(() => { result.current.show({ title: 'Short notification', duration: 1000 }) })
        await act(async () => { await vi.advanceTimersByTimeAsync(100) })
        expect(screen.getByText('Short notification')).toBeTruthy()
        await act(async () => { await vi.advanceTimersByTimeAsync(1500) })
        expect(screen.queryByText('Short notification')).toBeNull()
    })
})
