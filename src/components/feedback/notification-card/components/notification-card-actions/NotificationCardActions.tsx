import type { NotificationCardActionsProps } from '@components/feedback/notification-card/components/notification-card-actions/types'
import { NOTIFICATION_CARD_ACTIONS_STYLES } from '@components/feedback/notification-card/components/notification-card-actions/NotificationCardActions.css.ts'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Actions slot for `NotificationCard`. A flex row that aligns call-to-action buttons
 * at the end of the row below the message. Actions wrap in narrow containers. Native div attributes
 * and refs are forwarded.
 * @param props - Container attributes.
 * @param props.children - Action buttons or links.
 * @param props.className - Additional class.
 * @param props.ref - Ref to the container.
 * @returns The action row.
 * @example
 * <NotificationCard.Actions><button>Undo</button></NotificationCard.Actions>
 */
const NotificationCardActions: FC<NotificationCardActionsProps> = memo(({
    children,
    className,
    ref,
    ...props
}) => {
    return (
        <Flex
            ref={ref}
            flexDirection={'row'}
            flexWrap={'wrap'}
            alignItems={'center'}
            gap={8}
            justifyContent={'flex-end'}
            className={cn(NOTIFICATION_CARD_ACTIONS_STYLES.actions, className)}
            width={'100%'}
            {...props}
        >
            {children}
        </Flex>
    )
})

NotificationCardActions.displayName = 'NotificationCard.Actions'

export default NotificationCardActions
