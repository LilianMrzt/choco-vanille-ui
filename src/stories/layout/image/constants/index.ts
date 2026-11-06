import type { Meta } from '@storybook/react-vite'

import { Image } from '@components/layout/image'
import { md } from '@stories/_shared/utils/markdown'
import { EXAMPLE_IMAGE } from '@stories/_shared/example-image/constants'

export const OBJECT_FIT = [
    undefined,
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
] as const

export const OBJECT_POSITION = [
    undefined,
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
] as const

export const ROUNDED = [undefined, 0, 4, 6, 8, 10, 14, 20, 'full'] as const

export const SPACING = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128] as const

export const WH = [undefined, '100%', '50%', '200px', 'auto'] as const

export const MIN_MAX = [undefined, 'none', '100%', '200px'] as const

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`alt\` | Conditional | \`string\` | Use an empty string for decorative images. |
| \`loading\` | No | \`'eager' \| 'lazy'\` | Use \`lazy\` below the fold. |
`

export const ARG_TYPES = {
    src: { control: 'text', description: 'Image URL.' },
    alt: { control: 'text', description: 'Alternative text; use an empty string for decoration.' },
    loading: { control: 'select', options: [undefined, 'eager', 'lazy'], description: 'Native image loading behavior.' },
    objectFit: { control: 'select', options: OBJECT_FIT },
    objectPosition: { control: 'select', options: OBJECT_POSITION },
    borderRadius: { control: 'select', options: ROUNDED },
    padding: { control: 'select', options: SPACING },
    margin: { control: 'select', options: [...SPACING, 'auto'] },
    backgroundColor: { control: 'text', description: 'CSS color or custom-property reference; style wins.' },
    width: { control: 'select', options: WH },
    height: { control: 'select', options: WH },
    minWidth: { control: 'select', options: MIN_MAX },
    maxWidth: { control: 'select', options: MIN_MAX },
    minHeight: { control: 'select', options: MIN_MAX },
    maxHeight: { control: 'select', options: MIN_MAX },
    aspectRatio: { control: 'text' },
    className: { control: 'text', description: 'Additional image class.' },
    style: { control: 'object', description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref forwarded to the image element.' },
} satisfies NonNullable<Meta<typeof Image>['argTypes']>

export const DEFAULT_ARGS = {
    src: EXAMPLE_IMAGE,
    alt: 'An abstract circle illustration',
    objectFit: 'cover',
    borderRadius: 8,
    width: '100%',
    aspectRatio: '4 / 3',
} satisfies NonNullable<Meta<typeof Image>['args']>
