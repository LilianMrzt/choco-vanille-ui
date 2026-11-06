import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

const root = style({
    backgroundColor: vars.color.surface.main,
    color: vars.color.surface.foreground,
    borderRadius: vars.radius[8],
    border: `1px solid ${vars.color.border.muted}`,
    boxShadow: vars.shadow.none,
    overflow: 'hidden',
})

/** Customizable styles for the card surface. */
export const CARD_STYLES = {
    root,
}
