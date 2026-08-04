import { useCallback } from 'react'
import { toast } from 'sonner'

import { Toast, type ToastVariant } from '@components/feedback/toast'
import { TOAST_CHANNELS } from '@components/feedback/toast/constants'
import type {
    ShowToastOptions,
    ToastId,
    UseToastReturn,
} from '@hooks/use-toast/types/useToast.types.ts'

const DEFAULT_TOAST_DURATION = 5000

export const useToast = (): UseToastReturn => {
    const show = useCallback((
        variant: ToastVariant,
        {
            title,
            description,
            duration = DEFAULT_TOAST_DURATION,
            icon,
        }: ShowToastOptions,
    ): ToastId => toast.custom(
        (id) => (
            <Toast
                variant={variant}
                icon={icon}
                title={title}
                description={description}
                onClose={() => toast.dismiss(id)}
            />
        ),
        {
            duration,
            toasterId: TOAST_CHANNELS.toasts,
        },
    ), [])

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
