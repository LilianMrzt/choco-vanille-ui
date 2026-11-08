import type * as React from 'react'

import type { NotificationCardVariant } from '@components/feedback/notification-card'
import type { IconifyIcon } from '@components/foundation/icon'
import type { ToastId } from '@hooks/use-toast/types'

export type ShowNotificationOptions = Readonly<{
    /** Visual intent. Defaults to `info`. */
    variant?: NotificationCardVariant
    /** Visible notification heading. */
    title?: string
    /** Optional supporting message. */
    description?: string
    /** local Iconify data. Defaults to the variant icon. */
    icon?: IconifyIcon
    /** NotificationCard Header, Body and Footer sections replacing the default layout. Header supplies a close button unless it includes its own Close slot. */
    children?: React.ReactNode
    /** Auto-dismiss delay in milliseconds. Defaults to persistent (`0`). */
    duration?: number
    /** Buttons or links composed in NotificationCard.Actions. */
    actions?: React.ReactNode
    /** Accessible close button label; defaults to `Close notification`. */
    closeLabel?: string
}>

export type UseNotificationReturn = Readonly<{
    show: (options: ShowNotificationOptions) => ToastId
    dismiss: (id: ToastId) => void
}>
