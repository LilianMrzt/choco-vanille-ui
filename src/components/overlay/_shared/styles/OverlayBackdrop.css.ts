import { style } from '@vanilla-extract/css'

import { fadeIn, fadeOut } from '@constants/animations'
import { vars } from '@theme/contract.css.ts'

export const OVERLAY_BACKDROP_STYLES = {
    root: style({
        position: 'fixed',
        inset: 0,
        zIndex: vars.zIndex.overlay,
        padding: vars.space.md,
        backgroundColor: vars.color.overlay,
        selectors: {
            '&[data-open]': {
                animation: `${fadeIn} ${vars.duration.normal} ${vars.easing.out} both`,
            },
            '&[data-closed]': {
                animation: `${fadeOut} ${vars.duration.fast} ${vars.easing.in} both`,
            },
        },
    }),
}
