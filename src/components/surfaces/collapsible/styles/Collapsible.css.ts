import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const COLLAPSIBLE_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        color: vars.color.text.primary,
    }),
}
