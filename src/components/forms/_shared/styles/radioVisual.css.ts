import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Shared visual style for the radio control.
 *
 * Works in two contexts:
 *  1. **Standalone** – applied directly on `RadioGroup.Item` (a `<button>`).
 *     The root itself carries `data-state` / `data-disabled`, so `&[data-state="checked"]`
 *     and `&:hover` selectors apply.
 *  2. **Dropdown** – applied on a `<span>` inside `DropdownMenu.RadioItem`.
 *     The parent item carries `data-state` / `data-highlighted`, so
 *     `[data-state="checked"] &` and `[data-highlighted] &` selectors apply.
 */
export const RADIO_VISUAL_STYLES = {
    root: style({
        flexShrink: 0,
        width: '1rem',
        height: '1rem',
        borderRadius: vars.radius.full,
        border: `1.5px solid ${vars.color.input}`,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'transparent',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        outline: 'none',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `border-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
            `box-shadow ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),

        selectors: {
            /* Standalone root selectors */
            '&:hover': {
                borderColor: vars.color.primary,
            },
            '&:focus-visible': {
                outline: 'none',
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
            },
            '&[data-state="checked"]': {
                backgroundColor: vars.color.primary,
                borderColor: vars.color.primary,
                color: vars.color.primaryForeground,
            },
            '&[data-state="checked"]:hover': {
                backgroundColor: vars.color.primaryHover,
                borderColor: vars.color.primaryHover,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },

            /* Dropdown child-span selectors */
            '[data-highlighted] &': {
                borderColor: vars.color.primary,
            },
            '[data-state="checked"] &': {
                backgroundColor: vars.color.primary,
                borderColor: vars.color.primary,
                color: vars.color.primaryForeground,
            },
            '[data-state="checked"][data-highlighted] &': {
                backgroundColor: vars.color.primaryHover,
                borderColor: vars.color.primaryHover,
            },
        },
    }),
}

globalStyle(`${RADIO_VISUAL_STYLES.root} svg`, {
    width: '0.5rem',
    height: '0.5rem',
    pointerEvents: 'none',
})
