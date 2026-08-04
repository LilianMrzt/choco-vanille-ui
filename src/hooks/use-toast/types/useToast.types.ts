import type { ToastVariant } from '@components/feedback/toast'

export type ToastId = number | string

export type ShowToastOptions = {
    /** Visible toast heading. */
    title: string
    /** Optional supporting message. */
    description?: string
    /** Iconify icon name. Defaults to the variant icon. */
    icon?: string
    /** Auto-dismiss delay in milliseconds. Defaults to `5000`. */
    duration?: number
}

export type UseToastReturn = {
    show: (variant: ToastVariant, options: ShowToastOptions) => ToastId
    showSuccess: (options: ShowToastOptions) => ToastId
    showError: (options: ShowToastOptions) => ToastId
    showWarning: (options: ShowToastOptions) => ToastId
    showInfo: (options: ShowToastOptions) => ToastId
    dismiss: (id: ToastId) => void
}
