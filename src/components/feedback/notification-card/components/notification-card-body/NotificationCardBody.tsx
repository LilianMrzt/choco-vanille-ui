import type { FC } from 'react'

import type { NotificationCardBodyProps } from '@components/feedback/notification-card/components/notification-card-body/types'
import { Box } from '@components/layout/box'

/**
 * Contains the notification description or custom content at full card width.
 * Native div attributes, events and refs are forwarded.
 * @param props - Body attributes and content.
 * @returns The notification body.
 * @example
 * <NotificationCard.Body><NotificationCard.Description>Changes saved.</NotificationCard.Description></NotificationCard.Body>
 */
const NotificationCardBody: FC<NotificationCardBodyProps> = (props) => (
    <Box
        minWidth={0}
        width={'100%'}
        {...props}
    />
)

NotificationCardBody.displayName = 'NotificationCard.Body'

export default NotificationCardBody
