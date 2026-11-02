import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Horizontal divider between autocomplete groups.
 */
export const AUTOCOMPLETE_SEPARATOR_STYLES = {
    root: style({
        height: '1px',
        marginBlock: vars.space.xs2,
        marginInline: `calc(${vars.space.sm} * -1)`,
        backgroundColor: vars.color.border,
    }),
}
