import type { Meta, StoryObj } from '@storybook/react-vite'

import { NotificationCard } from '@components/feedback/notification-card'
import NotificationCardDocsPage from '@stories/feedback/notification-card/components/notification-card-docs-page/NotificationCardDocsPage'
import NotificationCardPlayground from '@stories/feedback/notification-card/components/notification-card-playground/NotificationCardPlayground'
import NotificationCardVariants from '@stories/feedback/notification-card/components/notification-card-variants/NotificationCardVariants'
import NotificationCardNarrow from '@stories/feedback/notification-card/components/notification-card-narrow/NotificationCardNarrow'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/notification-card/constants'
import type { NotificationCardStoryArgs } from '@stories/feedback/notification-card/types'
import narrowSource from '@stories/feedback/notification-card/sources/NotificationCardNarrow.source.tsx.txt?raw'
import variantsSource from '@stories/feedback/notification-card/sources/NotificationCardVariants.source.tsx.txt?raw'
import { createNotificationCardSource } from '@stories/feedback/notification-card/utils/create-notification-card-source/createNotificationCardSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Feedback/NotificationCard',
    component: NotificationCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A composable notification surface with a softly tinted status icon, a clear text hierarchy and optional actions. Use it inline, or let Toaster compose it for transient toasts and persistent notifications.',
            },
            page: NotificationCardDocsPage,
            source: { type: 'dynamic', transform: createNotificationCardSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    render: (args) => <NotificationCardPlayground {...args} />,
} satisfies Meta<NotificationCardStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
    parameters: { docs: { ...storySource(variantsSource) } },
    render: NotificationCardVariants,
}

export const NarrowContainer: Story = {
    parameters: {
        docs: {
            description: { story: 'Long content and wrapping actions remain readable in a narrow container.' },
            ...storySource(narrowSource),
        },
    },
    render: NotificationCardNarrow,
}
