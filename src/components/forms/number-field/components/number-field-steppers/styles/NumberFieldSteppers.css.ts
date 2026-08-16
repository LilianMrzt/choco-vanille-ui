import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const NUMBER_FIELD_STEPPERS_STYLES = {
    group: style({
        position: 'absolute',
        top: 1,
        right: 1,
        bottom: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: vars.radius.xs,
    }),
    button: style({
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        minHeight: 0,
        padding: 0,
        border: 0,
        borderLeft: `1px solid ${vars.color.border}`,
        backgroundColor: 'transparent',
        color: vars.color.mutedForeground,
        cursor: 'pointer',
        transition: `color ${vars.duration.fast} ${vars.easing.standard}, background-color ${vars.duration.fast} ${vars.easing.standard}`,
        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: vars.color.muted,
                color: vars.color.foreground,
            },
            '&:focus-visible': {
                outline: `2px solid ${vars.color.ring}`,
                outlineOffset: '-2px',
            },
            '&:disabled': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),
    icon: style({
        pointerEvents: 'none',
    }),
}
