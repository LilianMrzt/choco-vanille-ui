import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'
import { dropdownMenuItemClass } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'

/**
 * The item that opens a nested sub-menu on hover / focus.
 * Stays visually "active" while the sub-menu is open (data-state="open").
 */
export const dropdownMenuSubTriggerClass = style([
    dropdownMenuItemClass,
    {
        selectors: {
            '&[data-state="open"]': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
        },
    },
])

/**
 * Trailing chevron icon. Rotates when the sub-menu is open.
 */
export const dropdownMenuSubTriggerChevronClass = style({
    marginLeft: 'auto',
    width: '1rem',
    height: '1rem',
    flexShrink: 0,
    color: vars.color.mutedForeground,
    transition: [
        `transform ${vars.duration.normal} ${vars.easing.emphasized}`,
        `color ${vars.duration.fast} ${vars.easing.standard}`,
    ].join(', '),

    selectors: {
        '[data-state="open"] &': {
            transform: 'rotate(90deg)',
            color: vars.color.primarySubtleForeground,
        },
        '[data-highlighted] &': {
            color: vars.color.primarySubtleForeground,
        },
    },
})

globalStyle(`${dropdownMenuSubTriggerChevronClass} svg`, {
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
})
