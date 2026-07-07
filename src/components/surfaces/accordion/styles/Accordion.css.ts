import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const ACCORDION_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 0,
        width: '100%',
        color: vars.color.foreground,
    }),
}
