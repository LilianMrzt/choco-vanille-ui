import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const backdrop = style({
    position: 'fixed',
    inset: 0,
    zIndex: vars.zIndex.overlay,
    backgroundColor: vars.color.overlay,
    opacity: 0,
    transition: `opacity ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '&[data-open]': {
            opacity: 1,
        },
        '&[data-closed], &[data-ending-style]': {
            opacity: 0,
        },
        '&[data-starting-style]': {
            opacity: 0,
        },
    },
})

const panel = style({
    position: 'fixed',
    top: 0,
    bottom: 0,
    zIndex: vars.zIndex.modal,
    boxShadow: vars.shadow.xl,
    transition: `transform ${vars.duration.normal} ${vars.easing.standard}`,
    willChange: 'transform',
})

const left = style({
    left: 0,
    transform: 'translateX(-100%)',
    selectors: {
        '&[data-open]': {
            transform: 'translateX(0)',
        },
        '&[data-starting-style]': {
            transform: 'translateX(-100%)',
        },
    },
})

const right = style({
    right: 0,
    transform: 'translateX(100%)',
    selectors: {
        '&[data-open]': {
            transform: 'translateX(0)',
        },
        '&[data-starting-style]': {
            transform: 'translateX(100%)',
        },
    },
})

export const DRAWER_PORTAL_STYLES = {
    backdrop,
    panel,
    left,
    right,
}
