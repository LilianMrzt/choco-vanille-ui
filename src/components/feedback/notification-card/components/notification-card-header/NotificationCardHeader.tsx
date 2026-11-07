import { useContext, type FC } from 'react'

import NotificationCardClose from '@components/feedback/notification-card/components/notification-card-close/NotificationCardClose'
import type { NotificationCardHeaderProps } from '@components/feedback/notification-card/components/notification-card-header/types'
import { NotificationCardContext } from '@components/feedback/notification-card/context/NotificationCard.context'
import { hasNotificationCardSlot } from '@components/feedback/notification-card/utils/hasNotificationCardSlot.utils'
import { Flex } from '@components/layout/flex'

/**
 * Groups the notification icon, title and close button in one aligned row.
 * Icons must be explicitly composed. Supplies the root's onClose button when
 * its Close slot is omitted; explicit Close slots, including fragments, take precedence.
 * Native div attributes, events and refs are forwarded.
 * @param props - Header attributes and content.
 * @param props.children - Icon, Title and Close slots.
 * @returns The notification header.
 * @example
 * <NotificationCard.Header><NotificationCard.Icon /><NotificationCard.Title>Saved</NotificationCard.Title></NotificationCard.Header>
 */
const NotificationCardHeader: FC<NotificationCardHeaderProps> = ({ children, ...props }) => {
    const { onClose, closeLabel } = useContext(NotificationCardContext)
    const hasClose = hasNotificationCardSlot(children, NotificationCardClose)

    return (
        <Flex
            alignItems={'center'}
            gap={12}
            minWidth={0}
            width={'100%'}
            {...props}
        >
            {children}
            {onClose !== undefined && !hasClose && (
                <NotificationCardClose
                    aria-label={closeLabel}
                    onClick={() => onClose()}
                />
            )}
        </Flex>
    )
}

NotificationCardHeader.displayName = 'NotificationCard.Header'

export default NotificationCardHeader
