import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Base style shared by all interactive menu items:
 * MenuItem, CheckboxItem, RadioItem, SubTrigger.
 */
export const dropdownMenuItemClass = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: vars.space.sm,
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
})

/**
 * Modifier applied to destructive actions (e.g. "Delete", "Remove").
 */
export const dropdownMenuItemDestructiveClass = style({
    color: vars.color.destructive,
    selectors: {
        '&[data-highlighted]': {
            backgroundColor: vars.color.destructiveSubtle,
            color: vars.color.destructive,
        },
        '&[data-highlighted]:active': {
            backgroundColor: vars.color.destructiveSubtle,
            filter: 'brightness(0.96)',
        },
    },
})

/**
 * Wrapper for leading / trailing icons inside an item.
 * Inherits current color so it automatically matches item state.
 */
export const dropdownMenuItemIconClass = style({
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.color.mutedForeground,
    transition: `color ${vars.duration.fast} ${vars.easing.standard}`,
    selectors: {
        '[data-highlighted] &': {
            color: vars.color.primarySubtleForeground,
        },
    },
})

globalStyle(`${dropdownMenuItemIconClass} svg`, {
    width: '1rem',
    height: '1rem',
    pointerEvents: 'none',
})
