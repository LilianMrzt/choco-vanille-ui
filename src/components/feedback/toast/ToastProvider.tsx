import { Toaster } from 'sonner'

import {
    TOAST_CHANNELS,
    TOAST_WIDTH,
} from '@components/feedback/toast/constants'
import type { ToastProviderProps } from '@components/feedback/toast/types'

const TOASTER_OPTIONS = {
    closeButton: true,
    style: {
        width: TOAST_WIDTH,
        maxWidth: 'calc(100vw - 2rem)',
    },
} as const

/**
 * Mounts two Sonner `Toaster` instances: one at `top-right` for transient
 * toasts and one at `bottom-right` for persistent notifications. Sonner
 * positions the mounted viewports independently of the application layout.
 * @param props - Provider props.
 * @param props.children - Application content.
 * @returns Children and both notification viewports.
 * @example
 * <ToastProvider><App /></ToastProvider>
 */
const ToastProvider = ({ children }: ToastProviderProps) => {
    return (
        <>
            {children}
            <Toaster
                id={TOAST_CHANNELS.toasts}
                position={'top-right'}
                toastOptions={TOASTER_OPTIONS}
                containerAriaLabel={'Toasts'}
            />
            <Toaster
                id={TOAST_CHANNELS.notifications}
                position={'bottom-right'}
                expand={true}
                toastOptions={TOASTER_OPTIONS}
                containerAriaLabel={'Notifications'}
            />
        </>
    )
}

ToastProvider.displayName = 'ToastProvider'

export default ToastProvider
