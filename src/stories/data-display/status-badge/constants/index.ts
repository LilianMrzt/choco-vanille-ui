import { Avatar } from '@components/data-display/avatar'
import type { BadgeColor } from '@components/data-display/badge'
import {
    type StatusBadgePosition,
    type StatusBadgeProps,
    type StatusBadgeSize
} from '@components/data-display/status-badge'
import type { Meta } from '@storybook/react-vite'
import { createElement } from 'react'

export const COLORS: BadgeColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
    'purple',
    'pink',
    'orange',
    'teal',
    'cyan',
    'indigo',
]

export const POSITIONS: StatusBadgePosition[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
]

export const SIZES: StatusBadgeSize[] = ['sm', 'md', 'lg']

export const DEFAULT_ARGS = {
    color: 'primary',
    position: 'top-right',
    size: 'md',
    number: 3,
    label: 'Notifications',
    children: createElement(Avatar, { initials: 'JD' }),
} satisfies NonNullable<Meta<StatusBadgeProps>['args']>

export const ARG_TYPES = {
    children: { control: false, description: 'A single element beneath the indicator; composed in JSX rather than edited in Controls.' },
    color: { control: 'select', options: COLORS, description: 'Semantic indicator color.', table: { defaultValue: { summary: 'primary' } } },
    position: { control: 'select', options: POSITIONS, description: 'Indicator corner.', table: { defaultValue: { summary: 'top-right' } } },
    size: { control: 'select', options: SIZES, description: 'Indicator size preset.', table: { defaultValue: { summary: 'md' } } },
    number: { control: 'number', description: 'Optional numeric content; zero is displayed and long values grow horizontally.' },
    label: { control: 'text', description: 'Accessible status name. Omitted numbered indicators use their numeric value; unnamed dots are decorative.' },
    display: { control: 'select', options: ['inline-block', 'block', 'inline-flex'], description: 'Inherited wrapper display.', table: { defaultValue: { summary: 'inline-block' } } },
    className: { control: false, description: 'Consumer class applied to the outer span.' },
    style: { control: 'object', description: 'CSS overrides for the wrapper; takes precedence over its layout props.' },
    ref: { control: false, description: 'Ref to the outer span; not editable in Controls.' },
} satisfies NonNullable<Meta<StatusBadgeProps>['argTypes']>
