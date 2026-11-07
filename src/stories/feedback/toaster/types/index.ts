import type { NotificationCardVariant } from '@components/feedback/notification-card'
import type { ToasterProps } from '@components/feedback/toaster'

/** @internal Storybook-only controls; not part of the public package API. */
export type ToasterStoryArgs = Readonly<ToasterProps & {
    messageVariant: NotificationCardVariant
    title: string
    description: string
    duration: number
    notificationDuration: number
    closeLabel: string
    showActions: boolean
    actionLabel: string
}>
