import { type AvatarGroupProps } from '@components/data-display/avatar-group'
import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

export const SPACINGS = ['none', 'sm', 'md', 'lg', 'xl'] as const

export const PEOPLE = [
    { initials: 'AB', label: 'Alex Brown' },
    { initials: 'CD', label: 'Chris Diaz' },
    { initials: 'EF', label: 'Emery Fox' },
    { initials: 'GH', label: 'Gale Hill' },
    { initials: 'IJ', label: 'Indigo Jones' },
] as const

export const DEFAULT_ARGS = {
    spacing: 'md',
    role: 'group',
    'aria-label': 'Project participants',
    onClick: fn(),
} satisfies NonNullable<Meta<AvatarGroupProps>['args']>

export const ARG_TYPES = {
    children: { control: false, description: 'Composition content; this example uses five named avatars.' },
    max: { control: { type: 'number', min: 0, step: 1 }, description: 'Maximum visible children, excluding the extra overflow indicator. Finite values are floored and clamped to zero; omitted values show all. NaN and either infinity throw RangeError.' },
    spacing: { control: 'select', options: SPACINGS, description: 'Negative overlap preset.', table: { defaultValue: { summary: 'md' } } },
    overflowLabel: { control: false, description: 'Receives hidden count and returns the overflow accessible name. Function values cannot be edited; see LocalizedOverflow.', table: { defaultValue: { summary: '(count) => `${count} more`' } } },
    className: { control: 'text', description: 'Additional group classes.' },
    style: { control: 'object', description: 'Consumer group CSS overrides.' },
    role: { control: 'select', options: [undefined, 'group'], description: 'Optional group semantic; provide an accessible name.' },
    'aria-label': { control: 'text', description: 'Optional accessible group name.' },
    ref: { control: false, description: 'Ref to the rendered element (div by default); not editable in Controls.' },
    as: { control: false, description: 'Native element or ref-forwarding custom component; not edited in this layout example.' },
    onClick: { control: false, description: 'Native group click event, observable in Actions.' },
} satisfies NonNullable<Meta<AvatarGroupProps>['argTypes']>
