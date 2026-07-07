import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const TOAST_DESCRIPTION_STYLES = {
    description: style({
        gridArea: 'description',
        marginTop: vars.space.xs,
    }),
}
