import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const COLLAPSIBLE_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        color: vars.color.foreground,
    }),
}
