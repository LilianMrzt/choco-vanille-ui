import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Always-visible checkbox box. Becomes filled with the primary colour
 * when the item is checked. Reacts to highlighted (hover/focus) and
 * disabled states via ancestor data-attribute selectors.
 */
export const dropdownMenuCheckboxBoxClass = style({
    flexShrink: 0,
    width: '0.875rem',
    height: '0.875rem',
    borderRadius: vars.radius.xs,
    border: `1.5px solid ${vars.color.input}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Icon is invisible by default; becomes visible when checked via fill
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

globalStyle(`${dropdownMenuCheckboxBoxClass} svg`, {
    width: '0.625rem',
    height: '0.625rem',
    pointerEvents: 'none',
})
