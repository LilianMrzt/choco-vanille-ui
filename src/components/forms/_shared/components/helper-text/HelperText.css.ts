import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const base = {
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.xs,
    lineHeight: vars.lineHeight.normal,
}

export const helperTextClass = style({
    ...base,
    color: vars.color.mutedForeground,
})

export const helperTextErrorClass = style({
    ...base,
    color: vars.color.destructive,
})
