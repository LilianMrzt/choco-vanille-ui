import { style } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

export const ACCORDION_TRIGGER_STYLES = {
    root: style({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: vars.space.sm,
        width: '100%',
        padding: `${vars.space.sm} 0`,
        border: 'none',
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
            '&:hover': {
                color: vars.color.primary,
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

export const accordionTriggerChevron = style({
    flexShrink: 0,
    transition: `transform ${vars.duration.normal} ${vars.easing.standard}`,
    selectors: {
        '[data-panel-open] &': {
            transform: 'rotate(180deg)',
        },
    },
})
