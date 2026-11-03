import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TABLE_CAPTION_STYLES = {
    root: style({
        marginTop: vars.space[8],
        fontSize: vars.fontSize[14],
        color: vars.color.surface.mutedForeground,
        textAlign: 'center',
    }),
}
