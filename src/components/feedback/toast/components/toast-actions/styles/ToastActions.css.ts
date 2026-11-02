import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TOAST_ACTIONS_STYLES = {
    actions: style({
        gridArea: 'actions',
        marginTop: vars.space.xs,
    }),
}
