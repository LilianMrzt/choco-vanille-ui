import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Non-interactive section heading — small, muted, uppercase.
 * Matches DropdownMenuLabel styling.
 */
export const SELECT_LABEL_STYLES = {
    root: style({
        paddingBlock: vars.space[6],
        paddingInline: vars.space[8],
        fontSize: vars.fontSize[12],
        fontWeight: vars.fontWeight.semibold,
        fontFamily: vars.fontFamily.sans,
        color: vars.color.surface.mutedForeground,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
    }),
}
