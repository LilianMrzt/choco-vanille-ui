import type * as React from 'react'

import type { ToastVariant } from '@components/feedback/toast'
import type { ToastId } from '@hooks/use-toast/types/useToast.types.ts'

export type ShowNotificationOptions = {
    /** Visual intent. Defaults to `info`. */
    variant?: ToastVariant
    /** Visible notification heading. */
    title?: string
    /** Optional supporting message. */
    description?: string
    /** Iconify icon name. Defaults to the variant icon. */
    icon?: string
    /** Complete Toast compound content, replacing the default layout. */
    children?: React.ReactNode
    /** Auto-dismiss delay in milliseconds. Defaults to persistent (`0`). */
    duration?: number
}

export type UseNotificationReturn = {
    show: (options: ShowNotificationOptions) => ToastId
    dismiss: (id: ToastId) => void
}
