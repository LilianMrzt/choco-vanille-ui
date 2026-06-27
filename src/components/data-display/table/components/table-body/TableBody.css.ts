import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const tableBodyClass = style({})

globalStyle(`${tableBodyClass} tr:last-child`, {
    borderBottom: 'none',
})

export const tableBodyStripedClass = style({})

globalStyle(`${tableBodyStripedClass} tr:nth-child(even)`, {
    backgroundColor: vars.color.muted,
})
