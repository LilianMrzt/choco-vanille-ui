import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const CALLOUT_DESCRIPTION_STYLES = {
    description: style({
        color: vars.color.mutedForeground,
    }),
}
