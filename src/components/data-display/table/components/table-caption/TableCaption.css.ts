import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const tableCaptionClass = style({
    marginTop: vars.space.sm,
    fontSize: vars.fontSize.sm,
    color: vars.color.mutedForeground,
    textAlign: 'center',
})
