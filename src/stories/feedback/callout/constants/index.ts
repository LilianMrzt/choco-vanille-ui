import type { Meta } from '@storybook/react-vite'

import type { CalloutRole, CalloutVariant } from '@components/feedback/callout'

export type CalloutStoryArgs = {
    variant: CalloutVariant
    role: CalloutRole
    title: string
    description: string
    showCustomIcon: boolean
    showTitle: boolean
    showDescription: boolean
    showAction: boolean
    actionLabel: string
    onActionClick?: () => void
}

export const VARIANTS: CalloutVariant[] = ['info', 'success', 'warning', 'error']

export const DEFAULT_ARGS = {
    variant: 'info',
    role: 'status',
    title: 'Did you know?',
    description: 'Callouts are useful for inline status messages.',
    showCustomIcon: false,
    showTitle: true,
    showDescription: true,
    showAction: true,
    actionLabel: 'Dismiss',
} satisfies NonNullable<Meta<CalloutStoryArgs>['args']>

export const ARG_TYPES = {
    variant: { control: 'select', options: VARIANTS },
    role: { control: 'select', options: ['status', 'alert', undefined] },
    title: { control: 'text', table: { category: 'Compound: Title' } },
    description: { control: 'text', table: { category: 'Compound: Description' } },
    showCustomIcon: { control: 'boolean', description: 'Use a custom icon instead of the variant default.', table: { category: 'Compound: Icon' } },
    showTitle: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showAction: { control: 'boolean' },
    actionLabel: { control: 'text', table: { category: 'Compound: Action' } },
    onActionClick: { control: false, action: 'action clicked', table: { category: 'Compound: Action' } },
} satisfies NonNullable<Meta<CalloutStoryArgs>['argTypes']>
