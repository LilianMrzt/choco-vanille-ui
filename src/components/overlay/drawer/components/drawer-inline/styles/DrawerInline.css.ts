import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const panel = style({
    position: 'relative',
    flexShrink: 0,
    transition: `width ${vars.duration.normal} ${vars.easing.standard}, opacity ${vars.duration.normal} ${vars.easing.standard}`,
})

const left = style({
    borderRight: `1px solid ${vars.color.border}`,
})

const right = style({
    borderLeft: `1px solid ${vars.color.border}`,
})

const closed = style({
    opacity: 0,
    overflow: 'hidden',
    borderWidth: 0,
})

export const DRAWER_INLINE_STYLES = {
    panel,
    left,
    right,
    closed,
}
