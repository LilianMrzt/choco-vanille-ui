import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { DROPDOWN_MENU_ITEM_STYLES } from '@components/overlay/dropdown-menu/components/_shared/item.css.ts'

/**
 * The item that opens a nested sub-menu on hover / focus.
 * Stays visually "active" while the sub-menu is open (data-state="open").
 */
export const DROPDOWN_MENU_SUB_TRIGGER_STYLES = {
    root: style([
        DROPDOWN_MENU_ITEM_STYLES.root,
        {
            selectors: {
                '&[data-open]': {
                    backgroundColor: vars.color.primarySubtle,
                    color: vars.color.primarySubtleForeground,
                },
            },
        },
    ]),

    /**
     * Trailing chevron icon. Rotates when the sub-menu is open.
     */
    chevron: style({
        marginLeft: 'auto',
        width: '1rem',
        height: '1rem',
        flexShrink: 0,
        color: vars.color.surfaceMutedForeground,
        transition: [
            `transform ${vars.duration.normal} ${vars.easing.emphasized}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),

        selectors: {
            '[data-open] &': {
                color: vars.color.primarySubtleForeground,
            },
            '[data-highlighted] &': {
                color: vars.color.primarySubtleForeground,
            },
        },
    }),
}

globalStyle(`${DROPDOWN_MENU_SUB_TRIGGER_STYLES.chevron} svg`, {
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
})
