import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'
import { fadeIn, fadeOut } from '@constants/animations/index.ts'

export const DIALOG_STYLES = {
    overlay: style({
        position: 'fixed',
        inset: 0,
        zIndex: vars.zIndex.overlay,
        backgroundColor: vars.color.overlay,
        selectors: {
            '&[data-state="open"]': {
                animation: `${fadeIn} ${vars.duration.normal} ${vars.easing.out} both`,
            },
            '&[data-state="closed"]': {
                animation: `${fadeOut} ${vars.duration.fast} ${vars.easing.in} both`,
            },
        },
    }),
    content: style({
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
        borderRadius: vars.radius.lg,
        border: `1px solid ${vars.color.border}`,
        backgroundColor: vars.color.background,
        color: vars.color.foreground,
        boxShadow: vars.shadow['2xl'],
        transform: 'translate(-50%, -50%)',
        selectors: {
            '&[data-state="open"]': {
                display: 'flex',
                animation: `${fadeIn} ${vars.duration.normal} ${vars.easing.out} both`,
            },
            '&[data-state="closed"]': {
                animation: `${fadeOut} ${vars.duration.fast} ${vars.easing.in} both`,
            },
        },
    }),
    contentSize: {
        sm: style({ maxWidth: '24rem' }),
        md: style({ maxWidth: '32rem' }),
        lg: style({ maxWidth: '40rem' }),
        xl: style({ maxWidth: '48rem' }),
        '2xl': style({ maxWidth: '56rem' }),
        full: style({ maxWidth: 'calc(100% - 2rem)' }),
    },
}
