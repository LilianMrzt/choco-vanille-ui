import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Toaster } from 'sonner'

import {
    TOAST_CHANNELS,
    TOAST_WIDTH,
} from '@components/feedback/toast/constants'
import type { ToastProviderProps } from '@components/feedback/toast/types/ToastProvider.props.ts'

const TOASTER_OPTIONS = {
    closeButton: true,
    style: {
        width: TOAST_WIDTH,
        maxWidth: 'calc(100vw - 2rem)',
    },
} as const

const ToastProvider = ({ children }: ToastProviderProps) => {
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

    useEffect(() => {
        setPortalRoot(document.body)
    }, [])

    return (
        <>
            {children}
            {portalRoot && createPortal(
                <>
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
                </>,
                portalRoot,
            )}
        </>
    )
}

ToastProvider.displayName = 'ToastProvider'

export default ToastProvider
