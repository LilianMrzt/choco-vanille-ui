import type { Meta } from '@storybook/react-vite'

import {
    Inset,
    type InsetSpace,
} from '@components/layout/inset'
import { md } from '@stories/_shared/utils/markdown'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'

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
    color: LAYOUT_ARG_TYPES.color,
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
} satisfies NonNullable<Meta<typeof Inset>['argTypes']>

export const DEFAULT_ARGS = {
    space: 16,
    side: 'top',
    clip: 'padding-box',
    paddingBottom: 'current',
} satisfies NonNullable<Meta<typeof Inset>['args']>
