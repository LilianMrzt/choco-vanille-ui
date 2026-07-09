import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

const panelBase = style({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: vars.color.background,
    color: vars.color.foreground,
})

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

const portalBase = style({
    position: 'fixed',
    top: 0,
    bottom: 0,
    zIndex: vars.zIndex.modal,
    boxShadow: vars.shadow.xl,
    transition: `transform ${vars.duration.normal} ${vars.easing.standard}`,
    willChange: 'transform',
})

const portalLeft = style({
    left: 0,
    borderRight: `1px solid ${vars.color.border}`,
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

const portalRight = style({
    right: 0,
    borderLeft: `1px solid ${vars.color.border}`,
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

const inline = style({
    position: 'relative',
    flexShrink: 0,
    transition: `width ${vars.duration.normal} ${vars.easing.standard}, opacity ${vars.duration.normal} ${vars.easing.standard}`,
})

const inlineLeft = style({
    borderRight: `1px solid ${vars.color.border}`,
})

const inlineRight = style({
    borderLeft: `1px solid ${vars.color.border}`,
})

const mini = style({
    position: 'relative',
    flexShrink: 0,
    transition: `width ${vars.duration.normal} ${vars.easing.standard}`,
})

const miniLeft = style({
    borderRight: `1px solid ${vars.color.border}`,
})

const miniRight = style({
    borderLeft: `1px solid ${vars.color.border}`,
})

const inlineClosed = style({
    opacity: 0,
    overflow: 'hidden',
    borderWidth: 0,
})

const miniClosed = style({
    overflow: 'hidden',
})

const size = {
    sm: style({ maxWidth: '16rem' }),
    md: style({ maxWidth: '20rem' }),
    lg: style({ maxWidth: '24rem' }),
    xl: style({ maxWidth: '28rem' }),
    '2xl': style({ maxWidth: '32rem' }),
    full: style({ maxWidth: '100%' }),
}

export const DRAWER_STYLES = {
    backdrop,
    panel: panelBase,
    portal: portalBase,
    portalLeft,
    portalRight,
    inline,
    inlineLeft,
    inlineRight,
    mini,
    miniLeft,
    miniRight,
    inlineClosed,
    miniClosed,
    size,
}
