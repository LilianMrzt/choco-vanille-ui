import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const BOTTOM_SHEET_SEPARATOR_STYLES = {
    root: style({
        flexShrink: 0,
        height: '1px',
        marginBlock: vars.space[4],
        marginInline: vars.space[12],
        backgroundColor: vars.color.border.muted,
        opacity: 0.7,
    }),
}
