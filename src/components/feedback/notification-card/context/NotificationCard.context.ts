import { createContext } from 'react'

import type { NotificationCardProps } from '@components/feedback/notification-card/types'

/** Visual intent shared by the notification card and its icon slot. */
type NotificationCardContextValue = Readonly<Pick<NotificationCardProps, 'onClose'> & {
    variant: NonNullable<NotificationCardProps['variant']>
    closeLabel: string
}>

export const NotificationCardContext = createContext<NotificationCardContextValue>({
    variant: 'info',
    closeLabel: 'Close notification',
})
