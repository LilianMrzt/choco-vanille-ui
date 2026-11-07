import type { NotificationCardProps } from '@components/feedback/notification-card'

/** @internal Storybook-only composition controls; not public package API. */
export type NotificationCardStoryArgs = Readonly<Omit<NotificationCardProps, 'children' | 'title' | 'description' | 'icon'> & {
    title: string
    description: string
    showIcon: boolean
    showCustomIcon: boolean
    showTitle: boolean
    showDescription: boolean
    showClose: boolean
    showActions: boolean
    actionLabel: string
}>
