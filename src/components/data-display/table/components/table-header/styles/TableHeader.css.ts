import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const TABLE_HEADER_STYLES = {
    root: style({
        borderBottom: `1px solid ${vars.color.border.main}`,
    }),
}
