import type { Meta } from '@storybook/react-vite'

import { Separator } from '@components/layout/separator'
import { THEME_COLORS } from '@stories/_shared/constants/themeColors.const.ts'
import { md } from '@stories/_shared/utils/markdown'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'

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
    as: LAYOUT_ARG_TYPES.as,
    display: LAYOUT_ARG_TYPES.display,
    width: LAYOUT_ARG_TYPES.width,
    minWidth: LAYOUT_ARG_TYPES.minWidth,
    maxWidth: LAYOUT_ARG_TYPES.maxWidth,
    height: LAYOUT_ARG_TYPES.height,
    minHeight: LAYOUT_ARG_TYPES.minHeight,
    maxHeight: LAYOUT_ARG_TYPES.maxHeight,
    overflow: LAYOUT_ARG_TYPES.overflow,
    overflowX: LAYOUT_ARG_TYPES.overflowX,
    overflowY: LAYOUT_ARG_TYPES.overflowY,
    position: LAYOUT_ARG_TYPES.position,
    flex: LAYOUT_ARG_TYPES.flex,
    flexDirection: LAYOUT_ARG_TYPES.flexDirection,
    flexWrap: LAYOUT_ARG_TYPES.flexWrap,
    alignSelf: LAYOUT_ARG_TYPES.alignSelf,
    alignItems: LAYOUT_ARG_TYPES.alignItems,
    alignContent: LAYOUT_ARG_TYPES.alignContent,
    justifyContent: LAYOUT_ARG_TYPES.justifyContent,
    textAlign: LAYOUT_ARG_TYPES.textAlign,
    borderWidth: LAYOUT_ARG_TYPES.borderWidth,
    borderTopWidth: LAYOUT_ARG_TYPES.borderTopWidth,
    borderRightWidth: LAYOUT_ARG_TYPES.borderRightWidth,
    borderBottomWidth: LAYOUT_ARG_TYPES.borderBottomWidth,
    borderLeftWidth: LAYOUT_ARG_TYPES.borderLeftWidth,
    borderStyle: LAYOUT_ARG_TYPES.borderStyle,
    borderRadius: LAYOUT_ARG_TYPES.borderRadius,
    padding: LAYOUT_ARG_TYPES.padding,
    paddingX: LAYOUT_ARG_TYPES.paddingX,
    paddingY: LAYOUT_ARG_TYPES.paddingY,
    paddingTop: LAYOUT_ARG_TYPES.paddingTop,
    paddingRight: LAYOUT_ARG_TYPES.paddingRight,
    paddingBottom: LAYOUT_ARG_TYPES.paddingBottom,
    paddingLeft: LAYOUT_ARG_TYPES.paddingLeft,
    margin: LAYOUT_ARG_TYPES.margin,
    marginX: LAYOUT_ARG_TYPES.marginX,
    marginY: LAYOUT_ARG_TYPES.marginY,
    marginTop: LAYOUT_ARG_TYPES.marginTop,
    marginRight: LAYOUT_ARG_TYPES.marginRight,
    marginBottom: LAYOUT_ARG_TYPES.marginBottom,
    marginLeft: LAYOUT_ARG_TYPES.marginLeft,
    gap: LAYOUT_ARG_TYPES.gap,
    columnGap: LAYOUT_ARG_TYPES.columnGap,
    rowGap: LAYOUT_ARG_TYPES.rowGap,
    borderColor: LAYOUT_ARG_TYPES.borderColor,
    backgroundColor: LAYOUT_ARG_TYPES.backgroundColor,
    boxShadow: LAYOUT_ARG_TYPES.boxShadow
} satisfies NonNullable<Meta<typeof Separator>['argTypes']>

export const DEFAULT_ARGS = {
    orientation: 'horizontal',
} satisfies NonNullable<Meta<typeof Separator>['args']>
