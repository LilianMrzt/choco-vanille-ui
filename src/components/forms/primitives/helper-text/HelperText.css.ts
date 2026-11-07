import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const base = {
    fontFamily: vars.fontFamily.sans,
    fontSize: vars.fontSize[14],
    lineHeight: '1.5',
}

export const HELPER_TEXT_STYLES = {
    root: style({
        ...base,
        color: vars.color.surface.mutedForeground,
    }),
    error: style({
        ...base,
        color: vars.color.danger.main,
    }),
}
