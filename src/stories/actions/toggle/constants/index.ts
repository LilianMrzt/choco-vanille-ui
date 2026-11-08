import type { Meta } from '@storybook/react-vite'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import { fn } from 'storybook/test'

export const VARIANTS = ['outlined', 'outlinedSubtle', 'ghost', 'ghostSubtle'] as const
export const COLORS = ['primary', 'secondary', 'neutral', 'danger', 'success', 'warning', 'info'] as const
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
    icon: { control: false, description: 'local Iconify data for icon-only mode; requires an accessible name.' },
    'aria-label': { control: 'text', description: 'Required for icon-only mode.' },
    startIcon: { control: false, description: 'Decorative local Iconify data before the label.' },
    endIcon: { control: false, description: 'Decorative local Iconify data after the label.' },
    variant: { control: 'select', options: VARIANTS, description: 'Bordered or borderless treatment with solid or subtle selection.', table: { defaultValue: { summary: 'ghostSubtle' } } },
    color: { control: 'select', options: COLORS, table: { defaultValue: { summary: 'primary' } } },
    size: { control: 'select', options: SIZES, description: 'Height at a 16px root: sm 28px, md 36px, lg 44px. Shared with Button; fixed across viewport and pointer types.', table: { defaultValue: { summary: 'md' } } },
    radius: { control: 'select', options: [0, 4, 6, 8, 10, 14, 20, 'full'], description: 'Corner radius token; defaults to 6.' },
    margin: { control: 'select', options: SPACING },
    marginTop: { control: 'select', options: SPACING },
    marginRight: { control: 'select', options: SPACING },
    marginBottom: { control: 'select', options: SPACING },
    marginLeft: { control: 'select', options: SPACING },
    width: { control: 'text' },
    alignSelf: { control: 'select', options: [undefined, 'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'] },
    disabled: { control: 'boolean' },
    pressed: { control: 'boolean', description: 'Controlled standalone state.' },
    defaultPressed: { control: 'boolean', description: 'Initial state when pressed is unset. Changing it remounts the uncontrolled example.' },
    onPressedChange: { control: false, description: 'Receives the requested state and cancellable event details.' },
    ref: { control: false, description: 'Ref to the button.' },
} satisfies NonNullable<Meta<ToggleStoryArgs>['argTypes']>
