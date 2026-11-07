import { useCallback } from 'react'
import { toast } from 'sonner'

import type { NotificationCardVariant } from '@components/feedback/notification-card'
import { showToasterNotification } from '@components/feedback/toaster/utils/show-toaster-notification/showToasterNotification.utils'
import type {
    ShowToastOptions,
    ToastId,
    UseToastReturn,
} from '@hooks/use-toast/types'

const DEFAULT_TOAST_DURATION = 5000

/**
 * Shows transient notifications in the Toaster's toast channel.
 * Wrap the application in ToasterProvider within the desired theme scope,
 * or mount Toaster manually. Messages appear at bottom-right,
 * default to 5000ms and support swipe dismissal without a close button.
 * @returns Intent-specific show methods and dismissal by identifier.
 * @example
 * const { showSuccess } = useToast()
 * showSuccess({ title: 'Changes saved' })
 */
export const useToast = (): UseToastReturn => {
    const show = useCallback((
        variant: NotificationCardVariant,
        {
            duration = DEFAULT_TOAST_DURATION,
            ...content
        }: ShowToastOptions,
    ): ToastId => showToasterNotification('toasts', { ...content, variant, duration }), [])

    const dismiss = useCallback((id: ToastId): void => {
        toast.dismiss(id)
    }, [])

    return {
        show,
        showSuccess: (options) => show('success', options),
        showError: (options) => show('error', options),
        showWarning: (options) => show('warning', options),
        showInfo: (options) => show('info', options),
        dismiss,
    }
}
