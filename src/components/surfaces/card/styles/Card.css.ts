import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const CARD_STYLES = {
    root: style({
        backgroundColor: vars.color.surface.main,
        color: vars.color.surface.foreground,
        borderRadius: vars.radius.md,
        border: `1px solid ${vars.color.border.main}`,
        boxShadow: vars.shadow.none,
        overflow: 'hidden',
    }),
}
