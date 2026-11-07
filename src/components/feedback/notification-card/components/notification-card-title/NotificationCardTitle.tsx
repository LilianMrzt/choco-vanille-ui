import { NOTIFICATION_CARD_TITLE_STYLES } from '@components/feedback/notification-card/components/notification-card-title/NotificationCardTitle.css.ts'
import type { NotificationCardTitleProps } from '@components/feedback/notification-card/components/notification-card-title/types'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { memo, type FC } from 'react'

/**
 * Title text slot for `NotificationCard`. Renders semibold primary-colored
 * typography, wraps long text, and forwards native span attributes and refs.
 * @param props - Content and span attributes.
 * @param props.children - Title content.
 * @param props.className - Additional class.
 * @param props.ref - Ref to the span.
 * @returns The title.
 * @example
 * <NotificationCard.Title>Saved</NotificationCard.Title>
 */
const NotificationCardTitle: FC<NotificationCardTitleProps> = memo(({
    children,
    className,
    ref,
    ...props
}) => {
    return (
        <Typography
            ref={ref}
            as={'span'}
            variant={'span'}
            fontSize={14}
            fontWeight={'semibold'}
            color={vars.color.text.primary}
            className={cn(NOTIFICATION_CARD_TITLE_STYLES.title, className)}
            {...props}
        >
            {children}
        </Typography>
    )
})

NotificationCardTitle.displayName = 'NotificationCard.Title'

export default NotificationCardTitle
