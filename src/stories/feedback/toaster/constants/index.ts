import type { Meta } from '@storybook/react-vite'

import type { ToasterStoryArgs } from '@stories/feedback/toaster/types'

const POSITIONS = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']

export const DEFAULT_ARGS = {
    toastPosition: 'bottom-right',
    notificationPosition: 'top-right',
    toastLabel: 'Toasts',
    notificationLabel: 'Notifications',
    messageVariant: 'success',
    title: 'Changes saved',
    description: 'Your workspace is up to date.',
    duration: 5000,
    notificationDuration: 0,
    closeLabel: 'Close notification',
    showActions: true,
    actionLabel: 'Undo',
} satisfies ToasterStoryArgs

export const ARG_TYPES = {
    toastPosition: { control: 'select', options: POSITIONS, description: 'Transient viewport position. Defaults to bottom-right.', table: { defaultValue: { summary: "'bottom-right'" } } },
    notificationPosition: { control: 'select', options: POSITIONS, description: 'Persistent viewport position. Defaults to top-right.', table: { defaultValue: { summary: "'top-right'" } } },
    toastLabel: { control: 'text', description: 'Accessible transient region name. Defaults to Toasts.', table: { defaultValue: { summary: "'Toasts'" } } },
    notificationLabel: { control: 'text', description: 'Accessible persistent region name. Defaults to Notifications.', table: { defaultValue: { summary: "'Notifications'" } } },
    className: { control: false, description: 'Additional class applied to both viewports.' },
    style: { control: false, description: 'Style overrides applied to both viewports.' },
    messageVariant: { control: 'select', options: ['info', 'success', 'warning', 'error'], description: 'Demo message intent, not a viewport configuration prop.', table: { category: 'Demo: Message' } },
    title: { control: 'text', table: { category: 'Demo: Message' } },
    description: { control: 'text', table: { category: 'Demo: Message' } },
    duration: { control: { type: 'number', min: 0, step: 1000 }, description: 'Toast lifetime in milliseconds; hook default is 5000.', table: { category: 'Demo: Message' } },
    notificationDuration: { control: { type: 'number', min: 0, step: 1000 }, description: 'Notification lifetime in milliseconds; 0 (default) persists until dismissed.', table: { category: 'Demo: Message' } },
    closeLabel: { control: 'text', description: 'Notification close button only; toasts have no close button.', table: { category: 'Compound: Close' } },
    showActions: { control: 'boolean', table: { category: 'Compound: Actions' } },
    actionLabel: { control: 'text', table: { category: 'Compound: Actions' } },
} satisfies NonNullable<Meta<ToasterStoryArgs>['argTypes']>
