import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const base = {
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize.sm,
    lineHeight: vars.lineHeight.normal,
}

export const HELPER_TEXT_STYLES = {
    root: style({
        ...base,
        color: vars.color.mutedForeground,
    }),
    error: style({
        ...base,
        color: vars.color.destructive,
    }),
}
