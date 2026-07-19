import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const panel = style({
    position: 'relative',
    flexShrink: 0,
    transition: `width ${vars.duration.normal} ${vars.easing.standard}, opacity ${vars.duration.normal} ${vars.easing.standard}`,
})

const closed = style({
    opacity: 0,
    overflow: 'hidden',
    borderWidth: 0,
})

export const DRAWER_INLINE_STYLES = {
    panel,
    closed,
}
