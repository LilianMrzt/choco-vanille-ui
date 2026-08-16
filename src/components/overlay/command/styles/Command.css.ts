import { style } from '@vanilla-extract/css'

import { fadeIn, fadeOut } from '@constants/animations'
import { vars } from '@theme/contract.css.ts'
import { OVERLAY_BACKDROP_STYLES } from '@components/overlay/_shared/styles/OverlayBackdrop.css.ts'

/**
 * Shared visual slots for the Command compound component.
 *
 * The `overlay` token re-exports the shared backdrop class so consumers have a
 * stable extension point (consistent with `DIALOG_STYLES`).
 */
export const COMMAND_STYLES = {
    /** Backdrop scrim — re-exports the shared overlay class. */
    overlay: OVERLAY_BACKDROP_STYLES.root,

    /** The floating command panel. */
    content: style({
        position: 'fixed',
        left: '50%',
        top: '30%',
        zIndex: vars.zIndex.modal,
        display: 'none',
        flexDirection: 'column',
        width: 'calc(100% - 2rem)',
        maxWidth: '36rem',
        maxHeight: '28rem',
        overflow: 'hidden',
        borderRadius: vars.radius.md,
        border: `1px solid ${vars.color.border}`,
        backgroundColor: vars.color.background,
        color: vars.color.foreground,
        boxShadow: vars.shadow.lg,
        transform: 'translate(-50%, -30%)',

        selectors: {
            '&[data-open]': {
                display: 'flex',
                animation: `${fadeIn} ${vars.duration.normal} ${vars.easing.out} both`,
            },
            '&[data-closed]': {
                animation: `${fadeOut} ${vars.duration.fast} ${vars.easing.in} both`,
            },
        },
    }),

    /** Per-size `max-width` overrides for `Command.Content`. */
    contentSize: {
        sm: style({ maxWidth: '24rem' }),
        md: style({ maxWidth: '36rem' }),
        lg: style({ maxWidth: '48rem' }),
    },
}
