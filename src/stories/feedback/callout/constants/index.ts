import type { Meta } from '@storybook/react-vite'

import type { CalloutVariant } from '@components/feedback/callout'
import type { CalloutStoryArgs } from '@stories/feedback/callout/types'

export const VARIANTS: CalloutVariant[] = ['info', 'success', 'warning', 'danger']

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
    onActionClick: { control: false, action: 'action clicked', description: 'Callback for the compound Action button.', table: { category: 'Compound: Action' } },
    children: { control: false, description: 'Custom React content; slot controls compose this Playground.' },
    icon: { control: false, description: 'Consumer-owned SVG component; showCustomIcon demonstrates the Icon slot.' },
    className: { control: false, description: 'Additional root class; supplied by the consumer.' },
    style: { control: false, description: 'Native root style overrides; supplied by the consumer.' },
    ref: { control: false, description: 'Ref to the root div; cannot be edited in Controls.' },
} satisfies NonNullable<Meta<CalloutStoryArgs>['argTypes']>
