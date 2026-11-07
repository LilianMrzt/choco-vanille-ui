import type { FC } from 'react'
import { toast } from 'sonner'

import { NotificationCard } from '@components/feedback/notification-card'
import type { ToasterNotificationProps } from '@components/feedback/toaster/components/toaster-notification/types'

/**
 * Composes a NotificationCard for either Toaster channel.
 * The viewport announces the message; this card does not create a second live
 * region. Custom compound content replaces the default message and actions.
 * Notification Headers supply a close button unless custom content has a Close
 * slot. Toasts have no close button and are dismissed by Sonner's swipe gesture.
 * @param props - Notification identifier and content.
 * @param props.id - Identifier dismissed by the close button.
 * @param props.showClose - Whether the notification channel includes a close button.
 * @param props.variant - Visual intent; defaults to `info`.
 * @param props.title - Default title content.
 * @param props.description - Default supporting message.
 * @param props.icon - Optional status icon override.
 * @param props.children - Optional complete compound content.
 * @param props.actions - Actions below the default message.
 * @param props.closeLabel - Close button name; defaults to `Close notification`.
 * @returns A dismissible notification card.
 * @example
 * <ToasterNotification id={id} showClose title="Changes saved" variant="success" />
 */
const ToasterNotification: FC<ToasterNotificationProps> = ({
    id,
    showClose,
    variant = 'info',
    title,
    description,
    icon,
    children,
    actions,
    closeLabel = 'Close notification',
}) => (
    <NotificationCard
        closeLabel={closeLabel}
        onClose={showClose ? () => toast.dismiss(id) : undefined}
        role={'none'}
        variant={variant}
    >
        {children !== undefined ? children : (
            <>
                <NotificationCard.Header>
                    <NotificationCard.Icon icon={icon} />
                    {title !== undefined && <NotificationCard.Title>{title}</NotificationCard.Title>}
                </NotificationCard.Header>
                {description !== undefined && (
                    <NotificationCard.Body>
                        <NotificationCard.Description>{description}</NotificationCard.Description>
                    </NotificationCard.Body>
                )}
                {actions !== undefined && (
                    <NotificationCard.Footer>
                        <NotificationCard.Actions>{actions}</NotificationCard.Actions>
                    </NotificationCard.Footer>
                )}
            </>
        )}
    </NotificationCard>
)

export default ToasterNotification
