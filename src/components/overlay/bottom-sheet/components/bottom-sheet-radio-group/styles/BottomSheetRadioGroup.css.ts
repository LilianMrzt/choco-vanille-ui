import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const BOTTOM_SHEET_RADIO_GROUP_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space[2],
    }),
}
