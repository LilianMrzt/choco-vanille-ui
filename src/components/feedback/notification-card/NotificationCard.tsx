import { memo, type FC } from 'react'

import { NOTIFICATION_CARD_STYLES } from '@components/feedback/notification-card/NotificationCard.css.ts'
import { NotificationCardActions } from '@components/feedback/notification-card/components/notification-card-actions'
import { NotificationCardClose } from '@components/feedback/notification-card/components/notification-card-close'
import { NotificationCardDescription } from '@components/feedback/notification-card/components/notification-card-description'
import { NotificationCardIcon } from '@components/feedback/notification-card/components/notification-card-icon'
import { NotificationCardTitle } from '@components/feedback/notification-card/components/notification-card-title'
import NotificationCardHeader from '@components/feedback/notification-card/components/notification-card-header/NotificationCardHeader'
import NotificationCardBody from '@components/feedback/notification-card/components/notification-card-body/NotificationCardBody'
import NotificationCardFooter from '@components/feedback/notification-card/components/notification-card-footer/NotificationCardFooter'
import { NotificationCardContext } from '@components/feedback/notification-card/context/NotificationCard.context.ts'
import type { NotificationCardProps } from '@components/feedback/notification-card/types'
import { Flex } from '@components/layout/flex'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * Notification card compound with `variant` (info|success|warning|danger),
 * optional `icon`, `title`, `description`, and a close button. Renders with
 * `role="status"` by default; pass `role="alert"` for urgent messages.
 * Compose Header, Body and Footer sections. Place Icon, Title and Close in
 * Header, Description in Body, and Actions in Footer.
 * Native div attributes and refs are forwarded. The card fills its container.
 * Compose Icon explicitly in custom children. Header supplies an onClose button
 * when its Close slot is omitted. Sections are optional; custom children replace
 * the convenience layout, which includes the variant icon.
 * @param props - NotificationCard content and root attributes.
 * @param props.variant - Visual intent; defaults to `info`.
 * @param props.role - Live-region role; defaults to `status`.
 * @param props.icon - Icon override for the convenience layout; use Icon's own prop in compound content.
 * @param props.title - Convenience title.
 * @param props.description - Convenience description.
 * @param props.closeLabel - Convenience close label; defaults to `Close notification`.
 * @param props.onClose - Renders the convenience close button when provided.
 * @param props.children - Compound content.
 * @param props.className - Additional root class.
 * @param props.ref - Ref to the root element.
 * @returns A notification card.
 * @example
 * <NotificationCard title="Saved" variant="success" />
 */
const NotificationCardRoot: FC<NotificationCardProps> = memo(({
    variant = 'info',
    role = 'status',
    icon,
    title,
    description,
    closeLabel = 'Close notification',
    onClose,
    children,
    className,
    ref,
    ...props
}) => {
    const isCompound = children !== undefined

    return (
        <NotificationCardContext.Provider value={{ variant, onClose, closeLabel }}>
            <Flex
                alignItems={'stretch'}
                as={'div'}
                backgroundColor={vars.color.surface.elevated}
                borderBottomWidth={'1px'}
                borderLeftWidth={'1px'}
                borderRadius={8}
                borderRightWidth={'1px'}
                borderStyle={'solid'}
                borderTopWidth={'1px'}
                boxShadow={'sm'}
                className={cn(
                    NOTIFICATION_CARD_STYLES.recipe({ variant }),
                    className,
                )}
                color={vars.color.text.primary}
                flexDirection={'column'}
                gap={8}
                padding={16}
                ref={ref}
                role={role === 'none' ? undefined : role}
                width={'100%'}
                {...props}
            >
                {isCompound ? (
                    children
                ) : (
                    <>
                        <NotificationCardHeader>
                            <NotificationCardIcon icon={icon} />
                            {title !== undefined && <NotificationCardTitle>{title}</NotificationCardTitle>}
                        </NotificationCardHeader>
                        {description !== undefined && (
                            <NotificationCardBody>
                                <NotificationCardDescription>{description}</NotificationCardDescription>
                            </NotificationCardBody>
                        )}
                    </>
                )}
            </Flex>
        </NotificationCardContext.Provider>
    )
})

NotificationCardRoot.displayName = 'NotificationCard'

/** Notification card with namespaced content slots. */
const NotificationCard = Object.assign(NotificationCardRoot, {
    Header: NotificationCardHeader,
    Body: NotificationCardBody,
    Footer: NotificationCardFooter,
    Icon: NotificationCardIcon,
    Title: NotificationCardTitle,
    Description: NotificationCardDescription,
    Actions: NotificationCardActions,
    Close: NotificationCardClose,
})

export default NotificationCard
