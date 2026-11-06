import type { Meta } from '@storybook/react-vite'

import { SvgImage } from '@components/layout/svg-image'
import ImageIcon from '@resources/asset/ImageIcon.svg?react'
import { THEME_COLORS } from '@stories/_shared/constants/themeColors.const.ts'
import { md } from '@stories/_shared/utils/markdown'

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

export const DIMENSIONS = [undefined, 'auto', '100%', '50%', '200px'] as const

export const COLORS = [
    'transparent',
    'primary.main',
    'secondary.main',
    'neutral.main',
    'danger.main',
    'success.main',
    'warning.main',
    'info.main',
    'accentPurple.main',
    'accentPink.main',
    'accentOrange.main',
    'accentTeal.main',
    'accentCyan.main',
    'accentIndigo.main',
] as const

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required    | Type      | Notes                                                                           |
| ---------------- | ----------- | --------- | ------------------------------------------------------------------------------- |
| \`alt\`            | Conditional | \`string\`  | Describes an informative SVG image; use an empty string for a decorative image. |
| \`aria-label\`     | Conditional | \`string\`  | Alternative accessible name when \`alt\` is not suitable.                         |
| \`aria-hidden\`    | Auto        | \`boolean\` | Applied when no accessible name is provided.                                    |
`

export const ARG_TYPES = {
    image: { control: false, description: 'Locally bundled SVG component.' },
    alt: { control: 'text' },
    'aria-label': { control: 'text' },
    color: { control: 'select', options: THEME_COLORS },
    objectFit: { control: 'select', options: OBJECT_FIT },
    objectPosition: { control: 'select', options: OBJECT_POSITION },
    borderRadius: { control: 'select', options: ROUNDED },
    padding: { control: 'select', options: SPACING },
    margin: { control: 'select', options: [...SPACING, 'auto'] },
    backgroundColor: { control: 'text', description: 'CSS color or custom-property reference; style wins.' },
    width: { control: 'select', options: DIMENSIONS },
    height: { control: 'select', options: DIMENSIONS },
    minWidth: { control: 'select', options: DIMENSIONS },
    maxWidth: { control: 'select', options: DIMENSIONS },
    minHeight: { control: 'select', options: DIMENSIONS },
    maxHeight: { control: 'select', options: DIMENSIONS },
    aspectRatio: { control: 'text' },
    className: { control: 'text', description: 'Additional SVG class.' },
    style: { control: 'object', description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref passed to the SVG component.' },
} satisfies NonNullable<Meta<typeof SvgImage>['argTypes']>

export const DEFAULT_ARGS = {
    image: ImageIcon,
    alt: 'Image illustration',
    color: 'primary.main',
    width: '200px',
    height: '200px',
    objectFit: 'contain',
} satisfies NonNullable<Meta<typeof SvgImage>['args']>
