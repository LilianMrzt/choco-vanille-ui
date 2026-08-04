import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ToastProvider } from '@components/feedback/toast'

describe('ToastProvider', () => {
    it('renders independent toast and notification channels', () => {
        const { container } = render(
            <ToastProvider>
                <span>Application content</span>
            </ToastProvider>,
        )

        expect(screen.getByText('Application content')).toBeTruthy()
        const toasts = screen.getByLabelText(/^Toasts/)
        const notifications = screen.getByLabelText(/^Notifications/)

        expect(container.contains(toasts)).toBe(false)
        expect(container.contains(notifications)).toBe(false)
    })
})
