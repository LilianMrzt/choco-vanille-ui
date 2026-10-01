import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const BOTTOM_SHEET_SEPARATOR_STYLES = {
    root: style({
        flexShrink: 0,
        height: '1px',
        marginBlock: vars.space.xs,
        marginInline: vars.space.md,
        backgroundColor: vars.color.border,
        opacity: 0.7,
    }),
}
