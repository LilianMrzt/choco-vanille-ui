import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const icon = style({
    flexShrink: 0,
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    color: 'currentcolor',
})

const endIcon = style({
    flexShrink: 0,
    width: vars.fontSize.base,
    height: vars.fontSize.base,
    color: 'currentcolor',
    transition: `opacity ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-state="closed"]': {
            opacity: 0,
        },
    },
})

export const DRAWER_ITEM_CONTENT_STYLES = {
    icon,
    endIcon,
}
