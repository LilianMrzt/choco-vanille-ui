import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { FabColor, FabPosition, FabProps, FabSize } from '@components/actions/fab'

export const COLORS: FabColor[] = [
    'primary', 'secondary', 'neutral', 'danger', 'success', 'warning', 'info',
]
export const SIZES: FabSize[] = ['sm', 'md', 'lg']
export const POSITIONS: FabPosition[] = ['bottom-end', 'bottom-start', 'bottom-center']

export const DEFAULT_ARGS = {
    icon: SearchIcon,
    'aria-label': 'Search',
    onClick: fn(),
} satisfies NonNullable<Meta<FabProps>['args']>

export const ARG_TYPES = {
    icon: { control: false, description: 'Decorative local Iconify data; this example uses SearchIcon.' },
    label: { control: 'text', description: 'Visible text for an extended Fab; omit for an icon-only button.' },
    'aria-label': { control: 'text', description: 'Accessible name; required for an icon-only Fab.' },
    color: { control: 'select', options: COLORS, description: 'Semantic color intent.', table: { defaultValue: { summary: 'primary' } } },
    size: { control: 'select', options: SIZES, description: 'Size preset.', table: { defaultValue: { summary: 'md' } } },
    position: { control: 'select', options: POSITIONS, description: 'Viewport position.', table: { defaultValue: { summary: 'bottom-end' } } },
    disabled: { control: 'boolean', description: 'Disables the native button.' },
    onClick: { control: false, description: 'Native click handler, observable in Actions.' },
    className: { control: false, description: 'Additional class on the button.' },
    style: { control: false, description: 'Native inline styles applied to the button.' },
    ref: { control: false, description: 'Ref to the button element.' },
} satisfies NonNullable<Meta<FabProps>['argTypes']>
