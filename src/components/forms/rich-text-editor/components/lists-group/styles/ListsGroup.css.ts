import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const LISTS_GROUP_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.xs,
    }),
}
