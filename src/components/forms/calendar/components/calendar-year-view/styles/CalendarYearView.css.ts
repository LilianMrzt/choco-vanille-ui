import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const CALENDAR_YEAR_VIEW_STYLES = {
    item: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2.5rem',
        borderRadius: vars.radius[4],
        border: 'none',
        backgroundColor: 'transparent',
        color: vars.color.text.primary,
        fontSize: vars.fontSize[14],
        fontWeight: vars.fontWeight.medium,
        cursor: 'pointer',
        outline: 'none',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: vars.color.surface.muted,
            },
            '&:active:not(:disabled)': {
                backgroundColor: vars.color.neutral.main,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            '&:disabled': {
                opacity: 0.4,
                cursor: 'not-allowed',
            },
        },
    }),

    itemToday: style({
        backgroundColor: vars.color.primary.subtle,
        color: vars.color.primary.subtleForeground,
        fontWeight: vars.fontWeight.semibold,
        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: vars.color.primary.subtleHover,
            },
            '&:active:not(:disabled)': {
                backgroundColor: vars.color.primary.subtlePressed,
            },
        },
    }),

    itemSelected: style({
        backgroundColor: vars.color.primary.main,
        color: vars.color.primary.foreground,
        fontWeight: vars.fontWeight.semibold,
        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: vars.color.primary.hover,
            },
            '&:active:not(:disabled)': {
                backgroundColor: vars.color.primary.pressed,
            },
        },
    }),
}
