import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const CARD_STYLES = {
    root: style({
        backgroundColor: vars.color.card,
        color: vars.color.cardForeground,
        borderRadius: vars.radius.md,
        border: `1px solid ${vars.color.border}`,
        boxShadow: vars.shadow.none,
        overflow: 'hidden',
    }),
}
