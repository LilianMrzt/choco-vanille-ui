import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TOOLBAR_GROUP_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        gap: vars.space[4],
        paddingInline: vars.space[4],
    }),
}
