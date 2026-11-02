import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

export const CALENDAR_YEAR_VIEW_STYLES = {
    item: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '2.5rem',
        borderRadius: vars.radius.xs,
        border: 'none',
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        fontSize: vars.fontSize.sm,
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
                backgroundColor: vars.color.muted,
            },
            '&:active:not(:disabled)': {
                backgroundColor: vars.color.tertiary,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&:disabled': {
                opacity: 0.4,
                cursor: 'not-allowed',
                pointerEvents: 'none',
            },
        },
    }),

    itemToday: style({
        backgroundColor: vars.color.primarySubtle,
        color: vars.color.primarySubtleForeground,
        fontWeight: vars.fontWeight.semibold,
        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: vars.color.primarySubtleHover,
            },
            '&:active:not(:disabled)': {
                backgroundColor: vars.color.primarySubtleActive,
            },
        },
    }),

    itemSelected: style({
        backgroundColor: vars.color.primary,
        color: vars.color.primaryForeground,
        fontWeight: vars.fontWeight.semibold,
        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: vars.color.primaryHover,
            },
            '&:active:not(:disabled)': {
                backgroundColor: vars.color.primaryActive,
            },
        },
    }),
}
