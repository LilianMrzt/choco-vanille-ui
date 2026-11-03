import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const EMPTY_STATE_STYLES = {
    root: style({
        alignItems: 'center',
        justifyContent: 'center',
        padding: vars.space[48],
        textAlign: 'center',
    }),
    content: style({
        maxWidth: '32rem',
    }),
    action: style({
        marginTop: vars.space[12],
    }),
}
