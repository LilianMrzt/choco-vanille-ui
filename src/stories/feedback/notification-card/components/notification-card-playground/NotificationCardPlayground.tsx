import { INFO_ICON as InfoIcon } from '@constants/icon-registry'
import type { FC } from 'react'

import { Button } from '@components/actions/button'
import { NotificationCard } from '@components/feedback/notification-card'
import { Box } from '@components/layout/box'
import type { NotificationCardStoryArgs } from '@stories/feedback/notification-card/types'

/**
 * Renders editable compound notification card slots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Card attributes and composition controls.
 * @param props.title - Title slot content.
 * @param props.description - Description slot content.
 * @param props.showIcon - Whether to compose the icon slot.
 * @param props.showCustomIcon - Whether to supply a custom icon.
 * @param props.showTitle - Whether to render the title.
 * @param props.showDescription - Whether to render the description.
 * @param props.showClose - Whether to render the close button.
 * @param props.showActions - Whether to render actions.
 * @param props.actionLabel - Action button text.
 * @param props.closeLabel - Close button name.
 * @param props.onClose - Callback invoked by the close button.
 * @returns The notification card example.
 * @example
 * <NotificationCardPlayground {...args} />
 */
const NotificationCardPlayground: FC<NotificationCardStoryArgs> = ({
    title,
    description,
    showIcon,
    showCustomIcon,
    showTitle,
    showDescription,
    showClose,
    showActions,
    actionLabel,
    closeLabel,
    onClose,
    ...props
}) => (
    <Box
        maxWidth={'24rem'}
        width={'100%'}
    >
        <NotificationCard {...props}>
            <NotificationCard.Header>
                {showIcon && <NotificationCard.Icon icon={showCustomIcon ? InfoIcon : undefined} />}
                {showTitle && <NotificationCard.Title>{title}</NotificationCard.Title>}
                {showClose && (
                    <NotificationCard.Close
                        aria-label={closeLabel ?? 'Close notification'}
                        onClick={() => onClose?.()}
                    />
                )}
            </NotificationCard.Header>
            {showDescription && (
                <NotificationCard.Body>
                    <NotificationCard.Description>{description}</NotificationCard.Description>
                </NotificationCard.Body>
            )}
            {showActions && (
                <NotificationCard.Footer>
                    <NotificationCard.Actions>
                        <Button
                            label={actionLabel}
                            size={'sm'}
                            variant={'outlined'}
                        />
                    </NotificationCard.Actions>
                </NotificationCard.Footer>
            )}
        </NotificationCard>
    </Box>
)

export default NotificationCardPlayground
