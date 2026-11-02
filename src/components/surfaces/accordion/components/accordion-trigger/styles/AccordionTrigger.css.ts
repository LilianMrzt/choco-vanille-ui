import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const ACCORDION_TRIGGER_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: vars.space.sm,
        width: '100%',
        boxSizing: 'border-box',
        padding: `${vars.space.sm} ${vars.space.sm}`,
        border: 'none',
        borderRadius: vars.radius.sm,
        backgroundColor: 'transparent',
        color: vars.color.foreground,
        fontFamily: 'inherit',
        fontSize: vars.fontSize.sm,
        fontWeight: vars.fontWeight.medium,
        lineHeight: vars.lineHeight.normal,
        textAlign: 'left',
        cursor: 'pointer',
        outline: 'none',
        transition: [
            `color ${vars.duration.normal} ${vars.easing.standard}`,
            `background-color ${vars.duration.normal} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.normal} ${vars.easing.standard}`,
        ].join(', '),
        selectors: {
            '&:not([data-disabled]):hover': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            '&:not([data-disabled]):active': {
                backgroundColor: vars.color.primarySubtleActive,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.5,
            },
        },
    }),
}
