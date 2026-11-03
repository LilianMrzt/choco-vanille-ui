import { style } from '@vanilla-extract/css'

import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Individual selectable option — visually identical to DropdownMenuItem.
 */
export const SELECT_ITEM_STYLES = {
    root: style({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: vars.space[8],
        borderRadius: vars.radius[4],
        paddingBlock: vars.space[6],
        paddingInline: vars.space[8],
        paddingLeft: '1.75rem',
        fontSize: vars.fontSize[14],
        lineHeight: '1.5',
        fontFamily: vars.fontFamily.sans,
        color: vars.color.surface.elevatedForeground,
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        transition: [
            `background-color ${vars.duration.fast} ${vars.easing.standard}`,
            `color ${vars.duration.fast} ${vars.easing.standard}`,
        ].join(', '),

        selectors: {
            '&[data-highlighted]': {
                backgroundColor: vars.color.primary.subtle,
                color: vars.color.primary.subtleForeground,
            },
            // Only show the ring during keyboard navigation.
            '&:focus-visible': {
                outline: `2px solid ${vars.color.focusRing}`,
                outlineOffset: '-2px',
            },
            '&[data-highlighted]:active': {
                backgroundColor: vars.color.primary.subtlePressed,
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
        left: vars.space[8],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '0.75rem',
        height: '0.75rem',
        color: vars.color.primary.main,
        pointerEvents: 'none',
    }),
}
