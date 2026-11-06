import type { Meta } from '@storybook/react-vite'
import type { BottomSheetPlaygroundArgs } from '@stories/overlay/bottom-sheet/types'

export const ARG_TYPES = {
    defaultOpen: {
        control: false,
        table: { category: 'BottomSheet' },
    },
    open: {
        control: 'boolean',
        table: { category: 'BottomSheet' },
    },
    onOpenChange: { action: 'open changed', control: false },
    modal: {
        control: 'boolean',
        table: { category: 'BottomSheet' },
    },
    triggerLabel: {
        control: 'text',
        table: { category: 'Compound: Trigger' },
    },
    showHandle: {
        control: 'boolean',
        table: { category: 'Compound: Content' },
    },
    showHeader: {
        control: 'boolean',
        table: { category: 'Compound: Header' },
    },
    title: {
        control: 'text',
        table: { category: 'Compound: Header' },
    },
    description: {
        control: 'text',
        table: { category: 'Compound: Header' },
    },
    itemLabel: {
        control: 'text',
        table: { category: 'Compound: Item' },
    },
    itemDestructive: {
        control: 'boolean',
        table: { category: 'Compound: Item' },
    },
    itemDisabled: {
        control: 'boolean',
        table: { category: 'Compound: Item' },
    },
    showRadioGroup: {
        control: 'boolean',
        table: { category: 'Compound: RadioGroup' },
    },
    radioItemLabel: {
        control: 'text',
        table: { category: 'Compound: RadioItem' },
    },
    showSeparator: {
        control: 'boolean',
        table: { category: 'Compound: Separator' },
    },
    closeLabel: {
        control: 'text',
        table: { category: 'Compound: Close' },
    },
} satisfies NonNullable<Meta<BottomSheetPlaygroundArgs>['argTypes']>

export const DEFAULT_ARGS = {
    open: false,
    modal: true,
    triggerLabel: 'Open bottom sheet',
    showHandle: true,
    showHeader: true,
    title: 'Photo',
    description: 'Choose what to do with this photo.',
    itemLabel: 'Delete',
    itemDestructive: true,
    itemDisabled: false,
    showRadioGroup: true,
    radioItemLabel: 'Original size',
    showSeparator: true,
    closeLabel: 'Cancel',
} satisfies NonNullable<Meta<BottomSheetPlaygroundArgs>['args']>
