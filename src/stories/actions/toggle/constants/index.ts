import type { Meta } from '@storybook/react-vite'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import { fn } from 'storybook/test'

export const VARIANTS = ['outlined', 'outlinedSubtle', 'ghost', 'ghostSubtle'] as const
export const COLORS = ['primary', 'secondary', 'tertiary', 'destructive', 'success', 'warning', 'info'] as const
export const SIZES = ['sm', 'md', 'lg'] as const
const SPACING = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128, 'auto'] as const

export const DEFAULT_ARGS = {
    label: 'Bold',
    pressed: false,
    variant: 'ghostSubtle',
    onPressedChange: fn(),
} satisfies NonNullable<Meta<ToggleStoryArgs>['args']>

export const ARG_TYPES = {
    label: { control: 'text', description: 'Required for text mode.' },
    icon: { control: false, description: 'SVG component for icon-only mode; requires an accessible name.' },
    'aria-label': { control: 'text', description: 'Required for icon-only mode.' },
    startIcon: { control: false, description: 'Decorative SVG component before the label.' },
    endIcon: { control: false, description: 'Decorative SVG component after the label.' },
    variant: { control: 'select', options: VARIANTS, description: 'Bordered or borderless treatment with solid or subtle selection.', table: { defaultValue: { summary: 'ghostSubtle' } } },
    color: { control: 'select', options: COLORS, table: { defaultValue: { summary: 'primary' } } },
    size: { control: 'select', options: SIZES, description: 'Height at a 16px root: sm 28px, md 36px, lg 44px. Shared with Button; fixed across viewport and pointer types.', table: { defaultValue: { summary: 'md' } } },
    margin: { control: 'select', options: SPACING },
    marginTop: { control: 'select', options: SPACING },
    marginRight: { control: 'select', options: SPACING },
    marginBottom: { control: 'select', options: SPACING },
    marginLeft: { control: 'select', options: SPACING },
    width: { control: 'text' },
    alignSelf: { control: 'select', options: [undefined, 'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'] },
    disabled: { control: 'boolean' },
    pressed: { control: 'boolean', description: 'Controlled standalone state.' },
    defaultPressed: { control: 'boolean', description: 'Initial uncontrolled state; remount to apply changes.' },
    onPressedChange: { control: false, description: 'Receives the requested state and cancellable event details.' },
    ref: { control: false, description: 'Ref to the button.' },
    groupMultiple: { control: 'boolean', description: 'Allow multiple selections.', table: { category: 'Group demo' } },
    groupOrientation: { control: 'select', options: ['horizontal', 'vertical'], description: 'Layout and arrow-key direction.', table: { category: 'Group demo' } },
    groupDisabled: { control: 'boolean', description: 'Disable all items.', table: { category: 'Group demo' } },
    groupValue: { control: 'check', options: ['bold', 'italic', 'underline'], description: 'Controlled group selection.', table: { category: 'Group demo' } },
    groupOnValueChange: { control: false, description: 'Group change callback with cancellable event details.', table: { category: 'Group demo' } },
} satisfies NonNullable<Meta<ToggleStoryArgs>['argTypes']>
