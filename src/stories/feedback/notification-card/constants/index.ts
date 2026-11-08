import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { NotificationCardVariant } from '@components/feedback/notification-card'
import type { NotificationCardStoryArgs } from '@stories/feedback/notification-card/types'

export const VARIANTS: NotificationCardVariant[] = ['info', 'success', 'warning', 'danger']

export const DEFAULT_ARGS = {
    variant: 'info',
    role: 'status',
    title: 'Changes saved',
    description: 'Your workspace is up to date. You can safely continue editing.',
    showIcon: true,
    showCustomIcon: false,
    showTitle: true,
    showDescription: true,
    showClose: true,
    showActions: false,
    actionLabel: 'View changes',
    closeLabel: 'Close notification',
    onClose: fn(),
} satisfies NonNullable<Meta<NotificationCardStoryArgs>['args']>

export const ARG_TYPES = {
    variant: { control: 'select', options: VARIANTS, description: 'Status icon intent. Defaults to info.' },
    role: { control: 'select', options: ['status', 'alert', 'none'], description: 'Live-region role. Defaults to status; use none inside a Toaster.' },
    title: { control: 'text', table: { category: 'Compound: Header', subcategory: 'Compound: Title' } },
    description: { control: 'text', table: { category: 'Compound: Body', subcategory: 'Compound: Description' } },
    showIcon: { control: 'boolean', description: 'Explicitly compose the Icon slot in Header.', table: { category: 'Compound: Header', subcategory: 'Compound: Icon' } },
    showCustomIcon: { control: 'boolean', description: 'Override the composed Icon slot with a custom SVG.', table: { category: 'Compound: Header', subcategory: 'Compound: Icon' } },
    showTitle: { control: 'boolean', table: { category: 'Compound: Header', subcategory: 'Compound: Title' } },
    showDescription: { control: 'boolean', table: { category: 'Compound: Body', subcategory: 'Compound: Description' } },
    showClose: { control: 'boolean', description: 'Show the sm close button.', table: { category: 'Compound: Header', subcategory: 'Compound: Close' } },
    showActions: { control: 'boolean', table: { category: 'Compound: Footer', subcategory: 'Compound: Actions' } },
    actionLabel: { control: 'text', table: { category: 'Compound: Footer', subcategory: 'Compound: Actions' } },
    closeLabel: { control: 'text', table: { category: 'Compound: Header', subcategory: 'Compound: Close' } },
    onClose: { control: false, description: 'Dismissal callback; wired to the compound Close button in this demo.' },
    className: { control: false, description: 'Additional root class.' },
    style: { control: false, description: 'Native root style overrides.' },
    ref: { control: false, description: 'Ref to the root div.' },
    children: { control: false, description: 'React content; this Playground composes the public slots using the demonstration controls.' },
    icon: { control: false, description: 'Consumer-owned local Iconify data; showCustomIcon demonstrates this override.' },
} satisfies NonNullable<Meta<NotificationCardStoryArgs>['argTypes']>
