import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const cardFooterClass = style({
    display: 'flex',
    alignItems: 'center',
    gap: vars.space.sm,
    padding: vars.space.lg,
    paddingTop: vars.space.none,
})
