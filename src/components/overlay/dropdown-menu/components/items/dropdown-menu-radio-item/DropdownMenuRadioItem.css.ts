import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Always-visible radio circle. A filled dot appears inside when the
 * item is selected. Mirrors the checkbox box logic but uses a
 * full-radius circle and a smaller inner indicator.
 */
export const dropdownMenuRadioCircleClass = style({
    flexShrink: 0,
    width: '0.875rem',
    height: '0.875rem',
    borderRadius: vars.radius.full,
    border: `1.5px solid ${vars.color.input}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'transparent',
    transition: [
        `background-color ${vars.duration.fast} ${vars.easing.standard}`,
        `border-color ${vars.duration.fast} ${vars.easing.standard}`,
        `color ${vars.duration.fast} ${vars.easing.standard}`,
    ].join(', '),

    selectors: {
        '[data-state="checked"] &': {
            backgroundColor: vars.color.primary,
            borderColor: vars.color.primary,
            color: vars.color.primaryForeground,
        },
        '[data-highlighted] &': {
            borderColor: vars.color.primary,
        },
        '[data-state="checked"][data-highlighted] &': {
            backgroundColor: vars.color.primaryHover,
            borderColor: vars.color.primaryHover,
            color: vars.color.primaryForeground,
        },
    },
})

globalStyle(`${dropdownMenuRadioCircleClass} svg`, {
    width: '0.5rem',
    height: '0.5rem',
    pointerEvents: 'none',
})
