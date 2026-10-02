import { style } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'

export const TIME_PICKER_PANEL_STYLES = {
    root: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.sm,
        padding: vars.space.md,
        backgroundColor: vars.color.card,
        borderRadius: vars.radius.lg,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.sm,
        color: vars.color.foreground,
    }),

    body: style({
        display: 'flex',
        gap: vars.space.md,
    }),

    group: style({
        display: 'flex',
        flexDirection: 'column',
        gap: vars.space.xs,
    }),

    title: style({
        margin: 0,
        textAlign: 'center',
        fontSize: vars.fontSize.xs,
        fontWeight: vars.fontWeight.medium,
        color: vars.color.mutedForeground,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
    }),

    column: style({
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        width: '3.25rem',
        maxHeight: '11.5rem',
        margin: 0,
        padding: '2px',
        overflowY: 'auto',
        listStyle: 'none',
        scrollbarWidth: 'none',
        overscrollBehavior: 'contain',
        maskImage: 'linear-gradient(to bottom, #000 calc(100% - 0.5rem), transparent)',
        selectors: {
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
    }),

    item: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: '100%',
        height: '2.25rem',
        padding: 0,
        border: 'none',
        borderRadius: vars.radius.xs,
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        fontFamily: 'inherit',
        fontSize: vars.fontSize.sm,
        fontVariantNumeric: 'tabular-nums',
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
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[data-reference="true"]': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            '&[aria-pressed="true"]': {
                backgroundColor: vars.color.primary,
                color: vars.color.primaryForeground,
                fontWeight: vars.fontWeight.semibold,
            },
            '&[aria-pressed="true"]:hover:not(:disabled)': {
                backgroundColor: vars.color.primaryHover,
            },
            '&[aria-pressed="true"]:active:not(:disabled)': {
                backgroundColor: vars.color.primaryActive,
            },
            '&:disabled': {
                opacity: 0.4,
                cursor: 'not-allowed',
            },
        },
    }),

    footer: style({
        display: 'flex',
        justifyContent: 'space-between',
        gap: vars.space.sm,
        paddingTop: vars.space.sm,
        borderTop: `1px solid ${vars.color.border}`,
    }),
}
