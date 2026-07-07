import { style, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Individual selectable option — visually identical to DropdownMenuItem.
 */
export const SELECT_ITEM_STYLES = {
    root: style({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: vars.space.sm,
        borderRadius: vars.radius.sm,
        paddingBlock: vars.space.xs2,
        paddingInline: vars.space.sm,
        paddingLeft: '1.75rem',
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
            // Only show the ring during keyboard navigation.
            '&:focus-visible': {
                outline: `2px solid ${vars.color.ring}`,
                outlineOffset: '-2px',
            },
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
     * Fixed-width slot reserved for the checkmark.
     * Keeps item text aligned whether or not an item is selected.
     */
    indicator: style({
        position: 'absolute',
        left: vars.space.sm,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '0.75rem',
        height: '0.75rem',
        color: vars.color.primary,
    }),
}

globalStyle(`${SELECT_ITEM_STYLES.indicator} svg`, {
    width: '0.75rem',
    height: '0.75rem',
    pointerEvents: 'none',
})
