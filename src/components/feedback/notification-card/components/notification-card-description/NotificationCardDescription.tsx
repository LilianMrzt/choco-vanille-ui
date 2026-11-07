import { vars } from '@theme/styles/contract/contract.css.ts'
import type { NotificationCardDescriptionProps } from '@components/feedback/notification-card/components/notification-card-description/types'
import { NOTIFICATION_CARD_DESCRIPTION_STYLES } from '@components/feedback/notification-card/components/notification-card-description/NotificationCardDescription.css.ts'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Description text slot for `NotificationCard`. Renders secondary-colored small
 * typography and forwards native span attributes and refs.
 * @param props - Content and span attributes.
 * @param props.children - Description content.
 * @param props.className - Additional class.
 * @param props.ref - Ref to the span.
 * @returns The description.
 * @example
 * <NotificationCard.Description>Changes saved.</NotificationCard.Description>
 */
const NotificationCardDescription: FC<NotificationCardDescriptionProps> = memo(({
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
            color={vars.color.text.secondary}
            className={cn(NOTIFICATION_CARD_DESCRIPTION_STYLES.description, className)}
            {...props}
        >
            {children}
        </Typography>
    )
})

NotificationCardDescription.displayName = 'NotificationCard.Description'

export default NotificationCardDescription
