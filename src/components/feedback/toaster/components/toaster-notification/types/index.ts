import type { ReactNode } from 'react'

import type { NotificationCardProps } from '@components/feedback/notification-card'

/** Content used to compose a notification inside a Toaster viewport. */
export type ToasterNotificationProps = Readonly<Pick<
    NotificationCardProps,
    'variant' | 'title' | 'description' | 'icon' | 'children' | 'closeLabel'
> & {
    /** Sonner identifier used by the close button. */
    id: number | string
    /** Whether the channel includes a close button; notifications only. */
    showClose: boolean
    /** Action elements displayed below the default message. */
    actions?: ReactNode
}>
