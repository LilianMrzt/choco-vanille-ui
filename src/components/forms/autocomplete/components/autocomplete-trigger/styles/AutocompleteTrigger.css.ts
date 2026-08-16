import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Chevron slot for the autocomplete trigger.
 *
 * Positioned inside the input group, to the right of the input. Unlike a
 * TextField end-action, this trigger is a separate button that opens the popup.
 */
export const AUTOCOMPLETE_TRIGGER_STYLES = {
    root: style({
        position: 'absolute',
        right: '0.125rem',
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        marginBlock: 'auto',
        padding: 0,
        background: 'transparent',
        border: 'none',
        borderRadius: vars.radius.xs,
        color: vars.color.mutedForeground,
        cursor: 'pointer',
        outline: 'none',
        transition: `color ${vars.duration.fast} ${vars.easing.standard}`,

        selectors: {
            '&:focus-visible': {
                outline: `2px solid ${vars.color.ring}`,
                outlineOffset: '-2px',
            },
            '&:disabled, &[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),
}
