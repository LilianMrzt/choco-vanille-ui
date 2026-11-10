import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import type { BottomSheetPlaygroundArgs } from '@stories/overlay/bottom-sheet/types'

export const ARG_TYPES = {
    defaultOpen: {
        control: false,
        description: 'Initial open state; the primary example is controlled and initial changes require remounting.',
        table: { category: 'BottomSheet' },
    },
    open: {
        control: 'boolean',
        table: { category: 'BottomSheet' },
    },
    onOpenChange: { control: false, description: 'Requested state and cancellable details; a callback requires consumer code.' },
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
    width: { control: 'text', description: 'Panel width; defaults to 100%, constrained by maxWidth.', table: { category: 'Compound: Content' } },
    minWidth: { control: 'text', description: 'Panel minimum width.', table: { category: 'Compound: Content' } },
    maxWidth: { control: 'text', description: 'Panel maximum width; defaults to 40rem.', table: { category: 'Compound: Content' } },
    height: { control: 'text', description: 'Panel height; defaults to content height, constrained by maxHeight.', table: { category: 'Compound: Content' } },
    minHeight: { control: 'text', description: 'Panel minimum height.', table: { category: 'Compound: Content' } },
    maxHeight: { control: 'text', description: 'Panel maximum height; defaults to calc(100dvh - 3rem).', table: { category: 'Compound: Content' } },
    contentLabel: { control: 'text', description: 'Content accessible name used when no header labels the sheet.', table: { category: 'Compound: Content' } },
    titleAs: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], description: 'Header heading level.', table: { category: 'Compound: Header' } },
    itemCloseOnClick: { control: 'boolean', description: 'Whether the configurable action closes the sheet.', table: { category: 'Compound: Item' } },
    radioValue: { control: 'select', options: ['original', 'compressed'], description: 'Controlled radio selection, synchronized in both directions.', table: { category: 'Compound: RadioGroup' } },
    radioDisabled: { control: 'boolean', description: 'Disable the radio group.', table: { category: 'Compound: RadioGroup' } },
    onRadioValueChange: { control: false, description: 'Radio selection and cancellable details; requires consumer code.', table: { category: 'Compound: RadioGroup' } },
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
    onOpenChange: fn(),
    modal: true,
    triggerLabel: 'Open bottom sheet',
    showHandle: true,
    titleAs: 'h2',
    contentLabel: 'Photo actions',
    itemCloseOnClick: true,
    radioValue: 'original',
    radioDisabled: false,
    onRadioValueChange: fn(),
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
