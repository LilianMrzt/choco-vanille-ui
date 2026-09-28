import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const BOTTOM_SHEET_RADIO_ITEM_STYLES = {
    root: style({
        selectors: {
            '&[data-checked]': {
                fontWeight: vars.fontWeight.medium,
            },
        },
    }),
    indicator: style({
        color: vars.color.primary,
    }),
}
