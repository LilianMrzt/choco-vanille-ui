import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Non-interactive section heading — small, muted, uppercase.
 * Typically paired with DropdownMenuGroup for semantic grouping.
 */
export const DROPDOWN_MENU_LABEL_STYLES = {
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
