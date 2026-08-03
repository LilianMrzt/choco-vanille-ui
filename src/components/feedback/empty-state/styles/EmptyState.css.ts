import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const EMPTY_STATE_STYLES = {
    root: style({
        alignItems: 'center',
        justifyContent: 'center',
        padding: vars.space['3xl'],
        textAlign: 'center',
    }),
    content: style({
        maxWidth: '32rem',
    }),
    action: style({
        marginTop: vars.space.md,
    }),
}
