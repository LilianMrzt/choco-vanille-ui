import type * as React from 'react'

import type NotificationCard from '@components/feedback/notification-card/NotificationCard.tsx'
import type { NOTIFICATION_CARD_VARIANTS } from '@components/feedback/notification-card/constants'
import type { IconifyIcon } from '@components/foundation/icon'

/** Visual intent of the notification card. */
export type NotificationCardVariant = (typeof NOTIFICATION_CARD_VARIANTS)[keyof typeof NOTIFICATION_CARD_VARIANTS]
/** ARIA live-region role, or `none` to omit the role. */
export type NotificationCardRole = 'alert' | 'status' | 'none'

/** NotificationCard content and root attributes. */
export type NotificationCardProps = Readonly<Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'role' | 'title'> &
    React.RefAttributes<HTMLDivElement> & {
        /** Visual intent; defaults to `info`. */
        variant?: NotificationCardVariant
        /** Optional title content. */
        title?: React.ReactNode
        /** Optional message content. */
        description?: React.ReactNode
        /** Convenience layout's SVG icon; defaults to the variant icon. Compound content uses an explicit Icon slot. */
        icon?: IconifyIcon
        /** Live-region role; defaults to `status`. */
        role?: NotificationCardRole
        /** Accessible close label; defaults to `Close notification`. */
        closeLabel?: string
        /** Callback for the convenience close button. */
        onClose?: () => void
        /** Sections replace the convenience layout. Compose Icon explicitly; Header supplies the root's onClose button unless a Close slot is present. */
        children?: React.ReactNode
    }>

/** NotificationCard root and its compound slots. */
export type NotificationCardCompound = typeof NotificationCard
