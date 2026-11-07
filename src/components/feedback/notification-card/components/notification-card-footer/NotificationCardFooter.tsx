import type { FC } from 'react'

import type { NotificationCardFooterProps } from '@components/feedback/notification-card/components/notification-card-footer/types'
import { Flex } from '@components/layout/flex'

/**
 * Contains notification actions below the body. Content wraps on small screens.
 * Native div attributes, events and refs are forwarded.
 * @param props - Footer attributes and content.
 * @returns The notification footer.
 * @example
 * <NotificationCard.Footer><NotificationCard.Actions><button>Undo</button></NotificationCard.Actions></NotificationCard.Footer>
 */
const NotificationCardFooter: FC<NotificationCardFooterProps> = (props) => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={8}
        minWidth={0}
        width={'100%'}
        {...props}
    />
)

NotificationCardFooter.displayName = 'NotificationCard.Footer'

export default NotificationCardFooter
