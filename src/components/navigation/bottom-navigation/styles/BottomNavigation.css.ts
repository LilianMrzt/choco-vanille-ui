import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const BOTTOM_NAVIGATION_STYLES = {
    root: style({
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        paddingInline: vars.space[4],
        paddingBlockStart: vars.space[4],
        paddingBlockEnd: `calc(${vars.space[4]} + env(safe-area-inset-bottom))`,
        backgroundColor: `color-mix(in srgb, ${vars.color.surface.main} 92%, transparent)`,
        backdropFilter: 'blur(20px)',
        color: vars.color.surface.foreground,
    }),

    bordered: style({
        borderTop: `1px solid ${vars.color.border.main}`,
    }),

    list: style({
        display: 'flex',
        alignItems: 'stretch',
        gap: vars.space[2],
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
        gap: vars.space[2],
        width: '100%',
        height: '3.5rem',
        padding: vars.space[4],
        border: '1px solid transparent',
        borderRadius: vars.radius[8],
        backgroundColor: 'transparent',
        color: vars.color.surface.mutedForeground,
        fontFamily: vars.fontFamily.sans,
        fontSize: vars.fontSize[12],
        fontWeight: vars.fontWeight.medium,
        lineHeight: '1.25',
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
                boxShadow: `0 0 0 2px ${vars.color.surface.main}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            '&:not([data-disabled]):hover': {
                backgroundColor: vars.color.surface.muted,
                color: vars.color.text.primary,
            },
            '&:not([data-disabled]):active': {
                backgroundColor: vars.color.primary.subtlePressed,
            },
            '&[data-active]': {
                backgroundColor: vars.color.primary.subtle,
                color: vars.color.primary.subtleForeground,
            },
            '&[data-active]:hover': {
                backgroundColor: vars.color.primary.subtleHover,
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
        fontSize: vars.fontSize[10],
        fontWeight: vars.fontWeight.medium,
        lineHeight: '1.25',
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
