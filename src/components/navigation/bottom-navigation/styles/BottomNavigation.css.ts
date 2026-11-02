import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const BOTTOM_NAVIGATION_STYLES = {
    root: style({
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        paddingInline: vars.space.xs,
        paddingBlockStart: vars.space.xs,
        paddingBlockEnd: `calc(${vars.space.xs} + env(safe-area-inset-bottom))`,
        backgroundColor: `color-mix(in srgb, ${vars.color.surface} 92%, transparent)`,
        backdropFilter: 'blur(20px)',
        color: vars.color.surfaceForeground,
    }),

    bordered: style({
        borderTop: `1px solid ${vars.color.border}`,
    }),

    list: style({
        display: 'flex',
        alignItems: 'stretch',
        gap: vars.space.xxs,
        width: '100%',
        maxWidth: '32rem',
        marginInline: 'auto',
        marginBlock: 0,
        padding: 0,
        listStyle: 'none',
    }),

    item: style({
        display: 'flex',
        flex: '1 1 0',
        minWidth: 0,
    }),

    control: style({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: vars.space.xxs,
        width: '100%',
        height: '3.5rem',
        padding: vars.space.xs,
        border: '1px solid transparent',
        borderRadius: vars.radius.md,
        backgroundColor: 'transparent',
        color: vars.color.surfaceMutedForeground,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize.xs,
        fontWeight: vars.fontWeight.medium,
        lineHeight: vars.lineHeight.tight,
        textDecoration: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        transition: [
            `background-color ${vars.duration.normal} ${vars.easing.standard}`,
            `border-color ${vars.duration.normal} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.normal} ${vars.easing.standard}`,
            `color ${vars.duration.normal} ${vars.easing.standard}`,
            `transform ${vars.duration.normal} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:focus-visible': {
                boxShadow: `0 0 0 2px ${vars.color.surface}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            '&:not([data-disabled]):hover': {
                backgroundColor: vars.color.surfaceMuted,
                color: vars.color.foreground,
            },
            '&:not([data-disabled]):active': {
                backgroundColor: vars.color.primarySubtleActive,
            },
            '&[data-active]': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            '&[data-active]:hover': {
                backgroundColor: vars.color.primarySubtleHover,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.5,
            },
        },
    }),

    icon: style({
        color: 'inherit',
        flexShrink: 0,
        transition: `transform ${vars.duration.normal} ${vars.easing.standard}`,
        selectors: {
            '[data-active] &': {
                transform: 'translateY(-1px)',
            },
        },
    }),

    label: style({
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        fontSize: vars.fontSize['2xs'],
        fontWeight: vars.fontWeight.medium,
        lineHeight: vars.lineHeight.tight,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transition: `font-weight ${vars.duration.normal} ${vars.easing.standard}`,
        selectors: {
            '[data-active] &': {
                fontWeight: vars.fontWeight.semibold,
            },
        },
    }),
}
