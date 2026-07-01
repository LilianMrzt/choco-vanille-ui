import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const TABLE_FOOTER_STYLES = {
    root: style({
        borderTop: `1px solid ${vars.color.border}`,
        backgroundColor: vars.color.muted,
        fontWeight: vars.fontWeight.medium,
        color: vars.color.mutedForeground,
    }),
}

globalStyle(`${TABLE_FOOTER_STYLES.root} tr:last-child`, {
    borderBottom: 'none',
})
