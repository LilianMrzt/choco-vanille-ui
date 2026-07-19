import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const panel = style({
    position: 'relative',
    flexShrink: 0,
    transition: `width ${vars.duration.normal} ${vars.easing.standard}, opacity ${vars.duration.normal} ${vars.easing.standard}`,
})

const closed = style({
    overflow: 'hidden',
})

export const DRAWER_MINI_STYLES = {
    panel,
    closed,
}
