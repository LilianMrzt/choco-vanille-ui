import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const root = style({
    borderBottom: `1px solid ${vars.color.border.main}`,
})

/** Header-section customization class for its bottom divider. */
export const TABLE_HEADER_STYLES = {
    root,
}
