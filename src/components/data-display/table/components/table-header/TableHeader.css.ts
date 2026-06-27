import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const tableHeaderClass = style({
    borderBottom: `1px solid ${vars.color.border}`,
})
