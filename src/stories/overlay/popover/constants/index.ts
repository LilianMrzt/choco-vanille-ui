import type { Meta } from '@storybook/react-vite'

import { fn } from 'storybook/test'
import type { PopoverStoryArgs } from '@stories/overlay/popover/types'

const SPACING = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128] as const

export const DEFAULT_ARGS = {
    open: false,
    modal: false,
    triggerLabel: 'Open popover',
    contentWidth: 'min(20rem, calc(100vw - 2rem))',
    contentPadding: 12,
    itemLabel: 'Edit',
    itemDisabled: false,
    itemDestructive: false,
    itemCloseOnClick: true,
    onOpenChange: fn(),
} satisfies NonNullable<Meta<PopoverStoryArgs>['args']>

export const ARG_TYPES = {
    open: { control: 'boolean', description: 'Controlled open state.' },
    defaultOpen: { control: false, description: 'Initial uncontrolled state; the primary example is controlled. Edit in Uncontrolled, which remounts to apply changes.' },
    modal: { control: 'select', options: [false, true, 'trap-focus'], description: 'Base UI modality; defaults to false.' },
    onOpenChange: { control: false, description: 'Requested state and cancellable details; requires consumer code.' },
    onOpenChangeComplete: { control: false, description: 'Animation-completion callback; requires consumer code.' },
    actionsRef: { control: false, description: 'Imperative action ref; requires a React ref object.' },
    handle: { control: false, description: 'External trigger handle; requires a handle created in consumer code.' },
    triggerId: { control: false, description: 'Associated controlled trigger ID; external triggers are not composed in this example.' },
    defaultTriggerId: { control: false, description: 'Initial associated trigger ID; requires external trigger composition and remounting.' },
    triggerLabel: { control: 'text', table: { category: 'Compound: Trigger' } },
    contentWidth: { control: 'text', table: { category: 'Compound: Content' } },
    contentPadding: { control: 'select', options: SPACING, table: { category: 'Compound: Content' } },
    itemLabel: { control: 'text', table: { category: 'Compound: Item' } },
    itemDisabled: { control: 'boolean', table: { category: 'Compound: Item' } },
    itemDestructive: { control: 'boolean', table: { category: 'Compound: Item' } },
    itemCloseOnClick: { control: 'boolean', table: { category: 'Compound: Item' } },
} satisfies NonNullable<Meta<PopoverStoryArgs>['argTypes']>
