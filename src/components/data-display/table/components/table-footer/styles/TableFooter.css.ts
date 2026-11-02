import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TABLE_FOOTER_STYLES = {
    root: style({
        borderTop: `1px solid ${vars.color.border}`,
        backgroundColor: vars.color.surfaceMuted,
        fontWeight: vars.fontWeight.medium,
        color: vars.color.surfaceMutedForeground,
    }),
}

globalStyle(`${TABLE_FOOTER_STYLES.root} tr:last-child`, {
    borderBottom: 'none',
})
