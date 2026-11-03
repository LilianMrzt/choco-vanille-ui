import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const COLLAPSIBLE_TRIGGER_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: vars.space[8],
        width: '100%',
        boxSizing: 'border-box',
        padding: `${vars.space[8]} ${vars.space[8]}`,
        border: 'none',
        borderRadius: vars.radius[6],
        backgroundColor: 'transparent',
        color: vars.color.text.primary,
        fontFamily: 'inherit',
        fontSize: vars.fontSize[14],
        fontWeight: vars.fontWeight.medium,
        lineHeight: '1.5',
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
                backgroundColor: vars.color.primary.subtle,
                color: vars.color.primary.subtleForeground,
            },
            '&:not([data-disabled]):active': {
                backgroundColor: vars.color.primary.subtlePressed,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.focusRing}`,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.5,
            },
        },
    }),
}
