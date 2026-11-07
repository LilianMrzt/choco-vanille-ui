import type { AvatarStoryArgs } from '@stories/data-display/avatar/types'
import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

export const SIZES = ['sm', 'md', 'lg', 'xl'] as const

export const SHAPES = ['circle', 'square'] as const

export const COLORS = ['primary', 'secondary', 'tertiary', 'destructive', 'success', 'warning', 'info', 'purple', 'pink', 'orange', 'teal', 'cyan', 'indigo'] as const

export const STATUSES = ['online', 'offline', 'busy', 'away'] as const

export const VARIANTS = ['contained', 'subtle', 'outlined', 'outlinedSubtle'] as const

export const PREVIEW_IMAGE = 'https://github.com/shadcn.png'

export const DEFAULT_ARGS = {
    initials: 'JD',
    'aria-label': 'Jane Doe',
    size: 'md',
    shape: 'circle',
    color: 'primary',
    variant: 'outlinedSubtle',
    fallbackDelay: 0,
    onLoadingStatusChange: fn(),
    onClick: fn(),
} satisfies NonNullable<Meta<AvatarStoryArgs>['args']>

export const ARG_TYPES = {
    src: { control: 'text', description: 'Image URL; empty URLs show the fallback.' },
    alt: { control: 'text', description: 'Image alternative; defaults to an empty decorative alternative.' },
    initials: { control: 'text', description: 'Uppercased fallback, limited to two characters.' },
    icon: { control: false, description: 'SVG component; not serializable. Defaults to a decorative user icon.' },
    size: { control: 'select', options: SIZES, description: 'Avatar size.', table: { defaultValue: { summary: 'md' } } },
    shape: { control: 'select', options: SHAPES, description: 'Root outline.', table: { defaultValue: { summary: 'circle' } } },
    color: { control: 'select', options: COLORS, description: 'Fallback semantic intent.', table: { defaultValue: { summary: 'primary' } } },
    variant: { control: 'select', options: VARIANTS, description: 'Badge treatments: solid contained, soft subtle, transparent outlined, or soft outlinedSubtle. Applies to images and fallbacks.', table: { defaultValue: { summary: 'outlinedSubtle' } } },
    status: { control: 'select', options: [undefined, ...STATUSES], description: 'Optional presence indicator.' },
    statusLabel: { control: 'text', description: 'Presence accessible name; defaults to the status value.' },
    statusSize: { control: 'select', options: [undefined, ...SIZES], description: 'Independent indicator size; defaults to avatar size.' },
    fallbackDelay: { control: { type: 'number', min: 0 }, description: 'Fallback delay in milliseconds.', table: { defaultValue: { summary: '0' } } },
    onLoadingStatusChange: { control: false, description: 'Receives the complete upstream image loading status; observable in Actions.' },
    'aria-label': { control: 'text', description: 'Accessible root name for identifying fallback content.' },
    'aria-labelledby': { control: 'text', description: 'ID of an existing accessible label.' },
    role: { control: 'select', options: [undefined, 'img'], description: 'Optional native role for a named avatar; interactive usage needs a native control.' },
    className: { control: 'text', description: 'Additional root classes.' },
    style: { control: 'object', description: 'Consumer root CSS overrides.' },
    ref: { control: false, description: 'Forwarded to the root span; refs cannot be edited in Controls.' },
    children: { control: false, description: 'Convenience Avatar generates its slots; use the compound API for custom children.' },
    onClick: { control: false, description: 'Native root click event; prefer a native control for keyboard interaction.' },
} satisfies NonNullable<Meta<AvatarStoryArgs>['argTypes']>
