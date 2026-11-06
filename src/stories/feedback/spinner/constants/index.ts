import type { Meta } from '@storybook/react-vite'

import { SPINNER_COLORS_ARRAY, type SpinnerProps, type SpinnerSize } from '@components/feedback/spinner'

export const SIZES: SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export const DEFAULT_ARGS = {
    size: 'md',
    color: 'primary',
    'aria-label': 'Loading',
} satisfies NonNullable<Meta<SpinnerProps>['args']>

export const ARG_TYPES = {
    size: { control: 'select', options: SIZES, description: 'Size variant.', table: { defaultValue: { summary: 'md' } } },
    color: { control: 'select', options: SPINNER_COLORS_ARRAY, description: 'Semantic color intent.', table: { defaultValue: { summary: 'primary' } } },
    role: { control: 'text', description: 'Accessible role.', table: { defaultValue: { summary: 'status' } } },
    'aria-label': { control: 'text', description: 'Accessible name for the loading state.' },
    children: { control: false, description: 'Optional descriptive content.' },
    className: { control: 'text', description: 'Additional class for the span.' },
    style: { control: false, description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref to the span.' },
} satisfies NonNullable<Meta<SpinnerProps>['argTypes']>
