import type { Meta } from '@storybook/react-vite'

import type { ToastRole, ToastVariant } from '@components/feedback/toast'

export type ToastStoryArgs = {
    variant: ToastVariant
    role: ToastRole
    title: string
    description: string
    showCustomIcon: boolean
    showTitle: boolean
    showDescription: boolean
    showClose: boolean
    showActions: boolean
    actionLabel: string
    closeLabel: string
}

export const VARIANTS: ToastVariant[] = ['info', 'success', 'warning', 'error']

export const DEFAULT_ARGS = {
    variant: 'info',
    role: 'status',
    title: 'Did you know?',
    description: 'Toasts are useful for lightweight status updates.',
    showCustomIcon: false,
    showTitle: true,
    showDescription: true,
    showClose: true,
    showActions: false,
    actionLabel: 'Action',
    closeLabel: 'Close notification',
} satisfies NonNullable<Meta<ToastStoryArgs>['args']>

export const ARG_TYPES = {
    variant: { control: 'select', options: VARIANTS },
    role: { control: 'select', options: ['status', 'alert', 'none'] },
    title: { control: 'text', table: { category: 'Compound: Title' } },
    description: { control: 'text', table: { category: 'Compound: Description' } },
    showCustomIcon: { control: 'boolean', description: 'Use a custom icon instead of the variant default.', table: { category: 'Compound: Icon' } },
    showTitle: { control: 'boolean', table: { category: 'Compound: Title' } },
    showDescription: { control: 'boolean', table: { category: 'Compound: Description' } },
    showClose: { control: 'boolean', table: { category: 'Compound: Close' } },
    showActions: { control: 'boolean', table: { category: 'Compound: Actions' } },
    actionLabel: { control: 'text', table: { category: 'Compound: Actions' } },
    closeLabel: { control: 'text', table: { category: 'Compound: Close' } },
} satisfies NonNullable<Meta<ToastStoryArgs>['argTypes']>
