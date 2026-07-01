import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const TABLE_BODY_STYLES = {
    root: style({}),
    striped: style({}),
}

globalStyle(`${TABLE_BODY_STYLES.root} tr:last-child`, {
    borderBottom: 'none',
})

globalStyle(`${TABLE_BODY_STYLES.striped} tr:nth-child(even)`, {
    backgroundColor: vars.color.muted,
})
