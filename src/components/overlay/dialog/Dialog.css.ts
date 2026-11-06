import { style } from '@vanilla-extract/css'

import { fadeIn, fadeOut } from '@constants/animations'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { OVERLAY_BACKDROP_STYLES } from '@components/overlay/_shared/styles/OverlayBackdrop.css.ts'

const content = style({
    position: 'fixed',
    left: '50%',
    top: '50%',
    zIndex: vars.zIndex.modal,
    display: 'none',
    flexDirection: 'column',
    width: 'calc(100% - 2rem)',
    maxWidth: '32rem',
    maxHeight: 'calc(100% - 2rem)',
    overflow: 'hidden',
    borderRadius: vars.radius[8],
    border: `1px solid ${vars.color.border.muted}`,
    backgroundColor: vars.color.background,
    color: vars.color.text.primary,
    transform: 'translate(-50%, -50%)',
    selectors: {
        '&[data-open]': {
            display: 'flex',
            animation: `${fadeIn} ${vars.duration.normal} ${vars.easing.out} both`,
        },
        '&[data-closed]': {
            animation: `${fadeOut} ${vars.duration.fast} ${vars.easing.in} both`,
        },
    },
    '@media': {
        '(prefers-reduced-motion: reduce)': {
            selectors: {
                '&[data-open]': {
                    animation: 'none',
                },
                '&[data-closed]': {
                    animation: 'none',
                },
            },
        },
    },
})

const contentSize = {
    sm: style({
        maxWidth: '24rem',
    }),
    md: style({
        maxWidth: '32rem',
    }),
    lg: style({
        maxWidth: '40rem',
    }),
    xl: style({
        maxWidth: '48rem',
    }),
    '2xl': style({
        maxWidth: '56rem',
    }),
    full: style({
        maxWidth: 'calc(100% - 2rem)',
    }),
}

export const DIALOG_STYLES = {
    overlay: OVERLAY_BACKDROP_STYLES.root,
    content,
    contentSize,
}
