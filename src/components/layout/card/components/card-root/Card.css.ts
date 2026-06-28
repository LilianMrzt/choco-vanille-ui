import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const cardClass = style({
    backgroundColor: vars.color.card,
    color: vars.color.cardForeground,
    borderRadius: vars.radius.lg,
    border: `1px solid ${vars.color.border}`,
    boxShadow: vars.shadow.sm,
    overflow: 'hidden',
})
