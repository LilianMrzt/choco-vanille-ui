import { IconButton } from '@components/actions/icon-button'
import type { NotificationCardCloseProps } from '@components/feedback/notification-card/components/notification-card-close/types'
import { NOTIFICATION_CARD_CLOSE_STYLES } from '@components/feedback/notification-card/components/notification-card-close/NotificationCardClose.css.ts'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Close button slot for `NotificationCard`. Renders a neutral ghost button with
 * a close icon and the `sm` size preset. Requires `aria-label`; forwards native button events and refs.
 * @param props - Native button attributes.
 * @param props["aria-label"] - Accessible close label.
 * @param props.className - Additional class.
 * @returns A close button.
 * @example
 * <NotificationCard.Close aria-label="Dismiss" />
 */
const NotificationCardClose: FC<NotificationCardCloseProps> = memo(({
    'aria-label': ariaLabel,
    className,
    ...props
}) => {
    return (
        <IconButton
            variant={'ghost'}
            color={'neutral'}
            size={'sm'}
            icon={CloseIcon}
            aria-label={ariaLabel}
            className={cn(NOTIFICATION_CARD_CLOSE_STYLES.close, className)}
            {...props}
        />
    )
})

NotificationCardClose.displayName = 'NotificationCard.Close'

export default NotificationCardClose
