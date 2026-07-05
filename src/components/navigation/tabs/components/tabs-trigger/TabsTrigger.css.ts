import { style } from '@vanilla-extract/css'
import { vars } from '@theme/contract.css.ts'

export const TABS_TRIGGER_STYLES = {
    root: style({
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: vars.space.xs,
        padding: `${vars.space.xs2} ${vars.space.md}`,
        marginBottom: '-1px',
        border: 'none',
        borderBottom: `2px solid transparent`,
        borderRadius: `${vars.radius.sm} ${vars.radius.sm} 0 0`,
        backgroundColor: 'transparent',
        color: vars.color.mutedForeground,
        fontFamily: 'inherit',
        fontSize: vars.fontSize.sm,
        fontWeight: vars.fontWeight.medium,
        lineHeight: vars.lineHeight.normal,
        cursor: 'pointer',
        outline: 'none',
        transition: [
            `color ${vars.duration.fast} ${vars.easing.standard}`,
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `border-color ${vars.duration.fast} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:not([data-disabled]):hover': {
                backgroundColor: vars.color.muted,
                color: vars.color.foreground,
            },
            '&:not([data-disabled]):active': {
                backgroundColor: vars.color.secondary,
                color: vars.color.foreground,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[data-state="active"]': {
                borderBottomColor: vars.color.primary,
                color: vars.color.primary,
            },
            '&[data-state="active"][data-disabled]': {
                borderBottomColor: vars.color.primary,
                color: vars.color.primary,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),
}
