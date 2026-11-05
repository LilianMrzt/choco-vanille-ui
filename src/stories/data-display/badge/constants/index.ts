import { type BadgeColor, type BadgeProps, type BadgeSize, type BadgeVariant } from '@components/data-display/badge'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import type { Meta } from '@storybook/react-vite'

export const VARIANTS: BadgeVariant[] = ['contained', 'subtle', 'outlined', 'outlinedSubtle']

export const COLORS: BadgeColor[] = [
    'primary', 'secondary', 'tertiary', 'destructive', 'success', 'warning', 'info',
    'purple', 'pink', 'orange', 'teal', 'cyan', 'indigo',
]

export const SIZES: BadgeSize[] = ['sm', 'md', 'lg']
export const DEFAULT_ARGS = {
    label: 'Badge',
    variant: 'outlinedSubtle',
    color: 'primary',
    size: 'md',
    borderRadius: 4,
} satisfies NonNullable<Meta<BadgeProps>['args']>

export const ARG_TYPES = {
    label: { control: 'text', description: 'Visible text. Required; icons do not replace it.' },
    variant: { control: 'select', options: VARIANTS, description: 'Visual treatment.', table: { defaultValue: { summary: 'outlinedSubtle' } } },
    color: { control: 'select', options: COLORS, description: 'Semantic color intent.', table: { defaultValue: { summary: 'primary' } } },
    size: { control: 'select', options: SIZES, description: 'Label and icon size preset.', table: { defaultValue: { summary: 'md' } } },
    borderRadius: { control: 'select', options: [0, 4, 6, 8, 10, 14, 20, 'full'], description: 'Inherited radius token.', table: { defaultValue: { summary: '4' } } },
    width: { control: 'text', description: 'Inherited CSS width; omitted by default.' },
    startIcon: { control: 'select', options: ['None', 'Check'], mapping: { None: undefined, Check: CheckIcon }, description: 'Decorative leading SVG component; the control maps a demonstration icon.' },
    endIcon: { control: 'select', options: ['None', 'Chevron'], mapping: { None: undefined, Chevron: ChevronRightIcon }, description: 'Decorative trailing SVG component; the control maps a demonstration icon.' },
    className: { control: false, description: 'Consumer class merged with the badge classes.' },
    style: { control: 'object', description: 'Consumer CSS overrides; takes precedence over layout props and recipe colors.' },
    ref: { control: false, description: 'Ref to the outer span; not editable in Controls.' },
} satisfies NonNullable<Meta<BadgeProps>['argTypes']>
