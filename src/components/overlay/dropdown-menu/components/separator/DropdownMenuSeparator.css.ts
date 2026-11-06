import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Thin horizontal rule between groups of items.
 * Extends marginInline to reach the panel edges.
 */
export const DROPDOWN_MENU_SEPARATOR_STYLES = {
    root: style({
        marginBlock: vars.space[4],
        marginInline: `calc(${vars.space[4]} * -1)`,
        height: '1px',
        backgroundColor: vars.color.border.main,
        opacity: 0.7,
    }),
}
