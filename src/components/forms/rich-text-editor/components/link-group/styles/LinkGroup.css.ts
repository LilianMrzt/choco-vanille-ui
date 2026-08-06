import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const LINK_GROUP_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.xs,
        paddingInline: vars.space.xs,
    }),
}
