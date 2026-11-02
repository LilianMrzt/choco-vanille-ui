import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const STEP_INDICATOR_STYLES = {
    root: style({
        width: '100%',
    }),
    list: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: vars.space.xs,
        padding: 0,
        margin: 0,
        listStyle: 'none',
    }),
}
