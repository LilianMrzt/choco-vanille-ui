import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css'

const root = style({
    fontFamily: vars.fontFamily.sans,
    overflowWrap: 'anywhere',
})

const motion = style({
    transitionProperty: 'transform',
    transitionDuration: vars.duration.slow,
    transitionTimingFunction: vars.easing.standard,
    selectors: {
        '&:hover, &:focus-visible': {
            transform: 'translateX(1rem)',
        },
        '&:focus-visible': {
            outline: `2px solid ${vars.color.focusRing}`,
            outlineOffset: vars.space.xxs,
        },
    },
    '@media': {
        '(prefers-reduced-motion: reduce)': {
            transitionProperty: 'none',
            selectors: {
                '&:hover, &:focus-visible': {
                    transform: 'none',
                },
            },
        },
    },
})

export const TOKEN_PREVIEW_STYLES = {
    root,
    motion,
}
