import type { Meta } from '@storybook/react-vite'
import type { ContextMenuStoryArgs } from '@stories/overlay/context-menu/types'

export const DEFAULT_ARGS = {
    open: false,
    disabled: false,
    loopFocus: true,
    highlightItemOnHover: true,
    triggerLabel: 'Right click this area',
    editLabel: 'Edit',
    deleteLabel: 'Delete',
    showDisabledItem: false,
} satisfies NonNullable<Meta<ContextMenuStoryArgs>['args']>

export const ARG_TYPES = {
    open: { control: 'boolean' },
    defaultOpen: { control: false, description: 'Initial uncontrolled state; remount to apply changes.' },
    onOpenChange: { control: false, action: 'open changed' },
    disabled: { control: 'boolean' },
    loopFocus: { control: 'boolean' },
    highlightItemOnHover: { control: 'boolean' },
    triggerLabel: { control: 'text', table: { category: 'Compound: Trigger' } },
    editLabel: { control: 'text', table: { category: 'Compound: Item' } },
    deleteLabel: { control: 'text', table: { category: 'Compound: Item' } },
    showDisabledItem: { control: 'boolean', table: { category: 'Compound: Item' } },
} satisfies NonNullable<Meta<ContextMenuStoryArgs>['argTypes']>
