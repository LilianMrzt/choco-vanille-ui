import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const ACCORDION_ITEM_STYLES = {
    root: style({
        borderBottom: `1px solid ${vars.color.border}`,
    }),
}
