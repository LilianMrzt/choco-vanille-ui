import { style } from '@vanilla-extract/css'
import { vars } from '@theme'

export const textFieldLabelClass = style({
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.sm,
    fontWeight: vars.fontWeight.medium,
    lineHeight: vars.lineHeight.normal,
    color: vars.color.foreground,
    userSelect: 'none',
    selectors: {
        '&[data-disabled]': {
            cursor: 'not-allowed',
            opacity: 0.45,
        },
    },
})
