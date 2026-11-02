import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Thin horizontal rule between groups of items.
 * Matches DropdownMenuSeparator styling.
 */
export const SELECT_SEPARATOR_STYLES = {
    root: style({
        marginBlock: vars.space.xs,
        marginInline: `calc(${vars.space.xs} * -1)`,
        height: '1px',
        backgroundColor: vars.color.border,
        opacity: 0.7,
    }),
}
