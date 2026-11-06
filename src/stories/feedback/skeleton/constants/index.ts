import type { Meta } from '@storybook/react-vite'

import type { SkeletonProps, SkeletonVariant } from '@components/feedback/skeleton'

export const VARIANTS: SkeletonVariant[] = ['circular', 'rectangular', 'rounded']

export const DEFAULT_ARGS = {
    variant: 'rounded',
    width: '12rem',
    height: '2.5rem',
} satisfies NonNullable<Meta<SkeletonProps>['args']>

export const ARG_TYPES = {
    variant: { control: 'select', options: VARIANTS, description: 'Placeholder shape.', table: { defaultValue: { summary: 'rounded' } } },
    width: { control: 'text', description: 'CSS width.' },
    height: { control: 'text', description: 'CSS height.' },
    className: { control: 'text', description: 'Additional root class.' },
    style: { control: false, description: 'Inline style overrides, including dimensions.' },
    ref: { control: false, description: 'Ref to the root div.' },
    'aria-hidden': { control: false, description: 'Hidden from assistive technology by default.' },
} satisfies NonNullable<Meta<SkeletonProps>['argTypes']>
