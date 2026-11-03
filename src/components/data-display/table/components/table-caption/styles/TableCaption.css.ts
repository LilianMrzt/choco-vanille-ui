import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TABLE_CAPTION_STYLES = {
    root: style({
        marginTop: vars.space.sm,
        fontSize: vars.fontSize.sm,
        color: vars.color.surface.mutedForeground,
        textAlign: 'center',
    }),
}
