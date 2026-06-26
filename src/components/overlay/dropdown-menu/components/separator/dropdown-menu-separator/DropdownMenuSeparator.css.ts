import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Thin horizontal rule between groups of items.
 * Extends marginInline to reach the panel edges.
 */
export const dropdownMenuSeparatorClass = style({
    marginBlock: vars.space.xs,
    marginInline: `calc(${vars.space.xs} * -1)`,
    height: '1px',
    backgroundColor: vars.color.border,
    opacity: 0.7,
})
