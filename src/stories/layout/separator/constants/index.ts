import type { Meta } from '@storybook/react-vite'

import { Separator } from '@components/layout/separator'
import { THEME_COLORS } from '@stories/_shared/constants/themeColors.const.ts'
import { md } from '@stories/_shared/utils/markdown'

export const ORIENTATION = ['horizontal', 'vertical'] as const

export const COLORS = [
    'transparent',
    'primary.main',
    'secondary.main',
    'neutral.main',
    'danger.main',
    'success.main',
    'warning.main',
    'info.main',
] as const

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-hidden\` | No | \`boolean\` | Hide decorative separators from assistive technologies. |
| \`orientation\` | No | \`'horizontal' \| 'vertical'\` | Controls visual and ARIA orientation. |
| \`label\` | No | \`string\` | Displays text between two separator lines. |
| \`textColor\` | No | \`ThemeColor\` | Color leaf path for the label; defaults to \`text.tertiary\`. |
`

export const ARG_TYPES = {
    orientation: { control: 'select', options: ORIENTATION, table: { defaultValue: { summary: 'horizontal' } } },
    color: { control: 'select', options: THEME_COLORS },
    textColor: { control: 'select', options: THEME_COLORS },
    label: { control: 'text' },
    className: { control: 'text', description: 'Additional separator class.' },
    style: { control: 'object', description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref forwarded to the separator container.' },
} satisfies NonNullable<Meta<typeof Separator>['argTypes']>

export const DEFAULT_ARGS = {
    orientation: 'horizontal',
} satisfies NonNullable<Meta<typeof Separator>['args']>
