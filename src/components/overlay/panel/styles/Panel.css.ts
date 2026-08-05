import { style } from '@vanilla-extract/css'

import { OVERLAY_BACKDROP_STYLES } from '@components/overlay/_shared/styles/OverlayBackdrop.css.ts'
import { vars } from '@theme/contract.css.ts'

const content = style({
    position: 'fixed',
    top: vars.space.md,
    bottom: vars.space.md,
    zIndex: vars.zIndex.modal,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    border: 'none',
    borderRadius: vars.radius.lg,
    backgroundColor: vars.color.background,
    color: vars.color.foreground,
    transition: `transform ${vars.duration.normal} ${vars.easing.standard}`,
    willChange: 'transform',
    selectors: {
        '&[data-open]': {
            transform: 'translateX(0)',
        },
        '&[data-ending-style], &[data-closed]': {
            transform: 'translateX(var(--panel-closed-offset))',
        },
        '&[data-starting-style]': {
            transform: 'translateX(var(--panel-closed-offset))',
        },
    },
})

const left = style({
    left: vars.space.md,
    vars: {
        '--panel-closed-offset': '-100%',
    },
})

const right = style({
    right: vars.space.md,
    vars: {
        '--panel-closed-offset': '100%',
    },
})

export const PANEL_STYLES = {
    backdrop: OVERLAY_BACKDROP_STYLES.root,
    content,
    left,
    right,
}
