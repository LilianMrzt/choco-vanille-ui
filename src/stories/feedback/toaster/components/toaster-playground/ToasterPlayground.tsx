import { useEffect, useRef, type FC } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import { useNotification, useToast } from '@hooks'
import type { ToasterStoryArgs } from '@stories/feedback/toaster/types'

/**
 * Demonstrates both channels; the story decorator owns the notification viewports.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Viewport props and message controls.
 * @param props.messageVariant - Message intent.
 * @param props.title - Message title.
 * @param props.description - Supporting message.
 * @param props.duration - Transient lifetime in milliseconds.
 * @param props.notificationDuration - Persistent lifetime, with 0 disabling auto-dismiss.
 * @param props.closeLabel - Persistent notification close button name.
 * @param props.showActions - Whether to include an action.
 * @param props.actionLabel - Action button text.
 * @returns Notification trigger buttons.
 * @example
 * <ToasterPlayground {...args} />
 */
const ToasterPlayground: FC<ToasterStoryArgs> = ({
    messageVariant,
    title,
    description,
    duration,
    notificationDuration,
    closeLabel,
    showActions,
    actionLabel,
}) => {
    const { show, dismiss } = useToast()
    const { show: showNotification } = useNotification()
    const notificationIds = useRef(new Set<number | string>())

    useEffect(() => () => {
        for (const id of notificationIds.current) {
            dismiss(id)
        }
        notificationIds.current.clear()
    }, [dismiss])

    const actions = showActions ? (
        <Button
            label={actionLabel}
            onClick={() => notificationIds.current.add(show('info', { title: 'Action completed' }))}
            size={'sm'}
            variant={'ghost'}
        />
    ) : undefined

    return (
        <Flex
            flexWrap={'wrap'}
            gap={12}
        >
            <Button
                label={'Show simple toast'}
                onClick={() => notificationIds.current.add(show(messageVariant, { title, duration }))}
                variant={'ghost'}
            />
            <Button
                label={'Show toast'}
                onClick={() => notificationIds.current.add(show(messageVariant, { title, description, duration, actions }))}
            />
            <Button
                label={'Show notification'}
                onClick={() => notificationIds.current.add(showNotification({ variant: messageVariant, title, description, duration: notificationDuration, closeLabel, actions }))}
                variant={'outlined'}
            />
        </Flex>
    )
}

export default ToasterPlayground
