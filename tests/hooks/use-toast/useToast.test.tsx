import { act, render, renderHook, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ToastProvider } from '@components/feedback/toast'
import { useNotification, useToast } from '@hooks'
import { toast } from 'sonner'

afterEach(() => {
    toast.dismiss()
})

describe('useToast', () => {
    it('shows a transient toast in the top-right channel', async () => {
        render(<ToastProvider />)
        const { result } = renderHook(() => useToast())

        act(() => {
            result.current.showSuccess({
                title: 'Changes saved',
                description: 'Your profile has been updated.',
            })
        })

        const channel = screen.getByLabelText(/^Toasts/)
        expect(await within(channel).findByText('Changes saved')).toBeTruthy()
    })

    it('dismisses the toast returned by show', () => {
        render(<ToastProvider />)
        const { result } = renderHook(() => useToast())
        let id: number | string = 0

        act(() => {
            id = result.current.showInfo({ title: 'A message' })
            result.current.dismiss(id)
        })

        expect(screen.queryByText('A message')).toBeNull()
    })
})

describe('useNotification', () => {
    it('shows a persistent notification in the bottom-right channel', async () => {
        render(<ToastProvider />)
        const { result } = renderHook(() => useNotification())

        act(() => {
            result.current.show({ title: 'Update available' })
        })

        const channel = screen.getByLabelText(/^Notifications/)
        expect(await within(channel).findByText('Update available')).toBeTruthy()
    })
})
