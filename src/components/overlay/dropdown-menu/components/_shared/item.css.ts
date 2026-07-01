import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Base style shared by all interactive menu items:
 * MenuItem, CheckboxItem, RadioItem, SubTrigger.
 */
export const DROPDOWN_MENU_ITEM_STYLES = {
    root: style({
        position: 'relative',
        borderRadius: vars.radius.sm,
        paddingBlock: vars.space.xs2,
        paddingInline: vars.space.sm,
        fontSize: vars.fontSize.sm,
        lineHeight: vars.lineHeight.normal,
        fontFamily: vars.fontFamily.sans,
        color: vars.color.popoverForeground,
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),

        selectors: {
            '&[data-highlighted]': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            // pressed / active — slightly stronger blue tint
            '&[data-highlighted]:active': {
                backgroundColor: vars.color.primarySubtleActive,
            },
            '&[data-disabled]': {
                cursor: 'not-allowed',
                opacity: 0.45,
            },
        },
    }),

    /**
     * Modifier applied to destructive actions (e.g. "Delete", "Remove").
     */
    destructive: style({
        color: vars.color.destructive,
        selectors: {
            '&[data-highlighted]': {
                backgroundColor: vars.color.destructiveSubtle,
                color: vars.color.destructiveSubtleForeground,
            },
            '&[data-highlighted]:active': {
                backgroundColor: vars.color.destructiveSubtleHover,
            },
        },
    }),

    /**
     * Wrapper for leading / trailing icons inside an item.
     * Inherits current color so it automatically matches item state (normal, destructive, highlighted…).
     */
    icon: style({
        flexShrink: 0,
        width: '1rem',
        height: '1rem',
        color: 'inherit',
        transition: `color ${vars.duration.fast} ${vars.easing.standard}`,
    }),
}

globalStyle(`${DROPDOWN_MENU_ITEM_STYLES.icon} svg`, {
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
})
