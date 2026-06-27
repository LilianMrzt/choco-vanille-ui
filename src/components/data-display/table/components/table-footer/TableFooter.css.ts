import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const tableFooterClass = style({
    borderTop: `1px solid ${vars.color.border}`,
    backgroundColor: vars.color.muted,
    fontWeight: vars.fontWeight.medium,
    color: vars.color.mutedForeground,
})

globalStyle(`${tableFooterClass} tr:last-child`, {
    borderBottom: 'none',
})
