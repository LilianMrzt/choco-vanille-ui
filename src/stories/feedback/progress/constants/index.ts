import type { Meta } from '@storybook/react-vite'

import { PROGRESS_COLORS_ARRAY, type ProgressBaseProps, type ProgressBorderRadius, type ProgressSize } from '@components/feedback/progress'

export const SIZES: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
export const RADII: ProgressBorderRadius[] = [0, 4, 6, 8, 10, 14, 20, 'full']

export const DEFAULT_ARGS = {
    value: 50,
    label: 'Loading progress',
    color: 'primary',
    size: 'sm',
    borderRadius: 6,
    width: '100%',
} satisfies NonNullable<Meta<ProgressBaseProps>['args']>

export const ARG_TYPES = {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'select', options: PROGRESS_COLORS_ARRAY },
    size: { control: 'select', options: SIZES },
    borderRadius: { control: 'select', options: RADII },
    width: { control: 'text' },
    label: { control: 'text' },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    quantityLabel: { control: 'select', options: [undefined, true, '2/3'] },
    ref: { control: false },
    className: { control: false },
    style: { control: false },
} satisfies NonNullable<Meta<ProgressBaseProps>['argTypes']>
