import type { Meta } from '@storybook/react-vite'

import {
    Inset,
    type InsetSpace,
} from '@components/layout/inset'
import { md } from '@stories/_shared/utils/markdown'

export const SPACES: InsetSpace[] = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128]

export const SIDES = [
    'all',
    'block',
    'inline',
    'top',
    'right',
    'bottom',
    'left',
] as const

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| Semantic children | No | React node | Use appropriate semantic elements inside the layout wrapper. |
`

export const ARG_TYPES = {
    space: { control: 'select', options: SPACES },
    side: { control: 'select', options: SIDES, table: { defaultValue: { summary: 'all' } } },
    clip: { control: 'select', options: ['border-box', 'padding-box'], table: { defaultValue: { summary: 'border-box' } } },
    padding: { control: 'select', options: ['current', ...SPACES] },
    paddingX: { control: 'select', options: ['current', ...SPACES] },
    paddingY: { control: 'select', options: ['current', ...SPACES] },
    paddingTop: { control: 'select', options: ['current', ...SPACES] },
    paddingRight: { control: 'select', options: ['current', ...SPACES] },
    paddingBottom: { control: 'select', options: ['current', ...SPACES] },
    paddingLeft: { control: 'select', options: ['current', ...SPACES] },
    children: { control: false, description: 'The example supplies image content.' },
    className: { control: 'text', description: 'Additional inset class.' },
    style: { control: 'object', description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref passed to the rendered element.' },
} satisfies NonNullable<Meta<typeof Inset>['argTypes']>

export const DEFAULT_ARGS = {
    space: 16,
    side: 'top',
    clip: 'padding-box',
    paddingBottom: 'current',
} satisfies NonNullable<Meta<typeof Inset>['args']>
