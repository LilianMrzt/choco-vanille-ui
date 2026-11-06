import type { ComponentProps } from 'react'
import type { Meta } from '@storybook/react-vite'

import type { HoverCard } from '@components/overlay/hover-card'

export type HoverCardStoryArgs = Omit<ComponentProps<typeof HoverCard>, 'children'> & {
    triggerLabel: string
    triggerDelay: number
    closeDelay: number
    contentWidth: string
    contentText: string
}

export const DEFAULT_ARGS = {
    open: false,
    triggerLabel: 'Hover me',
    triggerDelay: 0,
    closeDelay: 300,
    contentWidth: '20rem',
    contentText: 'This preview stays open while the pointer is over it.',
} satisfies NonNullable<Meta<HoverCardStoryArgs>['args']>

export const ARG_TYPES = {
    open: { control: 'boolean', description: 'Controlled open state.' },
    defaultOpen: { control: 'boolean', description: 'Initial uncontrolled state; remount to apply changes.' },
    onOpenChange: { control: false, action: 'open changed' },
    onOpenChangeComplete: { control: false },
    actionsRef: { control: false },
    handle: { control: false },
    triggerId: { control: false },
    defaultTriggerId: { control: false },
    triggerLabel: { control: 'text', table: { category: 'Compound: Trigger' } },
    triggerDelay: { control: { type: 'number', min: 0 }, table: { category: 'Compound: Trigger' } },
    closeDelay: { control: { type: 'number', min: 0 }, table: { category: 'Compound: Trigger' } },
    contentWidth: { control: 'text', table: { category: 'Compound: Content' } },
    contentText: { control: 'text', table: { category: 'Compound: Content' } },
} satisfies NonNullable<Meta<HoverCardStoryArgs>['argTypes']>
