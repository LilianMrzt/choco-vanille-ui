import { StrictMode, type FC } from 'react'
import { renderToString } from 'react-dom/server'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { toast } from 'sonner'

import { ToasterProvider } from '@components/feedback/toaster-provider'
import { useNotification, useToast } from '@hooks'
import { ThemeProvider } from '@theme'

const Triggers: FC = () => {
    const { showSuccess } = useToast()
    const { show } = useNotification()

    return (
        <div data-testid={'content'}>
            <button onClick={() => showSuccess({ title: 'Saved' })}>Save</button>
            <button onClick={() => show({ title: 'Update available' })}>Notify</button>
        </div>
    )
}

afterEach(() => { toast.dismiss() })

describe('ToasterProvider', () => {
    it('mounts both channels and lets descendants use the public hooks', async () => {
        const user = userEvent.setup()
        const { container } = render(<ToasterProvider><Triggers /></ToasterProvider>)
        expect(container.firstElementChild).toBe(screen.getByTestId('content'))
        expect(screen.getAllByLabelText(/^Toasts/)).toHaveLength(1)
        expect(screen.getAllByLabelText(/^Notifications/)).toHaveLength(1)

        await user.click(screen.getByRole('button', { name: 'Save' }))
        await user.click(screen.getByRole('button', { name: 'Notify' }))
        const transient = screen.getByLabelText(/^Toasts/)
        const persistent = screen.getByLabelText(/^Notifications/)
        await within(transient).findByText('Saved')
        await within(persistent).findByText('Update available')
        expect(transient.querySelector('ol')?.getAttribute('data-y-position')).toBe('bottom')
        expect(within(transient).queryByRole('button')).toBeNull()
        expect(persistent.querySelector('ol')?.getAttribute('data-y-position')).toBe('top')
        await user.click(within(persistent).getByRole('button', { name: 'Close notification' }))
    })

    it('forwards configuration to both channels and updates it without duplicate viewports', async () => {
        const { rerender } = render(
            <ToasterProvider
                className={'custom-toaster'}
                notificationLabel={'Inbox'}
                notificationPosition={'top-left'}
                style={{ zIndex: 1500 }}
                toastLabel={'Updates'}
                toastPosition={'bottom-center'}
            >
                <Triggers />
            </ToasterProvider>,
        )
        await userEvent.click(screen.getByRole('button', { name: 'Save' }))
        await userEvent.click(screen.getByRole('button', { name: 'Notify' }))
        const transient = screen.getByLabelText(/^Updates/)
        const persistent = screen.getByLabelText(/^Inbox/)
        await within(transient).findByText('Saved')
        await within(persistent).findByText('Update available')
        expect(transient.querySelector('ol')?.getAttribute('data-x-position')).toBe('center')
        expect(persistent.querySelector('ol')?.getAttribute('data-x-position')).toBe('left')
        for (const channel of [transient, persistent]) {
            expect(channel.querySelector('ol')?.classList.contains('custom-toaster')).toBe(true)
            expect(channel.querySelector('ol')?.style.zIndex).toBe('1500')
        }

        rerender(<ToasterProvider toastLabel={'New updates'} notificationLabel={'New inbox'}><Triggers /></ToasterProvider>)
        expect(screen.queryByLabelText(/^Updates/)).toBeNull()
        expect(screen.queryByLabelText(/^Inbox/)).toBeNull()
        expect(screen.getAllByLabelText(/^New updates/)).toHaveLength(1)
        expect(screen.getAllByLabelText(/^New inbox/)).toHaveLength(1)
    })

    it('keeps content and viewports inside their subtree theme', () => {
        render(
            <ThemeProvider scope={'subtree'} theme={'dark'} data-testid={'theme'}>
                <ToasterProvider><Triggers /></ToasterProvider>
            </ThemeProvider>,
        )
        const theme = screen.getByTestId('theme')
        expect(theme.getAttribute('data-theme')).toBe('dark')
        expect(theme.contains(screen.getByTestId('content'))).toBe(true)
        expect(theme.contains(screen.getByLabelText(/^Toasts/))).toBe(true)
        expect(theme.contains(screen.getByLabelText(/^Notifications/))).toBe(true)
    })

    it('renders safely on the server and removes both viewports on unmount under StrictMode', () => {
        expect(() => renderToString(<ToasterProvider><Triggers /></ToasterProvider>)).not.toThrow()
        const { unmount } = render(<StrictMode><ToasterProvider><Triggers /></ToasterProvider></StrictMode>)
        expect(screen.getAllByLabelText(/^Toasts/)).toHaveLength(1)
        expect(screen.getAllByLabelText(/^Notifications/)).toHaveLength(1)
        unmount()
        expect(screen.queryByTestId('content')).toBeNull()
        expect(screen.queryByLabelText(/^Toasts/)).toBeNull()
        expect(screen.queryByLabelText(/^Notifications/)).toBeNull()
    })
})
