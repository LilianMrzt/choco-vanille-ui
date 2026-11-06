import type { ComponentProps } from 'react'
import type { Meta } from '@storybook/react-vite'

import type { Popover, PopoverContentProps } from '@components/overlay/popover'

export type PopoverStoryArgs = Omit<ComponentProps<typeof Popover>, 'children'> & {
    triggerLabel: string
    contentWidth: string
    contentPadding: PopoverContentProps['padding']
    itemLabel: string
    itemDisabled: boolean
    itemDestructive: boolean
    itemCloseOnClick: boolean
}

const SPACING = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128] as const

export const DEFAULT_ARGS = {
    open: false,
    modal: false,
    triggerLabel: 'Open popover',
    contentWidth: '20rem',
    contentPadding: 12,
    itemLabel: 'Edit',
    itemDisabled: false,
    itemDestructive: false,
    itemCloseOnClick: true,
} satisfies NonNullable<Meta<PopoverStoryArgs>['args']>

export const ARG_TYPES = {
    open: { control: 'boolean', description: 'Controlled open state.' },
    defaultOpen: { control: 'boolean', description: 'Initial uncontrolled state; remount to apply changes.' },
    modal: { control: 'select', options: [false, true, 'trap-focus'], description: 'Base UI modality; defaults to false.' },
    onOpenChange: { control: false, action: 'open changed' },
    onOpenChangeComplete: { control: false },
    actionsRef: { control: false },
    handle: { control: false },
    triggerId: { control: false },
    defaultTriggerId: { control: false },
    triggerLabel: { control: 'text', table: { category: 'Compound: Trigger' } },
    contentWidth: { control: 'text', table: { category: 'Compound: Content' } },
    contentPadding: { control: 'select', options: SPACING, table: { category: 'Compound: Content' } },
    itemLabel: { control: 'text', table: { category: 'Compound: Item' } },
    itemDisabled: { control: 'boolean', table: { category: 'Compound: Item' } },
    itemDestructive: { control: 'boolean', table: { category: 'Compound: Item' } },
    itemCloseOnClick: { control: 'boolean', table: { category: 'Compound: Item' } },
} satisfies NonNullable<Meta<PopoverStoryArgs>['argTypes']>
