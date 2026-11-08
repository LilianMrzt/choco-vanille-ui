import type { ReactNode } from 'react'

import type { NotificationCardVariant } from '@components/feedback/notification-card'
import type { IconifyIcon } from '@components/foundation/icon'

export type ToastId = number | string

export type ShowToastOptions = Readonly<{
    /** Visible toast heading. */
    title: string
    /** Optional supporting message. */
    description?: string
    /** local Iconify data. Defaults to the variant icon. */
    icon?: IconifyIcon
    /** Auto-dismiss delay in milliseconds. Defaults to `5000`. */
    duration?: number
    /** Buttons or links composed in NotificationCard.Actions. */
    actions?: ReactNode
}>

export type UseToastReturn = Readonly<{
    show: (variant: NotificationCardVariant, options: ShowToastOptions) => ToastId
    showSuccess: (options: ShowToastOptions) => ToastId
    showError: (options: ShowToastOptions) => ToastId
    showWarning: (options: ShowToastOptions) => ToastId
    showInfo: (options: ShowToastOptions) => ToastId
    dismiss: (id: ToastId) => void
}>
