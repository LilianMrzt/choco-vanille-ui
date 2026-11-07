import { useCallback } from 'react'
import { toast } from 'sonner'

import { showToasterNotification } from '@components/feedback/toaster/utils/show-toaster-notification/showToasterNotification.utils'
import type {
    ShowNotificationOptions,
    UseNotificationReturn,
} from '@hooks/use-notification/types'
import type { ToastId } from '@hooks/use-toast/types'

/**
 * Shows persistent notifications in the Toaster's notification channel.
 * Wrap the application in ToasterProvider within the desired theme scope,
 * or mount Toaster manually. Messages appear at top-right
 * with a close button and end-aligned actions. Duration 0 keeps the
 * notification visible until dismissal; positive durations are milliseconds.
 * @returns Methods to show and dismiss notifications by identifier.
 * @example
 * const { show } = useNotification()
 * show({ title: 'Update available' })
 */
export const useNotification = (): UseNotificationReturn => {
    const show = useCallback(({
        variant = 'info',
        duration = 0,
        ...content
    }: ShowNotificationOptions): ToastId => showToasterNotification('notifications', {
        ...content,
        variant,
        duration: duration === 0 ? Infinity : duration,
    }), [])

    const dismiss = useCallback((id: ToastId): void => {
        toast.dismiss(id)
    }, [])

    return { show, dismiss }
}
