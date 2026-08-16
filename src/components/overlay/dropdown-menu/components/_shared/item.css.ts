import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Base style shared by all interactive menu items:
 * MenuItem, CheckboxItem, RadioItem, SubTrigger.
 */
export const DROPDOWN_MENU_ITEM_STYLES = {
    root: style({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.sm,
        borderRadius: vars.radius.xs,
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
            '&:not([data-disabled])[data-highlighted]': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            '&:not([data-disabled]):hover': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            // pressed / active — slightly stronger blue tint
            '&:not([data-disabled])[data-highlighted]:active': {
                backgroundColor: vars.color.primarySubtleActive,
            },
            '&:not([data-disabled]):active': {
                backgroundColor: vars.color.primarySubtleActive,
            },
            '&:not([data-disabled])[data-active="true"]': {
                backgroundColor: vars.color.primarySubtle,
                color: vars.color.primarySubtleForeground,
            },
            '&:focus-visible': {
                outline: 'none',
                zIndex: 1,
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
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
            '&:not([data-disabled])[data-highlighted]': {
                backgroundColor: vars.color.destructiveSubtle,
                color: vars.color.destructiveSubtleForeground,
            },
            '&:not([data-disabled]):hover': {
                backgroundColor: vars.color.destructiveSubtle,
                color: vars.color.destructiveSubtleForeground,
            },
            '&:not([data-disabled])[data-highlighted]:active': {
                backgroundColor: vars.color.destructiveSubtleHover,
            },
            '&:not([data-disabled]):active': {
                backgroundColor: vars.color.destructiveSubtleHover,
            },
            '&:focus-visible': {
                outline: 'none',
                zIndex: 1,
                boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 4px ${vars.color.ring}`,
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
