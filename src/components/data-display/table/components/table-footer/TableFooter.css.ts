import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const root = style({
    borderTop: `1px solid ${vars.color.border.muted}`,
    backgroundColor: vars.color.surface.muted,
    fontWeight: vars.fontWeight.medium,
    color: vars.color.surface.mutedForeground,
})

globalStyle(`${root} tr:last-child`, {
    borderBottom: 'none',
})

/** Footer customization class for muted summaries and a top divider. */
export const TABLE_FOOTER_STYLES = {
    root,
}
