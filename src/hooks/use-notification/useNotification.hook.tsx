import { useCallback } from 'react'
import { toast } from 'sonner'

import { Toast } from '@components/feedback/toast'
import { TOAST_CHANNELS } from '@components/feedback/toast/constants'
import type {
    ShowNotificationOptions,
    UseNotificationReturn,
} from '@hooks/use-notification/types/useNotification.types.ts'
import type { ToastId } from '@hooks/use-toast/types/useToast.types.ts'

export const useNotification = (): UseNotificationReturn => {
    const show = useCallback(({
        variant = 'info',
        title,
        description,
        icon,
        children,
        duration = 0,
    }: ShowNotificationOptions): ToastId => toast.custom(
        (id) => (
            <Toast
                variant={variant}
                icon={icon}
                title={title}
                description={description}
                onClose={() => toast.dismiss(id)}
            >
                {children}
            </Toast>
        ),
        {
            duration: duration === 0 ? Infinity : duration,
            toasterId: TOAST_CHANNELS.notifications,
        },
    ), [])

    const dismiss = useCallback((id: ToastId): void => {
        toast.dismiss(id)
    }, [])

    return { show, dismiss }
}
