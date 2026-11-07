import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import type { DropdownMenuStoryArgs } from '@stories/overlay/dropdown-menu/types'

export const DEFAULT_ARGS = {
    open: false,
    onOpenChange: fn(),
    modal: true,
    triggerLabel: 'Open menu',
    itemLabel: 'Edit',
    destructive: false,
    showCheckbox: true,
    side: 'bottom',
    align: 'start',
} satisfies NonNullable<Meta<DropdownMenuStoryArgs>['args']>

export const ARG_TYPES = {
    open: { control: 'boolean' },
    defaultOpen: { control: false, description: 'Initial uncontrolled state; remount to apply changes.' },
    onOpenChange: { control: false, description: 'Requested state and cancellable details; a callback requires consumer code.' },
    modal: { control: 'boolean' },
    triggerLabel: { control: 'text', table: { category: 'Compound: Trigger' } },
    itemLabel: { control: 'text', table: { category: 'Compound: Item' } },
    destructive: { control: 'boolean', table: { category: 'Compound: Item' } },
    showCheckbox: { control: 'boolean', table: { category: 'Compound: CheckboxItem' } },
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'], table: { category: 'Compound: Content' } },
    align: { control: 'select', options: ['start', 'center', 'end'], table: { category: 'Compound: Content' } },
} satisfies NonNullable<Meta<DropdownMenuStoryArgs>['argTypes']>
