import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Non-interactive section heading — small, muted, uppercase.
 * Matches DropdownMenuLabel styling.
 */
export const SELECT_LABEL_STYLES = {
    root: style({
        paddingBlock: vars.space.xs2,
        paddingInline: vars.space.sm,
        fontSize: vars.fontSize.xs,
        fontWeight: vars.fontWeight.semibold,
        fontFamily: vars.fontFamily.sans,
        color: vars.color.mutedForeground,
        letterSpacing: vars.letterSpacing.wider,
        textTransform: 'uppercase',
    }),
}
