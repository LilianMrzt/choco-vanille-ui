import type { Meta } from '@storybook/react-vite'

import { Box } from '@components/layout/box'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { md } from '@stories/_shared/utils/markdown'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`as\` | No | HTML element | Prefer semantic elements for structural content. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Name landmark elements when needed. |
`
export const DEFAULT_ARGS = {
    children: 'Box content',
    as: 'div',
    padding: 16,
    backgroundColor: vars.color.surface.muted,
    borderRadius: 8,
} satisfies NonNullable<Meta<typeof Box>['args']>
export { BOX_VARIANTS, DISPLAY, TEXT_ALIGN, SPACING, ROUNDED, WH, MIN_MAX, BORDER_WIDTH, BORDER_STYLE, BOX_SHADOW, FLEX, ALIGN_SELF, OVERFLOW, POSITION } from '@stories/_shared/layout-controls/constants'
export const ARG_TYPES = LAYOUT_ARG_TYPES satisfies NonNullable<Meta<typeof Box>['argTypes']>
